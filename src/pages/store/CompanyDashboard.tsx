
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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Building className="h-10 w-10 text-blue-600 mr-4" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Portal do Fornecedor
                </h1>
                <p className="text-gray-600">
                  Bem-vindo, {user?.name || 'Doss Group'}!
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/loja/profile">
                <Button variant="outline">
                  <UserRound className="mr-2 h-4 w-4" />
                  Meu Perfil
                </Button>
              </Link>
              <Link to="/loja/settings">
                <Button>
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-gray-600">Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{user?.productCount || 87}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-gray-600">Vendas (Mês)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">23</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                  <Lock className="h-4 w-4" />
                  Faturamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">R$ 12.450,00</div>
                <div className="text-xs text-green-600 mt-2">
                  Pagamento Protegido
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-gray-600">Avaliação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{user?.rating || 4.8} ★</div>
              </CardContent>
            </Card>
          </div>
          
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
                      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-600" />
                        <div>
                          <p className="font-semibold text-yellow-900">Estoque Baixo</p>
                          <p className="text-sm text-yellow-700">3 produtos estão com estoque abaixo do mínimo</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-md flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 text-blue-600" />
                        <div>
                          <p className="font-semibold text-blue-900">Pedidos Pendentes</p>
                          <p className="text-sm text-blue-700">5 pedidos aguardando processamento</p>
                        </div>
                      </div>
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
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Produto
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
                      <div className="grid grid-cols-12 p-3 items-center hover:bg-gray-50">
                        <div className="col-span-1 text-gray-500">8006</div>
                        <div className="col-span-5 font-medium">BOMBA DE TINTA 100/200ML</div>
                        <div className="col-span-2 text-right">14</div>
                        <div className="col-span-2 text-right">R$ 155,00</div>
                        <div className="col-span-2 text-right">
                          <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Ativo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <p className="text-sm text-gray-500">
                    Mostrando produtos disponíveis
                  </p>
                  <Link to="/loja/products">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      Ver todos os produtos
                      <ArrowRight className="h-4 w-4" />
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
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyDashboard;
