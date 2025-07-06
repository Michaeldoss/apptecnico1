import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MessageCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Support = () => {
  return <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="section-padding">
        <div className="container-standard">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-tech-primary mb-4 font-inter">
              Central de Suporte
            </h1>
            <p className="text-xl text-gray-secondary max-w-3xl mx-auto font-inter">
              Estamos aqui para ajudar você. Entre em contato conosco ou encontre respostas para suas dúvidas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="card-standard text-center">
              <Mail className="h-12 w-12 text-tech-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-tech-primary mb-2 font-inter">Email</h3>
              <p className="text-gray-secondary mb-4 font-inter">suporte@instalei.com.br</p>
              <Button variant="outline" size="sm">
                Enviar Email
              </Button>
            </div>

            <div className="card-standard text-center">
              <Phone className="h-12 w-12 text-tech-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-tech-primary mb-2 font-inter">Telefone</h3>
              <p className="text-gray-secondary mb-4 font-inter">(11) 9999-9999</p>
              <Button variant="outline" size="sm">
                Ligar Agora
              </Button>
            </div>

            <div className="card-standard text-center">
              <MessageCircle className="h-12 w-12 text-tech-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-tech-primary mb-2 font-inter">Chat Online</h3>
              <p className="text-gray-secondary mb-4 font-inter">Disponível 24/7</p>
              <Button variant="outline" size="sm">
                Iniciar Chat
              </Button>
            </div>

            <div className="card-standard text-center">
              <HelpCircle className="h-12 w-12 text-tech-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-tech-primary mb-2 font-inter">FAQ</h3>
              <p className="text-gray-secondary mb-4 font-inter">Perguntas frequentes</p>
              <Link to="/faq">
                <Button variant="outline" size="sm">
                  Ver FAQ
                </Button>
              </Link>
            </div>
          </div>

          <div className="card-standard max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-tech-primary mb-6 font-inter">
              Como podemos ajudar você?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-tech-primary mb-3 font-inter">Para Clientes</h3>
                <ul className="space-y-2 text-gray-primary font-inter">
                  <li>• Problemas com agendamento de serviços</li>
                  <li>• Dúvidas sobre pagamentos</li>
                  <li>• Rastreamento de chamados</li>
                  <li>• Suporte técnico geral</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-tech-primary mb-3 font-inter">Para Técnicos</h3>
                <ul className="space-y-2 text-gray-primary font-inter">
                  <li>• Cadastro e verificação</li>
                  <li>• Gerenciamento de serviços</li>
                  <li>• Problemas com pagamentos</li>
                  <li>• Suporte da plataforma</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default Support;