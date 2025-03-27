
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import BlurContainer from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { Wrench, CreditCard, Star, Shield, Clock } from 'lucide-react';

const TechnicianLanding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto text-center">
            <AnimatedContainer animation="fade-up" className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Conecte-se com Clientes que Precisam dos Seus Serviços
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Ofereça seus serviços especializados para manutenção, instalação e reparo de equipamentos industriais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Cadastre-se como Técnico
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Entrar na Plataforma
                  </Button>
                </Link>
              </div>
            </AnimatedContainer>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Por que se Tornar um Técnico Parceiro?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BlurContainer className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Receba por Serviço</h3>
                  <p className="text-muted-foreground">
                    Defina seus preços e receba pagamentos diretamente na sua conta bancária.
                  </p>
                </div>
              </BlurContainer>
              
              <BlurContainer className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Construa sua Reputação</h3>
                  <p className="text-muted-foreground">
                    Receba avaliações dos clientes e destaque-se na plataforma.
                  </p>
                </div>
              </BlurContainer>
              
              <BlurContainer className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Wrench className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Trabalhe com o que Você Conhece</h3>
                  <p className="text-muted-foreground">
                    Escolha os tipos de equipamentos com os quais você tem experiência.
                  </p>
                </div>
              </BlurContainer>
              
              <BlurContainer className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Segurança Garantida</h3>
                  <p className="text-muted-foreground">
                    Todos os clientes são verificados para garantir a segurança dos técnicos.
                  </p>
                </div>
              </BlurContainer>
              
              <BlurContainer className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Flexibilidade de Horário</h3>
                  <p className="text-muted-foreground">
                    Gerencie sua agenda e atenda clientes quando for conveniente para você.
                  </p>
                </div>
              </BlurContainer>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Pronto para começar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se à nossa rede de técnicos especializados e comece a transformar seu conhecimento em oportunidades de negócio.
            </p>
            <Link to="/register">
              <Button size="lg">
                Criar Conta de Técnico
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TechnicianLanding;
