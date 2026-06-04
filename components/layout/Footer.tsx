"use client";

import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: "#2D9B6F" }}
              animate={{ scale: [1, 1.3, 1, 1.15, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="font-display text-lg font-semibold" style={{ color: "#1A1A1A" }}>
              petpulse
            </span>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm transition-colors duration-200"
                style={{ color: "#6B7280" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1A1A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {["Twitter", "Instagram", "GitHub"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: "#6B7280" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1A1A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid #E8E4DA" }}
        >
          <p className="text-xs" style={{ color: "#6B7280" }}>
            © 2025 PetPulse. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms"].map((link) => (
              <a key={link} href="#" className="text-xs" style={{ color: "#6B7280" }}>
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Paw watermark */}
        <div className="flex justify-center mt-8 opacity-[0.04] text-6xl select-none pointer-events-none">
          🐾
        </div>
      </div>
    </footer>
  );
}
