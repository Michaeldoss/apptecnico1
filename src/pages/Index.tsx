
import React from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import TechnicianCarousel from "@/components/home/TechnicianCarousel";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <TechnicianCarousel />
      <Features />
    </div>
  );
};

export default Index;
