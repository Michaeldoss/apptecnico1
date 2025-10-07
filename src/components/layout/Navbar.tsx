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
  const location = useLocation();
  const isMobile = useIsMobile();
  const isHomePage = location.pathname === "/";
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
  const menuItems = [{
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
  }, {
    label: "Quem Somos",
    path: "/about"
  }, {
    label: "Contatos",
    path: "/contact"
  }];

  // Classes para o navbar com cores específicas
  const navbarClasses = "bg-[#2563eb] w-full top-0 z-50 shadow-md";
  const textClasses = "text-white";
  const logoClasses = "text-white font-bold";
  const hoverClasses = "hover:text-white/80";
  const baseClasses = "text-white hover:text-white/80 transition-colors duration-200";
  return <nav className={navbarClasses}>
      <div className="container flex items-center justify-between h-16 px-4 md:px-6 mx-auto max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className={`text-2xl ${logoClasses} tracking-tight`}>
            Instalei
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {menuItems.map(item => <Link key={item.path} to={item.path} className={`text-sm font-semibold px-4 py-2 rounded-md ${baseClasses}`}>
              {item.label}
            </Link>)}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex md:items-center md:gap-2">
          {isAuthenticated ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-white hover:text-white/80">
                  <User className="h-4 w-4" />
                  <span>Minha Conta</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom" className="mr-4">
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
            </DropdownMenu> : <>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLoginClick} 
                className="bg-white text-[#2563eb] hover:bg-white/90 font-semibold"
              >
                Entrar
              </Button>
              
              <Button 
                size="sm" 
                onClick={() => navigate('/register')}
                className="bg-[#1e40af] text-white hover:bg-[#1e3a8a] font-semibold"
              >
                Cadastre-se
              </Button>
            </>}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu" className="text-white hover:text-white/80">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="absolute top-16 left-0 w-full bg-[#2563eb] border-b border-white/10 shadow-lg z-50 md:hidden">
            <div className="flex flex-col space-y-1 px-4 py-4">
              {menuItems.map(item => <Link key={item.path} to={item.path} className="text-sm font-medium p-3 rounded-lg text-white hover:bg-white/10 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>)}
              
              <div className="border-t border-white/10 pt-3 mt-3">
                {isAuthenticated ? <>
                    <Link to={userType === "customer" ? "/cliente/perfil" : userType === "technician" ? "/tecnico/perfil" : "/store/profile"} className="flex items-center p-3 rounded-lg hover:bg-white/10 w-full mb-2 transition-colors duration-200 text-white" onClick={() => setIsMenuOpen(false)}>
                      <User className="h-5 w-5 mr-3" />
                      <span className="font-medium">Meu Perfil</span>
                    </Link>
                    <Button variant="outline" size="sm" className="w-full text-destructive hover:bg-destructive hover:text-destructive-foreground" onClick={handleLogout}>
                      Sair
                    </Button>
                  </> : <div className="flex flex-col space-y-2">
                    <Button className="w-full justify-center bg-white text-[#2563eb] hover:bg-white/90 font-semibold" onClick={handleLoginClick}>
                      Entrar
                    </Button>
                    
                    <Button 
                      className="w-full justify-center bg-[#1e40af] text-white hover:bg-[#1e3a8a] font-semibold" 
                      onClick={() => {
                        navigate('/register');
                        setIsMenuOpen(false);
                      }}
                    >
                      Cadastre-se
                    </Button>
                  </div>}
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;