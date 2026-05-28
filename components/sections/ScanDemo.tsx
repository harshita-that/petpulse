"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import TextReveal from "@/components/motion/TextReveal";
import FadeIn from "@/components/motion/FadeIn";
import { SCAN_DEMO_CONTENT } from "@/lib/constants";
import { Scan, RotateCcw, Upload, CheckCircle2 } from "lucide-react";

type ScanState = "idle" | "scanning" | "complete";

export default function ScanDemo() {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const sectionRef = useRef<HTMLElement>(null);
  useInView(sectionRef, { once: true, margin: "-100px" });

  const startScan = () => {
    setScanState("scanning");
    setTimeout(() => setScanState("complete"), 2800);
  };

  const resetScan = () => setScanState("idle");

  return (
    <section ref={sectionRef} id="scan-demo" className="relative py-32 md:py-40 overflow-hidden section-dark">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ opacity: 0.1, background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn delay={0} duration={0.8}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
            >
              <Scan className="w-3.5 h-3.5" style={{ color: "#8b5cf6" }} />
              <span className="text-xs uppercase" style={{ letterSpacing: "0.15em", color: "#94a3b8" }}>Interactive demo</span>
            </div>
          </FadeIn>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <TextReveal text={SCAN_DEMO_CONTENT.headline} delay={0.2} />
          </h2>
          <FadeIn delay={0.6}>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
              {SCAN_DEMO_CONTENT.subtext}
            </p>
          </FadeIn>
        </div>

        {/* Scan Interface */}
        <FadeIn delay={0.4} duration={1}>
          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
            >
              {/* HUD corners */}
              <div className="absolute top-3 left-3 w-5 h-5 z-20" style={{ borderTop: "2px solid rgba(6,182,212,0.5)", borderLeft: "2px solid rgba(6,182,212,0.5)" }} />
              <div className="absolute top-3 right-3 w-5 h-5 z-20" style={{ borderTop: "2px solid rgba(6,182,212,0.5)", borderRight: "2px solid rgba(6,182,212,0.5)" }} />
              <div className="absolute bottom-3 left-3 w-5 h-5 z-20" style={{ borderBottom: "2px solid rgba(6,182,212,0.5)", borderLeft: "2px solid rgba(6,182,212,0.5)" }} />
              <div className="absolute bottom-3 right-3 w-5 h-5 z-20" style={{ borderBottom: "2px solid rgba(6,182,212,0.5)", borderRight: "2px solid rgba(6,182,212,0.5)" }} />

              <AnimatePresence mode="wait">
                {scanState === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-12 md:p-16 flex flex-col items-center justify-center cursor-pointer group"
                    onClick={startScan}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-500"
                      style={{ border: "2px dashed rgba(255,255,255,0.2)" }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Upload className="w-8 h-8 transition-colors duration-500" style={{ color: "#64748b" }} />
                    </motion.div>
                    <p className="text-sm" style={{ color: "#94a3b8" }}>{SCAN_DEMO_CONTENT.dropzoneText}</p>
                    <p className="text-xs mt-2" style={{ color: "#475569" }}>Click to start a demo scan</p>
                  </motion.div>
                )}

                {scanState === "scanning" && (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative aspect-[4/3] overflow-hidden"
                  >
                    <Image src="/images/scan-demo.png" alt="Pet scan in progress" fill className="object-cover" sizes="672px" />
                    {/* Grid overlay */}
                    <motion.div className="absolute inset-0 z-10" initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: 1 }}
                      style={{
                        backgroundImage: "linear-gradient(rgba(6,182,212,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.15) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                    {/* Scan beam */}
                    <motion.div className="absolute left-0 right-0 h-[2px] z-20"
                      style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.9) 20%, #06b6d4 50%, rgba(6,182,212,0.9) 80%, transparent 100%)",
                        boxShadow: "0 0 20px rgba(6,182,212,0.5), 0 0 60px rgba(6,182,212,0.2)",
                      }}
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                    {/* Status */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(6,182,212,0.3)" }}
                      >
                        <motion.div className="w-2 h-2 rounded-full" style={{ background: "#06b6d4" }}
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="text-xs font-mono" style={{ color: "#06b6d4" }}>ANALYZING...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {scanState === "complete" && (
                  <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src="/images/scan-demo.png" alt="Pet scan complete" fill className="object-cover" sizes="672px" />
                      <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />

                      {/* Markers */}
                      {SCAN_DEMO_CONTENT.scanRegions.map((region, index) => (
                        <motion.div key={region.id} className="absolute z-20"
                          style={{ left: `${region.x}%`, top: `${region.y}%`, transform: "translate(-50%, -50%)" }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.3, type: "spring", stiffness: 200 }}
                        >
                          <motion.div className="absolute inset-0 -m-3 rounded-full"
                            style={{ border: "1px solid rgba(6,182,212,0.4)" }}
                            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          />
                          <div className="w-3 h-3 rounded-full" style={{ background: "#06b6d4", boxShadow: "0 0 10px rgba(6,182,212,0.6)" }} />
                          <motion.div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.3 + 0.3 }}
                          >
                            <div className="px-3 py-2 rounded-lg"
                              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
                            >
                              <div className="text-xs font-semibold text-white mb-0.5">{region.label}</div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px]" style={{ color: "#34d399" }}>{region.status}</span>
                                <span className="text-[10px]" style={{ color: "#64748b" }}>{region.confidence}%</span>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}

                      {/* Complete badge */}
                      <motion.div className="absolute top-4 left-4 z-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(52,211,153,0.3)" }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#34d399" }} />
                          <span className="text-xs font-mono" style={{ color: "#34d399" }}>SCAN COMPLETE</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Health Score Panel */}
                    <div className="p-6 md:p-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Score circle */}
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                            <motion.circle
                              cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" strokeWidth="6" strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 42}`}
                              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                              animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - SCAN_DEMO_CONTENT.healthScore / 100) }}
                              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            />
                            <defs>
                              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#10b981" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span className="text-2xl font-bold text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                              {SCAN_DEMO_CONTENT.healthScore}
                            </motion.span>
                            <span className="text-[10px] uppercase" style={{ letterSpacing: "0.1em", color: "#64748b" }}>Score</span>
                          </div>
                        </div>

                        {/* Metrics grid */}
                        <div className="flex-1 grid grid-cols-2 gap-3 w-full">
                          {SCAN_DEMO_CONTENT.scanRegions.map((region, i) => (
                            <motion.div key={region.id}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg"
                              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1 + i * 0.1 }}
                            >
                              <div className="w-1 h-8 rounded-full" style={{ background: "linear-gradient(to bottom, #06b6d4, #10b981)" }} />
                              <div>
                                <p className="text-xs font-medium text-white">{region.label}</p>
                                <p className="text-[10px]" style={{ color: "#64748b" }}>{region.detail}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Reset */}
                      <motion.button
                        className="mt-6 flex items-center gap-2 mx-auto px-4 py-2 rounded-full text-xs cursor-pointer transition-all"
                        style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}
                        onClick={resetScan}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reset scan
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
