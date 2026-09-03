import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { DoctorCapsule } from './components/DoctorCapsule';
import { VisitStorySection } from './components/VisitStorySection';
import { TreatmentInteraction } from './components/TreatmentInteraction';
import { ResultsNumbers } from './components/ResultsNumbers';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { LayeredCardShowcase } from './components/LayeredCardShowcase';
import { EditorialReviews } from './components/EditorialReviews';
import { LocationSection } from './components/LocationSection';
import { FaqSection } from './components/FaqSection';
import { AppointmentSection } from './components/AppointmentSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { FloatingBookingBar } from './components/FloatingBookingBar';
import { CustomMagneticCursor } from './components/CustomMagneticCursor';
import { GlobalParticleSystem } from './components/GlobalParticleSystem';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#DCE8B8] text-[#122342] flex flex-col font-general selection:bg-[#F4E94A] selection:text-[#122342] relative">
      
      {/* 00 — GLOBAL PARTICLE SYSTEM (Ambient white, blue, & yellow dust motes with mouse parallax) */}
      <GlobalParticleSystem />

      {/* 00 — CUSTOM MAGNETIC CURSOR ON DESKTOP */}
      <CustomMagneticCursor />

      {/* 00 — SLIM SCROLL PROGRESS BAR (#F4E94A) */}
      <ScrollProgressBar />

      {/* 01 — HERO SECTION (Centred large blue rounded stage with 3D micro-motion & choreographed load) */}
      <HeroSection onOpenBooking={handleOpenBooking} />

      {/* 02 — MEET THE DENTIST CAPSULE (Interactive split capsule revealing doctor philosophy) */}
      <DoctorCapsule onOpenBooking={handleOpenBooking} />

      {/* 03 — WHAT HAPPENS WHEN YOU VISIT? (Step-by-step interactive journey with magnetic 3D tilt) */}
      <VisitStorySection onOpenBooking={handleOpenBooking} />

      {/* 04 — INTERACTIVE TREATMENT WORKFLOW (Central interactive tooth object with treatment tabs) */}
      <TreatmentInteraction onOpenBooking={handleOpenBooking} />

      {/* 05 — VERIFIED RESULTS & NUMBERS (Animated 5.0 rating, 16 reviews, 10 PM hours, Sector 44) */}
      <ResultsNumbers />

      {/* 06 — BEFORE / AFTER DENTAL RESTORATION SLIDER */}
      <BeforeAfterSection />

      {/* 07 — LAYERED CARD PHYSICAL SHOWCASE (Stacked cards with drag and shuffle mechanics) */}
      <LayeredCardShowcase onOpenBooking={handleOpenBooking} />

      {/* 08 — EDITORIAL REVIEWS COMPOSITION (Large featured review with layered stack) */}
      <EditorialReviews />

      {/* 09 — LOCATION & TIMINGS (Village Chhalera & Sadarpur, Sector 44, Noida with pulsing map marker) */}
      <LocationSection />

      {/* 10 — FREQUENTLY ASKED QUESTIONS (Smooth expanding accordion with rotating plus icons) */}
      <FaqSection onOpenBooking={handleOpenBooking} />

      {/* 11 — DIRECT APPOINTMENT RESERVATION */}
      <AppointmentSection />

      {/* 12 — FOOTER (Deep navy canvas with oversized Satoshi typography, verified details & back-to-top) */}
      <Footer />

      {/* 25 — FLOATING QUICK-BOOKING BAR (Appears on scroll > 350px) */}
      <FloatingBookingBar onOpenBooking={handleOpenBooking} />

      {/* Quick Booking Modal accessible anywhere */}
      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
    </div>
  );
}
