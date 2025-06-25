
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, Contact as ContactIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6 flex items-center gap-4 text-blue-600 font-inter">
            <ContactIcon size={40} className="text-yellow-500" /> Entre em Contato
          </h1>
          <p className="text-gray-600 mb-8 text-lg font-inter">
            Estamos aqui para ajudar. Entre em contato conosco através dos canais abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-8 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-blue-600 font-inter">
              <Mail size={24} className="text-yellow-500" /> E-mail
            </h2>
            <p className="text-gray-600 mb-4 font-inter">
              Entre em contato por e-mail para suporte ou dúvidas:
            </p>
            <a 
              href="mailto:contato@dgsoluções.com" 
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium font-inter"
            >
              contato@dgsoluções.com
            </a>
          </div>

          <div className="p-8 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-blue-600 font-inter">
              <Phone size={24} className="text-yellow-500" /> Telefone
            </h2>
            <p className="text-gray-600 mb-4 font-inter">
              Nosso suporte telefônico está disponível em horário comercial:
            </p>
            <div className="text-blue-600 font-semibold font-inter">
              (11) 4002-8922
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="p-8 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <h2 className="text-2xl font-semibold mb-6 text-blue-600 font-inter">Formulário de Contato</h2>
            <p className="text-gray-600 mb-6 font-inter">
              Envie-nos uma mensagem e entraremos em contato em breve.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Nome" 
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-blue-600 transition-colors duration-200 font-inter"
              />
              <input 
                type="email" 
                placeholder="E-mail" 
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-blue-600 transition-colors duration-200 font-inter"
              />
              <textarea 
                placeholder="Sua mensagem" 
                className="w-full p-3 border-2 border-gray-200 rounded-lg col-span-full h-32 focus:border-blue-600 focus:ring-blue-600 transition-colors duration-200 font-inter"
              />
              <Button className="col-span-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg font-inter">
                Enviar Mensagem
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
