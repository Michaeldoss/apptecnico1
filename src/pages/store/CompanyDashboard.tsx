
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  Plus, 
  Store, 
  AlertTriangle,
  Building,
  UserRound,
  ArrowRight,
  Shield,
  Lock,
  Star,
  Eye,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import DashboardChart from '@/components/store/DashboardChart';
import OrdersList from '@/components/store/OrdersList';

const salesData = [
  { name: 'Jan', vendas: 4000, receita: 2400 },
  { name: 'Fev', vendas: 3000, receita: 1398 },
  { name: 'Mar', vendas: 2000, receita: 9800 },
  { name: 'Abr', vendas: 2780, receita: 3908 },
  { name: 'Mai', vendas: 1890, receita: 4800 },
  { name: 'Jun', vendas: 2390, receita: 3800 },
  { name: 'Jul', vendas: 3490, receita: 4300 },
];

const categoryData = [
  { name: 'Impressoras', valor: 4000 },
  { name: 'Peças', valor: 3000 },
  { name: 'Suprimentos', valor: 2000 },
  { name: 'Manutenção', valor: 2780 },
  { name: 'Outros', valor: 1890 },
];

const sampleOrders = [
  {
    id: '1001',
    customer: 'João Silva',
    date: '14/04/2023',
    total: 1250.00,
    status: 'completed' as const,
    items: 3,
    paymentMethod: 'Cartão de Crédito'
  },
  {
    id: '1002',
    customer: 'Maria Oliveira',
    date: '13/04/2023',
    total: 450.90,
    status: 'processing' as const,
    items: 2,
    paymentMethod: 'Pix'
  },
];

