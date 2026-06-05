'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const BG_URL = 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1600&q=85&auto=format&fit=crop';

export default function EmotionalMoment() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="relative py-0 overflow-hidden min-h-[60vh] flex items-center">
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ y: bgY }}
      >
        <img
          src={BG_URL}
          alt="Pet and owner"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/75 via-[#1A1A1A]/50 to-[#1A1A1A]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: 64 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 bg-white/60 mb-8"
          />

          <h2 className="font-display text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-8">
            Because{' '}
            <em className="font-display not-italic" style={{ color: '#7EC8E3' }}>
              "Is she okay?"
            </em>
            <br />
            deserves a real answer.
          </h2>

          <p className="text-white/75 text-xl leading-relaxed max-w-lg font-light">
            Every pet owner knows that quiet worry. PetPulse gives it a calm, clear response — so the love you give is backed by the knowledge you need.
          </p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1A1A1A] font-semibold rounded-full hover:bg-[#F3F0E8] transition-colors duration-200 text-base shadow-lg"
          >
            Start your first scan
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
