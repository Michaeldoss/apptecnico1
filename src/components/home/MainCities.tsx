import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const MainCities = () => {
  const cities = ["Técnico em São Paulo", "Técnico em Rio de Janeiro", "Técnico em Belo Horizonte", "Técnico em Porto Alegre", "Técnico em Salvador", "Técnico em Brasília", "Técnico em Curitiba", "Técnico em Recife", "Técnico em Fortaleza", "Técnico em Manaus"];
  return (
    <section className="py-16 relative overflow-hidden bg-mesh">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block glass px-4 py-2 rounded-full text-sm font-semibold text-accent mb-4 font-display tracking-wide">
            COBERTURA NACIONAL
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Principais <span className="text-gradient">Cidades</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {cities.map((city, index) => (
            <Link
              key={index}
              to="/find-technician"
              className="p-4 glass rounded-xl border border-border/40 hover:border-accent/50 hover:shadow-glow-accent transition-all duration-300 hover:-translate-y-1 text-center group flex items-center justify-center gap-2"
            >
              <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{city}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainCities;
