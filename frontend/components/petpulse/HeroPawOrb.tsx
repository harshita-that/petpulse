'use client';

import { useEffect, useRef } from 'react';
import PawIcon from './PawIcon';

export default function HeroPawOrb() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const rect = orbRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / 40;
      const dy = (e.clientY - cy) / 40;
      orbRef.current.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.5}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div ref={orbRef} className="relative transition-transform duration-300 ease-out">
        {/* Outer glow */}
        <div
          className="absolute rounded-full opacity-40 blur-2xl animate-pulse"
          style={{
            inset: '-20%',
            background: 'radial-gradient(circle, rgba(126,200,227,0.5) 0%, rgba(45,155,111,0.2) 50%, transparent 70%)',
          }}
        />

        {/* Main orb */}
        <div
          className="relative w-48 h-48 rounded-full"
          style={{
            animation: 'float 4s ease-in-out infinite',
            background: 'radial-gradient(circle at 35% 35%, #AADCEF 0%, #7EC8E3 30%, #55B5D7 60%, #2D9B6F 100%)',
            boxShadow: 'inset -10px -10px 30px rgba(0,0,0,0.08), 0 20px 60px rgba(126,200,227,0.3), 0 0 80px rgba(45,155,111,0.15)',
          }}
        >
          {/* Specular highlight */}
          <div
            className="absolute rounded-full opacity-60"
            style={{
              top: '15%',
              left: '20%',
              width: '40%',
              height: '30%',
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, transparent 70%)',
            }}
          />

          {/* Paw icon inside orb */}
          <div className="absolute inset-0 flex items-center justify-center">
            <PawIcon
              className="w-16 h-16 text-white/80"
            />
          </div>
        </div>

        {/* Orbiting dot */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: 0,
            animation: 'orbit 6s linear infinite',
          }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: '#F4845F',
              boxShadow: '0 0 12px rgba(244,132,95,0.6)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
