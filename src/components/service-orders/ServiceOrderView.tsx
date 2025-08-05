
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ArrowLeft, 
  Edit, 
  Download, 
  Share2, 
  FileText,
  Calendar,
  User,
  Phone,
  MapPin,
  Settings
} from 'lucide-react';
import { ServiceOrder } from '@/types/service-order';
import { formatCurrency } from '@/lib/format';
import TechnicianLayout from '@/components/layout/TechnicianLayout';

interface ServiceOrderViewProps {
  order: ServiceOrder;
  onBack: () => void;
  onEdit: () => void;
}

const ServiceOrderView: React.FC<ServiceOrderViewProps> = ({ order, onBack, onEdit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberta': return 'bg-blue-100 text-blue-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'concluida': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      case 'em_negociacao': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'aberta': return 'Aberta';
      case 'em_andamento': return 'Em Andamento';
      case 'concluida': return 'Concluída';
      case 'cancelada': return 'Cancelada';
      case 'em_negociacao': return 'Em Negociação';
      default: return status;
    }
  };

  return (
    <TechnicianLayout title={`Ordem de Serviço ${order.number}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h2 className="text-2xl font-bold">{order.number}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={getStatusColor(order.status)}>
                  {getStatusLabel(order.status)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Criada em {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Informações da Empresa (Fictícia) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">MCM Assistência Técnica</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-1">
            <p className="font-medium">CNPJ: - | IE: -</p>
            <p>Endereço não informado</p>
            <p>Telefone: (11) 3333-4444 | E-mail: contato@mcmassistencia.com.br</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dados do Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Dados do Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Nome/Razão Social</p>
                <p className="font-medium">{order.client.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">CNPJ/CPF</p>
                <p className="font-medium">{order.client.document}</p>
              </div>
              
              {order.client.ie && (
                <div>
                  <p className="text-sm text-muted-foreground">Inscrição Estadual</p>
                  <p className="font-medium">{order.client.ie}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Endereço
                </p>
                <p className="font-medium">
                  {order.client.address.street}, {order.client.address.number}
                </p>
                <p className="text-sm">
                  {order.client.address.neighborhood} - {order.client.address.city}/{order.client.address.state}
                </p>
                <p className="text-sm">CEP: {order.client.address.zipCode}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Telefone
                </p>
                <p className="font-medium">{order.client.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Dados Técnicos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Dados Técnicos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Equipamento</p>
                <p className="font-medium">{order.equipment}</p>
              </div>
              
              {order.serialNumber && (
                <div>
                  <p className="text-sm text-muted-foreground">Número de Série</p>
                  <p className="font-medium">{order.serialNumber}</p>
                </div>
              )}
              
              {order.manufactureNumber && (
                <div>
                  <p className="text-sm text-muted-foreground">Número de Fabricação</p>
                  <p className="font-medium">{order.manufactureNumber}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-muted-foreground">Problema Relatado</p>
                <p className="font-medium">{order.reportedProblem}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Técnico Responsável</p>
                <p className="font-medium">{order.technician}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Atendente</p>
                <p className="font-medium">{order.attendant}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Produtos e Serviços */}
        {order.items.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Produtos e Serviços Aplicados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-center">Qtd</TableHead>
                    <TableHead className="text-right">Valor Unit.</TableHead>
                    <TableHead className="text-right">Desconto</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm">{item.code}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.discount)}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(item.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Separator className="my-4" />
              
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Desconto:</span>
                      <span>-{formatCurrency(order.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span className="text-green-600">{formatCurrency(order.total)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Condição: {order.paymentCondition}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Serviços Realizados */}
        {order.servicesPerformed && (
          <Card>
            <CardHeader>
              <CardTitle>Serviços Realizados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{order.servicesPerformed}</p>
            </CardContent>
          </Card>
        )}

        {/* Observações */}
        {order.observations && (
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{order.observations}</p>
            </CardContent>
          </Card>
        )}

        {/* Assinatura */}
        <Card>
          <CardHeader>
            <CardTitle>Assinatura do Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            {order.clientSignature?.signed ? (
              <div className="space-y-2">
                <p className="text-green-600 font-medium">✓ Assinado digitalmente</p>
                <p className="text-sm text-muted-foreground">
                  Cliente: {order.clientSignature.clientName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Data: {order.clientSignature.signedAt ? new Date(order.clientSignature.signedAt).toLocaleString('pt-BR') : ''}
                </p>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-muted-foreground">Aguardando assinatura do cliente</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data e Assinatura Final */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-end">
              <div className="text-center">
                <div className="border-t border-gray-400 w-48 mb-2"></div>
                <p className="text-sm">Data: ___/___/_____</p>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 w-48 mb-2"></div>
                <p className="text-sm">Assinatura do Cliente</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TechnicianLayout>
  );
};

export default ServiceOrderView;
