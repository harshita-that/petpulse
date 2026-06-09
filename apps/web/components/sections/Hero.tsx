"use client";

import { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import FadeUp from "@/components/motion/FadeUp";
import HealthChip from "@/components/ui/HealthChip";
import { HERO_CONTENT, BREED_MARQUEE } from "@/lib/constants";

/* ─── Deterministic floating particles ───────────────────── */
const PARTICLES: {
  top: string;
  left: string;
  shape: "paw" | "heart" | "bone";
  color: string;
  size: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
}[] = [
  { top: "8%", left: "5%", shape: "paw", color: "#F4845F", size: 18, driftX: 12, driftY: -18, duration: 7, delay: 0 },
  { top: "12%", left: "88%", shape: "heart", color: "#2D9B6F", size: 14, driftX: -10, driftY: 14, duration: 9, delay: 0.5 },
  { top: "22%", left: "15%", shape: "bone", color: "#7EC8E3", size: 20, driftX: 8, driftY: -12, duration: 11, delay: 1 },
  { top: "18%", left: "72%", shape: "paw", color: "#2D9B6F", size: 16, driftX: -14, driftY: 10, duration: 8, delay: 1.5 },
  { top: "35%", left: "3%", shape: "heart", color: "#F4845F", size: 12, driftX: 10, driftY: -16, duration: 10, delay: 0.3 },
  { top: "40%", left: "95%", shape: "bone", color: "#7EC8E3", size: 18, driftX: -8, driftY: 12, duration: 9, delay: 2 },
  { top: "55%", left: "8%", shape: "paw", color: "#7EC8E3", size: 14, driftX: 14, driftY: -10, duration: 12, delay: 0.8 },
  { top: "52%", left: "92%", shape: "heart", color: "#2D9B6F", size: 16, driftX: -12, driftY: -14, duration: 8, delay: 1.2 },
  { top: "68%", left: "12%", shape: "bone", color: "#F4845F", size: 20, driftX: 10, driftY: 16, duration: 10, delay: 0.6 },
  { top: "72%", left: "85%", shape: "paw", color: "#2D9B6F", size: 12, driftX: -14, driftY: -12, duration: 11, delay: 1.8 },
  { top: "82%", left: "6%", shape: "heart", color: "#7EC8E3", size: 16, driftX: 8, driftY: -18, duration: 9, delay: 0.4 },
  { top: "78%", left: "90%", shape: "bone", color: "#F4845F", size: 14, driftX: -10, driftY: 10, duration: 12, delay: 2.2 },
  { top: "15%", left: "42%", shape: "paw", color: "#F4845F", size: 10, driftX: 6, driftY: -8, duration: 8, delay: 1.4 },
  { top: "30%", left: "60%", shape: "heart", color: "#7EC8E3", size: 12, driftX: -8, driftY: 12, duration: 10, delay: 0.9 },
  { top: "45%", left: "25%", shape: "bone", color: "#2D9B6F", size: 16, driftX: 12, driftY: -14, duration: 11, delay: 1.7 },
  { top: "60%", left: "78%", shape: "paw", color: "#7EC8E3", size: 14, driftX: -10, driftY: 8, duration: 9, delay: 0.2 },
  { top: "88%", left: "30%", shape: "heart", color: "#F4845F", size: 18, driftX: 14, driftY: -10, duration: 10, delay: 1.1 },
  { top: "5%", left: "55%", shape: "bone", color: "#2D9B6F", size: 12, driftX: -6, driftY: 14, duration: 8, delay: 2.5 },
  { top: "92%", left: "65%", shape: "paw", color: "#F4845F", size: 16, driftX: 10, driftY: -12, duration: 12, delay: 0.7 },
  { top: "48%", left: "50%", shape: "heart", color: "#2D9B6F", size: 10, driftX: -8, driftY: -8, duration: 11, delay: 1.6 },
];

/* ─── Shape renderers (inline SVGs) ─────────────────────── */
function PawShape({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <ellipse cx="7" cy="5" rx="2.5" ry="3" />
      <ellipse cx="17" cy="5" rx="2.5" ry="3" />
      <ellipse cx="3.5" cy="12" rx="2.5" ry="3" />
      <ellipse cx="20.5" cy="12" rx="2.5" ry="3" />
      <ellipse cx="12" cy="18" rx="5" ry="4.5" />
    </svg>
  );
}

function HeartShape({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function BoneShape({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M3.5 6.5a2.5 2.5 0 0 1 5 0c0 .5-.15.96-.39 1.36L12 12l3.89-4.14A2.5 2.5 0 0 1 18.5 4a2.5 2.5 0 0 1 2.11 3.86L16.5 12l4.11 4.14A2.5 2.5 0 1 1 16 19.5a2.5 2.5 0 0 1-.39-1.36L12 14l-3.89 4.14A2.5 2.5 0 0 1 1 16.5a2.5 2.5 0 0 1 2.61-2.36L7.5 12 3.61 7.86A2.5 2.5 0 0 1 3.5 6.5z" />
    </svg>
  );
}

const ShapeMap = { paw: PawShape, heart: HeartShape, bone: BoneShape };

/* ─── Photo card hover offsets ───────────────────────────── */
const CARD_HOVER_OFFSETS = [
  { x: -30, y: -10, rotate: -12 },
  { x: 0, y: -20, rotate: 0 },
  { x: 30, y: -10, rotate: 10 },
];

export default function Hero() {
  const isHovering = useMotionValue(0);
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden py-20 lg:py-32 px-4 md:px-8 lg:px-16"
      style={{ background: "#FAFAF7" }}
    >
      {/* ── Floating particles (desktop only) ─────────── */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
        {PARTICLES.map((p, i) => {
          const Shape = ShapeMap[p.shape];
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ top: p.top, left: p.left, opacity: 0.06 }}
              animate={{
                x: [0, p.driftX, -p.driftX * 0.5, 0],
                y: [0, p.driftY, -p.driftY * 0.5, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            >
              <Shape color={p.color} size={p.size} />
            </motion.div>
          );
        })}
      </div>

      {/* ── Main grid ─────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto lg:grid lg:grid-cols-2 items-center gap-12">
        {/* ── Photo stack (mobile first, desktop right) ── */}
        <div className="order-first lg:order-last mb-12 lg:mb-0 flex justify-center">
          <FadeUp delay={1.0}>
            <motion.div
              className="relative w-[280px] h-[340px] sm:w-[340px] sm:h-[400px] lg:w-[400px] lg:h-[460px]"
              onHoverStart={() => isHovering.set(1)}
              onHoverEnd={() => isHovering.set(0)}
            >
              {HERO_CONTENT.photoCards.map((card, i) => {
                const zIndex = i === 1 ? 30 : i === 0 ? 20 : 10;
                const baseX = i === 0 ? -20 : i === 2 ? 20 : 0;
                const baseY = i === 1 ? -10 : 0;

                return (
                  <motion.div
                    key={card.alt}
                    className="absolute inset-0"
                    style={{ zIndex }}
                    initial={{
                      rotate: card.rotation,
                      x: baseX,
                      y: baseY,
                    }}
                    whileHover={{
                      rotate: card.rotation + CARD_HOVER_OFFSETS[i].rotate * 0.3,
                      x: baseX + CARD_HOVER_OFFSETS[i].x,
                      y: baseY + CARD_HOVER_OFFSETS[i].y,
                      scale: 1.03,
                      transition: { duration: 0.4, ease: "easeOut" },
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div
                      className="w-full h-full rounded-2xl overflow-hidden shadow-lg"
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #E8E4DA",
                      }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={card.src}
                          alt={card.alt}
                          fill
                          className="object-cover img-warm"
                          sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 400px"
                          priority={i === 1}
                        />
                        {/* HealthChip overlay */}
                        <div className="absolute bottom-3 left-3 z-10">
                          <HealthChip label={card.chip} variant="good" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </FadeUp>
        </div>

        {/* ── Copy (mobile second, desktop left) ─────── */}
        <div className="order-last lg:order-first">
          {/* Brand label */}
          <FadeUp delay={0}>
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#2D9B6F" }}
            >
              petpulse
            </span>
          </FadeUp>

          {/* Headline */}
          <h1>
            {HERO_CONTENT.headline.map((line, i) => (
              <FadeUp key={i} delay={0.2 + i * 0.2}>
                <div className="text-display-xl font-display" style={{ color: "#1A1A1A" }}>
                  {line}
                </div>
              </FadeUp>
            ))}
          </h1>

          {/* Subtext */}
          <FadeUp delay={0.6}>
            <p
              className="text-lg max-w-lg mt-6 leading-relaxed"
              style={{ color: "#6B7280" }}
            >
              {HERO_CONTENT.subtext}
            </p>
          </FadeUp>

          {/* CTAs */}
          <FadeUp delay={0.8}>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              {/* Primary CTA */}
              <motion.a
                href="/signup"
                className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold shadow-md"
                style={{ background: "#F4845F", color: "#FFFFFF" }}
                whileHover={{
                  y: -2,
                  boxShadow: "0 10px 25px -5px rgba(244,132,95,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                {HERO_CONTENT.cta.primary}
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="#scan-demo"
                className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold transition-colors duration-200"
                style={{
                  color: "#1A1A1A",
                  border: "1px solid #E8E4DA",
                  background: "transparent",
                }}
                whileHover={{
                  backgroundColor: "rgba(243,240,232,0.6)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                {HERO_CONTENT.cta.secondary}
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── Breed marquee ─────────────────────────────── */}
      <FadeUp delay={1.2}>
        <div
          className="relative mt-20 lg:mt-28 max-w-6xl mx-auto overflow-hidden"
          ref={marqueeRef}
        >
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, #FAFAF7, transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, #FAFAF7, transparent)",
            }}
          />

          {/* Scrolling track — pauses on hover */}
          <div className="group">
            <motion.div
              className="flex gap-3 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 35,
                  ease: "linear",
                },
              }}
              style={{ willChange: "transform" }}
              whileHover={{ animationPlayState: "paused" } as never}
            >
              {/* Duplicate the list for seamless looping */}
              {[...BREED_MARQUEE, ...BREED_MARQUEE].map((breed, i) => (
                <span
                  key={`${breed.name}-${i}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap shrink-0 transition-shadow duration-200 hover:shadow-sm cursor-default"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E8E4DA",
                    color: "#1A1A1A",
                  }}
                  title={breed.note}
                >
                  <span>{breed.emoji}</span>
                  <span className="font-medium">{breed.name}</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
