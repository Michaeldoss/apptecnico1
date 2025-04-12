
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  CreditCard, 
  Shield, 
  Clock, 
  Printer,
  Users,
  Calendar,
  Zap,
  Settings,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const TechnicianLanding = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/10">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  Plataforma para Técnicos
                </span>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Expanda seu alcance como <span className="text-primary">técnico especializado</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Conecte-se diretamente com clientes que precisam de seus serviços especializados em equipamentos industriais.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/register">
                    <Button size="lg" className="rounded-full">
                      Cadastre-se como Técnico
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="rounded-full">
                      Entrar na Plataforma
                    </Button>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative aspect-square md:aspect-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
                <div className="relative h-full flex items-center justify-center bg-black/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-xl">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: <CreditCard className="h-6 w-6 text-primary" />, title: "Pagamentos Diretos" },
                      { icon: <Users className="h-6 w-6 text-primary" />, title: "Novos Clientes" },
                      { icon: <Calendar className="h-6 w-6 text-primary" />, title: "Agenda Flexível" },
                      { icon: <Shield className="h-6 w-6 text-primary" />, title: "Segurança" }
                    ].map((feature, index) => (
                      <Card key={index} className="p-4 hover:bg-white/5 transition-all duration-300 backdrop-blur-md border border-white/10">
                        <div className="flex flex-col items-center text-center gap-2">
                          <div className="bg-primary/10 p-3 rounded-full">
                            {feature.icon}
                          </div>
                          <h3 className="font-medium text-sm">{feature.title}</h3>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Equipment Types - More Compact */}
        <section className="py-16 bg-black/5 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-center mb-10"
            >
              Equipamentos Especializados
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: <Printer />,
                  title: "Plotters de Impressão",
                  description: "Eco Solvente, UV, Sublimática, DTF"
                },
                {
                  icon: <Wrench />,
                  title: "Equipamentos de Acabamento",
                  description: "Calandras, Prensas, Carrosséis"
                },
                {
                  icon: <Zap />,
                  title: "Máquinas CNC",
                  description: "CNC CO², Router e Gravadoras Laser"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="bg-primary/10 p-4 rounded-full">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits - Redesigned */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                Vantagens
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">Por que se Tornar um Técnico Parceiro?</h2>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <CreditCard />, title: "Receba por Serviço", description: "Defina seus preços e receba pagamentos diretos" },
                { icon: <Shield />, title: "Segurança Garantida", description: "Todos os clientes são verificados" },
                { icon: <Clock />, title: "Flexibilidade de Horário", description: "Gerencie sua agenda conforme sua disponibilidade" },
                { icon: <Settings />, title: "Gestão Simplificada", description: "Ferramentas para gerenciar seus serviços" }
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {benefit.icon}
                    </div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para começar?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Junte-se à nossa rede de técnicos especializados em equipamentos de impressão e corte industrial.
              </p>
              <Link to="/register">
                <Button size="lg" className="rounded-full gap-2">
                  Criar Conta de Técnico <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TechnicianLanding;
