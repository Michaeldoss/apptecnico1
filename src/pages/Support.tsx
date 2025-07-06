import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MessageCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Support = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container-standard text-center">
          <div className="max-w-4xl mx-auto">
            <MessageCircle className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h1 className="text-5xl font-bold mb-6 font-inter">
              Central de Suporte
            </h1>
            <p className="text-xl text-blue-100 font-inter max-w-2xl mx-auto">
              Estamos aqui para ajudar você. Entre em contato conosco ou encontre respostas para suas dúvidas.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options Section */}
      <section className="section-padding">
        <div className="container-standard">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="card-standard text-center hover-scale animate-fade-in">
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-inter">Email</h3>
              <p className="text-gray-600 mb-4 font-inter">suporte@instalei.com.br</p>
              <Button className="btn-outline">
                Enviar Email
              </Button>
            </div>

            <div className="card-standard text-center hover-scale animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-inter">Telefone</h3>
              <p className="text-gray-600 mb-4 font-inter">+55 47 99734-2869</p>
              <Button className="btn-outline">
                Ligar Agora
              </Button>
            </div>

            <div className="card-standard text-center hover-scale animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-inter">Atendimento Virtual</h3>
              <p className="text-gray-600 mb-4 font-inter">Disponível 24/7</p>
              <Button className="btn-primary">
                Iniciar Chat
              </Button>
            </div>

            <div className="card-standard text-center hover-scale animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-inter">FAQ</h3>
              <p className="text-gray-600 mb-4 font-inter">Perguntas frequentes</p>
              <Link to="/faq">
                <Button className="btn-secondary">
                  Ver FAQ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-standard">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-inter">
              Como podemos ajudar você?
            </h2>
            <p className="text-gray-600 font-inter text-lg max-w-2xl mx-auto">
              Nossa equipe especializada está pronta para atender suas necessidades específicas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card-standard animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-inter">Para Clientes</h3>
              <ul className="space-y-3 text-gray-700 font-inter">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Problemas com agendamento de serviços
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Dúvidas sobre pagamentos
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Rastreamento de chamados
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Suporte técnico geral
                </li>
              </ul>
            </div>
            
            <div className="card-standard animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-inter">Para Técnicos</h3>
              <ul className="space-y-3 text-gray-700 font-inter">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Cadastro e verificação
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Gerenciamento de serviços
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Problemas com pagamentos
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Suporte da plataforma
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Support;