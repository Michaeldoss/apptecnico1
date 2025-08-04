import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AffiliateSale } from '@/types/affiliate';
import { 
  Eye, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  DollarSign,
  Calendar,
  Filter
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AffiliateSalesProps {
  sales: AffiliateSale[];
}

export const AffiliateSales: React.FC<AffiliateSalesProps> = ({ sales }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmado':
      case 'pago':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'pendente':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'cancelado':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
      case 'pago':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'pendente':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'cancelado':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const totalEarned = sales
    .filter(sale => sale.status === 'pago')
    .reduce((sum, sale) => sum + sale.commission_value, 0);

  const pendingEarnings = sales
    .filter(sale => sale.status === 'pendente' || sale.status === 'confirmado')
    .reduce((sum, sale) => sum + sale.commission_value, 0);

  return (
    <div className="space-y-6">
      {/* Resumo das Vendas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-300/30 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-100">💰 Total Ganho</p>
                <p className="text-2xl font-bold">R$ {totalEarned.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-300" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-300/30 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-100">⏳ Pendente</p>
                <p className="text-2xl font-bold">R$ {pendingEarnings.toLocaleString()}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-300" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-300/30 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">📊 Total de Vendas</p>
                <p className="text-2xl font-bold">{sales.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Vendas */}
      <Card className="bg-white/10 border-white/20 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              📋 Histórico de Vendas
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                {sales.length} vendas
              </Badge>
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-white border-white/20">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button size="sm" variant="outline" className="text-white border-white/20">
                <Calendar className="h-4 w-4 mr-2" />
                Período
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {sales.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Nenhuma venda ainda</h3>
              <p className="text-white/60">
                Compartilhe seus links de afiliado para começar a vender!
              </p>
              <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
                Ver Materiais de Divulgação
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20">
                    <TableHead className="text-white/80">Produto</TableHead>
                    <TableHead className="text-white/80">Valor</TableHead>
                    <TableHead className="text-white/80">Comissão</TableHead>
                    <TableHead className="text-white/80">Status</TableHead>
                    <TableHead className="text-white/80">Data</TableHead>
                    <TableHead className="text-white/80">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((sale) => (
                    <TableRow key={sale.id} className="border-white/20">
                      <TableCell>
                        <div>
                          <div className="font-medium">{sale.product_name}</div>
                          <div className="text-sm text-white/60">ID: {sale.id.slice(0, 8)}...</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold">R$ {sale.sale_amount.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold text-green-300">
                            R$ {sale.commission_value.toLocaleString()}
                          </div>
                          <div className="text-sm text-white/60">
                            {sale.commission_percent}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sale.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(sale.status)}
                            {sale.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {format(new Date(sale.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                        </div>
                        <div className="text-xs text-white/60">
                          {format(new Date(sale.created_at), 'HH:mm')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="text-white border-white/20">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dicas para Aumentar Vendas */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-300/30 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💡 Dicas para Aumentar suas Vendas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500 rounded-full p-1 mt-1">
                  <span className="text-xs">1</span>
                </div>
                <div>
                  <h4 className="font-semibold">Compartilhe nas redes sociais</h4>
                  <p className="text-sm text-white/80">Poste regularmente sobre os produtos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-500 rounded-full p-1 mt-1">
                  <span className="text-xs">2</span>
                </div>
                <div>
                  <h4 className="font-semibold">Crie conteúdo de valor</h4>
                  <p className="text-sm text-white/80">Mostre como o produto resolve problemas</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-yellow-500 rounded-full p-1 mt-1">
                  <span className="text-xs">3</span>
                </div>
                <div>
                  <h4 className="font-semibold">Use materiais promocionais</h4>
                  <p className="text-sm text-white/80">Baixe banners e templates prontos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-red-500 rounded-full p-1 mt-1">
                  <span className="text-xs">4</span>
                </div>
                <div>
                  <h4 className="font-semibold">Engaje com sua audiência</h4>
                  <p className="text-sm text-white/80">Responda comentários e tire dúvidas</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};