
import React from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import TechnicianCarousel from "@/components/home/TechnicianCarousel";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <TechnicianCarousel />
      <Footer />
    </div>
  );
};

export default Index;
