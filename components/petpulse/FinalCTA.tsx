'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import PawIcon from './PawIcon';

const pawPositions = [
  { x: '5%', y: '15%', size: 22, opacity: 0.08, rotate: -20, delay: 0 },
  { x: '15%', y: '70%', size: 18, opacity: 0.06, rotate: 15, delay: 0.3 },
  { x: '80%', y: '20%', size: 24, opacity: 0.07, rotate: 30, delay: 0.6 },
  { x: '90%', y: '65%', size: 16, opacity: 0.05, rotate: -10, delay: 0.9 },
  { x: '50%', y: '85%', size: 20, opacity: 0.06, rotate: 5, delay: 1.2 },
  { x: '35%', y: '10%', size: 14, opacity: 0.04, rotate: -35, delay: 0.4 },
  { x: '65%', y: '80%', size: 26, opacity: 0.05, rotate: 20, delay: 0.8 },
];

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section ref={ref} className="py-28 bg-[#FAFAF7] relative overflow-hidden">
      {/* Floating paw prints */}
      {pawPositions.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: p.opacity, scale: 1 } : {}}
          transition={{ delay: p.delay + 0.5, duration: 0.6 }}
          className="absolute select-none pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <PawIcon className="w-full h-full text-[#2D9B6F]" />
        </motion.div>
      ))}

      {/* Warm bg glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]"
          style={{ background: 'radial-gradient(circle, rgba(232,245,239,0.5) 0%, rgba(243,240,232,0.3) 50%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#E8F5EF] mb-8 mx-auto"
        >
          <Heart className="w-8 h-8 text-[#2D9B6F] fill-[#2D9B6F] animate-heartbeat" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.1] mb-6"
        >
          Start noticing the things
          <br />
          <em className="font-display not-italic gradient-text">you normally miss</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#6B7280] text-xl leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Join 12,000+ pet parents who check in on their furry family members every week.
          First scan is always free.
        </motion.p>

        {/* Email form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <div
                className={`flex-1 relative transition-all duration-300 rounded-2xl ${
                  focused
                    ? 'shadow-[0_0_0_3px_rgba(45,155,111,0.2)]'
                    : 'shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
                }`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-5 py-4 rounded-2xl border-2 border-[#E8E4DA] bg-white text-[#1A1A1A] placeholder:text-[#6B7280] outline-none text-base transition-all duration-300 focus:border-[#2D9B6F]"
                />
              </div>
              <button
                type="submit"
                className="btn-breathe inline-flex items-center gap-2 px-7 py-4 bg-[#F4845F] text-white font-semibold rounded-2xl hover:bg-[#F16A41] transition-colors duration-200 text-base whitespace-nowrap"
              >
                Try Petpulse
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-8 py-5 bg-[#E8F5EF] rounded-2xl border border-[#C5E8D8]"
            >
              <Heart className="w-5 h-5 text-[#2D9B6F] fill-[#2D9B6F]" />
              <p className="text-[#2D9B6F] font-semibold">
                You are in! Check your inbox for next steps.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center justify-center gap-6 mt-8"
        >
          {['No credit card', 'Free forever tier', 'Cancel anytime'].map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-xs text-[#6B7280]">
              <div className="w-1 h-1 rounded-full bg-[#2D9B6F]" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
