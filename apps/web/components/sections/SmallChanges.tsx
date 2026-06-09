"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { SMALL_CHANGES_CONTENT } from "@/lib/constants";
import FadeUp from "@/components/motion/FadeUp";

/* ──────────────────────────────────────────────
   Deterministic SVG annotation data per card.
   Each entry describes a line from a region in
   the image down to a small circle marker, plus
   the annotation label offset.
   ────────────────────────────────────────────── */
const ANNOTATIONS: Record<
  string,
  { x1: number; y1: number; cx: number; cy: number; x2: number; y2: number }
> = {
  eyes: { x1: 52, y1: 38, cx: 52, cy: 38, x2: 78, y2: 72 },
  gums: { x1: 48, y1: 55, cx: 48, cy: 55, x2: 22, y2: 78 },
  posture: { x1: 55, y1: 62, cx: 55, cy: 62, x2: 80, y2: 82 },
};

function AnnotationSVG({ cardId }: { cardId: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const a = ANNOTATIONS[cardId] ?? ANNOTATIONS.eyes;

  return (
    <svg
      ref={ref}
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
    >
      {/* Animated annotation line */}
      <motion.line
        x1={a.x1}
        y1={a.y1}
        x2={a.x2}
        y2={a.y2}
        stroke="#2D9B6F"
        strokeWidth="0.6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
      />

      {/* Origin circle (on the area of interest) */}
      <motion.circle
        cx={a.cx}
        cy={a.cy}
        r="1.8"
        stroke="#2D9B6F"
        strokeWidth="0.5"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.circle
        cx={a.cx}
        cy={a.cy}
        r="0.8"
        fill="#2D9B6F"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
      />

      {/* End-point marker dot */}
      <motion.circle
        cx={a.x2}
        cy={a.y2}
        r="1.4"
        fill="#2D9B6F"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.4 }}
      />
    </svg>
  );
}

export default function SmallChanges() {
  return (
    <section
      id="features"
      className="py-24 md:py-32"
      style={{ backgroundColor: "#F3F0E8" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Section headline ── */}
        <FadeUp>
          <h2
            className="text-display-lg font-display text-center mb-16"
            style={{ color: "#1A1A1A" }}
          >
            Small changes matter
          </h2>
        </FadeUp>

        {/* ── Annotation cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SMALL_CHANGES_CONTENT.cards.map((card, index) => (
            <FadeUp key={card.id} delay={0.15 * index}>
              <div
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
                style={{ border: "1px solid #E8E4DA" }}
              >
                {/* Image container */}
                <div className="relative aspect-[4/3]">
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover img-warm"
                  />
                  {/* SVG annotation overlay */}
                  <AnnotationSVG cardId={card.id} />
                </div>

                {/* Annotation label */}
                <div
                  className="px-4 py-3 text-sm"
                  style={{ color: "#6B7280" }}
                >
                  {card.label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── Bottom quote ── */}
        <FadeUp delay={0.5}>
          <p
            className="text-display-md font-display text-center mt-16"
            style={{ color: "#1A1A1A" }}
          >
            {SMALL_CHANGES_CONTENT.headline}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
