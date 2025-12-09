import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Store as StoreIcon, Package, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const Store = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                Marketplace
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                Em breve você encontrará aqui peças, componentes e equipamentos das melhores lojas parceiras.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Em Construção
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Estamos preparando uma experiência incrível de compras para você. 
                Em breve teremos produtos de diversas lojas parceiras disponíveis.
              </p>

              {/* Features Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card className="bg-card border border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <StoreIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Lojas Parceiras</h3>
                    <p className="text-sm text-muted-foreground">
                      Diversas lojas especializadas em um só lugar
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Produtos Variados</h3>
                    <p className="text-sm text-muted-foreground">
                      Peças, equipamentos e componentes técnicos
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Compra Segura</h3>
                    <p className="text-sm text-muted-foreground">
                      Pagamento protegido e entrega garantida
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* CTA for stores */}
              <div className="mt-12 p-6 bg-muted/50 rounded-xl">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  É lojista? Cadastre sua empresa!
                </h3>
                <p className="text-muted-foreground mb-4">
                  Faça parte do nosso marketplace e alcance mais clientes.
                </p>
                <Button asChild>
                  <Link to="/store/register">
                    Cadastrar Loja
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Store;
