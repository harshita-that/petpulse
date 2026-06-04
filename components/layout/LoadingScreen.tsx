"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Top half */}
          <motion.div
            className="fixed inset-x-0 top-0 h-1/2 z-[100] flex flex-col items-center justify-end pb-12"
            style={{ background: "#0F0D0A" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <motion.div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#2D9B6F" }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 0.8, repeat: 2 }}
              />
              <span className="font-display text-2xl font-semibold text-white tracking-wide">
                petpulse
              </span>
            </motion.div>

            {/* ECG heartbeat line */}
            <svg width="200" height="40" viewBox="0 0 200 40" className="overflow-visible">
              <motion.path
                d="M0,20 L40,20 L50,20 L60,5 L70,35 L80,10 L90,30 L100,20 L110,20 L120,20 L130,18 L140,22 L150,20 L200,20"
                fill="none"
                stroke="#2D9B6F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
            </svg>
          </motion.div>

          {/* Bottom half */}
          <motion.div
            className="fixed inset-x-0 bottom-0 h-1/2 z-[100] flex flex-col items-center justify-start pt-8"
            style={{ background: "#0F0D0A" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Paw print */}
            <motion.div
              className="text-3xl mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [0.5, 1.1, 1] }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              🐾
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "#2D9B6F" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, delay: 0.2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
