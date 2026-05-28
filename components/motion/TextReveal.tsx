"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  blur?: boolean;
  once?: boolean;
}

export default function TextReveal({
  text,
  className,
  delay = 0,
  duration = 0.6,
  stagger = 0.04,
  blur = true,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  // Split by newlines first, then by words
  const lines = text.split("\n");

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(" ").map((word, wordIndex) => {
            // Calculate the global index for stagger delay
            const previousWordsCount = lines
              .slice(0, lineIndex)
              .reduce((acc, l) => acc + l.split(" ").length, 0);
            const globalIndex = previousWordsCount + wordIndex;

            return (
              <span
                key={`${lineIndex}-${wordIndex}`}
                className="inline-block overflow-hidden"
              >
                <motion.span
                  className="inline-block"
                  initial={{
                    opacity: 0,
                    y: 20,
                    filter: blur ? "blur(8px)" : "blur(0px)",
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        }
                      : {
                          opacity: 0,
                          y: 20,
                          filter: blur ? "blur(8px)" : "blur(0px)",
                        }
                  }
                  transition={{
                    duration,
                    delay: delay + globalIndex * stagger,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                >
                  {word}
                </motion.span>
                {wordIndex < line.split(" ").length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
