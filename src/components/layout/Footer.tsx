import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const cities = [
    "Técnico em São Paulo",
    "Técnico em Rio de Janeiro", 
    "Técnico em Belo Horizonte",
    "Técnico em Porto Alegre",
    "Técnico em Salvador"
  ];

  return (
    <footer className="bg-white border-t border-gray-border">
      {/* Footer principal */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-tech-primary font-inter">Principais Cidades</h3>
              <div className="grid grid-cols-1 gap-1 text-sm">
                {cities.map((city, index) => (
                  <Link
                    key={index}
                    to="/find-technician"
                    className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter"
                  >
                    {city}
                  </Link>
                ))}
                <Link 
                  to="/find-technician" 
                  className="text-tech-primary hover:text-blue-700 text-sm font-medium mt-2 font-inter"
                >
                  Ver mais
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-4 text-tech-primary font-inter">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                    Início
                  </Link>
                </li>
                <li>
                  <Link to="/store" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                    Loja
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-4 text-tech-primary font-inter">Para Técnicos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/technician" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                    Seja um Técnico
                  </Link>
                </li>
                <li>
                  <Link to="/tecnico/painel" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                    Dashboard do Técnico
                  </Link>
                </li>
                <li>
                  <Link to="/tecnico/servicos" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                    Serviços
                  </Link>
                </li>
                <li>
                  <Link to="/tecnico/pecas" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                    Peças
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-4 text-tech-primary font-inter">Suporte</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/faq" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/help-center" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                    Termos de Serviço
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-secondary">
            <p className="font-inter">&copy; {currentYear} DGSoluções. Todos os direitos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                Termos
              </Link>
              <Link to="/privacy" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                Privacidade
              </Link>
              <Link to="/cookies" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                Política de Cookies
              </Link>
              <Link to="/support" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                Suporte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
