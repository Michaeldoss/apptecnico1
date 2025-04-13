
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
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
} from 'lucide-react';

const CompanyDashboard = () => {
  const { isAuthenticated, userType, user } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated || (userType !== 'customer' && userType !== 'admin')) {
    return <Navigate to="/store/company-register" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Building className="h-10 w-10 text-primary mr-4" />
              <div>
                <h1 className="text-3xl font-bold">Portal do Fornecedor</h1>
                <p className="text-muted-foreground">
                  Bem-vindo, {user?.name || 'Doss Group'}!
                </p>
              </div>
            </div>
            <Button>
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Vendas (Mês)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Faturamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 12.450,00</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avaliação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8 ★</div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="products">
            <div className="border-b mb-6">
              <TabsList className="w-full flex justify-start h-auto p-0 bg-transparent">
                <TabsTrigger value="overview" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Visão Geral
                </TabsTrigger>
                <TabsTrigger value="products" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
                  <Package className="mr-2 h-4 w-4" />
                  Produtos
                </TabsTrigger>
                <TabsTrigger value="orders" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Pedidos
                </TabsTrigger>
                <TabsTrigger value="analytics" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="store" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
                  <Store className="mr-2 h-4 w-4" />
                  Minha Loja
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Desempenho Recente</CardTitle>
                    <CardDescription>
                      Visualização dos últimos 30 dias de atividade da sua loja
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex justify-center items-center border rounded-md bg-muted/20">
                      <p className="text-muted-foreground">Gráfico de atividade recente</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Atenção Necessária</CardTitle>
                    <CardDescription>
                      Itens que precisam da sua atenção
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Estoque Baixo</p>
                          <p className="text-sm">3 produtos estão com estoque abaixo do mínimo</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-100 text-blue-800 p-3 rounded-md flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Pedidos Pendentes</p>
                          <p className="text-sm">5 pedidos aguardando processamento</p>
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
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Produto
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium border-b">
                      <div className="col-span-1">#</div>
                      <div className="col-span-5">Nome</div>
                      <div className="col-span-2 text-right">Estoque</div>
                      <div className="col-span-2 text-right">Preço</div>
                      <div className="col-span-2 text-right">Status</div>
                    </div>
                    
                    {/* Product list */}
                    <div className="divide-y">
                      <div className="grid grid-cols-12 p-3 items-center hover:bg-muted/20">
                        <div className="col-span-1 text-muted-foreground">8006</div>
                        <div className="col-span-5 font-medium">BOMBA DE TINTA 100/200ML</div>
                        <div className="col-span-2 text-right">14</div>
                        <div className="col-span-2 text-right">R$ 155,00</div>
                        <div className="col-span-2 text-right">
                          <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Ativo</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-12 p-3 items-center hover:bg-muted/20">
                        <div className="col-span-1 text-muted-foreground">8007</div>
                        <div className="col-span-5 font-medium">BOMBA DE TINTA 300/400ML</div>
                        <div className="col-span-2 text-right">22</div>
                        <div className="col-span-2 text-right">R$ 205,00</div>
                        <div className="col-span-2 text-right">
                          <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Ativo</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-12 p-3 items-center hover:bg-muted/20">
                        <div className="col-span-1 text-muted-foreground">222240</div>
                        <div className="col-span-5 font-medium">BOTÃO ON/OFF - XULI - POLAR</div>
                        <div className="col-span-2 text-right">3</div>
                        <div className="col-span-2 text-right">R$ 90,00</div>
                        <div className="col-span-2 text-right">
                          <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">Estoque Baixo</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-12 p-3 items-center hover:bg-muted/20">
                        <div className="col-span-1 text-muted-foreground">8008</div>
                        <div className="col-span-5 font-medium">BOMBA DE TINTA PERISTÁLTICA</div>
                        <div className="col-span-2 text-right">5</div>
                        <div className="col-span-2 text-right">R$ 432,00</div>
                        <div className="col-span-2 text-right">
                          <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Ativo</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-12 p-3 items-center hover:bg-muted/20">
                        <div className="col-span-1 text-muted-foreground">222153</div>
                        <div className="col-span-5 font-medium">BULK 1,5L PRETO UV COM ALARME</div>
                        <div className="col-span-2 text-right">0</div>
                        <div className="col-span-2 text-right">R$ 380,00</div>
                        <div className="col-span-2 text-right">
                          <span className="inline-block px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">Sem Estoque</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <p className="text-sm text-muted-foreground">
                    Mostrando 5 de 87 produtos
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Anterior</Button>
                    <Button variant="outline" size="sm">Próximo</Button>
                  </div>
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
                  <div className="flex items-center justify-center p-10 border rounded-md">
                    <div className="text-center">
                      <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="font-medium text-lg mb-2">Nenhum pedido recente</h3>
                      <p className="text-muted-foreground max-w-md">
                        Os pedidos feitos pelos clientes aparecerão aqui para processamento e acompanhamento.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas e Análises</CardTitle>
                  <CardDescription>
                    Acompanhe o desempenho da sua loja
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="h-[300px] flex justify-center items-center border rounded-md bg-muted/20">
                      <p className="text-muted-foreground">Gráfico de vendas mensal</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="h-[200px] flex justify-center items-center border rounded-md bg-muted/20">
                        <p className="text-muted-foreground">Produtos mais vendidos</p>
                      </div>
                      <div className="h-[200px] flex justify-center items-center border rounded-md bg-muted/20">
                        <p className="text-muted-foreground">Avaliações dos clientes</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="store">
              <Card>
                <CardHeader>
                  <CardTitle>Minha Loja</CardTitle>
                  <CardDescription>
                    Gerencie as configurações e aparência da sua loja
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-card border p-6 rounded-md">
                      <h3 className="text-lg font-medium mb-4">Perfil da Loja</h3>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <div className="border border-dashed rounded-md flex items-center justify-center p-8">
                            <div className="text-center">
                              <Store className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">
                                Clique para atualizar o logo da sua loja
                              </p>
                              <Button variant="outline" size="sm" className="mt-4">
                                Alterar Logo
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:w-2/3">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium mb-1">Nome da Loja</h4>
                              <p>Doss Group</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-1">Descrição</h4>
                              <p>Peças originais e componentes para impressoras industriais. Distribuidores autorizados das principais marcas.</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-1">Localização</h4>
                              <p>Rio de Janeiro, RJ</p>
                            </div>
                            
                            <Button variant="outline" size="sm">
                              Editar Informações
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-card border p-6 rounded-md">
                      <h3 className="text-lg font-medium mb-4">Configurações da Loja</h3>
                      <div className="space-y-4">
                        <Button variant="outline" size="sm">
                          Gerenciar Categorias
                        </Button>
                        <Button variant="outline" size="sm">
                          Configurar Métodos de Envio
                        </Button>
                        <Button variant="outline" size="sm">
                          Configurar Promoções
                        </Button>
                      </div>
                    </div>
                  </div>
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
