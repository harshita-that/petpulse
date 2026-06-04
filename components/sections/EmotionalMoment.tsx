"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { EMOTIONAL_CONTENT } from "@/lib/constants";

/* ── deterministic floating particles ────────────── */

const PARTICLES = [
  { x: 12, y: 18, size: 4, dx: 14, dy: -20, delay: 0 },
  { x: 85, y: 25, size: 3, dx: -10, dy: 18, delay: 0.6 },
  { x: 30, y: 72, size: 5, dx: 18, dy: -12, delay: 1.2 },
  { x: 72, y: 80, size: 3, dx: -16, dy: -22, delay: 0.3 },
  { x: 50, y: 10, size: 4, dx: 12, dy: 24, delay: 0.9 },
  { x: 8, y: 55, size: 3, dx: 20, dy: 10, delay: 1.5 },
  { x: 92, y: 58, size: 4, dx: -14, dy: -16, delay: 0.45 },
  { x: 55, y: 90, size: 3, dx: -8, dy: -26, delay: 1.1 },
] as const;

/* ── EmotionalMoment section ─────────────────────── */

export default function EmotionalMoment() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* z-0 — background image */}
      <Image
        src={EMOTIONAL_CONTENT.bgImage}
        alt=""
        fill
        className="object-cover img-warm"
        sizes="100vw"
        priority={false}
        style={{ zIndex: 0 }}
      />

      {/* z-10 — dark overlay */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 10, background: "rgba(0,0,0,0.50)" }}
      />

      {/* z-20 — floating particles */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: "rgba(255,255,255,0.20)",
            }}
            animate={{
              x: [0, p.dx, 0],
              y: [0, p.dy, 0],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* z-30 — center text */}
      <div
        className="relative px-6 max-w-3xl mx-auto text-center"
        style={{ zIndex: 30 }}
      >
        {/* Line 1 */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-tight"
          style={{ color: "#FFFFFF" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {EMOTIONAL_CONTENT.line1}
        </motion.h2>

        {/* Line 2, delayed 0.4 s */}
        <motion.p
          className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-tight"
          style={{ color: "rgba(255,255,255,0.80)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        >
          {EMOTIONAL_CONTENT.line2}
        </motion.p>
      </div>
    </section>
  );
}
