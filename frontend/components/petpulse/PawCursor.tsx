'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PawIcon from './PawIcon';

interface PawPrint {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export default function PawCursor() {
  const [paws, setPaws] = useState<PawPrint[]>([]);
  const counterRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const minDistance = 60;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < minDistance) return;

      lastPosRef.current = { x: e.clientX, y: e.clientY };
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      counterRef.current += 1;
      const newPaw: PawPrint = {
        id: counterRef.current,
        x: e.clientX,
        y: e.clientY,
        rotation: angle + 90,
      };

      setPaws((prev) => [...prev.slice(-8), newPaw]);

      setTimeout(() => {
        setPaws((prev) => prev.filter((p) => p.id !== newPaw.id));
      }, 1200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {paws.map((paw) => (
          <motion.div
            key={paw.id}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              left: paw.x - 10,
              top: paw.y - 10,
              width: 20,
              height: 20,
              transform: `rotate(${paw.rotation}deg)`,
            }}
          >
            <PawIcon className="w-full h-full text-[#2D9B6F]" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
