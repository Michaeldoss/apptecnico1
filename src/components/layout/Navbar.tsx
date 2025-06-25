
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogIn,
  UserPlus,
  Home,
  Info,
  Phone,
  ShoppingBag,
  Search,
  MapPin,
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
  const isMobile = useIsMobile();

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

  return (
    <nav className="bg-white border-b-2 border-blue-100 w-full top-0 z-50 shadow-lg sticky">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <span className="text-2xl font-bold ml-2 text-blue-600 font-inter">
              DGSoluções
            </span>
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link
            to="/"
            className="text-sm font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-2 transition-colors duration-200 font-inter px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            <Home className="h-4 w-4" />
            <span>Início</span>
          </Link>
          <Link
            to="/find-technician"
            className="text-sm font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-2 transition-colors duration-200 font-inter px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            <Search className="h-4 w-4" />
            <span>Buscar Técnicos</span>
          </Link>
          <Link
            to="/about"
            className="text-sm font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-2 transition-colors duration-200 font-inter px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            <Info className="h-4 w-4" />
            <span>Sobre</span>
          </Link>
          <Link
            to="/contact"
            className="text-sm font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-2 transition-colors duration-200 font-inter px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            <Phone className="h-4 w-4" />
            <span>Contato</span>
          </Link>
          <Link
            to="/store"
            className="text-sm font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-2 transition-colors duration-200 font-inter px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Loja</span>
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex md:items-center md:gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-inter font-semibold border border-gray-300 hover:border-blue-300"
                >
                  <User className="h-4 w-4" />
                  <span>Minha Conta</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-gray-200 shadow-xl">
                <DropdownMenuItem asChild>
                  <Link to={getDashboardLink()} className="font-inter font-medium">Painel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to={
                      userType === "customer"
                        ? "/cliente/perfil"
                        : "/tecnico/perfil"
                    }
                    className="font-inter font-medium"
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
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-inter font-semibold transition-all duration-200 px-6"
              >
                <LogIn className="h-4 w-4 mr-2" /> Entrar
              </Button>
              
              {/* Dropdown de Cadastros */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    size="sm" 
                    className="bg-blue-600 text-white hover:bg-blue-700 font-inter font-semibold transition-all duration-200 hover:scale-105 px-6"
                  >
                    <UserPlus className="h-4 w-4 mr-2" /> Cadastrar
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border-gray-200 shadow-xl w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/register" className="font-inter font-medium flex items-center gap-3 p-3">
                      <User className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Cliente</div>
                        <div className="text-sm text-gray-600">Solicitar serviços</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/technician" className="font-inter font-medium flex items-center gap-3 p-3">
                      <Wrench className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Técnico</div>
                        <div className="text-sm text-gray-600">Prestar serviços</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/store/company-register" className="font-inter font-medium flex items-center gap-3 p-3">
                      <Store className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Lojista</div>
                        <div className="text-sm text-gray-600">Vender produtos</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white border-b-2 border-blue-100 shadow-xl z-50 md:hidden">
            <div className="flex flex-col space-y-2 px-4 py-6">
              <Link
                to="/"
                className="text-sm font-semibold p-3 rounded-lg hover:bg-blue-50 flex items-center gap-3 transition-colors duration-200 font-inter"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Início</span>
              </Link>
              <Link
                to="/find-technician"
                className="text-sm font-semibold p-3 rounded-lg hover:bg-blue-50 flex items-center gap-3 transition-colors duration-200 font-inter"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Buscar Técnicos</span>
              </Link>
              <Link
                to="/about"
                className="text-sm font-semibold p-3 rounded-lg hover:bg-blue-50 flex items-center gap-3 transition-colors duration-200 font-inter"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Sobre</span>
              </Link>
              <Link
                to="/contact"
                className="text-sm font-semibold p-3 rounded-lg hover:bg-blue-50 flex items-center gap-3 transition-colors duration-200 font-inter"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Contato</span>
              </Link>
              <Link
                to="/store"
                className="text-sm font-semibold p-3 rounded-lg hover:bg-blue-50 flex items-center gap-3 transition-colors duration-200 font-inter"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Loja</span>
              </Link>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to={getDashboardLink()}
                      className="flex items-center p-3 rounded-lg hover:bg-blue-50 w-full mb-3 transition-colors duration-200 font-inter"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5 mr-3 text-blue-600" />
                      <span className="text-gray-700 font-semibold">Meu Painel</span>
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
                      className="w-full justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-inter font-semibold"
                      onClick={handleLoginClick}
                    >
                      <LogIn className="h-4 w-4 mr-2" /> Entrar
                    </Button>
                    
                    <div className="text-center text-sm font-semibold text-gray-700 mb-2">Cadastrar como:</div>
                    
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-start bg-blue-600 text-white hover:bg-blue-700 font-inter font-semibold mb-2">
                        <User className="h-4 w-4 mr-2" /> Cliente
                      </Button>
                    </Link>
                    
                    <Link to="/technician" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-start bg-green-600 text-white hover:bg-green-700 font-inter font-semibold mb-2">
                        <Wrench className="h-4 w-4 mr-2" /> Técnico
                      </Button>
                    </Link>
                    
                    <Link to="/store/company-register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-start bg-purple-600 text-white hover:bg-purple-700 font-inter font-semibold">
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
