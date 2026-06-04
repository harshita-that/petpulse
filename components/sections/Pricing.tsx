"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { PRICING_TIERS } from "@/lib/constants";
import FadeUp from "@/components/motion/FadeUp";
import { Check, Sparkles } from "lucide-react";

/* ─── Shimmer keyframe injected once via style tag ─────────── */
const shimmerCSS = `
@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
`;

/* ─── Per-card cursor glow tracker ─────────────────────────── */
function PricingCard({
  tier,
  index,
}: {
  tier: (typeof PRICING_TIERS)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const [mouse, setMouse] = useState({ x: 0, y: 0, inside: false });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      inside: true,
    });
  };

  const handleMouseLeave = () => {
    setMouse((prev) => ({ ...prev, inside: false }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative bg-white rounded-2xl border shadow-sm p-6 lg:p-8 transition-all duration-300 cursor-default ${
        tier.highlighted
          ? "border-emerald-200 -translate-y-2"
          : "border-border"
      }`}
      style={{
        background: mouse.inside
          ? `radial-gradient(320px circle at ${mouse.x}px ${mouse.y}px, rgba(45,155,111,0.08), transparent 60%), #FFFFFF`
          : "#FFFFFF",
      }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        borderColor: "rgb(155, 212, 188)", // emerald-200
      }}
    >
      {/* ── Recommended badge with shimmer ── */}
      {tier.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span
            className="relative overflow-hidden inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide text-white"
            style={{ background: "#2D9B6F" }}
          >
            <Sparkles className="w-3 h-3" />
            Recommended
            {/* shimmer pseudo-element */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                animation: "shimmer 2.5s ease-in-out infinite",
              }}
            />
          </span>
        </div>
      )}

      {/* ── Tier name ── */}
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: "#1A1A1A" }}
      >
        {tier.name}
      </h3>

      {/* ── Price ── */}
      <div className="flex items-baseline gap-1 mb-1">
        <span
          className="text-4xl font-display font-bold"
          style={{ color: "#1A1A1A" }}
        >
          {tier.price}
        </span>
        <span className="text-sm" style={{ color: "#6B7280" }}>
          /{tier.period}
        </span>
      </div>

      {/* ── Description ── */}
      <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
        {tier.description}
      </p>

      {/* ── Features list ── */}
      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, fi) => (
          <motion.li
            key={feature}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: 0.15 + fi * 0.08,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            <Check
              className="w-4 h-4 flex-shrink-0"
              style={{ color: "#2D9B6F" }}
            />
            <span className="text-sm" style={{ color: "#1A1A1A" }}>
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* ── CTA button ── */}
      <motion.button
        className={`w-full py-3 px-5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
          tier.highlighted
            ? "text-white"
            : "border hover:bg-[#F3F0E8]"
        }`}
        style={
          tier.highlighted
            ? { background: "#2D9B6F", color: "#FFFFFF" }
            : { borderColor: "#E8E4DA", color: "#1A1A1A" }
        }
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {tier.cta}
      </motion.button>
    </motion.div>
  );
}

/* ─── Main Pricing Section ─────────────────────────────────── */
export default function Pricing() {
  return (
    <>
      {/* inject shimmer keyframe */}
      <style>{shimmerCSS}</style>

      <section
        id="pricing"
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "#FAFAF7" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* ── Header ── */}
          <FadeUp>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-display text-center mb-4"
              style={{ color: "#1A1A1A" }}
            >
              Simple, transparent pricing
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p
              className="text-center text-lg max-w-lg mx-auto mb-16"
              style={{ color: "#6B7280" }}
            >
              Start free. Upgrade when you need more power.
            </p>
          </FadeUp>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
            {PRICING_TIERS.map((tier, index) => (
              <FadeUp key={tier.name} delay={0.15 + index * 0.12}>
                <PricingCard tier={tier} index={index} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
