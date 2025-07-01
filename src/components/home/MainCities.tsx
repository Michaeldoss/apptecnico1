
import React from "react";
import { Link } from "react-router-dom";

const MainCities = () => {
  const cities = [
    "Técnico em São Paulo", 
    "Técnico em Rio de Janeiro", 
    "Técnico em Belo Horizonte", 
    "Técnico em Porto Alegre", 
    "Técnico em Salvador", 
    "Técnico em Brasília", 
    "Técnico em Curitiba", 
    "Técnico em Recife", 
    "Técnico em Fortaleza", 
    "Técnico em Manaus"
  ];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-4 font-inter">
            Principais Cidades Atendidas
          </h2>
          <p className="text-gray-600 text-lg font-inter">
            Encontre técnicos especializados nas principais cidades do Brasil
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cities.map((city, index) => (
            <Link
              key={index}
              to="/find-technician"
              className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 border border-gray-200"
            >
              <span className="text-blue-600 hover:text-blue-700 font-medium font-inter">
                {city}
              </span>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/find-technician" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-lg font-inter"
          >
            Ver Todas as Cidades
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainCities;
