
import React from 'react';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Truck,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';
  items: number;
  paymentMethod: string;
}

interface OrdersListProps {
  orders: Order[];
}

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'processing':
      return <Package className="h-4 w-4" />;
    case 'shipping':
      return <Truck className="h-4 w-4" />;
    case 'completed':
      return <CheckCircle className="h-4 w-4" />;
    case 'cancelled':
      return <X className="h-4 w-4" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipping':
      return 'bg-purple-100 text-purple-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  if (!orders.length) {
    return (
      <div className="flex items-center justify-center p-10 border rounded-md">
        <div className="text-center">
          <Package className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg mb-2">Nenhum pedido recente</h3>
          <p className="text-muted-foreground max-w-md">
            Os pedidos feitos pelos clientes aparecerão aqui para processamento e acompanhamento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium border-b">
        <div className="col-span-1">#</div>
        <div className="col-span-3">Cliente</div>
        <div className="col-span-2">Data</div>
        <div className="col-span-2 text-right">Total</div>
        <div className="col-span-2 text-right">Itens</div>
        <div className="col-span-2 text-right">Status</div>
      </div>
      
      <div className="divide-y">
        {orders.map(order => (
          <div key={order.id} className="grid grid-cols-12 p-3 items-center hover:bg-muted/20">
            <div className="col-span-1 text-muted-foreground">{order.id}</div>
            <div className="col-span-3 font-medium">{order.customer}</div>
            <div className="col-span-2">{order.date}</div>
            <div className="col-span-2 text-right">R$ {order.total.toFixed(2).replace('.', ',')}</div>
            <div className="col-span-2 text-right">{order.items}</div>
            <div className="col-span-2 text-right">
              <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs", getStatusColor(order.status))}>
                {getStatusIcon(order.status)}
                <span>
                  {order.status === 'pending' && 'Pendente'}
                  {order.status === 'processing' && 'Processando'}
                  {order.status === 'shipping' && 'Enviado'}
                  {order.status === 'completed' && 'Concluído'}
                  {order.status === 'cancelled' && 'Cancelado'}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
