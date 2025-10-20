import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { products } from '@/data/products';
import { formatCurrency } from '@/lib/format';
import { ArrowLeft, ShoppingCart, Star, Package, Truck, Shield } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const isMobile = useIsMobile();
  
  const product = products.find(p => p.codigo === codigo);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Produto não encontrado</h1>
            <p className="text-gray-600 mb-4">O produto que você está procurando não existe ou foi removido.</p>
            <Link to="/store">
              <Button variant="outline" className="text-[#2563eb] border-[#2563eb] hover:bg-[#2563eb] hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para a loja
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success('Produto adicionado ao carrinho!', {
      description: product.nome
    });
  };

  const handleBuyNow = () => {
    toast.info('Redirecionando para checkout...');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/store" className="text-[#2563eb] hover:underline font-inter">
              <ArrowLeft className="inline h-4 w-4 mr-2" />
              Voltar para a loja
            </Link>
          </div>

          <div className={cn(
            "grid gap-8",
            isMobile ? "grid-cols-1" : "md:grid-cols-2"
          )}>
            {/* Product Image */}
            <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
              <img 
                src="/placeholder.svg" 
                alt={product.nome}
                className="max-w-full h-auto max-h-96 object-contain"
              />
            </div>

            {/* Product Info */}
            <div>
              <Badge variant="outline" className="border-[#2563eb] text-[#2563eb] mb-4">
                {product.categoria}
              </Badge>
              
              <h1 className={cn(
                "font-bold text-gray-900 mb-2 font-inter",
                isMobile ? "text-2xl" : "text-3xl"
              )}>
                {product.nome}
              </h1>
              
              <p className="text-gray-600 mb-4 font-inter">
                Código: {product.codigo}
              </p>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className="h-5 w-5 fill-yellow-400 text-yellow-400" 
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-inter">(48 avaliações)</span>
              </div>

              <div className="mb-6">
                <p className={cn(
                  "font-bold text-[#2563eb] font-inter",
                  isMobile ? "text-3xl" : "text-4xl"
                )}>
                  {formatCurrency(product.preco)}
                </p>
                <p className="text-gray-600 text-sm mt-1 font-inter">
                  ou 12x de {formatCurrency(product.preco / 12)} sem juros
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <Button 
                  onClick={handleBuyNow}
                  className="w-full bg-[#2563eb] hover:bg-[#1e40af] text-white font-inter"
                  size={isMobile ? "default" : "lg"}
                >
                  Comprar Agora
                </Button>
                
                <Button 
                  onClick={handleAddToCart}
                  variant="outline"
                  className="w-full text-[#2563eb] border-[#2563eb] hover:bg-[#2563eb] hover:text-white font-inter"
                  size={isMobile ? "default" : "lg"}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Adicionar ao Carrinho
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="p-4 text-center border-gray-200">
                  <Truck className="h-8 w-8 text-[#2563eb] mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 font-inter">Frete Grátis</p>
                  <p className="text-xs text-gray-600 font-inter">acima de R$ 200</p>
                </Card>
                
                <Card className="p-4 text-center border-gray-200">
                  <Shield className="h-8 w-8 text-[#2563eb] mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 font-inter">Garantia</p>
                  <p className="text-xs text-gray-600 font-inter">12 meses</p>
                </Card>
                
                <Card className="p-4 text-center border-gray-200">
                  <Package className="h-8 w-8 text-[#2563eb] mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 font-inter">Em Estoque</p>
                  <p className="text-xs text-gray-600 font-inter">Pronta entrega</p>
                </Card>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 font-inter">Descrição do Produto</h2>
                <div className="prose prose-sm text-gray-600 font-inter">
                  <p>
                    {product.nome} é um produto de alta qualidade, ideal para uso profissional em impressoras industriais.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li>Alta durabilidade e resistência</li>
                    <li>Compatível com diversos modelos</li>
                    <li>Fácil instalação</li>
                    <li>Certificado de qualidade</li>
                  </ul>
                  
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Especificações Técnicas</h3>
                    <ul className="space-y-1 text-sm">
                      <li><strong>Marca:</strong> {product.marca || 'Original'}</li>
                      <li><strong>Categoria:</strong> {product.categoria}</li>
                      <li><strong>Código:</strong> {product.codigo}</li>
                      {product.ncm && <li><strong>NCM:</strong> {product.ncm}</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
