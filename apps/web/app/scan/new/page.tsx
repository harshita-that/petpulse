'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

type ScanType = 'teeth' | 'eyes' | 'skin' | 'body'

const SCAN_TYPES = [
  { id: 'teeth', label: 'Teeth', icon: '🦷', desc: 'Dental health, gums, tartar' },
  { id: 'eyes',  label: 'Eyes',  icon: '👁️', desc: 'Clarity, redness, discharge' },
  { id: 'skin',  label: 'Skin',  icon: '🐾', desc: 'Coat, lumps, irritation' },
  { id: 'body',  label: 'Body',  icon: '🐕', desc: 'Posture, weight, condition' }
] as const

interface Pet {
  id: string
  name: string
}

export default function NewScanPage() {
  const router = useRouter()
  const supabase = createClient()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [scanType, setScanType] = useState<ScanType | null>(null)
  const [petId, setPetId] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pets, setPets] = useState<Pet[]>([])

  useEffect(() => {
    async function loadPets() {
      const { data } = await supabase.from('pets').select('id, name')
      if (data) setPets(data)
    }
    loadPets()
  }, [])

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 10 * 1024 * 1024) {
      setError('Photo must be under 10MB')
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setError(null)
  }

  async function handleSubmit() {
    if (!file || !scanType || !petId) return
    setUploading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // 1. Upload to Supabase Storage
      const path = `${user.id}/${petId}/${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('pet-scans')
        .upload(path, file, { contentType: file.type })

      if (uploadError) throw uploadError

      // 2. Create scan record
      const { data: scan, error: scanError } = await supabase.from('scans').insert({
        pet_id: petId,
        user_id: user.id,
        scan_type: scanType,
        image_path: path,
        image_url: path,
        status: 'pending'
      }).select().single()

      if (scanError) throw scanError

      // 3. Trigger AI analysis asynchronously (so we can transition to processing screen immediately)
      supabase.functions.invoke('analyze-scan', {
        body: { scan_id: scan.id }
      }).catch(err => console.error('Background analysis failed:', err))

      // 4. Navigate to processing page
      router.push(`/scan/${scan.id}/processing`)

    } catch (err: any) {
      setError(err.message ?? 'Upload failed. Please try again.')
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] px-4 py-12 max-w-2xl mx-auto">

      {/* Step 1 — Select scan type */}
      {step === 1 && (
        <div>
          <h1 className="font-display text-3xl font-bold text-[#1A1A1A] mb-2">
            What are we scanning?
          </h1>
          <p className="text-[#6B7280] mb-8">Choose the area you want to check.</p>

          <div className="grid grid-cols-2 gap-4">
            {SCAN_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => { setScanType(type.id); setStep(2) }}
                className={`p-6 rounded-2xl border-2 text-left transition-all duration-200
                  hover:border-[#2D9B6F] hover:shadow-md active:scale-95
                  ${scanType === type.id 
                    ? 'border-[#2D9B6F] bg-[#2D9B6F]/5' 
                    : 'border-[#E8E4DA] bg-white'}`}
              >
                <span className="text-3xl block mb-3">{type.icon}</span>
                <span className="font-semibold text-[#1A1A1A] block">{type.label}</span>
                <span className="text-sm text-[#6B7280]">{type.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Select pet + upload photo */}
      {step === 2 && (
        <div>
          <button 
            onClick={() => setStep(1)}
            className="text-[#6B7280] text-sm mb-6 hover:text-[#1A1A1A] flex items-center gap-1"
          >
            ← Back
          </button>

          <h1 className="font-display text-3xl font-bold text-[#1A1A1A] mb-2">
            Upload a photo
          </h1>
          <p className="text-[#6B7280] mb-8">
            Clear, well-lit photos give the best results.
          </p>

          {/* Pet selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Which pet?
            </label>
            <div className="flex gap-3 flex-wrap">
              {pets.map(pet => (
                <button
                  key={pet.id}
                  onClick={() => setPetId(pet.id)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all
                    ${petId === pet.id
                      ? 'border-[#2D9B6F] bg-[#2D9B6F] text-white'
                      : 'border-[#E8E4DA] bg-white text-[#1A1A1A] hover:border-[#2D9B6F]'}`}
                >
                  {pet.name}
                </button>
              ))}
            </div>
            {pets.length === 0 && (
               <p className="text-sm text-[#6B7280]">You need to add a pet in your dashboard first.</p>
            )}
          </div>

          {/* Upload zone */}
          <label className={`block border-2 border-dashed rounded-2xl p-8 text-center 
            cursor-pointer transition-all duration-200
            ${preview 
              ? 'border-[#2D9B6F]' 
              : 'border-[#E8E4DA] hover:border-[#2D9B6F] hover:bg-[#2D9B6F]/5'}`}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/heic"
              onChange={handleFileSelect}
              className="hidden"
            />
            {preview ? (
              <div>
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-xl object-cover"
                />
                <p className="text-sm text-[#2D9B6F] mt-3 font-medium">
                  Tap to change photo
                </p>
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-3">📸</div>
                <p className="font-medium text-[#1A1A1A]">Tap to upload</p>
                <p className="text-sm text-[#6B7280] mt-1">JPG, PNG or HEIC · Max 10MB</p>
              </div>
            )}
          </label>

          {error && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!file || !petId || uploading}
            className={`w-full mt-6 py-4 rounded-2xl font-semibold text-base transition-all
              ${file && petId && !uploading
                ? 'bg-[#F4845F] text-white hover:bg-[#e8734e] active:scale-[0.98] shadow-sm'
                : 'bg-[#E8E4DA] text-[#6B7280] cursor-not-allowed'}`}
          >
            {uploading ? 'Uploading...' : 'Analyze →'}
          </button>
        </div>
      )}
    </div>
  )
}
