
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search, BookOpen, Users, Settings, CreditCard, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HelpCenter = () => {
  const helpCategories = [
    {
      icon: BookOpen,
      title: "Primeiros Passos",
      description: "Aprenda como usar nossa plataforma",
      topics: ["Como criar uma conta", "Fazendo seu primeiro pedido", "Navegando pelo painel"]
    },
    {
      icon: Users,
      title: "Para Clientes",
      description: "Ajuda específica para clientes",
      topics: ["Solicitar serviços", "Acompanhar chamados", "Avaliar técnicos"]
    },
    {
      icon: Settings,
      title: "Para Técnicos",
      description: "Suporte para técnicos parceiros",
      topics: ["Cadastro de técnico", "Gerenciar serviços", "Receber pagamentos"]
    },
    {
      icon: CreditCard,
      title: "Pagamentos",
      description: "Dúvidas sobre faturas e pagamentos",
      topics: ["Métodos de pagamento", "Reembolsos", "Faturas"]
    },
    {
      icon: Shield,
      title: "Segurança",
      description: "Informações sobre segurança e privacidade",
      topics: ["Proteção de dados", "Verificação de técnicos", "Política de privacidade"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="section-padding">
        <div className="container-standard">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-tech-primary mb-4 font-inter">
              Central de Ajuda
            </h1>
            <p className="text-xl text-gray-secondary max-w-3xl mx-auto mb-8 font-inter">
              Encontre guias, tutoriais e respostas para todas as suas dúvidas sobre nossa plataforma.
            </p>
            
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Buscar ajuda..."
                className="w-full pl-12 pr-4 py-3 border border-gray-border rounded-lg focus:ring-2 focus:ring-tech-primary focus:border-tech-primary font-inter"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-secondary" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {helpCategories.map((category, index) => (
              <div key={index} className="card-standard hover:shadow-md transition-shadow duration-200">
                <category.icon className="h-12 w-12 text-tech-primary mb-4" />
                <h3 className="text-xl font-semibold text-tech-primary mb-2 font-inter">
                  {category.title}
                </h3>
                <p className="text-gray-secondary mb-4 font-inter">
                  {category.description}
                </p>
                <ul className="space-y-2 mb-4">
                  {category.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="text-sm text-gray-primary font-inter">
                      • {topic}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="w-full">
                  Ver Artigos
                </Button>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-standard">
              <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                Artigos Populares
              </h2>
              <div className="space-y-3">
                <a href="#" className="block text-tech-primary hover:text-tech-primary-hover font-inter link-underline">
                  Como solicitar um serviço técnico
                </a>
                <a href="#" className="block text-tech-primary hover:text-tech-primary-hover font-inter link-underline">
                  Rastreando seu chamado
                </a>
                <a href="#" className="block text-tech-primary hover:text-tech-primary-hover font-inter link-underline">
                  Métodos de pagamento aceitos
                </a>
                <a href="#" className="block text-tech-primary hover:text-tech-primary-hover font-inter link-underline">
                  Como se tornar um técnico parceiro
                </a>
                <a href="#" className="block text-tech-primary hover:text-tech-primary-hover font-inter link-underline">
                  Política de cancelamento
                </a>
              </div>
            </div>

            <div className="card-standard">
              <h2 className="text-2xl font-semibold text-tech-primary mb-4 font-inter">
                Ainda precisa de ajuda?
              </h2>
              <p className="text-gray-secondary mb-6 font-inter">
                Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida ou problema.
              </p>
              <div className="space-y-3">
                <Link to="/support">
                  <Button className="w-full">
                    Entrar em Contato
                  </Button>
                </Link>
                <Link to="/faq">
                  <Button variant="outline" className="w-full">
                    Ver FAQ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenter;
