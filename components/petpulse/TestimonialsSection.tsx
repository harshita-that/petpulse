'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "I noticed my dog's eyes looked slightly different in the scan. PetPulse flagged early cataracts. My vet confirmed it. We caught it a year early.",
    author: 'Sarah M.',
    role: 'Golden Retriever mom',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&q=80&auto=format&fit=crop&crop=face',
    petPhoto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=60&h=60&q=80&auto=format&fit=crop',
    stars: 5,
    side: 'left',
    delay: 0,
  },
  {
    text: "My vet actually asked where I got the health report. When I told her it was from an app, she wanted to see it herself. That's when I knew PetPulse was something special.",
    author: 'James K.',
    role: 'Labrador owner',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&q=80&auto=format&fit=crop&crop=face',
    petPhoto: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=60&h=60&q=80&auto=format&fit=crop',
    stars: 5,
    side: 'center',
    delay: 0.15,
  },
  {
    text: "The timeline feature is incredible. Being able to show my vet 3 months of health trends in one visual changed the whole conversation.",
    author: 'Priya L.',
    role: 'Cat parent of two',
    photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=80&h=80&q=80&auto=format&fit=crop&crop=face',
    petPhoto: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=60&h=60&q=80&auto=format&fit=crop',
    stars: 5,
    side: 'right',
    delay: 0.3,
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-28 bg-[#F3F0E8] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96"
          style={{ background: 'radial-gradient(circle, rgba(232,245,239,0.5) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80"
          style={{ background: 'radial-gradient(circle, rgba(254,240,235,0.4) 0%, transparent 70%)' }}
        />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2D9B6F] mb-4"
          >
            Real stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.1]"
          >
            Pet parents{' '}
            <em className="font-display not-italic gradient-text">love it</em>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: t.side === 'left' ? -60 : t.side === 'right' ? 60 : 0,
                y: t.side === 'center' ? 40 : 20,
              }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 + t.delay }}
              className="bg-white rounded-3xl p-7 border border-[#E8E4DA] shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, si) => (
                  <span key={si} className="text-[#F4845F] text-sm">&#9733;</span>
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="w-6 h-6 text-[#E8E4DA] mb-3" />

              {/* Text */}
              <p className="text-[#1A1A1A] leading-relaxed mb-6 flex-1 font-medium">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.photo}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#E8E4DA]"
                  />
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">{t.author}</p>
                    <p className="text-xs text-[#6B7280]">{t.role}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#E8E4DA]">
                  <img src={t.petPhoto} alt="pet" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
