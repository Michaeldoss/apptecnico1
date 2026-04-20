
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
    <footer className="relative bg-mesh-dark text-foreground border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
      {/* Footer principal */}
      <div className="py-16 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="font-display font-bold text-xl mb-6 text-white">Principais Cidades</h3>
              <div className="grid grid-cols-1 gap-1 text-sm">
                {cities.map((city, index) => (
                  <Link
                    key={index}
                    to="/find-technician"
                    className="text-white/60 hover:text-accent transition-colors duration-300 font-medium"
                  >
                    {city}
                  </Link>
                ))}
                <Link
                  to="/find-technician"
                  className="text-accent hover:text-accent/80 text-sm font-medium mt-2"
                >
                  Ver mais
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl mb-6 text-white">Links Rápidos</h3>
              <ul className="space-y-3 text-base">
                <li><Link to="/" className="text-white/60 hover:text-accent transition-colors duration-300 font-medium">Início</Link></li>
                <li><Link to="/store" className="text-white/60 hover:text-accent transition-colors duration-300 font-medium">Loja</Link></li>
                <li><Link to="/about" className="text-white/60 hover:text-accent transition-colors duration-300 font-medium">Sobre Nós</Link></li>
                <li><Link to="/contact" className="text-white/60 hover:text-accent transition-colors duration-300 font-medium">Contato</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl mb-6 text-white">Para Técnicos</h3>
              <ul className="space-y-3 text-base">
                <li><Link to="/technician" className="text-white/60 hover:text-accent transition-colors duration-300 font-medium">Seja um Técnico</Link></li>
                <li><Link to="/tecnico/painel" className="text-white/60 hover:text-accent transition-colors duration-300 font-medium">Dashboard do Técnico</Link></li>
                <li><Link to="/tecnico/servicos" className="text-white/60 hover:text-accent transition-colors duration-300 font-medium">Serviços</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl mb-6 text-white">Suporte</h3>
              <ul className="space-y-3 text-base">
                <li><Link to="/faq" className="text-white/60 hover:text-accent transition-colors duration-300 font-medium">FAQ</Link></li>
                <li><Link to="/help-center" className="text-white/60 hover:text-accent transition-colors duration-300 font-medium">Central de Ajuda</Link></li>
                <li><Link to="/terms" className="text-white/60 hover:text-accent transition-colors duration-300 font-medium">Termos de Serviço</Link></li>
                <li><Link to="/privacy" className="text-white/60 hover:text-accent transition-colors duration-300 font-medium">Política de Privacidade</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
            <p>&copy; {currentYear} Instalei. Todos os direitos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-white/40 hover:text-accent transition-colors duration-200">Termos</Link>
              <Link to="/privacy" className="text-white/40 hover:text-accent transition-colors duration-200">Privacidade</Link>
              <Link to="/cookies" className="text-white/40 hover:text-accent transition-colors duration-200">Política de Cookies</Link>
              <Link to="/support" className="text-white/40 hover:text-accent transition-colors duration-200">Suporte</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
