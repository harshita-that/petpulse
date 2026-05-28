"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/motion/TextReveal";
import FadeIn from "@/components/motion/FadeIn";
import { TIMELINE_DATA } from "@/lib/constants";
import { Activity, TrendingDown } from "lucide-react";

const scoreStyle = (score: number) => {
  if (score >= 90) return { color: "#34d399", bg: "rgba(52,211,153,0.15)", dot: "#34d399" };
  if (score >= 80) return { color: "#facc15", bg: "rgba(250,204,21,0.15)", dot: "#facc15" };
  return { color: "#fb923c", bg: "rgba(251,146,60,0.15)", dot: "#fb923c" };
};

export default function HealthTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="timeline" className="relative py-32 md:py-40 overflow-hidden section-dark">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
            >
              <TrendingDown className="w-3.5 h-3.5" style={{ color: "#06b6d4" }} />
              <span className="text-xs uppercase" style={{ letterSpacing: "0.15em", color: "#94a3b8" }}>
                Health monitoring
              </span>
            </div>
          </FadeIn>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <TextReveal text="Track changes over time" delay={0.2} />
          </h2>
          <FadeIn delay={0.6}>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#94a3b8" }}>
              Watch how PetPulse tracks subtle health shifts week by week, alerting you before problems escalate.
            </p>
          </FadeIn>
        </div>

        {/* Timeline Cards */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0">
            <motion.div className="h-full"
              style={{ background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.3) 20%, rgba(139,92,246,0.3) 80%, transparent 100%)" }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TIMELINE_DATA.map((item, index) => {
              const style = scoreStyle(item.score);
              return (
                <FadeIn key={item.week} delay={0.3 + index * 0.2} duration={0.8}>
                  <motion.div className="group relative" style={{ perspective: "1000px" }}>
                    <motion.div
                      className="relative rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-500"
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.02)",
                        transformStyle: "preserve-3d",
                      }}
                      whileHover={{ rotateY: 0, scale: 1.02 }}
                      initial={{ rotateY: index === 0 ? -3 : index === 2 ? 3 : 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="p-6 lg:p-8">
                        {/* Week + dot */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-mono uppercase" style={{ letterSpacing: "0.15em", color: "#06b6d4" }}>
                            {item.week}
                          </span>
                          <div className="w-2 h-2 rounded-full" style={{ background: style.dot }} />
                        </div>

                        {/* Score */}
                        <div className="mb-4">
                          <div className="inline-flex items-baseline gap-1 px-3 py-1.5 rounded-xl"
                            style={{ background: style.bg }}
                          >
                            <span className="text-3xl font-bold" style={{ color: style.color }}>
                              {item.score}
                            </span>
                            <span className="text-xs" style={{ color: "#64748b" }}>/100</span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>{item.description}</p>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(item.metrics).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                            >
                              <Activity className="w-3 h-3" style={{ color: "#64748b" }} />
                              <div>
                                <p className="text-[10px] capitalize" style={{ color: "#475569" }}>{key}</p>
                                <p className="text-xs" style={{ color: "#cbd5e1" }}>{value}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Highlight */}
                        <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: style.dot }} />
                          <span className="text-xs font-mono" style={{ color: "#94a3b8" }}>
                            {item.highlight}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
