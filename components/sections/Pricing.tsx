"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/motion/TextReveal";
import FadeIn from "@/components/motion/FadeIn";
import MagneticButton from "@/components/motion/MagneticButton";
import { PRICING_TIERS } from "@/lib/constants";
import { Check, Sparkles } from "lucide-react";

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="pricing" className="relative py-32 md:py-40 overflow-hidden section-dark">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] pointer-events-none"
        style={{ opacity: 0.1, background: "radial-gradient(ellipse, rgba(6,182,212,0.1) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: "#06b6d4" }} />
              <span className="text-xs uppercase" style={{ letterSpacing: "0.15em", color: "#94a3b8" }}>Pricing</span>
            </div>
          </FadeIn>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <TextReveal text="Simple, transparent pricing" delay={0.2} />
          </h2>
          <FadeIn delay={0.6}>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
              Start free. Upgrade when you need more power.
            </p>
          </FadeIn>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
          {PRICING_TIERS.map((tier, index) => (
            <FadeIn key={tier.name} delay={0.3 + index * 0.15} duration={0.8}>
              <div className={`group relative h-full ${tier.highlighted ? "md:-mt-4 md:mb-4" : ""}`}>
                {/* Animated border wrapper */}
                <div className="relative h-full rounded-2xl p-px overflow-hidden">
                  {/* Rotating gradient border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: tier.highlighted
                        ? "conic-gradient(from 0deg, #06b6d4, #8b5cf6, transparent, transparent, #06b6d4)"
                        : "conic-gradient(from 0deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03), rgba(255,255,255,0.08))",
                    }}
                    animate={isInView ? { rotate: 360 } : {}}
                    transition={{ duration: tier.highlighted ? 3 : 6, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Card body */}
                  <div className="relative h-full rounded-2xl backdrop-blur-sm p-6 lg:p-8 transition-all duration-500"
                    style={{
                      background: "#050816",
                      boxShadow: tier.highlighted ? "0 0 40px rgba(6,182,212,0.08)" : "none",
                    }}
                  >
                    {/* Popular badge */}
                    {tier.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-4 py-1 rounded-full text-[10px] font-semibold uppercase text-white"
                          style={{
                            letterSpacing: "0.1em",
                            background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                          }}
                        >
                          Most Popular
                        </span>
                      </div>
                    )}

                    <h3 className="text-lg font-semibold mb-2">{tier.name}</h3>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-sm" style={{ color: "#64748b" }}>/{tier.period}</span>
                    </div>
                    <p className="text-sm mb-8" style={{ color: "#94a3b8" }}>{tier.description}</p>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#06b6d4" }} />
                          <span className="text-sm" style={{ color: "#cbd5e1" }}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <MagneticButton variant={tier.highlighted ? "primary" : "secondary"} className="w-full">
                      {tier.cta}
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
