
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, Contact as ContactIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import BlurContainer from '@/components/ui/BlurContainer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <AnimatedContainer animation="fade" className="mb-12">
          <h1 className="text-4xl font-bold mb-6 flex items-center gap-4">
            <ContactIcon size={40} /> Entre em Contato
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Estamos aqui para ajudar. Entre em contato conosco através dos canais abaixo.
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatedContainer animation="slide-right" delay={0.2}>
            <BlurContainer className="p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Mail size={24} /> E-mail
              </h2>
              <p className="text-muted-foreground mb-4">
                Entre em contato por e-mail para suporte ou dúvidas:
              </p>
              <a 
                href="mailto:contato@techsupport.com" 
                className="text-primary hover:underline"
              >
                contato@techsupport.com
              </a>
            </BlurContainer>
          </AnimatedContainer>

          <AnimatedContainer animation="slide-left" delay={0.4}>
            <BlurContainer className="p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Phone size={24} /> Telefone
              </h2>
              <p className="text-muted-foreground mb-4">
                Nosso suporte telefônico está disponível em horário comercial:
              </p>
              <div className="text-primary font-semibold">
                (11) 4002-8922
              </div>
            </BlurContainer>
          </AnimatedContainer>
        </div>

        <AnimatedContainer animation="fade" delay={0.6} className="mt-12">
          <BlurContainer className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Formulário de Contato</h2>
            <p className="text-muted-foreground mb-6">
              Envie-nos uma mensagem e entraremos em contato em breve.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Nome" 
                className="w-full p-3 border rounded-md"
              />
              <input 
                type="email" 
                placeholder="E-mail" 
                className="w-full p-3 border rounded-md"
              />
              <textarea 
                placeholder="Sua mensagem" 
                className="w-full p-3 border rounded-md col-span-full h-32"
              />
              <Button className="col-span-full">Enviar Mensagem</Button>
            </div>
          </BlurContainer>
        </AnimatedContainer>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
