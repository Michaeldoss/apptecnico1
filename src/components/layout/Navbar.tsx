
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
    if (userType === "technician") return "/tecnico/painel";
    return "/";
  };

  return (
    <nav className="bg-background border-b w-full top-0 z-50 shadow-sm">
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
              className="h-6 w-6 text-primary"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <span className="text-xl font-bold ml-2 text-gray-900">
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
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-primary flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            <span>Início</span>
          </Link>
          <Link
            to="/find-technician"
            className="text-sm font-medium text-gray-700 hover:text-primary flex items-center gap-1"
          >
            <MapPin className="h-4 w-4" />
            <span>Encontrar Técnicos</span>
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-gray-700 hover:text-primary flex items-center gap-1"
          >
            <Info className="h-4 w-4" />
            <span>Sobre</span>
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-gray-700 hover:text-primary flex items-center gap-1"
          >
            <Phone className="h-4 w-4" />
            <span>Contato</span>
          </Link>
          <Link
            to="/store"
            className="text-sm font-medium text-gray-700 hover:text-primary flex items-center gap-1"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Loja</span>
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex md:items-center md:gap-2">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-gray-700 hover:text-primary"
                >
                  <User className="h-4 w-4" />
                  <span>Minha Conta</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to={getDashboardLink()}>Painel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to={
                      userType === "customer"
                        ? "/cliente/perfil"
                        : "/tecnico/perfil"
                    }
                  >
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={handleLoginClick}>
                <LogIn className="h-4 w-4 mr-2" /> Entrar
              </Button>
              <Button size="sm" onClick={handleRegisterClick}>
                <UserPlus className="h-4 w-4 mr-2" /> Cadastrar
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-background border-b shadow-md z-50 md:hidden">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <Link
                to="/"
                className="text-sm font-medium p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span>Início</span>
              </Link>
              <Link
                to="/find-technician"
                className="text-sm font-medium p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-5 w-5" />
                <span>Encontrar Técnicos</span>
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="h-5 w-5" />
                <span>Sobre</span>
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-5 w-5" />
                <span>Contato</span>
              </Link>
              <Link
                to="/store"
                className="text-sm font-medium p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Loja</span>
              </Link>
              <div className="border-t pt-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to={getDashboardLink()}
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 w-full mb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5 mr-2" />
                      <span>Meu Painel</span>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Sair
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={handleLoginClick}
                    >
                      <LogIn className="h-4 w-4 mr-2" /> Entrar
                    </Button>
                    <Button
                      className="w-full justify-center"
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
