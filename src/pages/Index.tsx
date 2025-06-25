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
  ArrowRight,
  Store as StoreIcon,
  ShoppingBag
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/10">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section - Mobile optimized */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          <div className="container px-4 mx-auto relative z-10">
            <div className={cn(
              "gap-8 md:gap-12 items-center",
              isMobile ? "flex flex-col text-center" : "grid md:grid-cols-2"
            )}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  Suporte Técnico Inteligente
                </span>
                <h1 className={cn(
                  "font-bold leading-tight",
                  isMobile ? "text-2xl md:text-3xl" : "text-4xl md:text-5xl"
                )}>
                  Precisando de suporte técnico? <span className="text-primary">Nós conectamos você ao especialista certo.</span>
                </h1>
                <p className={cn(
                  "text-muted-foreground",
                  isMobile ? "text-base" : "text-lg"
                )}>
                  Soluções rápidas com técnicos certificados em manutenção, instalação e suporte em equipamentos industriais e de impressão.
                </p>
                <div className={cn(
                  "flex gap-4 pt-2",
                  isMobile ? "flex-col" : "flex-wrap"
                )}>
                  <Link to="/find-technician">
                    <Button size={isMobile ? "default" : "lg"} className="rounded-full w-full md:w-auto shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                      Buscar Técnico Agora
                    </Button>
                  </Link>
                  <Link to="/technician">
                    <Button size={isMobile ? "default" : "lg"} variant="outline" className="rounded-full w-full md:w-auto shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                      Quero Prestar Serviços
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
                <div className="relative bg-black/5 backdrop-blur-xl rounded-3xl border border-white/10 p-4 md:p-6 shadow-xl">
                  <div className={cn(
                    "grid gap-3 md:gap-4",
                    isMobile ? "grid-cols-2" : "grid-cols-2"
                  )}>
                    <TooltipProvider>
                      {[
                        { icon: <Wrench className={cn(isMobile ? "h-5 w-5" : "h-6 w-6", "text-primary")} />, title: "Manutenção Especializada", path: "/servicos/manutencao", tooltip: "Solicite serviços de manutenção especializada" },
                        { icon: <Search className={cn(isMobile ? "h-5 w-5" : "h-6 w-6", "text-primary")} />, title: "Busca Inteligente", path: "/busca", tooltip: "Encontre técnicos especializados rapidamente" },
                        { icon: <ShieldCheck className={cn(isMobile ? "h-5 w-5" : "h-6 w-6", "text-primary")} />, title: "Técnicos Verificados", path: "/tecnicos", tooltip: "Todos os técnicos são verificados e certificados" },
                        { icon: <StoreIcon className={cn(isMobile ? "h-5 w-5" : "h-6 w-6", "text-primary")} />, title: "Loja de Peças", path: "/loja", tooltip: "Acesse nossa loja de peças especializada" }
                      ].map((feature, index) => (
                        <Link to={feature.path} key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Card className={cn(
                                "hover:bg-white/5 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/10 cursor-pointer",
                                isMobile ? "p-3" : "p-4"
                              )}>
                                <div className="flex flex-col items-center text-center gap-2">
                                  <div className={cn(
                                    "bg-primary/10 rounded-full",
                                    isMobile ? "p-2" : "p-3"
                                  )}>
                                    {feature.icon}
                                  </div>
                                  <h3 className={cn(
                                    "font-medium",
                                    isMobile ? "text-xs" : "text-sm"
                                  )}>{feature.title}</h3>
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
        
        {/* Quick Access Section - Mobile optimized */}
        <section className="py-12 md:py-16 bg-black/5 backdrop-blur-md">
          <div className="container px-4 mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={cn(
                "font-bold text-center mb-8 md:mb-12",
                isMobile ? "text-xl" : "text-2xl md:text-3xl"
              )}
            >
              Acesso Rápido às Funções
            </motion.h2>
            
            <div className={cn(
              "grid gap-3 md:gap-4",
              isMobile ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
            )}>
              <TooltipProvider>
                {[
                  { icon: <User className={cn(isMobile ? "h-5 w-5" : "h-6 w-6")} />, title: "Perfil", path: "/cliente/perfil", tooltip: "Gerencie seu perfil" },
                  { icon: <Wrench className={cn(isMobile ? "h-5 w-5" : "h-6 w-6")} />, title: "Serviços", path: "/cliente/servicos", tooltip: "Veja seus serviços solicitados" },
                  { icon: <MessageSquare className={cn(isMobile ? "h-5 w-5" : "h-6 w-6")} />, title: "Chat", path: "/cliente/chat", tooltip: "Converse com técnicos" },
                  { icon: <CreditCard className={cn(isMobile ? "h-5 w-5" : "h-6 w-6")} />, title: "Pagamentos", path: "/cliente/pagamentos", tooltip: "Gerencie seus pagamentos" },
                  { icon: <StoreIcon className={cn(isMobile ? "h-5 w-5" : "h-6 w-6")} />, title: "Loja", path: "/store", tooltip: "Acesse nossa loja de peças" },
                  { icon: <ShieldCheck className={cn(isMobile ? "h-5 w-5" : "h-6 w-6")} />, title: "Suporte", path: "/contact", tooltip: "Entre em contato com o suporte" },
                ].map((item, index) => (
                  <Link to={item.path} key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className={cn(
                            "bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex flex-col items-center justify-center gap-3 text-center hover:bg-primary/5 hover:border-primary/20 transition-all duration-300 cursor-pointer",
                            isMobile ? "p-3 h-20" : "p-4 h-32"
                          )}
                        >
                          <div className={cn(
                            "bg-primary/10 rounded-full",
                            isMobile ? "p-2" : "p-3"
                          )}>
                            {item.icon}
                          </div>
                          <span className={cn(
                            "font-medium",
                            isMobile ? "text-xs" : "text-sm"
                          )}>{item.title}</span>
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
        
        {/* Store Highlight Section - Mobile optimized */}
        <section className="py-12 md:py-16">
          <div className="container px-4 mx-auto">
            <div className={cn(
              "gap-8 md:gap-12 items-center",
              isMobile ? "flex flex-col text-center" : "grid md:grid-cols-2"
            )}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  Marketplace Especializado
                </span>
                <h2 className={cn(
                  "font-bold",
                  isMobile ? "text-2xl" : "text-3xl"
                )}>Loja de Peças e Equipamentos</h2>
                <p className={cn(
                  "text-muted-foreground",
                  isMobile ? "text-sm" : ""
                )}>
                  Encontre peças originais e componentes para equipamentos de impressão industrial.
                  Ofertas exclusivas de fornecedores verificados.
                </p>
                <div className={cn(
                  "flex gap-4",
                  isMobile ? "flex-col" : ""
                )}>
                  <Link to="/store">
                    <Button className="gap-2 w-full md:w-auto">
                      Visitar Loja <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/store/company-register">
                    <Button variant="outline" className="w-full md:w-auto">
                      Cadastrar Empresa
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={cn(
                  "grid gap-3 md:gap-4",
                  isMobile ? "grid-cols-1" : "grid-cols-2"
                )}
              >
                {[
                  { title: "Cabeças de Impressão", description: "Peças originais para diversas marcas", link: "/store/category/cabecas-de-impressao" },
                  { title: "Componentes", description: "Componentes especializados para manutenção", link: "/store/category/componentes-de-impressao" },
                  { title: "Peças de Reposição", description: "Peças de alta qualidade para sua máquina", link: "/store/category/pecas-de-reposicao" },
                  { title: "Empresas Parceiras", description: "Conheça nossos fornecedores verificados", link: "/store/companies" },
                ].map((item, index) => (
                  <Link to={item.link} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={cn(
                        "bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-primary/5 hover:border-primary/20 transition-all duration-300",
                        isMobile ? "p-3" : "p-4"
                      )}
                    >
                      <h3 className={cn(
                        "font-semibold mb-1",
                        isMobile ? "text-sm" : ""
                      )}>{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* How It Works - Mobile optimized */}
        <section className="py-12 md:py-16">
          <div className="container px-4 mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12"
            >
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                Processo Simples
              </span>
              <h2 className={cn(
                "font-bold",
                isMobile ? "text-xl" : "text-2xl md:text-3xl"
              )}>Como Funciona</h2>
            </motion.div>

            <div className={cn(
              "justify-between max-w-4xl mx-auto",
              isMobile ? "flex flex-col gap-6" : "flex flex-col md:flex-row gap-6 md:gap-0"
            )}>
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
                    <div className={cn(
                      "rounded-full bg-primary/10 flex items-center justify-center font-bold mb-4",
                      isMobile ? "w-12 h-12 text-lg" : "w-16 h-16 text-xl"
                    )}>
                      {item.step}
                    </div>
                    <h3 className={cn(
                      "font-semibold mb-2",
                      isMobile ? "text-base" : "text-lg"
                    )}>{item.title}</h3>
                    <p className={cn(
                      "text-muted-foreground",
                      isMobile ? "text-sm max-w-xs" : "text-sm max-w-xs"
                    )}>{item.description}</p>
                    
                    {!isMobile && index < 2 && (
                      <div className="hidden md:block absolute top-8 left-[calc(100%-1rem)] w-[calc(100%-2rem)] h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section - Mobile optimized */}
        <section className="py-12 md:py-16">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={cn(
                "bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-md border border-white/10 rounded-2xl text-center max-w-4xl mx-auto",
                isMobile ? "p-6 md:p-8" : "p-8 md:p-12"
              )}
            >
              <h2 className={cn(
                "font-bold mb-4",
                isMobile ? "text-xl" : "text-2xl md:text-3xl"
              )}>Pronto para Começar?</h2>
              <p className={cn(
                "text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto",
                isMobile ? "text-sm" : "text-lg"
              )}>
                Conecte-se com técnicos especializados em equipamentos industriais
              </p>
              <div className={cn(
                "flex gap-4 justify-center",
                isMobile ? "flex-col" : "flex-wrap"
              )}>
                <Link to="/register">
                  <Button className="rounded-full gap-2 w-full md:w-auto">
                    Criar Conta <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/find-technician">
                  <Button variant="outline" className="rounded-full w-full md:w-auto">
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
