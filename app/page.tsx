'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/petpulse/Navbar';
import HeroSection from '@/components/petpulse/HeroSection';
import TinyThingsSection from '@/components/petpulse/TinyThingsSection';
import AIScanSection from '@/components/petpulse/AIScanSection';
import HealthTimeline from '@/components/petpulse/HealthTimeline';
import TestimonialsSection from '@/components/petpulse/TestimonialsSection';
import EmotionalMoment from '@/components/petpulse/EmotionalMoment';
import PricingSection from '@/components/petpulse/PricingSection';
import FinalCTA from '@/components/petpulse/FinalCTA';
import Footer from '@/components/petpulse/Footer';

const PawCursor = dynamic(() => import('@/components/petpulse/PawCursor'), { ssr: false });

export default function Home() {
  return (
    <main className="bg-[#FAFAF7] overflow-x-hidden">
      <PawCursor />
      <Navbar />
      <HeroSection />
      <TinyThingsSection />
      <AIScanSection />
      <HealthTimeline />
      <EmotionalMoment />
      <TestimonialsSection />
      <PricingSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
