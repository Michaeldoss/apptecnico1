
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

  const handleRegisterClick = () => {
    navigate("/register");
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
    <nav className="bg-white border-b border-gray-border w-full top-0 z-50 shadow-sm">
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
              className="h-8 w-8 text-tech-primary hover:text-tech-primary-hover transition-colors duration-200"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <span className="text-2xl font-bold ml-2 text-tech-primary font-inter">
              AssistAnywhere
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
            className="text-tech-primary hover:text-tech-primary-hover hover:bg-gray-light"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-gray-primary hover:text-tech-primary flex items-center gap-2 transition-colors duration-200 font-inter"
          >
            <Home className="h-4 w-4 icon-standard" />
            <span>Início</span>
          </Link>
          <Link
            to="/find-technician"
            className="text-sm font-medium text-gray-primary hover:text-tech-primary flex items-center gap-2 transition-colors duration-200 font-inter"
          >
            <MapPin className="h-4 w-4 icon-standard" />
            <span>Encontrar Técnicos</span>
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-gray-primary hover:text-tech-primary flex items-center gap-2 transition-colors duration-200 font-inter"
          >
            <Info className="h-4 w-4 icon-standard" />
            <span>Sobre</span>
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-gray-primary hover:text-tech-primary flex items-center gap-2 transition-colors duration-200 font-inter"
          >
            <Phone className="h-4 w-4 icon-standard" />
            <span>Contato</span>
          </Link>
          <Link
            to="/store"
            className="text-sm font-medium text-gray-primary hover:text-tech-primary flex items-center gap-2 transition-colors duration-200 font-inter"
          >
            <ShoppingBag className="h-4 w-4 icon-standard" />
            <span>Loja</span>
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex md:items-center md:gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-gray-primary hover:text-tech-primary hover:bg-gray-light font-inter font-medium"
                >
                  <User className="h-4 w-4" />
                  <span>Minha Conta</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-gray-border shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to={getDashboardLink()} className="font-inter">Painel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to={
                      userType === "customer"
                        ? "/cliente/perfil"
                        : "/tecnico/perfil"
                    }
                    className="font-inter"
                  >
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="font-inter">Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLoginClick}
                className="border-tech-primary text-tech-primary hover:bg-tech-primary hover:text-white font-inter font-medium transition-all duration-200"
              >
                <LogIn className="h-4 w-4 mr-2" /> Entrar
              </Button>
              <Button 
                size="sm" 
                onClick={handleRegisterClick}
                className="bg-tech-primary text-white hover:bg-tech-primary-hover font-inter font-medium transition-all duration-200 hover:scale-105"
              >
                <UserPlus className="h-4 w-4 mr-2" /> Cadastrar
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-border shadow-lg z-50 md:hidden">
            <div className="flex flex-col space-y-2 px-4 py-6">
              <Link
                to="/"
                className="text-sm font-medium p-3 rounded-lg hover:bg-gray-light flex items-center gap-3 transition-colors duration-200 font-inter"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5 text-tech-primary" />
                <span className="text-gray-primary">Início</span>
              </Link>
              <Link
                to="/find-technician"
                className="text-sm font-medium p-3 rounded-lg hover:bg-gray-light flex items-center gap-3 transition-colors duration-200 font-inter"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-5 w-5 text-tech-primary" />
                <span className="text-gray-primary">Encontrar Técnicos</span>
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium p-3 rounded-lg hover:bg-gray-light flex items-center gap-3 transition-colors duration-200 font-inter"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="h-5 w-5 text-tech-primary" />
                <span className="text-gray-primary">Sobre</span>
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium p-3 rounded-lg hover:bg-gray-light flex items-center gap-3 transition-colors duration-200 font-inter"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-5 w-5 text-tech-primary" />
                <span className="text-gray-primary">Contato</span>
              </Link>
              <Link
                to="/store"
                className="text-sm font-medium p-3 rounded-lg hover:bg-gray-light flex items-center gap-3 transition-colors duration-200 font-inter"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5 text-tech-primary" />
                <span className="text-gray-primary">Loja</span>
              </Link>
              <div className="border-t border-gray-border pt-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to={getDashboardLink()}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-light w-full mb-3 transition-colors duration-200 font-inter"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5 mr-3 text-tech-primary" />
                      <span className="text-gray-primary font-medium">Meu Painel</span>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-tech-primary text-tech-primary hover:bg-tech-primary hover:text-white font-inter font-medium"
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
                      className="w-full justify-center border-tech-primary text-tech-primary hover:bg-tech-primary hover:text-white font-inter font-medium"
                      onClick={handleLoginClick}
                    >
                      <LogIn className="h-4 w-4 mr-2" /> Entrar
                    </Button>
                    <Button
                      className="w-full justify-center bg-tech-primary text-white hover:bg-tech-primary-hover font-inter font-medium"
                      onClick={handleRegisterClick}
                    >
                      <UserPlus className="h-4 w-4 mr-2" /> Cadastrar
                    </Button>
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
