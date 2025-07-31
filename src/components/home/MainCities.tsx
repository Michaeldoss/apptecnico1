import React from "react";
import { Link } from "react-router-dom";
const MainCities = () => {
  const cities = ["Técnico em São Paulo", "Técnico em Rio de Janeiro", "Técnico em Belo Horizonte", "Técnico em Porto Alegre", "Técnico em Salvador", "Técnico em Brasília", "Técnico em Curitiba", "Técnico em Recife", "Técnico em Fortaleza", "Técnico em Manaus"];
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Principais Cidades</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {cities.map((city, index) => (
            <Link key={index} to="/find-technician" className="p-4 bg-card rounded-lg hover:bg-accent/50 transition-colors text-center border">
              <span className="text-sm font-medium">{city}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default MainCities;