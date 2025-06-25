
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Nossa equipe trabalhando
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8">
            Os maiores valores dos nossos profissionais
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {values.map((value, index) => (
              <div key={index} className="flex items-center text-left bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-gray-800 font-medium">{value}</span>
              </div>
            ))}
          </div>
          
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            Conheça nossas vagas
          </button>
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;
