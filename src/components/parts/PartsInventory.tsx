
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Package, AlertTriangle, Edit, Trash2, Eye, Plus } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

interface Part {
  id: number;
  name: string;
  mcmCode: string;
  category: string;
  machine: string;
  type: 'nova' | 'usada' | 'recondicionada';
  purchasePrice: number;
  shippingCost: number;
  additionalCosts: number;
  totalCost: number;
  markupPercent: number;
  suggestedPrice: number;
  finalPrice: number;
  currentStock: number;
  minStock: number;
  maxStock: number;
  entryDate: string;
  images?: string[];
  invoiceNumber?: string;
}

interface PartsInventoryProps {
  searchQuery: string;
}

const PartsInventory: React.FC<PartsInventoryProps> = ({ searchQuery }) => {
  const [parts] = useState<Part[]>([
    {
      id: 1,
      name: 'Capping DX5',
      mcmCode: 'CAP-DX5-001',
      category: 'Cabeçote',
      machine: 'Grando 60cm',
      type: 'nova',
      purchasePrice: 120.00,
      shippingCost: 30.00,
      additionalCosts: 0.00,
      totalCost: 150.00,
      markupPercent: 100,
      suggestedPrice: 300.00,
      finalPrice: 300.00,
      currentStock: 3,
      minStock: 3,
      maxStock: 10,
      entryDate: '2024-01-15',
      invoiceNumber: 'NF-001234'
    },
    {
      id: 2,
      name: 'Damper Epson DX7',
      mcmCode: 'DMP-DX7-002',
      category: 'Damper',
      machine: 'Epson F170',
      type: 'nova',
      purchasePrice: 45.00,
      shippingCost: 15.00,
      additionalCosts: 5.00,
      totalCost: 65.00,
      markupPercent: 150,
      suggestedPrice: 162.50,
      finalPrice: 160.00,
      currentStock: 8,
      minStock: 5,
      maxStock: 20,
      entryDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'Correia Motor Principal',
      mcmCode: 'COR-MOT-003',
      category: 'Correia',
      machine: '',
      type: 'recondicionada',
      purchasePrice: 80.00,
      shippingCost: 20.00,
      additionalCosts: 10.00,
      totalCost: 110.00,
      markupPercent: 80,
      suggestedPrice: 198.00,
      finalPrice: 200.00,
      currentStock: 2,
      minStock: 4,
      maxStock: 8,
      entryDate: '2024-01-05'
    }
  ]);

  const filteredParts = parts.filter(part => 
    part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.mcmCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.machine.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'nova': return 'bg-green-100 text-green-800';
      case 'usada': return 'bg-yellow-100 text-yellow-800';
      case 'recondicionada': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (current: number, min: number) => {
    if (current <= min) return { color: 'text-red-500', icon: AlertTriangle };
    if (current <= min * 1.5) return { color: 'text-yellow-500', icon: AlertTriangle };
    return { color: 'text-green-500', icon: Package };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Inventário de Peças
        </CardTitle>
        <CardDescription>
          Controle completo do seu estoque de peças e componentes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Peça</TableHead>
              <TableHead>Máquina</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Custo Total</TableHead>
              <TableHead>Preço Final</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParts.length > 0 ? (
              filteredParts.map((part) => {
                const stockStatus = getStockStatus(part.currentStock, part.minStock);
                const StatusIcon = stockStatus.icon;
                
                return (
                  <TableRow key={part.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{part.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {part.mcmCode}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {part.category}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{part.machine}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getTypeColor(part.type)}`}>
                        {part.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{formatCurrency(part.totalCost)}</p>
                        <p className="text-xs text-muted-foreground">
                          Compra: {formatCurrency(part.purchasePrice)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium text-green-600">
                          {formatCurrency(part.finalPrice)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Lucro: {part.markupPercent}%
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-4 w-4 ${stockStatus.color}`} />
                        <span className={`font-medium ${stockStatus.color}`}>
                          {part.currentStock}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          / {part.maxStock}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {part.currentStock <= part.minStock ? (
                        <Badge variant="destructive" className="text-xs">
                          Crítico
                        </Badge>
                      ) : part.currentStock <= part.minStock * 1.5 ? (
                        <Badge variant="secondary" className="text-xs">
                          Baixo
                        </Badge>
                      ) : (
                        <Badge className="text-xs bg-green-100 text-green-800">
                          Normal
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package className="h-4 w-4 mr-2" />
                            Dar baixa
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar estoque
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  Nenhuma peça encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PartsInventory;
