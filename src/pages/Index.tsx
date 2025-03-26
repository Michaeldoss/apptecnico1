
import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import BlurContainer from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* Seção Como Funciona */}
        <section className="py-20 px-6 bg-accent/30">
          <div className="max-w-7xl mx-auto">
            <AnimatedContainer animation="slide-up" className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                Processo Simples
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Como Funciona</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nossa plataforma simplifica o processo de encontrar e conectar-se com especialistas técnicos em apenas alguns passos simples.
              </p>
            </AnimatedContainer>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Solicite o Serviço',
                  description: 'Selecione o tipo de serviço que você precisa e forneça detalhes sobre seu problema.',
                  delay: 300
                },
                {
                  step: '02',
                  title: 'Encontre um Técnico',
                  description: 'Seja conectado com técnicos qualificados em sua área prontos para ajudar.',
                  delay: 500
                },
                {
                  step: '03',
                  title: 'Problema Resolvido',
                  description: 'Receba o serviço, faça o pagamento seguro e deixe uma avaliação.',
                  delay: 700
                }
              ].map((item) => (
                <AnimatedContainer key={item.step} animation="slide-up" delay={item.delay} className="relative">
                  <BlurContainer className="p-8 h-full hover-scale">
                    <span className="text-5xl font-bold text-primary/20 absolute -top-3 -left-3">
                      {item.step}
                    </span>
                    <h3 className="text-xl font-semibold mb-4 mt-4">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </BlurContainer>
                </AnimatedContainer>
              ))}
            </div>
          </div>
        </section>
        
        {/* Seção Depoimentos */}
        <section className="py-20 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <AnimatedContainer animation="slide-up" className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                Depoimentos
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">O Que Nossos Usuários Dizem</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ouça o que dizem clientes satisfeitos e técnicos qualificados que usam nossa plataforma todos os dias.
              </p>
            </AnimatedContainer>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Emma Rodriguez',
                  role: 'Cliente',
                  quote: 'Encontrei um técnico especialista em minutos. O serviço foi rápido e o problema foi resolvido na primeira visita.',
                  delay: 300
                },
                {
                  name: 'Michael Chen',
                  role: 'Técnico Especialista',
                  quote: 'Esta plataforma mudou completamente a forma como encontro novos clientes. Os sistemas de agendamento e pagamento são perfeitos.',
                  delay: 500
                },
                {
                  name: 'Sarah Johnson',
                  role: 'Proprietária de Empresa',
                  quote: 'Gerenciar nossa equipe de técnicos ficou muito mais fácil agora. Os recursos de rastreamento e relatórios nos economizam horas todas as semanas.',
                  delay: 700
                }
              ].map((testimonial, index) => (
                <AnimatedContainer key={index} animation="scale" delay={testimonial.delay}>
                  <BlurContainer className="p-6 h-full hover-scale">
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                      <p className="flex-grow text-muted-foreground mb-6">{testimonial.quote}</p>
                      <div className="flex items-center mt-auto">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-medium">{testimonial.name.charAt(0)}</span>
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </BlurContainer>
                </AnimatedContainer>
              ))}
            </div>
          </div>
        </section>
        
        {/* Seção CTA */}
        <section className="py-20 px-6 bg-primary/5">
          <AnimatedContainer animation="scale" className="max-w-5xl mx-auto text-center">
            <BlurContainer className="p-12 md:p-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Começar?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de usuários e técnicos satisfeitos em nossa plataforma. 
                Registre-se hoje e experimente suporte técnico sem complicações.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="rounded-full text-base">
                    Cadastre-se Agora
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="rounded-full text-base">
                    Fale com Vendas
                  </Button>
                </Link>
              </div>
            </BlurContainer>
          </AnimatedContainer>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
