
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import HomeHighlights from "@/components/home/HomeHighlights";
import HowItWorks from "@/components/home/HowItWorks";
import Benefits from "@/components/home/Benefits";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import ServiceCategories from "@/components/home/ServiceCategories";
import MainCities from "@/components/home/MainCities";
import CompanyValues from "@/components/home/CompanyValues";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HomeHighlights />
      <HowItWorks />
      <Benefits />
      <Features />
      <Testimonials />
      <ServiceCategories />
      <MainCities />
      <CompanyValues />
      <Footer />
    </div>
  );
};

export default Index;
