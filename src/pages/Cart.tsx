
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  Trash2, 
  ArrowLeft,
  Package,
  CreditCard,
  Truck
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/format';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const calculateShipping = () => {
    // Mock shipping calculation
    return cart.total > 200 ? 0 : 15.90;
  };

  const shipping = calculateShipping();
  const finalTotal = cart.total + shipping;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Seu carrinho está vazio
              </h2>
              <p className="text-gray-600 mb-6">
                Adicione produtos ao carrinho para continuar com a compra.
              </p>
              <Link to="/marketplace">
                <Button>
                  <Package className="h-4 w-4 mr-2" />
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/marketplace">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continuar Comprando
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Carrinho de Compras</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Itens ({cart.itemCount})
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Limpar Carrinho
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.imagemPrincipal} 
                          alt={item.product.nome}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                          {item.product.nome}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Vendido por: {item.product.vendorName}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.product.tipoEquipamento.map((tipo) => (
                            <Badge key={tipo} variant="outline" className="text-xs">
                              {tipo}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                              className="w-16 text-center"
                              min="1"
                              max={item.product.quantidadeEstoque}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.quantidadeEstoque}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {formatCurrency(item.subtotal)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatCurrency(item.product.preco)} cada
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-gray-500">
                            {item.quantity} unidades
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.itemCount} {cart.itemCount === 1 ? 'item' : 'itens'})</span>
                    <span>{formatCurrency(cart.total)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      Frete
                    </span>
                    <span>
                      {shipping === 0 ? (
                        <Badge variant="secondary">Grátis</Badge>
                      ) : (
                        formatCurrency(shipping)
                      )}
                    </span>
                  </div>
                  
                  {shipping === 0 && (
                    <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                      🎉 Frete grátis para compras acima de R$ 200,00
                    </div>
                  )}
                  
                  <hr />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(finalTotal)}</span>
                  </div>
                  
                  <Link to="/checkout" className="w-full block">
                    <Button className="w-full" size="lg">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Finalizar Compra
                    </Button>
                  </Link>
                  
                  <div className="text-xs text-gray-500 text-center">
                    Pagamento seguro • Compra protegida
                  </div>
                </CardContent>
              </Card>
              
              {/* Trust Badges */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Pagamento seguro</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Garantia de entrega</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Suporte especializado</span>
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

export default Cart;
