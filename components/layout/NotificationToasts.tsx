"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { TOAST_MESSAGES } from "@/lib/constants";

interface ToastData {
  id: number;
  emoji: string;
  title: string;
  body: string;
  accent: string;
}

export default function NotificationToasts() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    TOAST_MESSAGES.forEach((msg, i) => {
      const showDelay = (i + 1) * 4000 + 8000; // 8s, 12s, 16s, 20s
      const t1 = setTimeout(() => {
        const id = Date.now() + i;
        setToasts((prev) => [...prev.slice(-1), { id, ...msg }]); // max 2

        const t2 = setTimeout(() => dismiss(id), 3500);
        timers.push(t2);
      }, showDelay);
      timers.push(t1);
    });

    return () => timers.forEach(clearTimeout);
  }, [dismiss]);

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 sm:bottom-6 sm:left-6 max-sm:top-4 max-sm:left-4 max-sm:right-4 max-sm:bottom-auto">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className="relative flex items-start gap-3 p-4 rounded-xl shadow-lg max-w-xs w-full group"
            style={{
              background: "#FFFFFF",
              borderLeft: `3px solid ${toast.accent}`,
              border: "1px solid #E8E4DA",
            }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            layout
          >
            <span className="text-xl flex-shrink-0">{toast.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>{toast.title}</p>
              <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{toast.body}</p>
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-3 h-3" style={{ color: "#6B7280" }} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
