"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollProgress(offset: [string, string] = ["start end", "end start"]) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    observer.observe(element);

    const handleScroll = () => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Calculate progress: 0 when element enters viewport, 1 when it leaves
      const totalDistance = windowHeight + elementHeight;
      const currentPosition = windowHeight - rect.top;
      const p = Math.max(0, Math.min(1, currentPosition / totalDistance));

      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  return { ref, progress, isInView };
}
