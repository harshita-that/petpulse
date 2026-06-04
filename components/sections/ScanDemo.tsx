"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { SCAN_DEMO_CONTENT } from "@/lib/constants";
import FadeUp from "@/components/motion/FadeUp";
import { Play, RotateCcw, Check } from "lucide-react";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */
type ScanPhase = "idle" | "scanning" | "thinking" | "hotspots" | "results";

const STEPS: { phase: ScanPhase; label: string }[] = [
  { phase: "idle", label: "Upload photo" },
  { phase: "scanning", label: "AI scan" },
  { phase: "thinking", label: "Analyzing features" },
  { phase: "hotspots", label: "Detecting areas" },
  { phase: "results", label: "Health report" },
];

const PHASE_INDEX: Record<ScanPhase, number> = {
  idle: 0,
  scanning: 1,
  thinking: 2,
  hotspots: 3,
  results: 4,
};

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */
export default function ScanDemo() {
  const [phase, setPhase] = useState<ScanPhase>("idle");
  const [thinkIdx, setThinkIdx] = useState(0);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [typedText, setTypedText] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });
  const hasAutoPlayed = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* Helper to clear all pending timers */
  const clearAllTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const addTimer = useCallback(
    (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timers.current.push(id);
      return id;
    },
    []
  );

  /* ── Run the full sequence ── */
  const runSequence = useCallback(() => {
    clearAllTimers();
    setPhase("scanning");
    setThinkIdx(0);
    setScoreDisplay(0);
    setTypedText("");

    // scanning → thinking at 1.8s
    addTimer(() => setPhase("thinking"), 1800);

    // cycle through thinking texts
    addTimer(() => setThinkIdx(1), 2600);
    addTimer(() => setThinkIdx(2), 3400);

    // thinking → hotspots at 4.2s
    addTimer(() => setPhase("hotspots"), 4200);

    // hotspots → results at 6s
    addTimer(() => setPhase("results"), 6000);
  }, [clearAllTimers, addTimer]);

  /* ── Auto-play on scroll entry ── */
  useEffect(() => {
    if (isInView && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      addTimer(() => runSequence(), 600);
    }
  }, [isInView, runSequence, addTimer]);

  /* ── Score counter (0→87) in results phase ── */
  useEffect(() => {
    if (phase !== "results") return;
    const target = SCAN_DEMO_CONTENT.healthScore;
    let current = 0;
    const step = () => {
      current += 1;
      if (current > target) current = target;
      setScoreDisplay(current);
      if (current < target) {
        const id = setTimeout(step, 18);
        timers.current.push(id);
      }
    };
    step();
  }, [phase]);

  /* ── Typewriter for "Analysis complete" ── */
  useEffect(() => {
    if (phase !== "results") return;
    const text = "Analysis complete";
    let i = 0;
    const type = () => {
      i += 1;
      setTypedText(text.slice(0, i));
      if (i < text.length) {
        const id = setTimeout(type, 45);
        timers.current.push(id);
      }
    };
    addTimer(() => type(), 1200);
  }, [phase, addTimer]);

  /* ── Clean up on unmount ── */
  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  /* ── Replay ── */
  const handleReplay = () => {
    setPhase("idle");
    clearAllTimers();
    addTimer(() => runSequence(), 400);
  };

  const currentStepIdx = PHASE_INDEX[phase];

  /* ──────────────────────────────────────────────
     Render
     ────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="scan-demo"
      className="py-24 md:py-32"
      style={{ backgroundColor: "#FAFAF7" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Header ── */}
        <FadeUp>
          <h2
            className="text-display-lg font-display text-center mb-4"
            style={{ color: "#1A1A1A" }}
          >
            {SCAN_DEMO_CONTENT.headline}
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p
            className="text-lg text-center mb-16 max-w-xl mx-auto"
            style={{ color: "#6B7280" }}
          >
            {SCAN_DEMO_CONTENT.subtext}
          </p>
        </FadeUp>

        {/* ── Two-column layout ── */}
        <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* ════════════ LEFT: Scan card ════════════ */}
          <FadeUp delay={0.2}>
            <div
              className="relative bg-white rounded-2xl overflow-hidden shadow-md"
              style={{ border: "1px solid #E8E4DA" }}
            >
              {/* ── Main image area ── */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={SCAN_DEMO_CONTENT.image}
                  alt="Dog being scanned"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover img-warm"
                  style={{
                    filter:
                      phase === "scanning"
                        ? "brightness(1.08) saturate(1.1)"
                        : "brightness(1.02) saturate(1.1)",
                    transition: "filter 0.6s ease",
                  }}
                />

                {/* ─ IDLE: Run scan button overlay ─ */}
                <AnimatePresence>
                  {phase === "idle" && (
                    <motion.div
                      key="idle-overlay"
                      className="absolute inset-0 z-20 flex items-center justify-center"
                      style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.button
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-white cursor-pointer"
                        style={{ backgroundColor: "#2D9B6F", minHeight: 48 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={runSequence}
                      >
                        <Play className="w-5 h-5" fill="white" />
                        Run scan
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ─ SCANNING: emerald beam sweeps top→bottom ─ */}
                <AnimatePresence>
                  {phase === "scanning" && (
                    <motion.div
                      key="scan-beam"
                      className="absolute left-0 right-0 h-1 z-20 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, #2D9B6F 30%, #2D9B6F 70%, transparent 100%)",
                        boxShadow: "0 0 24px 6px rgba(45,155,111,0.35)",
                      }}
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.8, ease: "easeInOut" }}
                    />
                  )}
                </AnimatePresence>

                {/* ─ THINKING: corner brackets ─ */}
                <AnimatePresence>
                  {phase === "thinking" && (
                    <motion.div
                      key="thinking-frame"
                      className="absolute inset-4 z-20 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* TL */}
                      <div
                        className="absolute top-0 left-0 w-6 h-6"
                        style={{
                          borderTop: "2px solid #2D9B6F",
                          borderLeft: "2px solid #2D9B6F",
                        }}
                      />
                      {/* TR */}
                      <div
                        className="absolute top-0 right-0 w-6 h-6"
                        style={{
                          borderTop: "2px solid #2D9B6F",
                          borderRight: "2px solid #2D9B6F",
                        }}
                      />
                      {/* BL */}
                      <div
                        className="absolute bottom-0 left-0 w-6 h-6"
                        style={{
                          borderBottom: "2px solid #2D9B6F",
                          borderLeft: "2px solid #2D9B6F",
                        }}
                      />
                      {/* BR */}
                      <div
                        className="absolute bottom-0 right-0 w-6 h-6"
                        style={{
                          borderBottom: "2px solid #2D9B6F",
                          borderRight: "2px solid #2D9B6F",
                        }}
                      />

                      {/* Floating analysis tag */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-lg text-sm font-body font-medium"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.92)",
                          color: "#2D9B6F",
                          border: "1px solid #E8E4DA",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        }}
                        key={thinkIdx}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35 }}
                      >
                        {SCAN_DEMO_CONTENT.thinkingTexts[thinkIdx]}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ─ THINKING: circular progress ring around card ─ */}
                <AnimatePresence>
                  {phase === "thinking" && (
                    <motion.svg
                      key="progress-ring"
                      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                      viewBox="0 0 400 300"
                      fill="none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.rect
                        x="4"
                        y="4"
                        width="392"
                        height="292"
                        rx="16"
                        stroke="#2D9B6F"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="1384"
                        initial={{ strokeDashoffset: 1384 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>

                {/* ─ HOTSPOTS: pulsing circles ─ */}
                <AnimatePresence>
                  {(phase === "hotspots" || phase === "results") &&
                    SCAN_DEMO_CONTENT.hotspots.map((hs, i) => (
                      <motion.div
                        key={`hs-${hs.id}`}
                        className="absolute z-20 pointer-events-none"
                        style={{
                          left: `${hs.x}%`,
                          top: `${hs.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.2,
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                        }}
                      >
                        {/* Ripple ring */}
                        <motion.div
                          className="absolute rounded-full"
                          style={{
                            width: 32,
                            height: 32,
                            top: -12,
                            left: -12,
                            border: `2px solid ${hs.color}`,
                          }}
                          animate={{
                            scale: [1, 1.8, 1.8],
                            opacity: [0.6, 0, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />

                        {/* Solid dot */}
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: hs.color,
                            boxShadow: `0 0 8px ${hs.color}`,
                          }}
                        />

                        {/* Label */}
                        <motion.div
                          className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 rounded text-xs font-body font-medium"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.95)",
                            color: hs.color,
                            border: "1px solid #E8E4DA",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          }}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 + 0.3 }}
                        >
                          {hs.label} · {hs.status}
                        </motion.div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {/* ── RESULTS: Accordion panel ── */}
              <AnimatePresence>
                {phase === "results" && (
                  <motion.div
                    key="results-panel"
                    className="overflow-hidden"
                    style={{ borderTop: "1px solid #E8E4DA" }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="p-5 space-y-4">
                      {/* Health score bar */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className="text-sm font-medium font-body"
                            style={{ color: "#1A1A1A" }}
                          >
                            Health Score
                          </span>
                          <span
                            className="text-lg font-display font-bold"
                            style={{ color: "#2D9B6F" }}
                          >
                            {scoreDisplay}
                          </span>
                        </div>
                        <div
                          className="w-full h-2.5 rounded-full overflow-hidden"
                          style={{ backgroundColor: "#E8E4DA" }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: "#2D9B6F" }}
                            initial={{ width: "0%" }}
                            animate={{
                              width: `${SCAN_DEMO_CONTENT.healthScore}%`,
                            }}
                            transition={{
                              duration: 1.5,
                              ease: "easeOut",
                              delay: 0.1,
                            }}
                          />
                        </div>
                      </div>

                      {/* Metric pills */}
                      <div className="flex flex-wrap gap-2">
                        {SCAN_DEMO_CONTENT.hotspots.map((hs, i) => (
                          <motion.div
                            key={hs.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium"
                            style={{
                              backgroundColor:
                                hs.color === "#2D9B6F"
                                  ? "rgba(45,155,111,0.1)"
                                  : "rgba(244,132,95,0.1)",
                              color: hs.color,
                              border: `1px solid ${hs.color}25`,
                            }}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.12 }}
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: hs.color }}
                            />
                            {hs.label}: {hs.status}
                          </motion.div>
                        ))}
                      </div>

                      {/* Analysis complete + checkmark */}
                      <motion.div
                        className="flex items-center gap-2 pt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        {/* Green checkmark SVG that draws in */}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <motion.circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#2D9B6F"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: 0.6,
                              delay: 1.2,
                              ease: "easeOut",
                            }}
                          />
                          <motion.path
                            d="M8 12.5l2.5 2.5 5-5"
                            stroke="#2D9B6F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: 0.4,
                              delay: 1.7,
                              ease: "easeOut",
                            }}
                          />
                        </svg>

                        <span
                          className="text-sm font-body font-medium font-mono"
                          style={{ color: "#2D9B6F" }}
                        >
                          {typedText}
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                          >
                            |
                          </motion.span>
                        </span>
                      </motion.div>

                      {/* Replay button */}
                      <motion.button
                        className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-full text-sm font-body font-medium cursor-pointer"
                        style={{
                          border: "1px solid #E8E4DA",
                          color: "#6B7280",
                          minHeight: 44,
                        }}
                        whileHover={{
                          scale: 1.03,
                          borderColor: "#2D9B6F",
                          color: "#2D9B6F",
                        }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleReplay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                      >
                        <RotateCcw className="w-4 h-4" />
                        Replay
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>

          {/* ════════════ RIGHT: Step list ════════════ */}
          <FadeUp delay={0.35}>
            <div className="mt-10 lg:mt-0">
              <h3
                className="text-display-md font-display mb-8"
                style={{ color: "#1A1A1A" }}
              >
                How it works
              </h3>

              <ol className="space-y-4">
                {STEPS.map((step, i) => {
                  const isActive = i === currentStepIdx;
                  const isDone = i < currentStepIdx;

                  return (
                    <motion.li
                      key={step.phase}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl transition-colors duration-300"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(45,155,111,0.08)"
                          : "transparent",
                        border: isActive
                          ? "1px solid rgba(45,155,111,0.2)"
                          : "1px solid transparent",
                      }}
                      animate={{
                        x: isActive ? 4 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Step number / check */}
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-semibold"
                        style={{
                          backgroundColor: isDone
                            ? "#2D9B6F"
                            : isActive
                            ? "rgba(45,155,111,0.15)"
                            : "#F3F0E8",
                          color: isDone
                            ? "#fff"
                            : isActive
                            ? "#2D9B6F"
                            : "#6B7280",
                        }}
                      >
                        {isDone ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          i + 1
                        )}
                      </div>

                      {/* Label */}
                      <span
                        className="text-sm font-body font-medium"
                        style={{
                          color: isActive ? "#2D9B6F" : isDone ? "#1A1A1A" : "#6B7280",
                        }}
                      >
                        {step.label}
                      </span>

                      {/* Active dot indicator */}
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 rounded-full"
                          style={{ backgroundColor: "#2D9B6F" }}
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
