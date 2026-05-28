"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/motion/TextReveal";
import FadeIn from "@/components/motion/FadeIn";
import MagneticButton from "@/components/motion/MagneticButton";
import ParticleField from "@/components/motion/ParticleField";
import { HERO_CONTENT } from "@/lib/constants";
import { ChevronDown } from "lucide-react";

/* Deterministic orb dot positions (pre-calculated) */
const orbDots = [
  { top: "10%", left: "50%", color: "rgba(6,182,212,0.6)", shadow: "0 0 8px rgba(6,182,212,0.4)", delay: 0 },
  { top: "50%", left: "90%", color: "rgba(139,92,246,0.5)", shadow: "0 0 8px rgba(139,92,246,0.3)", delay: 0.3 },
  { top: "90%", left: "50%", color: "rgba(6,182,212,0.6)", shadow: "0 0 8px rgba(6,182,212,0.4)", delay: 0.6 },
  { top: "50%", left: "10%", color: "rgba(139,92,246,0.5)", shadow: "0 0 8px rgba(139,92,246,0.3)", delay: 0.9 },
  { top: "15%", left: "85%", color: "rgba(6,182,212,0.6)", shadow: "0 0 8px rgba(6,182,212,0.4)", delay: 1.2 },
  { top: "85%", left: "15%", color: "rgba(139,92,246,0.5)", shadow: "0 0 8px rgba(139,92,246,0.3)", delay: 1.5 },
  { top: "30%", left: "5%", color: "rgba(6,182,212,0.6)", shadow: "0 0 8px rgba(6,182,212,0.4)", delay: 1.8 },
  { top: "70%", left: "95%", color: "rgba(139,92,246,0.5)", shadow: "0 0 8px rgba(139,92,246,0.3)", delay: 2.1 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#050816" }}
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #050816 0%, #0B1120 40%, #050816 100%)",
          }}
        />

        {/* Ambient glow - cyan */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            opacity: 0.2,
            background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.05) 30%, transparent 70%)",
          }}
        />

        {/* Ambient glow - purple */}
        <div
          className="absolute rounded-full"
          style={{
            top: "33%",
            right: "25%",
            width: "600px",
            height: "600px",
            opacity: 0.15,
            background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Particle field */}
        <ParticleField
          particleCount={50}
          color="6, 182, 212"
          speed={0.2}
          connectDistance={80}
        />
      </div>

      {/* 3D Orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ y: orbY, scale: orbScale }}
      >
        <div className="relative" style={{ width: "min(600px, 80vw)", height: "min(600px, 80vw)" }}>
          {/* Core orb glow */}
          <div
            className="absolute rounded-full animate-pulse-glow"
            style={{
              inset: "15%",
              background: "radial-gradient(circle at 40% 40%, rgba(6,182,212,0.08) 0%, rgba(139,92,246,0.04) 50%, transparent 70%)",
              boxShadow: "0 0 80px rgba(6,182,212,0.1), 0 0 160px rgba(139,92,246,0.05), inset 0 0 60px rgba(6,182,212,0.05)",
            }}
          />

          {/* Inner glow ring */}
          <div
            className="absolute rounded-full"
            style={{
              inset: "20%",
              border: "1px solid rgba(6,182,212,0.15)",
              boxShadow: "0 0 30px rgba(6,182,212,0.08), inset 0 0 30px rgba(6,182,212,0.03)",
            }}
          />

          {/* Ring 1 */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ border: "1px solid rgba(6,182,212,0.12)" }}
          />

          {/* Ring 2 */}
          <motion.div
            className="absolute rounded-full"
            style={{ inset: "10%", border: "1px solid rgba(139,92,246,0.1)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          {/* Ring 3 - tilted */}
          <motion.div
            className="absolute rounded-full"
            style={{ inset: "5%", border: "1px solid rgba(6,182,212,0.08)", transform: "rotateX(60deg)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />

          {/* Ring 4 - tilted opposite */}
          <motion.div
            className="absolute rounded-full"
            style={{ inset: "8%", border: "1px solid rgba(139,92,246,0.08)", transform: "rotateY(60deg)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating dots */}
          {orbDots.map((dot, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: dot.color,
                boxShadow: dot.shadow,
                top: dot.top,
                left: dot.left,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dot.delay,
              }}
            />
          ))}

          {/* Scan pulse rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute rounded-full"
              style={{ inset: "25%", border: "1px solid rgba(6,182,212,0.2)" }}
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i, ease: "easeOut" }}
            />
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        style={{ opacity: textOpacity }}
      >
        {/* Brand */}
        <FadeIn delay={0.2} duration={1}>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse-glow" />
            <span
              className="text-sm font-medium"
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "#06b6d4",
              }}
            >
              {HERO_CONTENT.brand}
            </span>
          </div>
        </FadeIn>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8"
          style={{ lineHeight: 1.05 }}
        >
          <TextReveal
            text={HERO_CONTENT.headline}
            delay={0.5}
            duration={0.7}
            stagger={0.06}
          />
        </h1>

        {/* Subtext */}
        <FadeIn delay={1.2} duration={1} blur>
          <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12"
            style={{ color: "#94a3b8" }}
          >
            {HERO_CONTENT.subtext}
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={1.6} duration={0.8}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton variant="primary" href="#pricing">
              {HERO_CONTENT.cta.primary}
            </MagneticButton>
            <MagneticButton variant="secondary" href="#scan-demo">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              {HERO_CONTENT.cta.secondary}
            </MagneticButton>
          </div>
        </FadeIn>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase" style={{ letterSpacing: "0.2em", color: "#475569" }}>
            Scroll
          </span>
          <ChevronDown className="w-4 h-4" style={{ color: "#475569" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
