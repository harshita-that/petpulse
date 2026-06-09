"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PAWS = Array.from({ length: 8 }, (_, i) => i);

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(pct);
      setVisible(scrollTop > 100 && pct < 0.98);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide on mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  if (isMobile) return null;

  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      {PAWS.map((i) => {
        const threshold = i / (PAWS.length - 1);
        const filled = progress >= threshold;
        return (
          <motion.div
            key={i}
            className="text-sm select-none"
            style={{ opacity: filled ? 0.7 : 0.2 }}
            animate={{ scale: filled ? 1 : 0.8, color: filled ? "#F4845F" : "#D4CFC4" }}
            transition={{ duration: 0.3 }}
          >
            🐾
          </motion.div>
        );
      })}
      {/* Glowing dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: "#2D9B6F",
          boxShadow: "0 0 8px rgba(45,155,111,0.5)",
          right: -8,
          top: `${progress * 100}%`,
        }}
      />
    </motion.div>
  );
}
