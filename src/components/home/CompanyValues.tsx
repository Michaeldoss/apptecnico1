
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
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Nossa equipe trabalhando
          </h2>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Os maiores valores dos nossos profissionais
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            {values.map((value, index) => (
              <div key={index} className="flex items-center text-left bg-white p-2 rounded border border-gray-200">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-gray-800 text-sm">{value}</span>
              </div>
            ))}
          </div>
          
          <button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm">
            Conheça nossas vagas
          </button>
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;
