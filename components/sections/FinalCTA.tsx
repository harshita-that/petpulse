"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FINAL_CTA_CONTENT } from "@/lib/constants";
import FadeUp from "@/components/motion/FadeUp";
import { ArrowRight, Lock, Check, Loader2 } from "lucide-react";

/* ─── Types ────────────────────────────────────────────────── */
type FormState = "idle" | "valid" | "submitting" | "submitted";

/* ─── Deterministic paw-print particles (12 total) ─────────  */
const PAW_PARTICLES = [
  { x: 8, y: 12, size: 22, rotate: 15, duration: 14, color: "#F4845F" },
  { x: 88, y: 18, size: 18, rotate: -30, duration: 16, color: "#2D9B6F" },
  { x: 15, y: 75, size: 26, rotate: 45, duration: 18, color: "#2D9B6F" },
  { x: 82, y: 80, size: 20, rotate: -15, duration: 13, color: "#F4845F" },
  { x: 50, y: 5, size: 24, rotate: 60, duration: 15, color: "#F4845F" },
  { x: 35, y: 90, size: 16, rotate: -45, duration: 17, color: "#2D9B6F" },
  { x: 5, y: 45, size: 20, rotate: 25, duration: 19, color: "#F4845F" },
  { x: 92, y: 50, size: 22, rotate: -60, duration: 14, color: "#2D9B6F" },
  { x: 25, y: 30, size: 14, rotate: 10, duration: 16, color: "#2D9B6F" },
  { x: 72, y: 35, size: 28, rotate: -20, duration: 18, color: "#F4845F" },
  { x: 60, y: 85, size: 18, rotate: 35, duration: 15, color: "#2D9B6F" },
  { x: 42, y: 55, size: 16, rotate: -40, duration: 13, color: "#F4845F" },
];

/* ─── Deterministic celebration paw-scatter (15 total) ────── */
const SCATTER_ANGLES = [
  -80, -65, -50, -35, -20, -10, 0, 10, 20, 35, 50, 65, 80, -70, -55,
];
const SCATTER_DISTANCES = [
  120, 140, 100, 160, 110, 130, 150, 105, 145, 125, 155, 135, 115, 140, 120,
];
const SCATTER_SIZES = [14, 12, 16, 10, 14, 12, 16, 10, 14, 12, 16, 10, 14, 12, 16];

/* ─── Paw print SVG path ──────────────────────────────────── */
function PawIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="8" cy="6" rx="2.5" ry="3" />
      <ellipse cx="16" cy="6" rx="2.5" ry="3" />
      <ellipse cx="4.5" cy="12" rx="2" ry="2.5" />
      <ellipse cx="19.5" cy="12" rx="2" ry="2.5" />
      <path d="M12 22c-4 0-7-3.5-7-6s1.5-4 3.5-4c1.2 0 2.3.6 3.5.6s2.3-.6 3.5-.6c2 0 3.5 1.5 3.5 4s-3 6-7 6z" />
    </svg>
  );
}

/* ─── Simple email regex ──────────────────────────────────── */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ─── Main Component ──────────────────────────────────────── */
export default function FinalCTA() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const emailIsValid = isValidEmail(email);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      if (isValidEmail(value)) {
        setFormState("valid");
      } else {
        setFormState("idle");
      }
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailIsValid) return;
    setFormState("submitting");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormState("submitted");
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#F3F0E8" }}
    >
      {/* ── Floating paw particles ── */}
      {PAW_PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0.04,
            rotate: p.rotate,
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, i % 2 === 0 ? 8 : -8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <PawIcon size={p.size} color={p.color} />
        </motion.div>
      ))}

      {/* ── Center content ── */}
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
        {/* Headline */}
        <FadeUp>
          <h2
            className="text-3xl sm:text-4xl md:text-[2.75rem] leading-tight font-display mb-8"
            style={{ color: "#1A1A1A" }}
          >
            {FINAL_CTA_CONTENT.headline}
          </h2>
        </FadeUp>

        {/* ── Email Form / Submitted state ── */}
        <FadeUp delay={0.15}>
          <AnimatePresence mode="wait">
            {formState === "submitted" ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative py-6"
              >
                <motion.p
                  className="text-xl font-display font-semibold"
                  style={{ color: "#2D9B6F" }}
                >
                  You&apos;re on the list 🐾
                </motion.p>

                {/* ── Celebration paw scatter ── */}
                {SCATTER_ANGLES.map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const dist = SCATTER_DISTANCES[i];
                  const targetX = dist * Math.sin(rad);
                  const targetY = -dist * Math.cos(rad); // upward
                  return (
                    <motion.div
                      key={i}
                      className="absolute pointer-events-none"
                      style={{
                        left: "50%",
                        top: "50%",
                        marginLeft: -SCATTER_SIZES[i] / 2,
                        marginTop: -SCATTER_SIZES[i] / 2,
                      }}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                      animate={{
                        x: targetX,
                        y: targetY,
                        opacity: 0,
                        scale: 1.2,
                        rotate: angle * 2,
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.04,
                        ease: "easeOut",
                      }}
                    >
                      <PawIcon
                        size={SCATTER_SIZES[i]}
                        color={i % 2 === 0 ? "#F4845F" : "#2D9B6F"}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              /* ── Email form ── */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                {/* Input wrapper */}
                <div className="relative flex-1 w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={FINAL_CTA_CONTENT.placeholder}
                    required
                    className="w-full px-5 py-3.5 pr-11 rounded-full text-sm outline-none transition-all duration-300"
                    style={{
                      background: "#FFFFFF",
                      color: "#1A1A1A",
                      border: `1.5px solid ${
                        formState === "valid"
                          ? "#2D9B6F"
                          : isFocused
                          ? "#2D9B6F"
                          : "#E8E4DA"
                      }`,
                      boxShadow:
                        isFocused
                          ? "0 0 0 3px rgba(45,155,111,0.1)"
                          : "none",
                    }}
                  />

                  {/* Lock / Check icon on right edge */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <AnimatePresence mode="wait">
                      {formState === "valid" ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                          }}
                        >
                          <Check
                            className="w-4 h-4"
                            style={{ color: "#2D9B6F" }}
                          />
                        </motion.div>
                      ) : isFocused ? (
                        <motion.div
                          key="lock"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.4 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Lock
                            className="w-4 h-4"
                            style={{ color: "#6B7280" }}
                          />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={formState === "submitting" || !emailIsValid}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "#F4845F", color: "#FFFFFF" }}
                  whileHover={
                    emailIsValid
                      ? {
                          scale: 1.03,
                          boxShadow: "0 4px 20px rgba(244,132,95,0.35)",
                        }
                      : {}
                  }
                  whileTap={emailIsValid ? { scale: 0.97 } : {}}
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
              </motion.form>
            )}
          </AnimatePresence>
        </FadeUp>

        {/* ── Disclaimer ── */}
        <FadeUp delay={0.25}>
          <p className="text-xs mt-4" style={{ color: "#6B7280" }}>
            {FINAL_CTA_CONTENT.disclaimer}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
