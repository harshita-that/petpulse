'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, AlertCircle, CheckCircle, Calendar } from 'lucide-react';

const timelineData = [
  {
    week: 'Week 1',
    label: 'Baseline established',
    score: 78,
    status: 'baseline',
    note: 'Initial scan complete. Slight lethargy noted.',
    photo: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=200&q=80&auto=format&fit=crop',
    icon: Calendar,
    color: '#7EC8E3',
    delay: 0,
  },
  {
    week: 'Week 4',
    label: 'Alert detected',
    score: 71,
    status: 'alert',
    note: 'Reduced appetite & coat dullness. Vet visit recommended.',
    photo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&q=80&auto=format&fit=crop',
    icon: AlertCircle,
    color: '#F4845F',
    delay: 0.2,
  },
  {
    week: 'Week 8',
    label: 'Full recovery',
    score: 94,
    status: 'excellent',
    note: 'Post-treatment check-in. Energy & coat fully restored.',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&q=80&auto=format&fit=crop',
    icon: CheckCircle,
    color: '#2D9B6F',
    delay: 0.4,
  },
];

export default function HealthTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-28 bg-[#FAFAF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2D9B6F] mb-4"
          >
            Health over time
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.1] mb-4"
          >
            A living record of{' '}
            <em className="font-display not-italic gradient-text">wellness</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#6B7280] max-w-md mx-auto"
          >
            PetPulse builds a health timeline so you can spot trends before your vet does.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-24 left-[16.6%] right-[16.6%] h-0.5 bg-[#E8E4DA]">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full origin-left rounded-full"
              style={{ background: 'linear-gradient(90deg, #7EC8E3, #F4845F, #2D9B6F)' }}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {timelineData.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.week}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 + item.delay }}
                  className="group relative bg-white rounded-3xl p-6 border border-[#E8E4DA] shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 tilt-card"
                  onMouseMove={(e) => {
                    const el = e.currentTarget;
                    const rect = el.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(6px)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
                  }}
                >
                  {/* Week indicator + dot */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase">
                      {item.week}
                    </span>
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: item.color + '20' }}
                    >
                      <Icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                  </div>

                  {/* Photo */}
                  <div className="w-full h-32 rounded-2xl overflow-hidden mb-5">
                    <img
                      src={item.photo}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Score */}
                  <div className="flex items-end gap-2 mb-2">
                    <span className="font-display text-4xl font-bold" style={{ color: item.color }}>
                      {item.score}
                    </span>
                    <span className="text-sm text-[#6B7280] font-medium pb-1">/100</span>
                    <TrendingUp
                      className="w-4 h-4 pb-1 ml-auto"
                      style={{ color: item.score >= 80 ? '#2D9B6F' : item.score >= 70 ? '#F4845F' : '#6B7280' }}
                    />
                  </div>

                  {/* Label */}
                  <p className="font-semibold text-[#1A1A1A] mb-1">{item.label}</p>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{item.note}</p>

                  {/* Bottom color accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl opacity-60"
                    style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}40)` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
