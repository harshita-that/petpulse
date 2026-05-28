'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for curious pet parents.',
    features: [
      '3 health scans per month',
      'Basic health insights',
      'Coat & eye analysis',
      'Email reports',
    ],
    cta: 'Get started',
    ctaStyle: 'ghost',
    recommended: false,
    color: '#6B7280',
    delay: 0,
  },
  {
    name: 'Plus',
    price: '$12',
    period: 'per month',
    description: 'For the devoted pet parent.',
    features: [
      'Unlimited health scans',
      'Full 40+ indicator analysis',
      'Health timeline & trends',
      'Vet-ready PDF reports',
      'Early alert system',
      'Priority support',
    ],
    cta: 'Start free trial',
    ctaStyle: 'primary',
    recommended: true,
    color: '#2D9B6F',
    delay: 0.15,
  },
  {
    name: 'Premium',
    price: '$29',
    period: 'per month',
    description: 'Multi-pet households & power users.',
    features: [
      'Everything in Plus',
      'Up to 5 pets',
      'Vet consultation credits',
      'Breed-specific insights',
      'Historical data export',
      'Dedicated care advisor',
    ],
    cta: 'Start free trial',
    ctaStyle: 'warm',
    recommended: false,
    color: '#F4845F',
    delay: 0.3,
  },
];

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-28 bg-[#FAFAF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2D9B6F] mb-4"
          >
            Simple pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.1] mb-4"
          >
            The right plan for{' '}
            <em className="font-display not-italic gradient-text">your pet</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#6B7280] text-lg max-w-md mx-auto"
          >
            Start free. Upgrade when you're ready. Cancel anytime.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 + plan.delay }}
              className={`relative rounded-3xl border transition-all duration-500 ${
                plan.recommended
                  ? 'border-[#2D9B6F]/30 shadow-[0_20px_80px_rgba(45,155,111,0.18)] bg-white scale-[1.02]'
                  : 'border-[#E8E4DA] shadow-[0_8px_40px_rgba(0,0,0,0.06)] bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1.5 bg-[#2D9B6F] text-white text-xs font-semibold rounded-full shadow-md">
                  <Zap className="w-3 h-3" />
                  Most popular
                </div>
              )}

              <div className="p-7">
                {/* Plan name */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-semibold text-[#6B7280] tracking-wide uppercase">
                    {plan.name}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: plan.color }}
                  />
                </div>

                {/* Price */}
                <div className="mb-2">
                  <span className="font-display text-5xl font-bold text-[#1A1A1A]">{plan.price}</span>
                  <span className="text-[#6B7280] text-sm ml-2">/{plan.period}</span>
                </div>
                <p className="text-sm text-[#6B7280] mb-6">{plan.description}</p>

                {/* CTA */}
                <button
                  className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 ${
                    plan.ctaStyle === 'primary'
                      ? 'bg-[#2D9B6F] text-white hover:bg-[#247B58] shadow-[0_8px_24px_rgba(45,155,111,0.3)]'
                      : plan.ctaStyle === 'warm'
                      ? 'bg-[#F4845F] text-white hover:bg-[#F16A41] btn-breathe'
                      : 'border-2 border-[#E8E4DA] text-[#1A1A1A] hover:border-[#2D9B6F] hover:text-[#2D9B6F]'
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Divider */}
                <div className="my-6 h-px bg-[#F3F0E8]" />

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, fi) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + plan.delay + fi * 0.05, duration: 0.3 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: plan.color + '20' }}
                      >
                        <Check className="w-2.5 h-2.5" style={{ color: plan.color }} />
                      </div>
                      <span className="text-[#6B7280]">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Bottom color bar */}
              {plan.recommended && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
                  style={{ background: `linear-gradient(90deg, ${plan.color}, ${plan.color}60)` }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center text-sm text-[#6B7280] mt-10"
        >
          All plans include a 14-day free trial. No credit card required.
        </motion.p>
      </div>
    </section>
  );
}
