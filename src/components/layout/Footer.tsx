
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-tech-primary font-inter">AssistAnywhere</h3>
            <p className="text-gray-secondary text-sm mb-4 font-inter">
              Conectando você aos melhores técnicos para resolver seus problemas tecnológicos.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-secondary hover:text-tech-primary transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-secondary hover:text-tech-primary transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-secondary hover:text-tech-primary transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-secondary hover:text-tech-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
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
                <Link to="/services" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
                  Serviços
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
                <Link to="/help" className="text-gray-secondary hover:text-tech-primary transition-colors duration-200 font-inter">
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
          <p className="font-inter">&copy; {currentYear} AssistAnywhere. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-tech-primary transition-colors duration-200 font-inter">
              Termos
            </Link>
            <Link to="/privacy" className="hover:text-tech-primary transition-colors duration-200 font-inter">
              Privacidade
            </Link>
            <Link to="/cookies" className="hover:text-tech-primary transition-colors duration-200 font-inter">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
