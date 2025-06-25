
import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import BlurContainer from "@/components/ui/BlurContainer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userType } = useAuth();

  useEffect(() => {
    console.error(
      "Erro 404: Usuário tentou acessar rota inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  const goBack = () => {
    navigate(-1);
  };

  // Determinar a página inicial com base no tipo de usuário
  const getHomePage = () => {
    if (!isAuthenticated) return "/";
    if (userType === "technician") return "/technician/dashboard";
    if (userType === "customer") return "/cliente/painel";
    if (userType === "company") return "/store/company-dashboard";
    return "/";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-2xl text-center">
          <AnimatedContainer animation="scale" className="mb-8">
            <BlurContainer className="p-12 md:p-16 bg-white border-2 border-gray-200 shadow-lg">
              {/* Ícone de erro */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-12 w-12 text-yellow-600" />
                </div>
              </div>

              {/* Número 404 */}
              <h1 className="text-8xl md:text-9xl font-bold text-blue-600 mb-4">404</h1>
              
              {/* Título */}
              <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4 font-inter">
                Página Não Encontrada
              </h2>
              
              {/* Descrição */}
              <p className="text-gray-600 mb-2 text-lg font-inter">
                Ops! A página que você está procurando não existe.
              </p>
              <p className="text-gray-500 mb-8 font-inter">
                A URL <span className="font-semibold text-blue-600">{location.pathname}</span> pode ter sido movida ou removida.
              </p>
              
              {/* Botões de ação */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={goBack}
                  className="rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-inter font-semibold px-6 py-3"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
                <Link to={getHomePage()}>
                  <Button 
                    size="lg" 
                    className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-inter font-semibold px-6 py-3 w-full sm:w-auto"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    {isAuthenticated ? "Ir para o Painel" : "Ir para o Início"}
                  </Button>
                </Link>
              </div>

              {/* Links úteis */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-500 mb-4 font-inter">Talvez você esteja procurando por:</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link 
                    to="/find-technician" 
                    className="text-blue-600 hover:text-blue-700 font-inter font-medium hover:underline"
                  >
                    Encontrar Técnico
                  </Link>
                  <Link 
                    to="/store" 
                    className="text-blue-600 hover:text-blue-700 font-inter font-medium hover:underline"
                  >
                    Loja
                  </Link>
                  <Link 
                    to="/services" 
                    className="text-blue-600 hover:text-blue-700 font-inter font-medium hover:underline"
                  >
                    Serviços
                  </Link>
                  <Link 
                    to="/contact" 
                    className="text-blue-600 hover:text-blue-700 font-inter font-medium hover:underline"
                  >
                    Contato
                  </Link>
                </div>
              </div>
            </BlurContainer>
          </AnimatedContainer>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
