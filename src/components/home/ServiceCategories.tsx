
import React from "react";
import { Link } from "react-router-dom";

const ServiceCategories = () => {
  const categories = [
    "Assistência Técnica",
    "Consultoria",
    "Design e Tecnologia",
    "Manutenção Industrial",
    "Automação",
    "Calibração",
    "Soldagem",
    "Eletrônica",
    "Refrigeração",
    "Informática"
  ];

  const institutional = [
    "Quem Somos",
    "Trabalhe Conosco",
    "Blog",
    "Segurança",
    "Mapa do Site",
    "Ajuda"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Serviços</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to="/services"
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm py-1 transition-colors duration-200"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Institucional</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {institutional.map((item, index) => (
                <Link
                  key={index}
                  to="/about"
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm py-1 transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
