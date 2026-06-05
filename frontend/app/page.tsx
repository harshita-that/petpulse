import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import SmallChanges from "@/components/sections/SmallChanges";
import ScanDemo from "@/components/sections/ScanDemo";
import Timeline from "@/components/sections/Timeline";
import EmotionalMoment from "@/components/sections/EmotionalMoment";
import Pricing from "@/components/sections/Pricing";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";

// Dynamic imports for heavy animation components (client-only, no SSR)
const LoadingScreen = dynamic(() => import("@/components/layout/LoadingScreen"), { ssr: false });
const CursorTrail = dynamic(() => import("@/components/layout/CursorTrail"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/layout/ScrollProgress"), { ssr: false });
const NotificationToasts = dynamic(() => import("@/components/layout/NotificationToasts"), { ssr: false });

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CursorTrail />
      <ScrollProgress />
      <NotificationToasts />

      <main className="relative overflow-hidden">
        <Navbar />
        <Hero />
        <SmallChanges />
        <ScanDemo />
        <Timeline />
        <EmotionalMoment />
        <Pricing />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
