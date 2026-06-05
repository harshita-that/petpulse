'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CheckCircle, Eye, Activity, Droplets, Smile } from 'lucide-react';

const PET_SCAN_URL = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&q=85&auto=format&fit=crop';

const insights = [
  { icon: Eye, label: 'Eye clarity', value: 'Normal', status: 'good', detail: 'No cloudiness detected', delay: 0.6 },
  { icon: Activity, label: 'Energy pattern', value: 'Active', status: 'good', detail: 'Movement matches baseline', delay: 0.85 },
  { icon: Droplets, label: 'Coat health', value: 'Excellent', status: 'good', detail: 'Shiny, well-moisturized', delay: 1.1 },
  { icon: Smile, label: 'Posture', value: 'Balanced', status: 'good', detail: 'No asymmetry detected', delay: 1.35 },
];

function HealthCounter({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span>{count}</span>;
}

export default function AIScanSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setScanning(true), 400);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section className="py-28 bg-[#F3F0E8] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]"
          style={{ background: 'radial-gradient(circle, rgba(232,245,239,0.6) 0%, transparent 70%)' }}
        />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Demo card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Phone/Card mockup */}
            <div className="relative mx-auto max-w-sm">
              {/* Device frame */}
              <div className="bg-[#1A1A1A] rounded-[2.5rem] p-2.5 shadow-[0_40px_100px_rgba(0,0,0,0.25)]">
                <div className="bg-white rounded-[2rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="bg-[#1A1A1A] px-6 py-3 flex items-center justify-between">
                    <span className="text-white text-xs font-medium">9:41</span>
                    <div className="w-24 h-6 bg-[#1A1A1A] rounded-full" />
                    <div className="flex gap-1">
                      <div className="w-4 h-2 bg-white/60 rounded-sm" />
                    </div>
                  </div>

                  {/* App header */}
                  <div className="px-4 py-3 flex items-center justify-between border-b border-[#E8E4DA]">
                    <span className="font-display font-semibold text-[#1A1A1A] text-sm">Health Scan</span>
                    <div className="w-6 h-6 rounded-full bg-[#2D9B6F] flex items-center justify-center">
                      <Activity className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Scan area */}
                  <div className="relative overflow-hidden">
                    <img
                      src={PET_SCAN_URL}
                      alt="AI pet scan"
                      className="w-full h-64 object-cover"
                    />

                    {/* Scan beam */}
                    {scanning && (
                      <motion.div
                        initial={{ top: '-5%', opacity: 0 }}
                        animate={{ top: ['0%', '105%'], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
                        className="absolute left-0 right-0 h-8 pointer-events-none"
                        style={{
                          background: 'linear-gradient(180deg, transparent 0%, rgba(45, 155, 111, 0.35) 40%, rgba(45, 155, 111, 0.5) 50%, rgba(45, 155, 111, 0.35) 60%, transparent 100%)',
                        }}
                      />
                    )}

                    {/* Annotation highlights */}
                    {scanning && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: [0, 1, 0.8], scale: [0.5, 1, 1] }}
                          transition={{ delay: 1.2, duration: 0.5 }}
                          className="absolute border-2 border-[#7EC8E3]/80 rounded-xl pointer-events-none"
                          style={{ left: '38%', top: '30%', width: '24%', height: '20%', boxShadow: '0 0 12px rgba(126,200,227,0.4)' }}
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: [0, 1, 0.7], scale: [0.5, 1, 1] }}
                          transition={{ delay: 1.6, duration: 0.5 }}
                          className="absolute border-2 border-[#2D9B6F]/80 rounded-xl pointer-events-none"
                          style={{ left: '20%', top: '55%', width: '35%', height: '25%', boxShadow: '0 0 12px rgba(45,155,111,0.4)' }}
                        />
                      </>
                    )}

                    {/* Overlay corner brackets */}
                    <div className="absolute inset-3 pointer-events-none">
                      {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                        <div key={i} className={`absolute ${pos} w-5 h-5`}>
                          <div
                            className="border-[#2D9B6F]/50"
                            style={{
                              width: '100%',
                              height: '100%',
                              borderTopWidth: i < 2 ? '2px' : '0',
                              borderBottomWidth: i >= 2 ? '2px' : '0',
                              borderLeftWidth: i % 2 === 0 ? '2px' : '0',
                              borderRightWidth: i % 2 === 1 ? '2px' : '0',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insights */}
                  <div className="p-4 space-y-2">
                    {insights.slice(0, 3).map((insight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: insight.delay, duration: 0.4 }}
                        className="flex items-center justify-between py-1.5"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#E8F5EF] flex items-center justify-center">
                            <insight.icon className="w-3 h-3 text-[#2D9B6F]" />
                          </div>
                          <span className="text-xs font-medium text-[#1A1A1A]">{insight.label}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-[#2D9B6F] font-semibold">{insight.value}</span>
                          <CheckCircle className="w-3.5 h-3.5 text-[#2D9B6F]" />
                        </div>
                      </motion.div>
                    ))}

                    {/* Health score */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.6, duration: 0.5 }}
                      className="mt-3 pt-3 border-t border-[#E8E4DA] flex items-center justify-between"
                    >
                      <span className="text-sm font-semibold text-[#1A1A1A]">Health Score</span>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-display font-bold text-[#2D9B6F]">
                          <HealthCounter target={94} inView={inView} />
                          <span className="text-sm">%</span>
                        </div>
                        <div className="text-xs px-2 py-0.5 bg-[#E8F5EF] text-[#2D9B6F] rounded-full font-semibold">
                          Excellent
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.8, duration: 0.5 }}
                className="absolute -right-8 top-24 bg-white rounded-2xl p-3 shadow-lg border border-[#E8E4DA] flex items-center gap-2"
              >
                <span className="text-lg">🤖</span>
                <div>
                  <p className="text-xs font-semibold text-[#1A1A1A]">AI Analysis</p>
                  <p className="text-[10px] text-[#6B7280]">Powered by GPT-4V</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2D9B6F] mb-4">
                The tech behind the care
              </span>
              <h2 className="font-display text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.1] mb-6">
                A caring AI,{' '}
                <em className="font-display not-italic gradient-text">not</em>
                <br />
                a cold scanner
              </h2>
              <p className="text-[#6B7280] text-lg leading-relaxed">
                Just take a photo of your pet. PetPulse gently analyzes it for 40+ health indicators —
                then gives you clear, plain-English insights.
              </p>
            </div>

            <div className="space-y-5">
              {[
                { num: '01', title: 'Snap a photo', desc: 'Use any photo you already have on your phone. No special equipment needed.' },
                { num: '02', title: 'AI analysis', desc: 'Our model checks eyes, coat, posture, energy signals, and more in seconds.' },
                { num: '03', title: 'Plain-English report', desc: 'No jargon. Just clear insights and when to call your vet.' },
              ].map(({ num, title, desc }) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + parseInt(num) * 0.15, duration: 0.5 }}
                  className="flex gap-5 items-start group"
                >
                  <span className="font-display text-3xl font-bold text-[#E8E4DA] group-hover:text-[#2D9B6F]/20 transition-colors duration-300 leading-none pt-1">
                    {num}
                  </span>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] mb-1">{title}</p>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="btn-breathe inline-flex items-center gap-2 px-7 py-4 bg-[#2D9B6F] text-white font-semibold rounded-full hover:bg-[#247B58] transition-colors duration-200"
            >
              Try your first scan free
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
