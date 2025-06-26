
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import MainServices from "@/components/home/MainServices";
import ServiceCategories from "@/components/home/ServiceCategories";
import TopTechniciansCarousel from "@/components/home/TopTechniciansCarousel";
import TechnicianCarousel from "@/components/home/TechnicianCarousel";
import MainCities from "@/components/home/MainCities";
import CompanyValues from "@/components/home/CompanyValues";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <MainServices />
      <ServiceCategories />
      <TopTechniciansCarousel />
      <TechnicianCarousel />
      <MainCities />
      <CompanyValues />
      <Footer />
    </div>
  );
};

export default Index;
