"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/motion/TextReveal";
import FadeIn from "@/components/motion/FadeIn";
import { SMALL_CHANGES_CONTENT } from "@/lib/constants";
import { AlertTriangle, Eye, Heart, Sparkles } from "lucide-react";

const severityConfig: Record<string, { color: string; bg: string; border: string }> = {
  mild: { color: "#facc15", bg: "rgba(250,204,21,0.1)", border: "rgba(250,204,21,0.2)" },
  moderate: { color: "#fb923c", bg: "rgba(251,146,60,0.1)", border: "rgba(251,146,60,0.2)" },
  early: { color: "#06b6d4", bg: "rgba(6,182,212,0.1)", border: "rgba(6,182,212,0.2)" },
};

const icons: Record<string, React.ReactNode> = {
  eyes: <Eye className="w-5 h-5" />,
  gums: <Heart className="w-5 h-5" />,
  coat: <Sparkles className="w-5 h-5" />,
};

const meterWidth: Record<string, string> = {
  moderate: "65%",
  mild: "35%",
  early: "20%",
};

export default function SmallChanges() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-32 md:py-40 overflow-hidden section-dark"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] pointer-events-none"
        style={{ opacity: 0.1, background: "radial-gradient(ellipse, rgba(6,182,212,0.15) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn delay={0} duration={0.8}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
            >
              <AlertTriangle className="w-3.5 h-3.5" style={{ color: "#06b6d4" }} />
              <span className="text-xs uppercase" style={{ letterSpacing: "0.15em", color: "#94a3b8" }}>
                Why early detection matters
              </span>
            </div>
          </FadeIn>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <TextReveal text={SMALL_CHANGES_CONTENT.headline} delay={0.2} />
          </h2>

          <FadeIn delay={0.6} duration={0.8}>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#94a3b8" }}>
              {SMALL_CHANGES_CONTENT.subtext}
            </p>
          </FadeIn>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SMALL_CHANGES_CONTENT.comparisons.map((comparison, index) => {
            const severity = severityConfig[comparison.severity];
            return (
              <FadeIn key={comparison.id} delay={0.3 + index * 0.15} duration={0.8}>
                <div className="group relative h-full">
                  <div
                    className="relative h-full rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    {/* Scan line */}
                    <motion.div
                      className="absolute left-0 right-0 h-px z-10 pointer-events-none"
                      style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.6) 50%, transparent 100%)",
                        boxShadow: "0 0 10px rgba(6,182,212,0.3), 0 0 20px rgba(6,182,212,0.1)",
                      }}
                      animate={isInView ? { top: ["-2%", "102%"] } : {}}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index }}
                    />

                    <div className="p-6 lg:p-8">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg" style={{ background: "rgba(6,182,212,0.1)", color: "#06b6d4" }}>
                            {icons[comparison.id]}
                          </div>
                          <h3 className="font-semibold text-lg">{comparison.label}</h3>
                        </div>
                        <span
                          className="text-[10px] uppercase px-2.5 py-1 rounded-full"
                          style={{
                            letterSpacing: "0.1em",
                            color: severity.color,
                            background: severity.bg,
                            border: `1px solid ${severity.border}`,
                          }}
                        >
                          {comparison.severity}
                        </span>
                      </div>

                      {/* Before/After */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#34d399" }} />
                            <span className="text-xs uppercase" style={{ letterSpacing: "0.1em", color: "#64748b" }}>Before</span>
                          </div>
                          <p className="text-sm pl-3.5" style={{ color: "#cbd5e1" }}>{comparison.before}</p>
                        </div>

                        <div className="relative h-px">
                          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#fb923c" }} />
                            <span className="text-xs uppercase" style={{ letterSpacing: "0.1em", color: "#64748b" }}>After</span>
                          </div>
                          <p className="text-sm pl-3.5" style={{ color: "rgba(251,146,60,0.8)" }}>{comparison.after}</p>
                        </div>
                      </div>

                      {/* Change meter */}
                      <div className="mb-4">
                        <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg, #06b6d4, #8b5cf6)" }}
                            initial={{ width: "0%" }}
                            animate={isInView ? { width: meterWidth[comparison.severity] || "30%" } : {}}
                            transition={{ duration: 1.5, delay: 0.8 + index * 0.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      {/* Annotation */}
                      <div
                        className="flex items-center gap-2 px-3 py-2 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                      >
                        <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: "#06b6d4" }} />
                        <span className="text-xs font-mono" style={{ color: "#64748b" }}>
                          {comparison.annotation}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
