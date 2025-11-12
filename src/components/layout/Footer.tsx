
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
    <footer className="bg-gradient-to-r from-instalei-gray-50 to-white border-t border-instalei-gray-200">
      {/* Footer principal */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="font-bold text-xl mb-6 text-primary font-inter">Principais Cidades</h3>
              <div className="grid grid-cols-1 gap-1 text-sm">
                {cities.map((city, index) => (
                  <Link
                    key={index}
                    to="/find-technician"
                    className="text-instalei-gray-600 hover:text-[#ff6b2c] transition-colors duration-300 font-inter font-medium"
                  >
                    {city}
                  </Link>
                ))}
                <Link
                  to="/find-technician"
                  className="text-primary hover:text-[#ff6b2c] text-sm font-medium mt-2 font-inter"
                >
                  Ver mais
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-primary font-inter">Links Rápidos</h3>
              <ul className="space-y-3 text-base">
                <li>
                  <Link to="/" className="text-instalei-gray-600 hover:text-[#ff6b2c] transition-colors duration-300 font-inter font-medium">
                    Início
                  </Link>
                </li>
                <li>
                  <Link to="/store" className="text-instalei-gray-600 hover:text-[#ff6b2c] transition-colors duration-300 font-inter font-medium">
                    Loja
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-instalei-gray-600 hover:text-[#ff6b2c] transition-colors duration-300 font-inter font-medium">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-instalei-gray-600 hover:text-[#ff6b2c] transition-colors duration-300 font-inter font-medium">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-primary font-inter">Para Técnicos</h3>
              <ul className="space-y-3 text-base">
                <li>
                  <Link to="/technician" className="text-instalei-gray-600 hover:text-[#ff6b2c] transition-colors duration-300 font-inter font-medium">
                    Seja um Técnico
                  </Link>
                </li>
                <li>
                  <Link to="/tecnico/painel" className="text-instalei-gray-600 hover:text-[#ff6b2c] transition-colors duration-300 font-inter font-medium">
                    Dashboard do Técnico
                  </Link>
                </li>
                <li>
                  <Link to="/tecnico/servicos" className="text-instalei-gray-600 hover:text-[#ff6b2c] transition-colors duration-300 font-inter font-medium">
                    Serviços
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-primary font-inter">Suporte</h3>
              <ul className="space-y-3 text-base">
                <li>
                  <Link to="/faq" className="text-instalei-gray-600 hover:text-[#ff6b2c] transition-colors duration-300 font-inter font-medium">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/help-center" className="text-instalei-gray-600 hover:text-[#ff6b2c] transition-colors duration-300 font-inter font-medium">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-instalei-gray-600 hover:text-[#ff6b2c] transition-colors duration-300 font-inter font-medium">
                    Termos de Serviço
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-instalei-gray-600 hover:text-[#ff6b2c] transition-colors duration-300 font-inter font-medium">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p className="font-inter">&copy; {currentYear} Instalei. Todos os direitos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-600 hover:text-primary transition-colors duration-200 font-inter">
                Termos
              </Link>
              <Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors duration-200 font-inter">
                Privacidade
              </Link>
              <Link to="/cookies" className="text-gray-600 hover:text-primary transition-colors duration-200 font-inter">
                Política de Cookies
              </Link>
              <Link to="/support" className="text-gray-600 hover:text-primary transition-colors duration-200 font-inter">
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
