
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  FileText, 
  Map, 
  Mail, 
  Calendar,
  Wrench,
  CreditCard,
  Package,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const actions = [
    {
      label: 'WhatsApp Cliente',
      icon: MessageCircle,
      href: '/tecnico/chat',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      label: 'Histórico Serviços',
      icon: FileText,
      href: '/tecnico/servicos',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      label: 'Mapa Clientes',
      icon: Map,
      href: '/tecnico/agenda',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      label: 'Relatório Mensal',
      icon: Mail,
      href: '#',
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      label: 'Agenda',
      icon: Calendar,
      href: '/tecnico/agenda',
      color: 'bg-indigo-600 hover:bg-indigo-700'
    },
    {
      label: 'Serviços',
      icon: Wrench,
      href: '/tecnico/servicos',
      color: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      label: 'Pagamentos',
      icon: CreditCard,
      href: '/tecnico/pagamentos',
      color: 'bg-emerald-600 hover:bg-emerald-700'
    },
    {
      label: 'Peças',
      icon: Package,
      href: '/tecnico/pecas',
      color: 'bg-red-600 hover:bg-red-700'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
            <Zap className="h-4 w-4 text-yellow-600" />
          </div>
          Acessos Rápidos
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            
            if (action.href.startsWith('#')) {
              return (
                <Button 
                  key={action.label}
                  className={`${action.color} text-white flex flex-col gap-2 h-20 p-3 transition-all duration-200`}
                  onClick={() => alert('Funcionalidade em desenvolvimento')}
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-center leading-tight">{action.label}</span>
                </Button>
              );
            }
            
            return (
              <Link key={action.label} to={action.href}>
                <Button className={`${action.color} text-white flex flex-col gap-2 h-20 p-3 w-full transition-all duration-200`}>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-center leading-tight">{action.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
