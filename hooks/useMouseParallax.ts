"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { lerp } from "@/lib/utils";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export function useMouseParallax(smoothing: number = 0.1) {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    currentRef.current.x = lerp(
      currentRef.current.x,
      targetRef.current.x,
      smoothing
    );
    currentRef.current.y = lerp(
      currentRef.current.y,
      targetRef.current.y,
      smoothing
    );

    setPosition({
      x: currentRef.current.x,
      y: currentRef.current.y,
      normalizedX: (currentRef.current.x / window.innerWidth) * 2 - 1,
      normalizedY: (currentRef.current.y / window.innerHeight) * 2 - 1,
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [smoothing]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return position;
}
