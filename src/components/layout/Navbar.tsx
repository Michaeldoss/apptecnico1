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

  // Classes dinâmicas baseadas na página - Design Moderno
  const navbarClasses = isHomePage 
    ? "bg-transparent absolute w-full top-0 z-50 pt-6" 
    : "bg-white/95 backdrop-blur-xl w-full top-0 z-50 shadow-xl border-b border-instalei-gray-200";
  const textClasses = isHomePage ? "text-white" : "text-instalei-gray-800";
  const logoClasses = isHomePage ? "text-white font-black" : "text-instalei-purple-500 font-black";
  const hoverClasses = isHomePage ? "hover:text-instalei-orange-300" : "hover:text-instalei-purple-500";
  const baseClasses = isHomePage 
    ? "text-white hover:text-instalei-orange-300 hover:bg-white/15 backdrop-blur-sm rounded-xl transition-all duration-300" 
    : "text-instalei-gray-800 hover:text-instalei-purple-500 hover:bg-instalei-purple-50 rounded-xl transition-all duration-300";
  return <nav className={navbarClasses}>
      <div className="container flex items-center justify-between h-16 px-4 md:px-6 mx-auto">
        {/* Logo Moderno */}
        <Link to="/" className="flex items-center group">
          <span className={`text-3xl font-black font-inter ${logoClasses} drop-shadow-lg group-hover:scale-105 transition-transform duration-300`}>
            Instalei
          </span>
        </Link>

        {/* Desktop Navigation Links Modernos */}
        <div className="hidden md:flex md:items-center md:gap-2">
          {menuItems.map(item => <Link key={item.path} to={item.path} className={`text-sm font-semibold transition-all duration-300 font-inter px-4 py-2 rounded-xl ${textClasses} ${hoverClasses} drop-shadow-lg hover:scale-105 hover:shadow-lg`}>
              {item.label}
            </Link>)}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex md:items-center md:gap-3">
          {isAuthenticated ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`flex items-center gap-2 font-inter font-medium ${baseClasses} drop-shadow-lg`}>
                  <User className="h-4 w-4" />
                  <span className={textClasses}>Minha Conta</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom" className="bg-white border-gray-200 shadow-xl mr-4">
                <DropdownMenuItem asChild>
                  <Link to={userType === "customer" ? "/cliente/perfil" : userType === "technician" ? "/tecnico/perfil" : "/store/profile"} className="font-inter font-medium text-gray-800 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="font-inter font-medium text-red-600 flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> : <>
              <Button variant="secondary" size="sm" onClick={handleLoginClick} className="font-inter font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 rounded-2xl">
                <LogIn className="h-4 w-4 mr-2" /> Entrar
              </Button>
              
              <Button 
                size="sm" 
                onClick={() => navigate('/register')}
                className="font-inter font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 rounded-2xl"
              >
                <UserPlus className="h-4 w-4 mr-2" /> Cadastre-se
              </Button>
            </>}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu" className={`${baseClasses} drop-shadow-lg`}>
            {isMenuOpen ? <X className={`h-6 w-6 ${textClasses}`} /> : <Menu className={`h-6 w-6 ${textClasses}`} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-xl z-50 md:hidden">
            <div className="flex flex-col space-y-2 px-4 py-6">
              {menuItems.map(item => <Link key={item.path} to={item.path} className="text-sm font-medium p-3 rounded-lg hover:bg-primary/10 text-gray-800 hover:text-primary transition-colors duration-200 font-inter" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>)}
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                {isAuthenticated ? <>
                    <Link to={userType === "customer" ? "/cliente/perfil" : userType === "technician" ? "/tecnico/perfil" : "/store/profile"} className="flex items-center p-3 rounded-lg hover:bg-primary/10 w-full mb-3 transition-colors duration-200 font-inter" onClick={() => setIsMenuOpen(false)}>
                      <User className="h-5 w-5 mr-3 text-primary" />
                      <span className="text-gray-800 font-medium">Meu Perfil</span>
                    </Link>
                    <Button variant="outline" size="sm" className="w-full border-2 border-red-500 text-red-600 hover:bg-red-600 hover:text-white font-inter font-semibold" onClick={handleLogout}>
                      Sair
                    </Button>
                  </> : <div className="flex flex-col space-y-3">
                    <Button variant="outline" className="w-full justify-center bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-instalei-text-dark font-inter font-semibold border-0 shadow-lg" onClick={handleLoginClick}>
                      <LogIn className="h-4 w-4 mr-2" /> Entrar
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-center bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-instalei-text-dark font-inter font-semibold border-0 shadow-lg" 
                      onClick={() => {
                        navigate('/register');
                        setIsMenuOpen(false);
                      }}
                    >
                      <UserPlus className="h-4 w-4 mr-2" /> Cadastre-se
                    </Button>
                  </div>}
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;