
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile"; // Alterando para importação nomeada

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Simulando um usuário logado como técnico (isso seria controlado por um contexto de autenticação real)
  const isLoggedIn = false;
  const isTechnician = false;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">TechSupport</span>
        </Link>

        {/* Navegação para Desktop */}
        {!isMobile && (
          <nav className="flex-1 flex justify-center">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="px-2 py-1 text-foreground/70 hover:text-foreground transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/services" className="px-2 py-1 text-foreground/70 hover:text-foreground transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/store" className="px-2 py-1 text-foreground/70 hover:text-foreground transition-colors">
                  Loja
                </Link>
              </li>
              <li>
                <Link to="/about" className="px-2 py-1 text-foreground/70 hover:text-foreground transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contact" className="px-2 py-1 text-foreground/70 hover:text-foreground transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/technician" className="px-2 py-1 text-foreground/70 hover:text-foreground transition-colors">
                  Para Técnicos
                </Link>
              </li>
            </ul>
          </nav>
        )}

        <div className="flex items-center space-x-3">
          {!isMobile && (
            <>
              {isLoggedIn ? (
                <>
                  {isTechnician && (
                    <Link to="/tecnico/painel">
                      <Button variant="outline" size="sm">
                        Painel do Técnico
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" size="sm">
                    Minha Conta
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Cadastrar</Button>
                  </Link>
                </>
              )}
            </>
          )}

          {isMobile && (
            <Button variant="ghost" onClick={toggleMenu} className="p-1 w-9 h-9">
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </Button>
          )}
        </div>
      </div>

      {/* Menu móvel */}
      {isMobile && (
        <div
          className={cn(
            "fixed top-16 left-0 right-0 bottom-0 bg-background z-40 transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="px-2 py-3 border-b border-border text-foreground/90 hover:text-foreground transition-colors"
                onClick={toggleMenu}
              >
                Início
              </Link>
              <Link
                to="/services"
                className="px-2 py-3 border-b border-border text-foreground/90 hover:text-foreground transition-colors"
                onClick={toggleMenu}
              >
                Serviços
              </Link>
              <Link
                to="/store"
                className="px-2 py-3 border-b border-border text-foreground/90 hover:text-foreground transition-colors"
                onClick={toggleMenu}
              >
                Loja
              </Link>
              <Link
                to="/about"
                className="px-2 py-3 border-b border-border text-foreground/90 hover:text-foreground transition-colors"
                onClick={toggleMenu}
              >
                Sobre
              </Link>
              <Link
                to="/contact"
                className="px-2 py-3 border-b border-border text-foreground/90 hover:text-foreground transition-colors"
                onClick={toggleMenu}
              >
                Contato
              </Link>

              <div className="flex flex-col space-y-3 mt-4">
                {isLoggedIn ? (
                  <>
                    {isTechnician && (
                      <Link to="/tecnico/painel" onClick={toggleMenu}>
                        <Button variant="outline" className="w-full">
                          Painel do Técnico
                        </Button>
                      </Link>
                    )}
                    <Button className="w-full">Minha Conta</Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={toggleMenu}>
                      <Button variant="outline" className="w-full">
                        Entrar
                      </Button>
                    </Link>
                    <Link to="/register" onClick={toggleMenu}>
                      <Button className="w-full">Cadastrar</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
