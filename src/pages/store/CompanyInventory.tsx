import React, { useState } from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertTriangle,
  Download,
  Edit,
  Minus,
  Package,
  Plus,
  RefreshCw,
  Search,
  TrendingDown,
  TrendingUp,
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
    costPrice: 120.0,
    sellPrice: 155.0,
    status: 'ok',
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
    costPrice: 250.0,
    sellPrice: 320.0,
    status: 'ok',
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
    costPrice: 65.0,
    sellPrice: 89.9,
    status: 'low',
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
    costPrice: 180.0,
    sellPrice: 210.0,
    status: 'out',
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
    costPrice: 380.0,
    sellPrice: 450.0,
    status: 'ok',
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

const CompanyInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = ['all', 'Peças', 'Componentes', 'Sensores', 'Motores'];

  const statusOptions = [
    { value: 'all', label: 'Todos os status' },
    { value: 'ok', label: 'Estoque normal' },
    { value: 'low', label: 'Estoque baixo' },
    { value: 'out', label: 'Sem estoque' },
  ];

  const filteredInventory = mockInventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.includes(searchTerm);

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalItems = mockInventory.length;

  const lowStockItems = mockInventory.filter(
    (item) => item.currentStock <= item.minStock && item.currentStock > 0
  ).length;

  const outOfStockItems = mockInventory.filter((item) => item.currentStock === 0).length;

  const totalValue = mockInventory.reduce((sum, item) => {
    return sum + item.currentStock * item.costPrice;
  }, 0);

  const getStatusBadge = (status: string, currentStock: number, minStock: number) => {
    if (status === 'out' || currentStock === 0) {
      return (
        <Badge className="border-red-200 bg-red-50 text-red-700 hover:bg-red-50">
          Sem estoque
        </Badge>
      );
    }

    if (status === 'low' || currentStock <= minStock) {
      return (
        <Badge className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50">
          Estoque baixo
        </Badge>
      );
    }

    return (
      <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
        Normal
      </Badge>
    );
  };

  const getStockLevel = (current: number, min: number, max: number) => {
    const percentage = Math.min((current / max) * 100, 100);
    const color =
      current === 0 ? 'bg-red-500' : current <= min ? 'bg-amber-500' : 'bg-emerald-500';

    return (
      <div className="h-2 w-full rounded-full bg-slate-100">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    );
  };

  const metricCards = [
    {
      label: 'Total de itens',
      value: totalItems,
      icon: Package,
      description: 'Produtos monitorados',
    },
    {
      label: 'Estoque baixo',
      value: lowStockItems,
      icon: AlertTriangle,
      description: 'Abaixo do mínimo',
    },
    {
      label: 'Sem estoque',
      value: outOfStockItems,
      icon: TrendingDown,
      description: 'Reposição urgente',
    },
    {
      label: 'Valor em estoque',
      value: formatCurrency(totalValue),
      icon: TrendingUp,
      description: 'Custo estimado atual',
    },
  ];

  return (
    <StoreLayout
      title="Controle de Estoque"
      subtitle="Monitore níveis de estoque, reposições, alertas e valor total dos produtos da loja."
      action={
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>

          <Button className="bg-white text-violet-950 hover:bg-violet-100">
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((metric) => {
            const Icon = metric.icon;

            return (
              <Card key={metric.label} className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <p className="text-sm font-bold text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-3xl font-black text-slate-950">{metric.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{metric.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {(lowStockItems > 0 || outOfStockItems > 0) && (
          <div className="grid gap-4 md:grid-cols-2">
            {outOfStockItems > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="flex gap-3 p-5">
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-red-700" />
                  <div>
                    <p className="font-black text-red-950">Produtos sem estoque</p>
                    <p className="text-sm text-red-800">
                      {outOfStockItems} produto(s) precisam de reposição urgente.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {lowStockItems > 0 && (
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="flex gap-3 p-5">
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-700" />
                  <div>
                    <p className="font-black text-amber-950">Estoque baixo</p>
                    <p className="text-sm text-amber-800">
                      {lowStockItems} produto(s) estão abaixo do mínimo recomendado.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-slate-950">Itens em estoque</CardTitle>
                <CardDescription>
                  Visualize produtos, localização, nível de estoque e status de reposição.
                </CardDescription>
              </div>

              <Button className="bg-violet-700 text-white hover:bg-violet-800">
                <Plus className="mr-2 h-4 w-4" />
                Nova movimentação
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="grid gap-3 lg:grid-cols-[1fr_220px_220px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Buscar por nome ou código..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-11 border-slate-200 bg-white pl-10"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-violet-200"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'Todas as categorias' : cat}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-violet-200"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-bold text-slate-700">Produto</TableHead>
                    <TableHead className="font-bold text-slate-700">Localização</TableHead>
                    <TableHead className="font-bold text-slate-700">Estoque atual</TableHead>
                    <TableHead className="font-bold text-slate-700">Nível</TableHead>
                    <TableHead className="font-bold text-slate-700">Min/Max</TableHead>
                    <TableHead className="font-bold text-slate-700">Vendas/mês</TableHead>
                    <TableHead className="font-bold text-slate-700">Status</TableHead>
                    <TableHead className="font-bold text-slate-700">Ações</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id} className="hover:bg-violet-50/40">
                      <TableCell>
                        <div>
                          <div className="font-bold text-slate-950">{item.name}</div>
                          <div className="text-sm text-slate-500">
                            #{item.id} • {item.category}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-slate-700">{item.location}</TableCell>

                      <TableCell>
                        <div className="font-bold text-slate-950">{item.currentStock} un.</div>
                        <div className="text-xs text-slate-500">
                          Última reposição:{' '}
                          {new Date(item.lastRestock).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="w-24">
                          {getStockLevel(item.currentStock, item.minStock, item.maxStock)}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm text-slate-600">
                          <div>Min: {item.minStock}</div>
                          <div>Max: {item.maxStock}</div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1 text-slate-700">
                          <TrendingDown className="h-4 w-4 text-red-500" />
                          <span>{item.avgSales}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        {getStatusBadge(item.status, item.currentStock, item.minStock)}
                      </TableCell>

                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" className="border-slate-200">
                            <Plus className="h-4 w-4" />
                          </Button>

                          <Button variant="outline" size="sm" className="border-slate-200">
                            <Minus className="h-4 w-4" />
                          </Button>

                          <Button variant="outline" size="sm" className="border-slate-200">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredInventory.length === 0 && (
                <div className="py-12 text-center">
                  <Package className="mx-auto mb-4 h-14 w-14 text-slate-300" />
                  <h3 className="text-lg font-bold text-slate-950">Nenhum item encontrado</h3>
                  <p className="text-sm text-slate-500">Tente ajustar os filtros de busca.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </StoreLayout>
  );
};

export default CompanyInventory;
