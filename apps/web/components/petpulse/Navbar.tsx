'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#E8E4DA] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#2D9B6F] flex items-center justify-center">
            <span className="animate-heartbeat inline-block">
              <Heart className="w-4 h-4 text-white fill-white" />
            </span>
          </div>
          <span className="font-display text-xl font-semibold text-[#1A1A1A] tracking-tight">
            PetPulse
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['How it works', 'Features', 'Pricing'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-[#6B7280] hover:text-[#1A1A1A] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-[#1A1A1A] hover:text-[#2D9B6F] transition-colors duration-200 hidden md:block">
            Sign in
          </button>
          <button className="px-4 py-2 bg-[#F4845F] text-white text-sm font-semibold rounded-full hover:bg-[#F16A41] transition-all duration-200 btn-breathe">
            Get started
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
