
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Star, 
  Shield, 
  Truck,
  MessageCircle,
  Share2
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/format';
import { MarketplaceProduct } from '@/types/marketplace';

// This would normally fetch product data based on the ID
const mockProduct: MarketplaceProduct = {
  id: '1',
  vendorId: 'vendor1',
  vendorName: 'TechParts Pro',
  vendorRating: 4.8,
  nome: 'Damper UV Premium - Epson DX5',
  categoria: 'damper', // Fixed: using valid ProductCategory value
  preco: 45.90,
  precoOriginal: 55.00,
  desconto: 17,
  imagens: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  imagemPrincipal: '/placeholder.svg',
  descricao: 'Damper de alta qualidade para impressoras UV com cabeça Epson DX5. Fabricado em silicone premium, oferece excelente resistência e durabilidade para uso industrial.',
  especificacoesTecnicas: 'Material: Silicone premium\nPressão: 0.02-0.05 MPa\nTemperatura: -40°C a +180°C\nCompatibilidade: Tintas UV/Solvente',
  tipoEquipamento: ['UV'],
  marca: ['Epson'],
  modelosCompativeis: ['R1900', 'R2000', 'R3000', '1390', '1400'],
  codigoInterno: 'DMP-UV-001',
  referenciaFabricante: 'EPD-DX5-UV',
  quantidadeEstoque: 25,
  peso: 0.1,
  dimensoes: { comprimento: 5, largura: 3, altura: 2 },
  garantiaDias: 90,
  notaFiscalDisponivel: true,
  ativo: true,
  criadoEm: '2024-01-15',
  atualizadoEm: '2024-01-15',
  observacoes: 'Produto testado e aprovado por nossos técnicos.',
  sku: 'DMP-001',
  ncm: '84439990'
};

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);

  // In a real app, you would fetch the product data here
  const product = mockProduct;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/marketplace">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Marketplace
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-lg overflow-hidden border">
                <img 
                  src={product.imagens[selectedImage]} 
                  alt={product.nome}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto">
                {product.imagens.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${product.nome} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary">{product.categoria}</Badge>
                  {product.tipoEquipamento.map(tipo => (
                    <Badge key={tipo} variant="outline">{tipo}</Badge>
                  ))}
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.nome}
                </h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Vendido por:</span>
                    <Link to={`/loja/${product.vendorId}`} className="font-medium text-blue-600 hover:underline">
                      {product.vendorName}
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{product.vendorRating}</span>
                    <span className="text-gray-600 text-sm ml-1">(128 avaliações)</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {product.precoOriginal && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-gray-500 line-through">
                        {formatCurrency(product.precoOriginal)}
                      </span>
                      <Badge variant="destructive">-{product.desconto}%</Badge>
                    </div>
                  )}
                  <div className="text-4xl font-bold text-green-600">
                    {formatCurrency(product.preco)}
                  </div>
                  <p className="text-sm text-gray-600">
                    ou 3x de {formatCurrency(product.preco / 3)} sem juros
                  </p>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <label className="text-sm font-medium mr-2">Quantidade:</label>
                    <div className="flex items-center border rounded">
                      <button 
                        className="px-3 py-1 hover:bg-gray-100"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-x">{quantity}</span>
                      <button 
                        className="px-3 py-1 hover:bg-gray-100"
                        onClick={() => setQuantity(Math.min(product.quantidadeEstoque, quantity + 1))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.quantidadeEstoque} unidades disponíveis
                  </span>
                </div>

                <div className="flex gap-3 mb-6">
                  <Button 
                    size="lg" 
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={product.quantidadeEstoque === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                  <Button variant="outline" size="lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Conversar
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="flex flex-col items-center">
                    <Shield className="h-6 w-6 text-green-500 mb-1" />
                    <span className="font-medium">{product.garantiaDias} dias</span>
                    <span className="text-gray-600">Garantia</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Truck className="h-6 w-6 text-blue-500 mb-1" />
                    <span className="font-medium">Frete grátis</span>
                    <span className="text-gray-600">Acima de R$ 200</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Star className="h-6 w-6 text-yellow-500 mb-1" />
                    <span className="font-medium">Suporte</span>
                    <span className="text-gray-600">Especializado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Descrição do Produto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {product.descricao}
                  </p>
                  {product.observacoes && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-sm"><strong>Observações:</strong> {product.observacoes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Especificações Técnicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {product.especificacoesTecnicas.split('\n').map((spec, index) => (
                      <div key={index} className="flex">
                        <span className="text-gray-700">{spec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compatibilidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Tipos de Equipamento:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.tipoEquipamento.map(tipo => (
                          <Badge key={tipo} variant="outline">{tipo}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Marcas Compatíveis:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.marca.map(marca => (
                          <Badge key={marca} variant="outline">{marca}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Modelos Compatíveis:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.modelosCompativeis.map(modelo => (
                          <Badge key={modelo} variant="secondary">{modelo}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Vendedor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{product.vendorName}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{product.vendorRating}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Ver Perfil do Vendedor
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Detalhes do Produto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Código:</span>
                      <span className="font-mono">{product.codigoInterno}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Referência:</span>
                      <span className="font-mono">{product.referenciaFabricante}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Peso:</span>
                      <span>{product.peso}kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensões:</span>
                      <span>{product.dimensoes.comprimento}x{product.dimensoes.largura}x{product.dimensoes.altura}cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nota Fiscal:</span>
                      <span>{product.notaFiscalDisponivel ? '✅ Disponível' : '❌ Não disponível'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
