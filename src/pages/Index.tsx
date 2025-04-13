
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Wrench, 
  Search, 
  MessageSquare, 
  ShieldCheck, 
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/10">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section - Simplified & Futuristic */}
        <section className="relative py-20 overflow-hidden">
          <div className="container px-4 mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  Suporte Técnico Inteligente
                </span>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Conecte-se com <span className="text-primary">especialistas técnicos</span> instantaneamente
                </h1>
                <p className="text-lg text-muted-foreground">
                  Plataforma avançada para conectar técnicos qualificados e clientes para serviços especializados em equipamentos industriais.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/register">
                    <Button size="lg" className="rounded-full">
                      Comece Agora
                    </Button>
                  </Link>
                  <Link to="/technician">
                    <Button size="lg" variant="outline" className="rounded-full">
                      Para Técnicos
                    </Button>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-black/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <TooltipProvider>
                      {[
                        { icon: <Wrench className="h-6 w-6 text-primary" />, title: "Manutenção Especializada", path: "/cliente/solicitar", tooltip: "Solicite serviços de manutenção" },
                        { icon: <Search className="h-6 w-6 text-primary" />, title: "Busca Inteligente", path: "/find-technician", tooltip: "Encontre técnicos na sua região" },
                        { icon: <ShieldCheck className="h-6 w-6 text-primary" />, title: "Técnicos Verificados", path: "/technician", tooltip: "Todos os técnicos são verificados" },
                        { icon: <CreditCard className="h-6 w-6 text-primary" />, title: "Pagamento Seguro", path: "/cliente/pagamentos", tooltip: "Pagamentos seguros e garantidos" }
                      ].map((feature, index) => (
                        <Link to={feature.path} key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Card className="p-4 hover:bg-white/5 transition-all duration-300 backdrop-blur-md border border-white/10 cursor-pointer">
                                <div className="flex flex-col items-center text-center gap-2">
                                  <div className="bg-primary/10 p-3 rounded-full">
                                    {feature.icon}
                                  </div>
                                  <h3 className="font-medium text-sm">{feature.title}</h3>
                                </div>
                              </Card>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{feature.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </Link>
                      ))}
                    </TooltipProvider>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Quick Access Section */}
        <section className="py-16 bg-black/5 backdrop-blur-md">
          <div className="container px-4 mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-center mb-12"
            >
              Acesso Rápido às Funções
            </motion.h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <TooltipProvider>
                {[
                  { icon: <User className="h-6 w-6" />, title: "Perfil", path: "/cliente/perfil", tooltip: "Gerencie seu perfil" },
                  { icon: <Wrench className="h-6 w-6" />, title: "Serviços", path: "/cliente/servicos", tooltip: "Veja seus serviços solicitados" },
                  { icon: <MessageSquare className="h-6 w-6" />, title: "Chat", path: "/cliente/chat", tooltip: "Converse com técnicos" },
                  { icon: <CreditCard className="h-6 w-6" />, title: "Pagamentos", path: "/cliente/pagamentos", tooltip: "Gerencie seus pagamentos" },
                  { icon: <Search className="h-6 w-6" />, title: "Encontrar Técnico", path: "/find-technician", tooltip: "Busque técnicos na sua região" },
                  { icon: <ShieldCheck className="h-6 w-6" />, title: "Suporte", path: "/contact", tooltip: "Entre em contato com o suporte" },
                ].map((item, index) => (
                  <Link to={item.path} key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-3 text-center hover:bg-primary/5 hover:border-primary/20 transition-all duration-300 h-32 cursor-pointer"
                        >
                          <div className="bg-primary/10 p-3 rounded-full">
                            {item.icon}
                          </div>
                          <span className="font-medium text-sm">{item.title}</span>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </section>
        
        {/* How It Works - Simplified */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                Processo Simples
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">Como Funciona</h2>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Solicite o Serviço",
                  description: "Escolha o tipo de serviço necessário",
                  path: "/cliente/solicitar"
                },
                {
                  step: "02",
                  title: "Encontre um Técnico",
                  description: "Conecte-se com especialistas qualificados",
                  path: "/find-technician"
                },
                {
                  step: "03",
                  title: "Problema Resolvido",
                  description: "Receba o serviço e faça o pagamento",
                  path: "/cliente/pagamentos"
                }
              ].map((item, index) => (
                <Link to={item.path} key={index}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">{item.description}</p>
                    
                    {index < 2 && (
                      <div className="hidden md:block absolute top-8 left-[calc(100%-1rem)] w-[calc(100%-2rem)] h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para Começar?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Conecte-se com técnicos especializados em equipamentos industriais
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/register">
                  <Button className="rounded-full gap-2">
                    Criar Conta <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/find-technician">
                  <Button variant="outline" className="rounded-full">
                    Encontrar Técnico
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
