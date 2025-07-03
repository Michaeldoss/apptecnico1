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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Principais Cidades Atendidas
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encontre técnicos qualificados nas principais cidades do Brasil
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {cities.map((city, index) => (
            <Link
              key={index}
              to="/find-technician"
              className="bg-card hover:bg-accent/50 p-4 rounded-lg text-center transition-colors duration-200 border border-border hover:border-primary/30"
            >
              <span className="text-sm font-medium text-card-foreground hover:text-primary">
                {city}
              </span>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/find-technician" 
            className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors duration-200"
          >
            Ver todas as cidades
          </Link>
        </div>
      </div>
    </section>
  );
};
export default MainCities;