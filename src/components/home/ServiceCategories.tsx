import React from "react";
import { Link } from "react-router-dom";

const ServiceCategories = () => {
  const categories = ["Assistência Técnica", "Consultoria", "Design e Tecnologia", "Manutenção Industrial", "Automação", "Calibração", "Soldagem", "Eletrônica", "Refrigeração", "Informática"];
  const institutional = ["Quem Somos", "Trabalhe Conosco", "Blog", "Segurança", "Mapa do Site", "Ajuda"];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Categorias de Serviços</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/services"
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <span className="text-sm font-medium text-gray-700">{category}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ServiceCategories;