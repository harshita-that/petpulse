"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SparklineChartProps {
  data: readonly number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export default function SparklineChart({
  data,
  width = 80,
  height = 28,
  color = "#2D9B6F",
  className = "",
}: SparklineChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div ref={ref} className={className}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <motion.polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
    </div>
  );
}
