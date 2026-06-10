'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { motion } from 'framer-motion'

const SEVERITY_STYLES = {
  normal:  { bg: 'bg-emerald-50',  border: 'border-emerald-200', text: 'text-emerald-700',  label: 'Healthy' },
  watch:   { bg: 'bg-yellow-50',   border: 'border-yellow-200',  text: 'text-yellow-700',   label: 'Watch' },
  concern: { bg: 'bg-orange-50',   border: 'border-orange-200',  text: 'text-orange-700',   label: 'Concern' },
  urgent:  { bg: 'bg-red-50',      border: 'border-red-200',     text: 'text-red-700',       label: 'See Vet' }
}

function ScoreRing({ score }: { score: number }) {
  const r = 54
  const circ = 2 * Math.PI * r
  const color = score >= 80 ? '#2D9B6F' : score >= 60 ? '#F59E0B' : '#EF4444'

  return (
    <div className="relative w-36 h-36 mx-auto mb-6">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#E8E4DA" strokeWidth="8" />
        <motion.circle
          cx="60" cy="60" r={r}
          fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (score / 100) * circ }}
          transition={{ duration: 1.4, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-[#6B7280]">/ 100</span>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  const params = useParams()
  const id = params?.id as string
  const supabase = createClient()
  
  const [scan, setScan] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase
        .from('scans')
        .select('*, scan_findings(*), pets(name, breed)')
        .eq('id', id)
        .single()
      
      if (data) setScan(data)
      setLoading(false)
    }
    if (id) loadData()
  }, [id, supabase])

  if (loading) return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#2D9B6F] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!scan) return (
     <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center flex-col gap-4">
        <p className="text-red-500">Scan not found.</p>
        <Link href="/dashboard" className="text-[#2D9B6F] underline">Back to Dashboard</Link>
     </div>
  )

  // Sort findings: urgent first
  const order = { urgent: 0, concern: 1, watch: 2, normal: 3 }
  const findings = [...(scan.scan_findings ?? [])].sort(
    (a, b) => order[a.severity as keyof typeof order] - order[b.severity as keyof typeof order]
  )

  return (
    <div className="min-h-screen bg-[#FAFAF7] px-4 py-10 max-w-2xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[#6B7280] text-sm mb-1 capitalize">{scan.scan_type} scan</p>
        <h1 className="font-display text-3xl font-bold text-[#1A1A1A] mb-8">
          {scan.pets?.name}&apos;s results
        </h1>

        {/* Score ring */}
        <ScoreRing score={scan.health_score ?? 0} />

        {/* Summary */}
        {scan.raw_ai_response?.candidates?.[0]?.content?.parts?.[0]?.text && (
          <p className="text-center text-[#6B7280] text-sm mb-8 max-w-sm mx-auto">
            {JSON.parse(
              scan.raw_ai_response.candidates[0].content.parts[0].text
                .replace(/```json|```/g, '').trim()
            ).summary}
          </p>
        )}

        {/* Findings */}
        <div className="space-y-3">
          {findings.map((f, i) => {
            const s = SEVERITY_STYLES[f.severity as keyof typeof SEVERITY_STYLES] || SEVERITY_STYLES.normal
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`p-4 rounded-2xl border ${s.bg} ${s.border}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[#1A1A1A] text-sm">
                    {f.region_label}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full 
                    bg-white/60 ${s.text}`}>
                    {s.label}
                  </span>
                </div>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {f.description}
                </p>
                <p className="text-xs text-[#6B7280]/60 mt-1">
                  Confidence: {Math.round(f.confidence * 100)}%
                </p>
              </motion.div>
            )
          })}
          
          {findings.length === 0 && (
             <div className="text-center text-[#6B7280] py-8 border-2 border-dashed border-[#E8E4DA] rounded-2xl">
                 No specific findings detected.
             </div>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-[#6B7280] text-center mt-8 leading-relaxed">
          PetPulse is a wellness monitoring tool, not a diagnostic service.
          Always consult your vet for medical advice.
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Link
            href="/scan/new"
            className="flex-1 py-3 rounded-2xl border border-[#E8E4DA] text-center
              text-sm font-semibold text-[#1A1A1A] hover:border-[#2D9B6F] transition-colors bg-white"
          >
            New scan
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 py-3 rounded-2xl bg-[#F4845F] text-white text-center
              text-sm font-semibold hover:bg-[#e8734e] transition-colors"
          >
            Dashboard →
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
