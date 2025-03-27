
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import BlurContainer from '@/components/ui/BlurContainer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <AnimatedContainer animation="fade" className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Sobre a TechSupport</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Conheça mais sobre nossa missão, visão e história.
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <AnimatedContainer animation="slide-right" delay={0.2}>
            <BlurContainer className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Nossa Missão</h2>
              <p className="text-muted-foreground mb-4">
                A TechSupport nasceu com o objetivo de conectar pessoas que precisam de suporte técnico
                com os melhores profissionais disponíveis. Nossa missão é tornar o suporte técnico
                acessível, confiável e eficiente para todos.
              </p>
              <p className="text-muted-foreground">
                Acreditamos que todos merecem ter acesso a serviços técnicos de qualidade,
                independentemente de sua localização ou conhecimento prévio.
              </p>
            </BlurContainer>
          </AnimatedContainer>

          <AnimatedContainer animation="slide-left" delay={0.4}>
            <BlurContainer className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Nossa Visão</h2>
              <p className="text-muted-foreground mb-4">
                Queremos ser a principal plataforma de conexão entre técnicos e clientes no Brasil,
                revolucionando a maneira como as pessoas resolvem seus problemas tecnológicos.
              </p>
              <p className="text-muted-foreground">
                Buscamos criar um ecossistema onde técnicos possam prosperar e clientes possam
                encontrar soluções rápidas e confiáveis para seus problemas.
              </p>
            </BlurContainer>
          </AnimatedContainer>
        </div>

        <AnimatedContainer animation="fade" delay={0.6} className="mb-16">
          <BlurContainer className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Nossa História</h2>
            <p className="text-muted-foreground mb-4">
              Fundada em 2023, a TechSupport começou como uma startup com apenas 5 técnicos
              cadastrados. Hoje, contamos com uma rede de mais de 1.000 profissionais qualificados
              em todo o Brasil, atendendo milhares de clientes mensalmente.
            </p>
            <p className="text-muted-foreground">
              Nosso crescimento é impulsionado pelo compromisso com a qualidade e pela satisfação
              de nossos usuários. Continuamos inovando para melhorar a experiência de todos que
              utilizam nossa plataforma.
            </p>
          </BlurContainer>
        </AnimatedContainer>

        <AnimatedContainer animation="scale" delay={0.8}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BlurContainer className="p-6 text-center">
              <div className="text-primary text-4xl font-bold mb-2">1000+</div>
              <div className="font-medium">Técnicos Cadastrados</div>
            </BlurContainer>
            <BlurContainer className="p-6 text-center">
              <div className="text-primary text-4xl font-bold mb-2">10k+</div>
              <div className="font-medium">Serviços Realizados</div>
            </BlurContainer>
            <BlurContainer className="p-6 text-center">
              <div className="text-primary text-4xl font-bold mb-2">98%</div>
              <div className="font-medium">Clientes Satisfeitos</div>
            </BlurContainer>
          </div>
        </AnimatedContainer>
      </main>
      <Footer />
    </div>
  );
};

export default About;
