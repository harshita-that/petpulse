"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll(); // check initial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.7)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid #E8E4DA" : "1px solid transparent",
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <nav className="max-w-6xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          {/* ── Logo ────────────────────────── */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2 relative z-50"
          >
            <motion.div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#2D9B6F" }}
              animate={{ scale: [1, 1.4, 1, 1.2, 1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span
              className="font-display text-lg font-semibold"
              style={{ color: "#1A1A1A" }}
            >
              petpulse
            </span>
          </a>

          {/* ── Desktop nav links ───────────── */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "#6B7280" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#1A1A1A")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#6B7280")
                }
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* ── Right: Auth + Hamburger ─────── */}
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden sm:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-[#F3F0E8]"
              style={{ color: "#1A1A1A" }}
            >
              Sign in
            </a>
            <a
              href="/signup"
              className="hidden sm:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              style={{
                background: "#F4845F",
                color: "#FFFFFF",
              }}
            >
              Sign up
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden relative z-50 flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-200"
              style={{
                background: mobileOpen ? "rgba(26,26,26,0.06)" : "transparent",
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} style={{ color: "#1A1A1A" }} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} style={{ color: "#1A1A1A" }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile full-screen overlay ───── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
            style={{ background: "rgba(250,250,247,0.98)" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <nav className="flex flex-col items-center gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.4,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block py-3 px-6 text-2xl font-display font-semibold transition-colors duration-200"
                    style={{ color: "#1A1A1A" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#2D9B6F")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#1A1A1A")
                    }
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}

              {/* Mobile Auth */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{
                  delay: 0.1 + NAV_ITEMS.length * 0.08,
                  duration: 0.4,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="mt-6 flex flex-col items-center gap-3"
              >
                <a
                  href="/signup"
                  className="inline-flex items-center px-8 py-3 rounded-full text-base font-semibold transition-all duration-200 hover:shadow-md"
                  style={{
                    background: "#F4845F",
                    color: "#FFFFFF",
                  }}
                >
                  Sign up
                </a>
                <a
                  href="/login"
                  className="inline-flex items-center px-8 py-3 rounded-full text-base font-semibold transition-all duration-200"
                  style={{ color: "#1A1A1A" }}
                >
                  Sign in
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
