"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { TIMELINE_DATA } from "@/lib/constants";
import FadeUp from "@/components/motion/FadeUp";
import SparklineChart from "@/components/ui/SparklineChart";
import HealthChip from "@/components/ui/HealthChip";
import { TrendingUp, TrendingDown } from "lucide-react";

/* ── helpers ───────────────────────────────────────── */

function chipVariant(score: number): "good" | "warn" | "neutral" {
  if (score >= 90) return "good";
  if (score >= 85) return "neutral";
  return "warn";
}

/* ── TimelineCard ──────────────────────────────────── */

interface CardTilt {
  rotateX: number;
  rotateY: number;
}

function TimelineCard({
  entry,
  index,
}: {
  entry: (typeof TIMELINE_DATA)[number];
  index: number;
}) {
  const [tilt, setTilt] = useState<CardTilt>({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0‥1
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({
        rotateX: (0.5 - y) * 10, // max ±5 deg
        rotateY: (x - 0.5) * 10,
      });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  const sparklineColor = entry.trendUp ? "#2D9B6F" : "#F4845F";

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px]"
      // Desktop: alternate left/right; Mobile: slide up only
      initial={{ opacity: 0, y: 32, x: 0 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.18,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      // Hidden-class overrides for desktop only handled via variant below
    >
      {/* 3D tilt wrapper */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="bg-white rounded-2xl border shadow-sm p-5 cursor-default"
      >
        {/* ─ top row: week + date ─ */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-sm font-semibold font-display"
            style={{ color: "#1A1A1A" }}
          >
            {entry.week}
          </span>
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{ background: "#F3F0E8", color: "#6B7280" }}
          >
            {entry.date}
          </span>
        </div>

        {/* ─ pet photo + sparkline ─ */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border"
            style={{ borderColor: "#E8E4DA" }}
          >
            <Image
              src={entry.image}
              alt="Pet photo"
              width={48}
              height={48}
              className="object-cover img-warm"
            />
          </div>
          <SparklineChart
            data={entry.sparkline}
            width={80}
            height={28}
            color={sparklineColor}
          />
        </div>

        {/* ─ metric badges ─ */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {entry.metrics.map((m) => (
            <HealthChip
              key={m.label}
              label={`${m.label} ${m.score}`}
              variant={chipVariant(m.score)}
            />
          ))}
        </div>

        {/* ─ trend indicator ─ */}
        <div className="flex items-center gap-1.5">
          {entry.trendUp ? (
            <TrendingUp
              className="w-4 h-4"
              style={{ color: "#2D9B6F" }}
            />
          ) : (
            <TrendingDown
              className="w-4 h-4"
              style={{ color: "#F4845F" }}
            />
          )}
          <span
            className="text-xs font-medium"
            style={{ color: entry.trendUp ? "#2D9B6F" : "#F4845F" }}
          >
            {entry.trend}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── ConnectingLine (SVG dashed) ───────────────────── */

function ConnectingLine({ vertical = false }: { vertical?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  if (vertical) {
    return (
      <div ref={ref} className="flex justify-center py-1">
        <svg width="2" height="48" className="overflow-visible">
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2="48"
            stroke="#2D9B6F"
            strokeWidth="2"
            strokeDasharray="6 4"
            initial={{ strokeDashoffset: 48 }}
            animate={isInView ? { strokeDashoffset: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </svg>
      </div>
    );
  }

  return (
    <div ref={ref} className="hidden md:flex items-center flex-shrink-0 -mx-1">
      <svg width="48" height="2" className="overflow-visible">
        <motion.line
          x1="0"
          y1="1"
          x2="48"
          y2="1"
          stroke="#2D9B6F"
          strokeWidth="2"
          strokeDasharray="6 4"
          initial={{ strokeDashoffset: 48 }}
          animate={isInView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

/* ── Timeline section ──────────────────────────────── */

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="py-24 md:py-32 overflow-hidden"
      style={{ background: "#FAFAF7" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ─ headline ─ */}
        <FadeUp>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-display text-center mb-4"
            style={{ color: "#1A1A1A" }}
          >
            Track changes over time
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p
            className="text-center mb-16 max-w-xl mx-auto text-base md:text-lg"
            style={{ color: "#6B7280" }}
          >
            Week-by-week health snapshots so you can spot trends, celebrate
            improvements, and catch dips early.
          </p>
        </FadeUp>

        {/* ─ desktop: horizontal card flow ─ */}
        <div
          className="hidden md:flex items-center justify-center gap-6 lg:gap-8"
          style={{ perspective: "1000px" }}
        >
          {TIMELINE_DATA.map((entry, i) => (
            <div key={entry.week} className="contents">
              <TimelineCard entry={entry} index={i} />
              {i < TIMELINE_DATA.length - 1 && <ConnectingLine />}
            </div>
          ))}
        </div>

        {/* ─ mobile: vertical stack ─ */}
        <div
          className="flex flex-col items-center md:hidden"
          style={{ perspective: "1000px" }}
        >
          {TIMELINE_DATA.map((entry, i) => (
            <div key={entry.week} className="w-full max-w-[340px]">
              <TimelineCard entry={entry} index={i} />
              {i < TIMELINE_DATA.length - 1 && <ConnectingLine vertical />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
