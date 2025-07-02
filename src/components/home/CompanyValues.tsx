
import React from "react";

const CompanyValues = () => {
  const values = [
    "Satisfação do cliente em 1º lugar", 
    "Se apaixonar pelo problema", 
    "Segurança é inegociável", 
    "Gerar valor para o nosso ecossistema", 
    "Inovar com simplicidade", 
    "Desafio é a nossa diversão"
  ];
  
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">{index + 1}</span>
              </div>
              <h3 className="font-semibold text-lg">{value}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;
