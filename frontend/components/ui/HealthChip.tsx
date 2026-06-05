"use client";

interface HealthChipProps {
  label: string;
  variant?: "good" | "warn" | "neutral";
  className?: string;
}

export default function HealthChip({ label, variant = "good", className = "" }: HealthChipProps) {
  const styles = {
    good: { bg: "rgba(45,155,111,0.1)", color: "#2D9B6F", border: "rgba(45,155,111,0.2)" },
    warn: { bg: "rgba(244,132,95,0.1)", color: "#F4845F", border: "rgba(244,132,95,0.2)" },
    neutral: { bg: "rgba(107,114,128,0.1)", color: "#6B7280", border: "rgba(107,114,128,0.2)" },
  };
  const s = styles[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${className}`}
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {label}
    </span>
  );
}
