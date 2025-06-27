
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  ArrowLeft, 
  CreditCard, 
  Lock,
  Truck,
  MapPin
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/format';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  
  const [formData, setFormData] = useState({
    // Customer info
    name: '',
    email: '',
    phone: '',
    
    // Address
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    
    // Payment
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  });

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Carrinho vazio</h2>
            <p className="text-gray-600 mb-6">Adicione produtos ao carrinho para finalizar a compra.</p>
            <Link to="/marketplace">
              <Button>Continuar Comprando</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shipping = cart.total > 200 ? 0 : 15.90;
  const finalTotal = cart.total + shipping;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error('Preencha todos os campos obrigatórios');
      }

      // Mock order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const orderId = `ORD-${Date.now()}`;
      
      toast({
        title: "Pedido realizado com sucesso!",
        description: `Seu pedido #${orderId} foi confirmado.`,
      });

      clearCart();
      navigate(`/pedido-confirmado/${orderId}`);
    } catch (error) {
      toast({
        title: "Erro ao processar pedido",
        description: error instanceof Error ? error.message : "Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/carrinho">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Carrinho
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Finalizar Compra</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Endereço de Entrega
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="zipCode">CEP *</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          placeholder="00000-000"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="street">Rua *</Label>
                        <Input
                          id="street"
                          value={formData.street}
                          onChange={(e) => handleInputChange('street', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="number">Número *</Label>
                        <Input
                          id="number"
                          value={formData.number}
                          onChange={(e) => handleInputChange('number', e.target.value)}
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          value={formData.complement}
                          onChange={(e) => handleInputChange('complement', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input
                          id="neighborhood"
                          value={formData.neighborhood}
                          onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado *</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Forma de Pagamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="pix" id="pix" />
                        <Label htmlFor="pix" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">PIX</div>
                              <div className="text-sm text-gray-600">Aprovação instantânea</div>
                            </div>
                            <div className="text-green-600 font-bold">
                              {formatCurrency(finalTotal)}
                            </div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Cartão de Crédito</div>
                              <div className="text-sm text-gray-600">Parcelamento disponível</div>
                            </div>
                            <div className="text-green-600 font-bold">
                              3x de {formatCurrency(finalTotal / 3)}
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'credit' && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Número do Cartão</Label>
                          <Input
                            id="cardNumber"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            placeholder="0000 0000 0000 0000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Nome no Cartão</Label>
                          <Input
                            id="cardName"
                            value={formData.cardName}
                            onChange={(e) => handleInputChange('cardName', e.target.value)}
                            placeholder="Como está no cartão"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry">Validade</Label>
                            <Input
                              id="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                              placeholder="MM/AA"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvv">CVV</Label>
                            <Input
                              id="cardCvv"
                              value={formData.cardCvv}
                              onChange={(e) => handleInputChange('cardCvv', e.target.value)}
                              placeholder="000"
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cart.items.map((item) => (
                        <div key={item.product.id} className="flex items-start gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product.imagemPrincipal} 
                              alt={item.product.nome}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-2">
                              {item.product.nome}
                            </h4>
                            <div className="text-xs text-gray-600 mt-1">
                              Qty: {item.quantity} × {formatCurrency(item.product.preco)}
                            </div>
                            <div className="font-medium text-sm">
                              {formatCurrency(item.subtotal)}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <hr />
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>{formatCurrency(cart.total)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center">
                            <Truck className="h-3 w-3 mr-1" />
                            Frete
                          </span>
                          <span>
                            {shipping === 0 ? 'Grátis' : formatCurrency(shipping)}
                          </span>
                        </div>
                      </div>
                      
                      <hr />
                      
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>{formatCurrency(finalTotal)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "Processando..." : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Finalizar Pedido
                    </>
                  )}
                </Button>
                
                <div className="text-xs text-gray-500 text-center">
                  Pagamento 100% seguro • SSL • Dados protegidos
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
