"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailItem {
  id: number;
  x: number;
  y: number;
  isLeft: boolean;
  rotation: number;
}

function PawSVG({ isLeft }: { isLeft: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#F4845F" style={{ transform: isLeft ? "scaleX(-1)" : "none" }}>
      <ellipse cx="7" cy="5" rx="2.2" ry="2.8" />
      <ellipse cx="17" cy="5" rx="2.2" ry="2.8" />
      <ellipse cx="4" cy="12" rx="2.2" ry="2.8" />
      <ellipse cx="20" cy="12" rx="2.2" ry="2.8" />
      <ellipse cx="12" cy="17" rx="4.5" ry="4" />
    </svg>
  );
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const counterRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const isPointerFine = useRef(false);

  useEffect(() => {
    // Only on pointer:fine devices
    isPointerFine.current = window.matchMedia("(pointer: fine)").matches;
  }, []);

  const handleMove = useCallback((e: MouseEvent) => {
    if (!isPointerFine.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 40) return; // only place paws every 40px of movement

    lastPosRef.current = { x: e.clientX, y: e.clientY };
    const rotation = Math.atan2(dy, dx) * (180 / Math.PI);
    const id = counterRef.current++;
    const isLeft = id % 2 === 0;

    setTrail((prev) => {
      const next = [...prev, { id, x: e.clientX, y: e.clientY, isLeft, rotation }];
      return next.slice(-8); // max 8 items
    });

    // Auto-remove after 800ms
    setTimeout(() => {
      setTrail((prev) => prev.filter((item) => item.id !== id));
    }, 800);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [handleMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]" aria-hidden="true">
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            className="absolute"
            style={{
              left: item.x - 10,
              top: item.y - 10,
              transform: `rotate(${item.rotation - 90}deg)`,
            }}
            initial={{ opacity: 0.25, scale: 0.6 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <PawSVG isLeft={item.isLeft} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
