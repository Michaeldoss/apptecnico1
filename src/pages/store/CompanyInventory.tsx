import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Package, 
  ArrowLeft,
  Search,
  AlertTriangle,
  Plus,
  Minus,
  Edit,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Download
} from 'lucide-react';

const mockInventory = [
  {
    id: '8006',
    name: 'BOMBA DE TINTA 100/200ML',
    category: 'Peças',
    currentStock: 14,
    minStock: 10,
    maxStock: 50,
    avgSales: 5.2,
    lastRestock: '2024-03-01',
    supplier: 'Fornecedor A',
    location: 'A1-02',
    costPrice: 120.00,
    sellPrice: 155.00,
    status: 'ok',
    movements: [
      { date: '2024-03-15', type: 'sale', quantity: -2, description: 'Venda ORD-2024-001' },
      { date: '2024-03-14', type: 'sale', quantity: -1, description: 'Venda ORD-2024-002' },
      { date: '2024-03-01', type: 'restock', quantity: +20, description: 'Reposição estoque' }
    ]
  },
  {
    id: '8007',
    name: 'CABEÇA DE IMPRESSÃO TÉRMICA',
    category: 'Componentes',
    currentStock: 8,
    minStock: 5,
    maxStock: 25,
    avgSales: 2.1,
    lastRestock: '2024-02-15',
    supplier: 'Fornecedor B',
    location: 'B2-05',
    costPrice: 250.00,
    sellPrice: 320.00,
    status: 'ok',
    movements: [
      { date: '2024-03-12', type: 'sale', quantity: -1, description: 'Venda ORD-2024-004' },
      { date: '2024-02-28', type: 'sale', quantity: -2, description: 'Venda ORD-2024-015' }
    ]
  },
  {
    id: '8008',
    name: 'CORREIA DENTADA 150MM',
    category: 'Peças',
    currentStock: 2,
    minStock: 8,
    maxStock: 30,
    avgSales: 3.5,
    lastRestock: '2024-01-20',
    supplier: 'Fornecedor C',
    location: 'C1-08',
    costPrice: 65.00,
    sellPrice: 89.90,
    status: 'low',
    movements: [
      { date: '2024-03-14', type: 'sale', quantity: -2, description: 'Venda ORD-2024-002' },
      { date: '2024-03-10', type: 'sale', quantity: -3, description: 'Venda ORD-2024-012' }
    ]
  },
  {
    id: '8009',
    name: 'SENSOR DE PROXIMIDADE',
    category: 'Sensores',
    currentStock: 0,
    minStock: 3,
    maxStock: 15,
    avgSales: 1.8,
    lastRestock: '2024-02-01',
    supplier: 'Fornecedor D',
    location: 'D3-01',
    costPrice: 180.00,
    sellPrice: 210.00,
    status: 'out',
    movements: [
      { date: '2024-03-13', type: 'sale', quantity: -1, description: 'Venda ORD-2024-002' },
      { date: '2024-03-08', type: 'sale', quantity: -2, description: 'Venda ORD-2024-009' }
    ]
  },
  {
    id: '8010',
    name: 'MOTOR PASO A PASO NEMA 23',
    category: 'Motores',
    currentStock: 25,
    minStock: 5,
    maxStock: 40,
    avgSales: 4.7,
    lastRestock: '2024-03-10',
    supplier: 'Fornecedor E',
    location: 'E1-12',
    costPrice: 380.00,
    sellPrice: 450.00,
    status: 'ok',
    movements: [
      { date: '2024-03-15', type: 'sale', quantity: -1, description: 'Venda ORD-2024-001' },
      { date: '2024-03-10', type: 'restock', quantity: +15, description: 'Reposição estoque' }
    ]
  }
];

const CompanyInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = ['all', 'Peças', 'Componentes', 'Sensores', 'Motores'];
  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'ok', label: 'Estoque Normal' },
    { value: 'low', label: 'Estoque Baixo' },
    { value: 'out', label: 'Sem Estoque' }
  ];

  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string, currentStock: number, minStock: number) => {
    if (status === 'out' || currentStock === 0) {
      return <Badge variant="destructive" className="bg-red-100 text-red-800">Sem Estoque</Badge>;
    }
    if (status === 'low' || currentStock <= minStock) {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Estoque Baixo</Badge>;
    }
    return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Normal</Badge>;
  };

  const getStockLevel = (current: number, min: number, max: number) => {
    const percentage = (current / max) * 100;
    let color = 'bg-green-500';
    
    if (current === 0) color = 'bg-red-500';
    else if (current <= min) color = 'bg-yellow-500';
    else if (percentage > 80) color = 'bg-blue-500';
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color}`} 
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    );
  };

  const totalItems = mockInventory.length;
  const lowStockItems = mockInventory.filter(item => item.currentStock <= item.minStock).length;
  const outOfStockItems = mockInventory.filter(item => item.currentStock === 0).length;
  const totalValue = mockInventory.reduce((sum, item) => sum + (item.currentStock * item.costPrice), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/loja/dashboard" className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center">
              <Package className="h-10 w-10 text-yellow-300 mr-4" />
              <div>
                <h1 className="text-4xl font-black text-white">Controle de Estoque</h1>
                <p className="text-blue-100 text-lg">Gerencie seus níveis de estoque</p>
              </div>
            </div>
          </div>

          {/* Métricas de estoque */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-blue-300" />
                <div className="text-2xl font-bold text-white">{totalItems}</div>
              </div>
              <div className="text-blue-100 text-sm">Total de Itens</div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-300" />
                <div className="text-2xl font-bold text-white">{lowStockItems}</div>
              </div>
              <div className="text-blue-100 text-sm">Estoque Baixo</div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-5 w-5 text-red-300" />
                <div className="text-2xl font-bold text-white">{outOfStockItems}</div>
              </div>
              <div className="text-blue-100 text-sm">Sem Estoque</div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-300" />
                <div className="text-2xl font-bold text-white">R$ {totalValue.toLocaleString('pt-BR')}</div>
              </div>
              <div className="text-blue-100 text-sm">Valor Total Estoque</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Todas as Categorias' : cat}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>

        {/* Alertas de estoque */}
        {(lowStockItems > 0 || outOfStockItems > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {outOfStockItems > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-red-900">Produtos Sem Estoque</span>
                </div>
                <p className="text-red-700 text-sm">
                  {outOfStockItems} produto(s) estão sem estoque e precisam de reposição urgente.
                </p>
              </div>
            )}
            
            {lowStockItems > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-900">Estoque Baixo</span>
                </div>
                <p className="text-yellow-700 text-sm">
                  {lowStockItems} produto(s) estão com estoque abaixo do mínimo recomendado.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tabela de estoque */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Controle de Estoque
              </div>
              <Button>
                <RefreshCw className="mr-2 h-4 w-4" />
                Atualizar
              </Button>
            </CardTitle>
            <CardDescription>
              Visualize e gerencie os níveis de estoque de todos os produtos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Estoque Atual</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Min/Max</TableHead>
                  <TableHead>Vendas/Mês</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">#{item.id} • {item.category}</div>
                      </div>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <div className="font-semibold">{item.currentStock} un.</div>
                      <div className="text-sm text-gray-600">
                        Última reposição: {new Date(item.lastRestock).toLocaleDateString('pt-BR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-20">
                        {getStockLevel(item.currentStock, item.minStock, item.maxStock)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Min: {item.minStock}</div>
                        <div>Max: {item.maxStock}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <TrendingDown className="h-4 w-4 text-red-500" />
                        <span>{item.avgSales}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(item.status, item.currentStock, item.minStock)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredInventory.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum item encontrado</h3>
                <p className="text-gray-600">Tente ajustar os filtros de busca.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyInventory;