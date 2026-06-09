'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Heart, Shield, Zap } from 'lucide-react';
import HeroPawOrb from './HeroPawOrb';
import PawIcon from './PawIcon';

const GOLDEN_RETRIEVER_URL = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=900&q=85&auto=format&fit=crop';

const fadeUpVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
};

const pawPrints = [
  { x: '8%', y: '20%', size: 28, opacity: 0.07, rotate: -25 },
  { x: '12%', y: '55%', size: 22, opacity: 0.05, rotate: 15 },
  { x: '5%', y: '80%', size: 18, opacity: 0.06, rotate: -10 },
  { x: '88%', y: '15%', size: 24, opacity: 0.06, rotate: 30 },
  { x: '92%', y: '70%', size: 20, opacity: 0.05, rotate: -20 },
  { x: '75%', y: '90%', size: 16, opacity: 0.04, rotate: 10 },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#FAFAF7]"
    >
      {/* Paw print bg scatter */}
      {pawPrints.map((p, i) => (
        <div
          key={i}
          className="absolute select-none pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <PawIcon className="w-full h-full text-[#2D9B6F]" />
        </div>
      ))}

      {/* Warm radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[60%] h-[70%] opacity-70"
          style={{ background: 'radial-gradient(circle, rgba(243,240,232,0.8) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[40%] h-[40%] opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(232,245,239,0.6) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <motion.div
              custom={0.1}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F5EF] border border-[#C5E8D8]"
            >
              <span className="w-2 h-2 rounded-full bg-[#2D9B6F] animate-pulse" />
              <span className="text-xs font-semibold text-[#2D9B6F] tracking-wide uppercase">
                AI-Powered Pet Health
              </span>
            </motion.div>

            <motion.h1
              custom={0.2}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="font-display text-6xl lg:text-7xl xl:text-8xl font-bold text-[#1A1A1A] leading-[1.05] tracking-tight"
            >
              Notice{' '}
              <em className="font-display not-italic gradient-text">what</em>
              <br />
              changes.
            </motion.h1>

            <motion.p
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="font-display text-xl text-[#6B7280] italic font-light max-w-md"
            >
              Before it becomes a problem.
            </motion.p>

            <motion.p
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="text-[#6B7280] text-lg leading-relaxed max-w-md"
            >
              AI-assisted health check-ins between vet visits — through photos you already take.
            </motion.p>

            <motion.div
              custom={0.5}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a href="/signup" className="btn-breathe inline-flex items-center gap-2 px-7 py-4 bg-[#F4845F] text-white font-semibold rounded-full hover:bg-[#F16A41] transition-colors duration-200 text-base">
                Start for free
                <ArrowRight className="w-4 h-4" />
              </a>
              <button className="inline-flex items-center gap-2 px-7 py-4 border-2 border-[#E8E4DA] text-[#1A1A1A] font-semibold rounded-full hover:border-[#2D9B6F] hover:text-[#2D9B6F] transition-all duration-200 text-base bg-white/50">
                <Play className="w-4 h-4 fill-current" />
                See how it works
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              custom={0.65}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="flex items-center gap-6 pt-2"
            >
              <div className="flex -space-x-2">
                {[
                  'photo-1544005313-94ddf0286df2',
                  'photo-1506794778202-cad84cf45f1d',
                  'photo-1554151228-14d9def656e4',
                  'photo-1570295999919-56ceb5ecca61',
                ].map((id, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                  >
                    <img
                      src={`https://images.unsplash.com/${id}?w=64&h=64&q=80&auto=format&fit=crop&crop=face`}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <span key={i} className="text-[#F4845F] text-sm">&#9733;</span>
                  ))}
                </div>
                <p className="text-xs text-[#6B7280] mt-0.5">Loved by 12,000+ pet parents</p>
              </div>
            </motion.div>

            {/* Micro trust icons */}
            <motion.div
              custom={0.75}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="flex items-center gap-6"
            >
              {[
                { icon: Shield, label: 'Vet-reviewed' },
                { icon: Heart, label: 'HIPAA-safe data' },
                { icon: Zap, label: 'Instant insights' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                  <Icon className="w-3.5 h-3.5 text-[#2D9B6F]" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Pet image + 3D orb */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            {/* 3D Orb background */}
            <div className="absolute -top-12 -right-8 w-64 h-64 opacity-60">
              <HeroPawOrb />
            </div>

            {/* Main pet photo */}
            <div className="relative float z-10">
              <div className="relative w-[420px] h-[520px] rounded-[2.5rem] overflow-hidden shadow-[0_32px_80px_-12px_rgba(0,0,0,0.15)]">
                <img
                  src={GOLDEN_RETRIEVER_URL}
                  alt="Golden retriever - happy and healthy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/20 via-transparent to-transparent" />
              </div>

              {/* Floating health score badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-6 -left-8 bg-white rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#E8E4DA] flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E8F5EF] flex items-center justify-center">
                  <span className="font-display font-bold text-[#2D9B6F] text-lg">94</span>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] font-medium">Health Score</p>
                  <p className="text-sm font-semibold text-[#1A1A1A]">Excellent</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#2D9B6F] animate-pulse ml-1" />
              </motion.div>

              {/* Top right: recent scan */}
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-4 -right-12 bg-white rounded-2xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.10)] border border-[#E8E4DA] flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FEF0EB] flex items-center justify-center">
                  <Heart className="w-4 h-4 text-[#F4845F] fill-[#F4845F]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#6B7280]">Last check-in</p>
                  <p className="text-xs font-semibold text-[#1A1A1A]">2 hours ago</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#6B7280] tracking-widest uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-0.5 h-8 bg-gradient-to-b from-[#2D9B6F] to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
