"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  blur?: boolean;
  className?: string;
  once?: boolean;
}

const directionOffset = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  blur = true,
  className,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const offset = directionOffset[direction];

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        filter: blur ? "blur(10px)" : "blur(0px)",
        ...offset,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              filter: "blur(0px)",
              x: 0,
              y: 0,
            }
          : {
              opacity: 0,
              filter: blur ? "blur(10px)" : "blur(0px)",
              ...offset,
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
