'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const cards = [
  {
    photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=85&auto=format&fit=crop',
    label: 'Eye cloudiness',
    annotation: 'Slight cloudiness. Easy to miss.',
    detail: 'Early sign of cataracts or corneal disease. Most owners notice it 6 months too late.',
    dotX: '52%',
    dotY: '44%',
    color: '#7EC8E3',
    delay: 0,
  },
  {
    photo: 'https://images.unsplash.com/photo-1602584386319-fa8eb4361c2c?w=600&q=85&auto=format&fit=crop',
    label: 'Gum color',
    annotation: 'Pale gums. Often ignored.',
    detail: 'Pale or white gums signal anemia or internal bleeding — a critical red flag.',
    dotX: '48%',
    dotY: '52%',
    color: '#F4845F',
    delay: 0.15,
  },
  {
    photo: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=600&q=85&auto=format&fit=crop',
    label: 'Posture shift',
    annotation: 'Subtle posture shift. Joint pain starting.',
    detail: 'Slight weight redistribution is among the first signs of hip dysplasia.',
    dotX: '55%',
    dotY: '60%',
    color: '#2D9B6F',
    delay: 0.3,
  },
];

function AnnotationCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: card.delay }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-[#E8E4DA] shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 tilt-card"
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(8px)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
      }}
    >
      {/* Photo */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={card.photo}
          alt={card.label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Annotation dot + line */}
        <div
          className="absolute"
          style={{ left: card.dotX, top: card.dotY }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: card.delay + 0.5, duration: 0.4 }}
            className="w-3 h-3 rounded-full border-2 border-white"
            style={{ backgroundColor: card.color }}
          />
          {/* SVG annotation line */}
          <svg
            className="absolute top-1.5 left-3 w-16 h-10 overflow-visible"
            viewBox="0 0 64 40"
          >
            <motion.path
              d="M 0 0 C 20 0 40 -20 64 -20"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="80"
              initial={{ strokeDashoffset: 80, opacity: 0 }}
              animate={inView ? { strokeDashoffset: 0, opacity: 0.8 } : {}}
              transition={{ delay: card.delay + 0.7, duration: 0.6 }}
            />
          </svg>
          {/* Label tag */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: card.delay + 0.9, duration: 0.4 }}
            className="absolute top-[-28px] left-[68px] bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm whitespace-nowrap"
            style={{ color: card.color, border: `1px solid ${card.color}30` }}
          >
            {card.label}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="font-display text-base font-semibold text-[#1A1A1A] mb-2 italic">
          "{card.annotation}"
        </p>
        <p className="text-sm text-[#6B7280] leading-relaxed">{card.detail}</p>

        <div
          className="mt-4 h-0.5 rounded-full opacity-30"
          style={{ background: `linear-gradient(90deg, ${card.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

export default function TinyThingsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section className="py-28 bg-[#FAFAF7] relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]"
          style={{ background: 'radial-gradient(circle, rgba(232,245,239,0.8) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2D9B6F] mb-4"
          >
            What PetPulse sees
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.1] mb-6"
          >
            The tiny things
            <br />
            <em className="font-display not-italic gradient-text">that matter most</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#6B7280] max-w-xl mx-auto font-display italic font-light"
          >
            "Most health changes whisper before they shout."
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <AnnotationCard key={i} card={card} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-[#6B7280] text-sm">
            PetPulse detects <span className="font-semibold text-[#2D9B6F]">40+ early indicators</span> from everyday photos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
