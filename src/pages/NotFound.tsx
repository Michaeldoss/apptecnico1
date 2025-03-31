
import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import BlurContainer from "@/components/ui/BlurContainer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Home } from "lucide-react";

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
    if (userType === "technician") return "/tecnico/painel";
    if (userType === "customer") return "/cliente/painel";
    return "/";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-lg text-center">
          <AnimatedContainer animation="scale" className="mb-8">
            <BlurContainer className="p-12 md:p-16">
              <h1 className="text-9xl font-bold text-primary/30">404</h1>
              <h2 className="text-3xl font-bold mt-6 mb-4">Página Não Encontrada</h2>
              <p className="text-muted-foreground mb-8">
                A página <span className="font-medium">{location.pathname}</span> não existe ou foi movida.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={goBack}
                  className="rounded-full"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
                <Link to={getHomePage()}>
                  <Button size="lg" className="rounded-full w-full sm:w-auto">
                    <Home className="mr-2 h-4 w-4" />
                    {isAuthenticated ? "Ir para o Painel" : "Ir para o Início"}
                  </Button>
                </Link>
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
