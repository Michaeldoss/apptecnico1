import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogIn, LogOut, UserPlus, Wrench, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isAuthenticated,
    userType,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLoginClick = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };
  const handleLogout = async () => {
    console.log('🚪 Navbar - Iniciando logout...');
    await logout();
  };

  const handleForceReset = () => {
    console.log('🔥 Force reset solicitado...');
    localStorage.setItem('force_auth_reset', 'true');
    window.location.href = "/";
  };
  const getDashboardLink = () => {
    if (userType === "customer") return "/cliente/painel";
    if (userType === "technician") return "/tecnico/painel";
    if (userType === "company") return "/loja/dashboard";
    return "/";
  };
  const menuItemsLeft = [{
    label: "Técnicos",
    path: "/find-technician"
  }, {
    label: "Lojas",
    path: "/store"
  }, {
    label: "Vender Equipamento",
    path: "/sell-equipment"
  }, {
    label: "Serviços",
    path: "/services"
  }];

  const menuItemsRight = [{
    label: "Quem Somos",
    path: "/about"
  }, {
    label: "Contatos",
    path: "/contact"
  }];

  // Estilos profissionais para o navbar
  const navbarClasses = "bg-[#13294b] w-full sticky top-0 z-50 shadow-sm";
  const linkClasses = "text-white hover:opacity-80 transition-opacity duration-200 font-medium text-base px-3 py-2";
  return <nav className={navbarClasses} style={{ fontFamily: 'system-ui, -apple-system, Inter, sans-serif' }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo à esquerda */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold text-white tracking-tight">
              Instalei
            </span>
          </Link>

          {/* Links centrais - Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItemsLeft.map(item => (
              <Link key={item.path} to={item.path} className={linkClasses} style={{ fontWeight: 500, lineHeight: 1.5 }}>
                {item.label}
              </Link>
            ))}
            {menuItemsRight.map(item => (
              <Link key={item.path} to={item.path} className={linkClasses} style={{ fontWeight: 500, lineHeight: 1.5 }}>
                {item.label}
              </Link>
            ))}

          </div>

          {/* Botões de autenticação à direita - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-white hover:opacity-80 font-medium" style={{ fontWeight: 500 }}>
                    <User className="h-4 w-4" />
                    <span>Minha Conta</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="bottom" className="mr-4 bg-white z-[100]">
                  <DropdownMenuItem asChild>
                    <Link to={userType === "customer" ? "/cliente/perfil" : userType === "technician" ? "/tecnico/perfil" : "/store/profile"} className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLoginClick} 
                  className="bg-white text-[#13294b] hover:bg-white/90 font-semibold rounded-lg px-5 py-2 h-auto text-base"
                  style={{ fontWeight: 600, lineHeight: 1.5 }}
                >
                  Entrar
                </Button>
                
                <Button
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="bg-[#ff6b2c] text-white hover:bg-[#f2551a] font-semibold rounded-lg px-5 py-2 h-auto text-base"
                  style={{ fontWeight: 600, lineHeight: 1.5 }}
                >
                  Cadastre-se
                </Button>
              </>
            )}
          </div>

          {/* Menu hamburguer para mobile */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu" className="text-white hover:opacity-80">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#13294b] border-t border-white/10 shadow-lg z-50 lg:hidden">
            <div className="flex flex-col px-6 py-4 max-w-[1200px] mx-auto">
              {/* All menu items for mobile */}
              {[...menuItemsLeft, ...menuItemsRight].map(item => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className="text-white hover:bg-white/10 transition-colors duration-200 font-medium text-base p-3 rounded-lg" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t border-white/10 pt-3 mt-3">
                {isAuthenticated ? (
                  <>
                    <Link 
                      to={userType === "customer" ? "/cliente/perfil" : userType === "technician" ? "/tecnico/perfil" : "/store/profile"} 
                      className="flex items-center p-3 rounded-lg hover:bg-white/10 w-full mb-2 transition-colors duration-200 text-white" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5 mr-3" />
                      <span className="font-medium">Meu Perfil</span>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-red-500 border-red-500 hover:bg-red-500 hover:text-white" 
                      onClick={handleLogout}
                    >
                      Sair
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      className="w-full justify-center bg-white text-[#13294b] hover:bg-white/90 font-semibold text-base py-3"
                      onClick={handleLoginClick}
                    >
                      Entrar
                    </Button>

                    <Button
                      className="w-full justify-center bg-[#ff6b2c] text-white hover:bg-[#f2551a] font-semibold text-base py-3"
                      onClick={() => {
                        navigate('/register');
                        setIsMenuOpen(false);
                      }}
                    >
                      Cadastre-se
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>;
};
export default Navbar;