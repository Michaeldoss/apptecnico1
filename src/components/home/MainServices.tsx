
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Principais serviços
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {services.map((service, index) => (
            <Link
              key={index}
              to="/find-technician"
              className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm p-2 text-center transition-colors duration-200"
            >
              {service}
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/services" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
            Ver mais
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainServices;
