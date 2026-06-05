'use client';

import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] py-16 relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#2D9B6F] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#2D9B6F] flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-display text-xl font-semibold text-white">PetPulse</span>
            </div>
            <p className="text-[#6B7280] text-sm leading-relaxed max-w-sm">
              AI-powered health check-ins for pets. Built by people who love animals,
              for people who love animals.
            </p>
            <p className="text-[#6B7280] text-xs mt-4">
              Made with <Heart className="w-3 h-3 inline text-[#F4845F] fill-[#F4845F]" /> for every tail that wags
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5">
              {['How it works', 'Features', 'Pricing', 'Mobile app'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['About', 'Blog', 'Privacy', 'Terms'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#6B7280] text-xs">
            © 2024 PetPulse Inc. All rights reserved.
          </p>
          <p className="text-[#6B7280] text-xs">
            Veterinary AI should complement, never replace, professional care.
          </p>
        </div>
      </div>
    </footer>
  );
}
