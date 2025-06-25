
import React from "react";
import Hero from "@/components/home/Hero";
import CompanyValues from "@/components/home/CompanyValues";
import Features from "@/components/home/Features";
import MainServices from "@/components/home/MainServices";
import MainCities from "@/components/home/MainCities";
import ServiceCategories from "@/components/home/ServiceCategories";
import TechnicianCarousel from "@/components/home/TechnicianCarousel";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <CompanyValues />
      <MainServices />
      <MainCities />
      <ServiceCategories />
      <Features />
      <TechnicianCarousel />
    </div>
  );
};

export default Index;
