
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
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-bold">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Acessos Rápidos
          </span>
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
