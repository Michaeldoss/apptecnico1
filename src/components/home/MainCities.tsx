
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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Principais cidades
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {cities.map((city, index) => (
            <Link
              key={index}
              to="/find-technician"
              className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm p-2 text-center transition-colors duration-200"
            >
              {city}
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/find-technician" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
            Ver mais
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainCities;
