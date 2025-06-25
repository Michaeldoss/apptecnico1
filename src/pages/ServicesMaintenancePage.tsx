
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Wrench, ArrowLeft } from 'lucide-react';

const ServicesMaintenancePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center space-y-8">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao início
            </Link>
            
            <div className="bg-primary/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
              <Wrench className="h-12 w-12 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">Manutenção Especializada</h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Em breve você poderá solicitar serviços de manutenção especializada para seus equipamentos industriais diretamente através desta plataforma.
            </p>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">O que você poderá fazer:</h2>
              <ul className="text-left space-y-3 text-muted-foreground">
                <li>• Solicitar manutenção preventiva e corretiva</li>
                <li>• Conectar-se com técnicos especializados em sua região</li>
                <li>• Acompanhar o progresso do serviço em tempo real</li>
                <li>• Receber orçamentos detalhados antes da execução</li>
                <li>• Avaliar o serviço e o técnico após a conclusão</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/find-technician">
                <Button size="lg" className="w-full sm:w-auto">
                  Encontrar Técnico Agora
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Fale Conosco
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesMaintenancePage;
