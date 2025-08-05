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

  // Classes dinâmicas baseadas na página
  const navbarClasses = isHomePage 
    ? "bg-transparent absolute w-full top-0 z-50 pt-4" 
    : "bg-white w-full top-0 z-50 shadow-md";
  const textClasses = isHomePage ? "text-white" : "text-gray-800";
  const logoClasses = isHomePage ? "text-white" : "text-gray-900";
  const hoverClasses = isHomePage ? "hover:text-blue-200" : "hover:text-blue-600";
  const buttonClasses = isHomePage 
    ? "text-white hover:text-blue-200 hover:bg-white/10" 
    : "text-gray-800 hover:text-blue-600 hover:bg-gray-100";
  return <nav className={navbarClasses}>
      <div className="container flex items-center justify-between h-16 px-4 md:px-6 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className={`text-2xl font-bold font-inter ${logoClasses} drop-shadow-lg`}>Instalei</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {menuItems.map(item => <Link key={item.path} to={item.path} className={`text-sm font-medium transition-colors duration-200 font-inter ${textClasses} ${hoverClasses} drop-shadow-lg`}>
              {item.label}
            </Link>)}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex md:items-center md:gap-3">
          {isAuthenticated ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`flex items-center gap-2 font-inter font-medium ${buttonClasses} drop-shadow-lg`}>
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
              <Button variant="outline" size="sm" onClick={handleLoginClick} className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-inter font-semibold transition-all duration-200 border-0 shadow-lg hover:shadow-xl hover:scale-105">
                <LogIn className="h-4 w-4 mr-2" /> Entrar
              </Button>
              
              <Button 
                size="sm" 
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-inter font-semibold transition-all duration-200 border-0 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <UserPlus className="h-4 w-4 mr-2" /> Cadastre-se
              </Button>
            </>}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu" className={`${buttonClasses} drop-shadow-lg`}>
            {isMenuOpen ? <X className={`h-6 w-6 ${textClasses}`} /> : <Menu className={`h-6 w-6 ${textClasses}`} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-xl z-50 md:hidden">
            <div className="flex flex-col space-y-2 px-4 py-6">
              {menuItems.map(item => <Link key={item.path} to={item.path} className="text-sm font-medium p-3 rounded-lg hover:bg-blue-50 text-gray-800 hover:text-blue-600 transition-colors duration-200 font-inter" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>)}
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                {isAuthenticated ? <>
                    <Link to={userType === "customer" ? "/cliente/perfil" : userType === "technician" ? "/tecnico/perfil" : "/store/profile"} className="flex items-center p-3 rounded-lg hover:bg-blue-50 w-full mb-3 transition-colors duration-200 font-inter" onClick={() => setIsMenuOpen(false)}>
                      <User className="h-5 w-5 mr-3 text-blue-600" />
                      <span className="text-gray-800 font-medium">Meu Perfil</span>
                    </Link>
                    <Button variant="outline" size="sm" className="w-full border-2 border-red-500 text-red-600 hover:bg-red-600 hover:text-white font-inter font-semibold" onClick={handleLogout}>
                      Sair
                    </Button>
                  </> : <div className="flex flex-col space-y-3">
                    <Button variant="outline" className="w-full justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-inter font-semibold border-0 shadow-lg" onClick={handleLoginClick}>
                      <LogIn className="h-4 w-4 mr-2" /> Entrar
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-inter font-semibold border-0 shadow-lg" 
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