const CompanyDashboard = () => {
  const { isAuthenticated, userType, user } = useAuth();
  
  console.log('CompanyDashboard - Renderizando');
  console.log('CompanyDashboard - isAuthenticated:', isAuthenticated);
  console.log('CompanyDashboard - userType:', userType);
  console.log('CompanyDashboard - user:', user?.name);
  
  if (!isAuthenticated || userType !== 'company') {
    console.log('CompanyDashboard - Redirecionando para registro');
    return <Navigate to="/loja/register" replace />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section similar to home page */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-24 px-4 relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Building className="h-12 w-12 text-yellow-300 mr-4 drop-shadow-lg" />
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">
                  Portal do Fornecedor
                </h1>
                <p className="text-xl text-blue-100 mt-2 drop-shadow-lg">
                  Bem-vindo, {user?.name || 'Doss Group'}!
                </p>
              </div>
            </div>
            <div className="hidden md:flex gap-3">
              <Link to="/loja/profile">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                  <UserRound className="mr-2 h-4 w-4" />
                  Meu Perfil
                </Button>
              </Link>
              <Link to="/loja/settings">
                <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Cards de métricas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Link to="/loja/products" className="group">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/25 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-blue-100">Produtos</div>
                  <Package className="h-6 w-6 text-yellow-300 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-black text-white">{user?.productCount || 87}</div>
                <div className="text-xs text-blue-200 mt-2">Clique para gerenciar</div>
              </div>
            </Link>
            
            <Link to="/loja/orders" className="group">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/25 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-blue-100">Vendas (Mês)</div>
                  <ShoppingBag className="h-6 w-6 text-green-300 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-black text-white">23</div>
                <div className="text-xs text-blue-200 mt-2">Ver pedidos</div>
              </div>
            </Link>
            
            <Link to="/loja/financeiro" className="group">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/25 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-blue-100 flex items-center gap-1">
                    <Lock className="h-4 w-4" />
                    Faturamento
                  </div>
                  <BarChart3 className="h-6 w-6 text-yellow-300 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-black text-white">R$ 12.450,00</div>
                <div className="text-xs text-green-300 mt-2 font-semibold">
                  Pagamento Protegido
                </div>
              </div>
            </Link>
            
            <Link to="/loja/avaliacoes" className="group">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/25 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-blue-100">Avaliação</div>
                  <Star className="h-6 w-6 text-yellow-300 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-black text-white">{user?.rating || 4.8} ★</div>
                <div className="text-xs text-blue-200 mt-2">Ver avaliações</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Main Dashboard Content */}
      <main className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
          
          <Tabs defaultValue="overview">
            <div className="border-b border-gray-200 mb-6">
              <TabsList className="w-full flex justify-start h-auto p-0 bg-transparent">
                <TabsTrigger value="overview" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent text-gray-700 font-medium">
                  <LayoutDashboard className="mr-2 h-4 w-4 text-blue-600" />
                  Visão Geral
                </TabsTrigger>
                <TabsTrigger value="products" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent text-gray-700 font-medium">
                  <Package className="mr-2 h-4 w-4 text-blue-600" />
                  Produtos
                </TabsTrigger>
                <TabsTrigger value="orders" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent text-gray-700 font-medium">
                  <ShoppingBag className="mr-2 h-4 w-4 text-blue-600" />
                  Pedidos
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Desempenho Recente</CardTitle>
                    <CardDescription className="text-gray-600">
                      Visualização dos últimos 30 dias de atividade da sua loja
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DashboardChart 
                      data={salesData} 
                      type="area" 
                      dataKeys={['vendas', 'receita']}
                      height={300}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">Atenção Necessária</CardTitle>
                    <CardDescription className="text-gray-600">
                      Itens que precisam da sua atenção
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Link to="/loja/estoque" className="block">
                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md flex items-start hover:bg-yellow-100 transition-colors cursor-pointer group">
                          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-600 group-hover:scale-110 transition-transform" />
                          <div>
                            <p className="font-semibold text-yellow-900">Estoque Baixo</p>
                            <p className="text-sm text-yellow-700">3 produtos estão com estoque abaixo do mínimo</p>
                          </div>
                          <Eye className="h-4 w-4 ml-auto text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>
                      
                      <Link to="/loja/orders" className="block">
                        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-md flex items-start hover:bg-blue-100 transition-colors cursor-pointer group">
                          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-blue-600 group-hover:scale-110 transition-transform" />
                          <div>
                            <p className="font-semibold text-blue-900">Pedidos Pendentes</p>
                            <p className="text-sm text-blue-700">5 pedidos aguardando processamento</p>
                          </div>
                          <Eye className="h-4 w-4 ml-auto text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="products">
              <Card>
                <CardHeader className="flex-row items-center justify-between">
                  <div>
                    <CardTitle>Produtos</CardTitle>
                    <CardDescription>
                      Gerencie o catálogo de produtos da sua loja
                    </CardDescription>
                  </div>
                  <Link to="/loja/products">
                    <Button className="group">
                      <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      Adicionar Produto
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-12 bg-gray-50 p-3 text-sm font-medium border-b">
                      <div className="col-span-1">#</div>
                      <div className="col-span-5">Nome</div>
                      <div className="col-span-2 text-right">Estoque</div>
                      <div className="col-span-2 text-right">Preço</div>
                      <div className="col-span-2 text-right">Status</div>
                    </div>
                    
                    <div className="divide-y">
                      <Link to="/loja/products/8006" className="block group">
                        <div className="grid grid-cols-12 p-3 items-center hover:bg-gray-50 transition-colors">
                          <div className="col-span-1 text-gray-500">8006</div>
                          <div className="col-span-5 font-medium group-hover:text-blue-600 transition-colors">BOMBA DE TINTA 100/200ML</div>
                          <div className="col-span-2 text-right">14</div>
                          <div className="col-span-2 text-right">R$ 155,00</div>
                          <div className="col-span-2 text-right flex items-center justify-end gap-2">
                            <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Ativo</span>
                            <Eye className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <p className="text-sm text-gray-500">
                    Mostrando produtos disponíveis
                  </p>
                  <Link to="/loja/products">
                    <Button variant="outline" size="sm" className="flex items-center gap-1 group">
                      Ver todos os produtos
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos</CardTitle>
                  <CardDescription>
                    Gerencie os pedidos recebidos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OrdersList orders={sampleOrders} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyDashboard;
