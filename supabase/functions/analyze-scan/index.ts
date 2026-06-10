import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  const geminiApiKey = Deno.env.get('GEMINI_API_KEY')

  if (!supabaseUrl || !supabaseServiceKey || !geminiApiKey) {
    console.error('Missing environment variables')
    return new Response(JSON.stringify({ error: 'Server misconfiguration' }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    const { scan_id } = await req.json()
    if (!scan_id) throw new Error('scan_id is required')

    // 1. Fetch scan + pet context
    const { data: scan, error: scanError } = await supabase
      .from('scans')
      .select('*, pets(name, breed, age)')
      .eq('id', scan_id)
      .single()

    if (scanError || !scan) throw new Error('Scan not found')

    // 2. Mark processing
    await supabase.from('scans')
      .update({ status: 'processing', processing_started_at: new Date().toISOString() })
      .eq('id', scan_id)

    // 3. Download image from Storage -> base64
    const { data: file, error: fileError } = await supabase.storage
      .from('pet-scans')
      .download(scan.image_path)

    if (fileError || !file) throw new Error(`Failed to download image: ${fileError?.message}`)

    const buffer = await file.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
    const mimeType = file.type || 'image/jpeg'

    // 4. Call Gemini 1.5 Flash Vision
    const promptText = buildPrompt(scan.scan_type, scan.pets)
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: promptText },
              {
                inlineData: {
                  mimeType: mimeType,
                  data: base64
                }
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Gemini API error: ${response.status} ${errorText}`)
    }

    const ai = await response.json()
    
    if (!ai.candidates || !ai.candidates[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format from Gemini')
    }

    const raw = ai.candidates[0].content.parts[0].text

    // 5. Parse into structured findings
    const parsed = parseResponse(raw)

    // 6. Write findings
    if (parsed.findings.length > 0) {
      await supabase.from('scan_findings').insert(
        parsed.findings.map(f => ({ scan_id, ...f }))
      )
    }

    // 7. Complete scan
    await supabase.from('scans').update({
      status: 'complete',
      health_score: parsed.health_score,
      raw_ai_response: ai,
      processing_completed_at: new Date().toISOString()
    }).eq('id', scan_id)

    return new Response(
      JSON.stringify({ success: true, health_score: parsed.health_score }),
      { headers: { ...cors, 'Content-Type': 'application/json' } }
    )

  } catch (err: any) {
    console.error('Error processing scan:', err)
    
    // Attempt to update the scan status to failed
    try {
      const { scan_id } = await req.json().catch(() => ({}))
      if (scan_id) {
         await supabase.from('scans')
          .update({ status: 'failed', error_message: err.message || 'Unknown error' })
          .eq('id', scan_id)
      }
    } catch (e) {
      console.error('Failed to update scan status on error:', e)
    }

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  }
})

function buildPrompt(scanType: string, pet: any): string {
  const petCtx = pet
    ? `Pet name: ${pet.name}. Breed: ${pet.breed ?? 'unknown'}. Age: ${pet.age ?? 'unknown'} years.`
    : ''

  const instructions: Record<string, string> = {
    teeth: `Analyze this pet's dental health.
      Check for: tartar buildup, gum recession, gum color (healthy = pink),
      broken or missing teeth, plaque, swelling, discoloration, abnormal growths.`,

    eyes: `Analyze this pet's eye health.
      Check for: cloudiness or lens opacity, redness, discharge type and color,
      pupil symmetry, third eyelid visibility, swelling, overall clarity.`,

    skin: `Analyze this pet's skin and coat.
      Check for: redness, rashes, lumps or bumps, hair loss patches,
      dry or flaky skin, wounds, parasites, coat quality and shine.`,

    body: `Analyze this pet's body condition and posture.
      Check for: weight distribution, muscle symmetry, posture abnormalities,
      swelling, visible ribs or spine, overall body condition score.`
  }

  return `
You are a veterinary health screening assistant.
${petCtx}
Scan type: ${scanType}

${instructions[scanType] ?? instructions.body}

IMPORTANT RULES:
- You are NOT diagnosing. You are flagging areas for vet attention.
- Be conservative. Only flag what you can clearly observe in the image.
- If the image quality is too poor to assess, say so.
- Never use alarming language. Be calm and informative.

Respond ONLY with valid JSON matching the exact schema below. No preamble, no markdown, no explanation.
Schema:
{
  "type": "object",
  "properties": {
    "health_score": { "type": "number", "description": "Score from 0 to 100" },
    "summary": { "type": "string", "description": "One sentence overview" },
    "image_quality": { "type": "string", "enum": ["good", "acceptable", "poor"] },
    "findings": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "region_label": { "type": "string", "description": "What area of the body" },
          "severity": { "type": "string", "enum": ["normal", "watch", "concern", "urgent"] },
          "confidence": { "type": "number", "description": "Confidence score from 0.0 to 1.0" },
          "description": { "type": "string", "description": "Calm, plain English description of what you see" }
        },
        "required": ["region_label", "severity", "confidence", "description"]
      }
    }
  },
  "required": ["health_score", "summary", "image_quality", "findings"]
}

Health score guide:
  90-100: everything looks healthy
  75-89:  mostly healthy, minor things to watch
  60-74:  some areas need monitoring
  40-59:  concerning findings, vet visit recommended soon
  0-39:   urgent findings, vet visit recommended promptly

Severity guide:
  normal:  looks healthy, no action needed
  watch:   minor change, monitor over time
  concern: notable change, vet check recommended
  urgent:  significant issue, prompt vet attention needed
`
}

interface Finding {
  region_label: string
  severity: 'normal' | 'watch' | 'concern' | 'urgent'
  confidence: number
  description: string
}

interface ParsedResult {
  health_score: number
  summary: string
  image_quality: string
  findings: Finding[]
}

function parseResponse(raw: string): ParsedResult {
  try {
    // Strip any accidental markdown fences
    const clean = raw.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    // Validate and sanitize
    return {
      health_score: Math.min(100, Math.max(0, Number(parsed.health_score) || 75)),
      summary: parsed.summary ?? '',
      image_quality: parsed.image_quality ?? 'acceptable',
      findings: (parsed.findings ?? []).map((f: any) => ({
        region_label: f.region_label ?? 'General',
        severity: ['normal','watch','concern','urgent'].includes(f.severity)
          ? f.severity : 'normal',
        confidence: Math.min(1, Math.max(0, Number(f.confidence) || 0.7)),
        description: f.description ?? ''
      }))
    }
  } catch (err) {
    console.error("Failed to parse AI response:", err)
    // AI returned something unparseable — return a safe fallback
    return {
      health_score: 75,
      summary: 'Analysis complete. Review findings with your vet.',
      image_quality: 'acceptable',
      findings: [{
        region_label: 'General',
        severity: 'watch',
        confidence: 0.5,
        description: 'Unable to fully parse analysis. Please try scanning again with a clearer photo.'
      }]
    }
  }
}
