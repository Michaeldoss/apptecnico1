
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogIn,
  UserPlus,
  Wrench,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, userType, logout } = useAuth();
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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardLink = () => {
    if (userType === "customer") return "/cliente/painel";
    if (userType === "technician") return "/technician/dashboard";
    if (userType === "company") return "/store/company-dashboard";
    return "/";
  };

  const menuItems = [
    { label: "Técnicos", path: "/find-technician" },
    { label: "Lojas", path: "/store" },
    { label: "Vender Equipamento", path: "/sell-equipment" },
    { label: "Serviços", path: "/services" },
    { label: "Quem Somos", path: "/about" },
    { label: "Contatos", path: "/contact" },
  ];

  // Classes dinâmicas baseadas na página - sempre usar estilo da página inicial
  const navbarClasses = "bg-transparent absolute w-full top-0 z-50 pt-4";
  const textClasses = "text-white";
  const logoClasses = "text-white";
  const hoverClasses = "hover:text-blue-200";
  const buttonClasses = "text-white hover:text-blue-200 hover:bg-white/10";

  return (
    <nav className={navbarClasses}>
      <div className="container flex items-center justify-between h-16 px-4 md:px-6 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className={`text-2xl font-bold font-inter ${logoClasses} drop-shadow-lg`}>
            DGSoluções
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors duration-200 font-inter ${textClasses} ${hoverClasses} drop-shadow-lg`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex md:items-center md:gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`flex items-center gap-2 font-inter font-medium ${buttonClasses} drop-shadow-lg`}
                >
                  <User className="h-4 w-4" />
                  <span className={textClasses}>Minha Conta</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-gray-200 shadow-xl">
                <DropdownMenuItem asChild>
                  <Link to={getDashboardLink()} className="font-inter font-medium text-gray-800">Painel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to={
                      userType === "customer"
                        ? "/cliente/perfil"
                        : "/tecnico/perfil"
                    }
                    className="font-inter font-medium text-gray-800"
                  >
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="font-inter font-medium text-red-600">Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLoginClick}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-inter font-semibold transition-all duration-200 border-0 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <LogIn className="h-4 w-4 mr-2" /> Entrar
              </Button>
              
              {/* Dropdown de Cadastros */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-inter font-semibold transition-all duration-200 border-0 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <UserPlus className="h-4 w-4 mr-2" /> Cadastre-se
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border-gray-200 shadow-xl w-52">
                  <DropdownMenuItem asChild>
                    <Link to="/register" className="font-inter font-medium flex items-center gap-3 p-3">
                      <User className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-800">Cliente</div>
                        <div className="text-xs text-gray-600">Solicitar serviços</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/technician" className="font-inter font-medium flex items-center gap-3 p-3">
                      <Wrench className="h-4 w-4 text-yellow-600" />
                      <div>
                        <div className="font-semibold text-gray-800">Técnico</div>
                        <div className="text-xs text-gray-600">Prestar serviços</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/store/company-register" className="font-inter font-medium flex items-center gap-3 p-3">
                      <Store className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-800">Lojista</div>
                        <div className="text-xs text-gray-600">Vender produtos</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="text-white hover:text-blue-200 hover:bg-white/10 drop-shadow-lg"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-xl z-50 md:hidden">
            <div className="flex flex-col space-y-2 px-4 py-6">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm font-medium p-3 rounded-lg hover:bg-blue-50 text-gray-800 hover:text-blue-600 transition-colors duration-200 font-inter"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to={getDashboardLink()}
                      className="flex items-center p-3 rounded-lg hover:bg-blue-50 w-full mb-3 transition-colors duration-200 font-inter"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5 mr-3 text-blue-600" />
                      <span className="text-gray-800 font-medium">Meu Painel</span>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-2 border-red-500 text-red-600 hover:bg-red-600 hover:text-white font-inter font-semibold"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Sair
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-inter font-semibold border-0 shadow-lg"
                      onClick={handleLoginClick}
                    >
                      <LogIn className="h-4 w-4 mr-2" /> Entrar
                    </Button>
                    
                    <div className="text-center text-sm font-semibold text-gray-800 mb-2 font-inter">Cadastre-se como:</div>
                    
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-start bg-blue-600 text-white hover:bg-blue-700 font-inter font-semibold mb-2 shadow-lg">
                        <User className="h-4 w-4 mr-2" /> Cliente
                      </Button>
                    </Link>
                    
                    <Link to="/technician" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-start bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-inter font-semibold mb-2 shadow-lg">
                        <Wrench className="h-4 w-4 mr-2" /> Técnico
                      </Button>
                    </Link>
                    
                    <Link to="/store/company-register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-start bg-blue-700 text-white hover:bg-blue-800 font-inter font-semibold shadow-lg">
                        <Store className="h-4 w-4 mr-2" /> Lojista
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
