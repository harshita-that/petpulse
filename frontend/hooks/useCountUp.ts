"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

export default function useCountUp(
  target: number,
  duration: number = 1.5,
  delay: number = 0,
  decimals: number = 0
) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = (now - start) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        // Spring-like easing
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        setValue(Number(current.toFixed(decimals)));

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, target, duration, delay, decimals]);

  return { ref, value };
}
