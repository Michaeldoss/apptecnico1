
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-8">Categorias de Serviços</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to="/services"
                  className="text-gray-700 hover:text-tech-primary transition-colors p-2 border-b border-gray-100 hover:border-tech-primary"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-8">Institucional</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {institutional.map((item, index) => (
                <Link
                  key={index}
                  to="/about"
                  className="text-gray-700 hover:text-tech-primary transition-colors p-2 border-b border-gray-100 hover:border-tech-primary"
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
