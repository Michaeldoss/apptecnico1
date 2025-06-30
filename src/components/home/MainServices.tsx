
import React from "react";
import { Link } from "react-router-dom";

const MainServices = () => {
  const services = [
    "Técnico em Eletrônicos", 
    "Manutenção Industrial", 
    "Assistência em Impressoras", 
    "Técnico em Refrigeração", 
    "Manutenção de Equipamentos", 
    "Assistência em Ar Condicionado", 
    "Técnico em Informática", 
    "Soldagem e Metalurgia", 
    "Automação Industrial", 
    "Calibração de Equipamentos"
  ];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nossos Principais Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              to="/services"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-tech-primary"
            >
              <h3 className="font-semibold text-lg text-gray-800">{service}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainServices;
