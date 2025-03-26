
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Plus, Search } from 'lucide-react';

type Part = {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  description: string;
};

const TechnicianParts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Dados de exemplo
  const parts: Part[] = [
    {
      id: 1,
      name: 'Memória RAM 8GB DDR4',
      category: 'Componentes',
      price: 'R$ 250,00',
      stock: 12,
      description: 'Memória RAM 8GB DDR4 2666MHz para notebooks e desktops',
    },
    {
      id: 2,
      name: 'SSD 240GB',
      category: 'Armazenamento',
      price: 'R$ 180,00',
      stock: 8,
      description: 'SSD 240GB SATA III para notebooks e desktops',
    },
    {
      id: 3,
      name: 'Fonte ATX 500W',
      category: 'Energia',
      price: 'R$ 220,00',
      stock: 5,
      description: 'Fonte de alimentação ATX 500W real com certificação 80 Plus',
    },
    {
      id: 4,
      name: 'Placa de Rede PCI',
      category: 'Rede',
      price: 'R$ 80,00',
      stock: 15,
      description: 'Placa de rede PCI 10/100/1000 para computadores desktop',
    },
    {
      id: 5,
      name: 'Tela LCD 15.6 polegadas',
      category: 'Telas',
      price: 'R$ 350,00',
      stock: 3,
      description: 'Tela LCD 15.6 polegadas para notebooks diversos',
    },
  ];
  
  const filteredParts = parts.filter(part => 
    part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleNewPart = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para adicionar nova peça
    setIsDialogOpen(false);
  };
  
  return (
    <TechnicianLayout title="Gerenciamento de Peças">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, categoria ou descrição"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Peça
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleNewPart}>
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Peça</DialogTitle>
                  <DialogDescription>
                    Adicione informações sobre uma nova peça ao seu inventário
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="part-name">Nome da Peça</Label>
                    <Input id="part-name" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="part-category">Categoria</Label>
                      <Input id="part-category" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="part-price">Preço (R$)</Label>
                      <Input id="part-price" type="number" step="0.01" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="part-stock">Quantidade em Estoque</Label>
                    <Input id="part-stock" type="number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="part-description">Descrição</Label>
                    <Textarea 
                      id="part-description" 
                      placeholder="Detalhes da peça"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Adicionar Peça</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Inventário de Peças</CardTitle>
            <CardDescription>
              Gerencie seu estoque de peças e componentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParts.length > 0 ? (
                  filteredParts.map((part) => (
                    <TableRow key={part.id}>
                      <TableCell className="font-medium">{part.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{part.category}</Badge>
                      </TableCell>
                      <TableCell>{part.price}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${part.stock <= 3 ? 'text-red-500' : ''}`}>
                          {part.stock}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Atualizar estoque</DropdownMenuItem>
                            <DropdownMenuItem>Ver histórico</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">Remover</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      Nenhuma peça encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Alertas de Estoque</CardTitle>
            <CardDescription>
              Peças com estoque baixo (menos de 5 unidades)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {parts.filter(part => part.stock < 5).map(part => (
                <div key={part.id} className="flex items-center justify-between p-2 bg-red-50 rounded-md">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <span className="text-red-700 text-sm font-bold">{part.stock}</span>
                    </div>
                    <div>
                      <p className="font-medium">{part.name}</p>
                      <p className="text-sm text-muted-foreground">{part.category}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Comprar</Button>
                </div>
              ))}
              
              {parts.filter(part => part.stock < 5).length === 0 && (
                <p className="text-muted-foreground text-center">Não há alertas de estoque baixo.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianParts;
