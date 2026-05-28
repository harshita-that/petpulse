"use client";

import TextReveal from "@/components/motion/TextReveal";
import { EMOTIONAL_CONTENT } from "@/lib/constants";

/* Deterministic particle positions — no Math.random() to avoid hydration mismatch */
const ambientDots = [
  { top: "25%", left: "15%", delay: "0s", duration: "8s" },
  { top: "40%", left: "75%", delay: "1.5s", duration: "10s" },
  { top: "65%", left: "30%", delay: "3s", duration: "12s" },
  { top: "35%", left: "85%", delay: "4.5s", duration: "14s" },
  { top: "70%", left: "55%", delay: "6s", duration: "16s" },
  { top: "50%", left: "45%", delay: "7.5s", duration: "18s" },
];

export default function EmotionalAnchor() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#050816" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          opacity: 0.07,
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.1) 40%, transparent 70%)",
        }}
      />

      {/* Floating ambient dots — deterministic positions */}
      {ambientDots.map((dot, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full animate-drift"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            top: dot.top,
            left: dot.left,
            animationDelay: dot.delay,
            animationDuration: dot.duration,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-32">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight tracking-tight">
          <TextReveal
            text={EMOTIONAL_CONTENT.line1}
            delay={0.2}
            duration={1}
            stagger={0.06}
          />
        </h2>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight tracking-tight mt-2"
          style={{ color: "#cbd5e1" }}
        >
          <TextReveal
            text={EMOTIONAL_CONTENT.line2}
            delay={0.8}
            duration={1}
            stagger={0.06}
          />
        </h2>
      </div>
    </section>
  );
}
