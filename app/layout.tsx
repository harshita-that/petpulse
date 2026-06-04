import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PetPulse — AI Pet Health Tracking Between Vet Visits",
  description:
    "Notice health changes before they become emergencies. AI-powered photo analysis for your pet's teeth, eyes, skin, and gait.",
  keywords: ["pet health", "dog health", "cat health", "AI", "veterinary", "pet care"],
  openGraph: {
    title: "PetPulse — AI Pet Health Tracking",
    description: "Notice health changes before they become emergencies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
