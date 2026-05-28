"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TextReveal from "@/components/motion/TextReveal";
import FadeIn from "@/components/motion/FadeIn";
import { FINAL_CTA_CONTENT } from "@/lib/constants";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

type FormState = "idle" | "submitting" | "submitted";

export default function FinalCTA() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setFormState("submitting");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormState("submitted");
  };

  return (
    <section id="cta" className="relative py-32 md:py-40 overflow-hidden" style={{ background: "#050816" }}>
      {/* Ambient gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          opacity: 0.06,
          background: "radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-6">
          <TextReveal text={FINAL_CTA_CONTENT.headline} delay={0.2} duration={0.8} stagger={0.05} />
        </h2>

        <FadeIn delay={0.8}>
          <p className="text-lg mb-12" style={{ color: "#94a3b8" }}>
            {FINAL_CTA_CONTENT.subtext}
          </p>
        </FadeIn>

        <FadeIn delay={1} duration={0.8}>
          {formState === "submitted" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 py-4"
            >
              <CheckCircle2 className="w-5 h-5" style={{ color: "#34d399" }} />
              <span className="text-lg" style={{ color: "#34d399" }}>
                You&apos;re on the list! We&apos;ll be in touch.
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <div className="relative flex-1 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={FINAL_CTA_CONTENT.placeholder}
                  required
                  className="w-full px-5 py-3.5 rounded-full text-white text-sm outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(12px)",
                  }}
                />
              </div>
              <motion.button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-white text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-70"
                style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6,182,212,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                {formState === "submitting" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {FINAL_CTA_CONTENT.cta}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          )}
        </FadeIn>
      </div>

      {/* Footer */}
      <FadeIn delay={1.2} duration={1}>
        <footer className="relative z-10 max-w-4xl mx-auto px-6 mt-32 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#06b6d4" }} />
              <span className="text-sm font-semibold">PetPulse</span>
            </div>
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Twitter", "GitHub"].map((link) => (
                <a key={link} href="#" className="text-xs transition-colors duration-300"
                  style={{ color: "#64748b" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                >
                  {link}
                </a>
              ))}
            </div>
            <p className="text-xs" style={{ color: "#475569" }}>
              © 2025 PetPulse. All rights reserved.
            </p>
          </div>
        </footer>
      </FadeIn>
    </section>
  );
}
