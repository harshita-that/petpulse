'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'

const MESSAGES = [
  'Analyzing image quality...',
  'Checking for visual indicators...',
  'Mapping health regions...',
  'Calculating health score...',
  'Preparing your report...'
]

export default function ProcessingPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const supabase = createClient()
  const [msgIndex, setMsgIndex] = useState(0)

  // Cycle through messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % MESSAGES.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  // Subscribe to scan status via Supabase Realtime
  useEffect(() => {
    if (!id) return

    // Immediately check if it's already complete
    async function checkStatus() {
       const { data } = await supabase.from('scans').select('status').eq('id', id).single()
       if (data?.status === 'complete') {
         router.push(`/scan/${id}/results`)
       } else if (data?.status === 'failed') {
         router.push(`/dashboard`) // Fallback for failed
       }
    }
    checkStatus()

    const channel = supabase
      .channel(`scan-${id}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'scans',
        filter: `id=eq.${id}`
      }, (payload) => {
        const newStatus = payload.new.status
        if (newStatus === 'complete') {
          setTimeout(() => router.push(`/scan/${id}/results`), 800)
        } else if (newStatus === 'failed') {
          router.push(`/dashboard`) // Fallback for failed
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [id, router, supabase])

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col items-center justify-center px-4">
      
      {/* Scan animation */}
      <div className="relative w-48 h-48 mb-10">
        <div className="w-full h-full rounded-3xl bg-[#F3F0E8] border border-[#E8E4DA] 
          flex items-center justify-center text-6xl overflow-hidden relative shadow-inner">
          🐕
          {/* Scan beam */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r 
              from-transparent via-[#2D9B6F] to-transparent opacity-80 shadow-[0_0_15px_rgba(45,155,111,0.5)]"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Corner brackets */}
        {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 border-[#2D9B6F] border-2 ${pos}
              ${i < 2 ? 'border-b-0' : 'border-t-0'}
              ${i % 2 === 0 ? 'border-r-0' : 'border-l-0'}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* Cycling message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={msgIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="text-[#6B7280] text-sm font-medium text-center"
        >
          {MESSAGES[msgIndex]}
        </motion.p>
      </AnimatePresence>

      <p className="text-[#1A1A1A] font-semibold text-lg mt-4">
        Analyzing your photo
      </p>
      <p className="text-[#6B7280] text-sm mt-1">Usually takes 5–10 seconds with Gemini</p>
    </div>
  )
}
