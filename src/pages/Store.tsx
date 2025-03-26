
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Store = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Loja de Peças</h1>
        <p className="text-muted-foreground">
          Em breve, nossa loja de peças estará disponível com uma seleção completa de componentes e acessórios.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Store;
