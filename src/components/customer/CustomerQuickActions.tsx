
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  FileText, 
  MapPin, 
  CreditCard, 
  Calendar,
  Wrench,
  Package,
  Zap,
  Phone,
  Download,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerQuickActions: React.FC = () => {
  const primaryActions = [
    {
      label: 'Solicitar Atendimento',
      icon: Wrench,
      href: '/store',
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Novo chamado técnico'
    },
    {
      label: 'Meus Serviços',
      icon: FileText,
      href: '/cliente/servicos',
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Acompanhar status'
    },
    {
      label: 'Pagamentos',
      icon: CreditCard,
      href: '/cliente/pagamentos',
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'Faturas e recibos'
    },
    {
      label: 'Agenda',
      icon: Calendar,
      href: '/cliente/agenda',
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Próximos atendimentos'
    }
  ];

  const secondaryActions = [
    {
      label: 'Rastreamento',
      icon: MapPin,
      href: '/cliente/rastreamento',
      color: 'bg-indigo-600 hover:bg-indigo-700',
      description: 'Localizar técnico'
    },
    {
      label: 'WhatsApp Suporte',
      icon: MessageCircle,
      href: '#',
      color: 'bg-emerald-600 hover:bg-emerald-700',
      description: 'Chat direto'
    },
    {
      label: 'Equipamentos',
      icon: Package,
      href: '/cliente/equipamentos',
      color: 'bg-red-600 hover:bg-red-700',
      description: 'Gerenciar máquinas'
    },
    {
      label: 'Suporte Técnico',
      icon: Phone,
      href: '#',
      color: 'bg-yellow-600 hover:bg-yellow-700',
      description: 'Contato direto'
    },
    {
      label: 'Relatórios',
      icon: Download,
      href: '#',
      color: 'bg-gray-600 hover:bg-gray-700',
      description: 'Download PDF'
    },
    {
      label: 'Configurações',
      icon: Settings,
      href: '/cliente/perfil',
      color: 'bg-slate-600 hover:bg-slate-700',
      description: 'Perfil e dados'
    },
    {
      label: 'Central de Ajuda',
      icon: HelpCircle,
      href: '#',
      color: 'bg-teal-600 hover:bg-teal-700',
      description: 'FAQ e tutoriais'
    },
    {
      label: 'Ordens de Serviço',
      icon: FileText,
      href: '/cliente/ordens',
      color: 'bg-pink-600 hover:bg-pink-700',
      description: 'Histórico completo'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Ações Principais */}
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Zap className="h-6 w-6 text-yellow-600" />
            </div>
            Ações Principais
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Acesso rápido às funcionalidades mais utilizadas
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {primaryActions.map((action) => {
              const Icon = action.icon;
              
              return (
                <Link key={action.label} to={action.href}>
                  <Button className={`${action.color} text-white flex flex-col gap-3 h-24 p-4 w-full transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                    <div className="w-8 h-8 flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-semibold leading-tight block">{action.label}</span>
                      <span className="text-xs opacity-90 mt-1 block">{action.description}</span>
                    </div>
                  </Button>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Ações Secundárias */}
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Settings className="h-5 w-5 text-gray-600" />
            </div>
            Ferramentas Adicionais
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Recursos complementares para melhor experiência
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {secondaryActions.map((action) => {
              const Icon = action.icon;
              
              if (action.href.startsWith('#')) {
                return (
                  <Button 
                    key={action.label}
                    className={`${action.color} text-white flex flex-col gap-2 h-20 p-3 transition-all duration-200 hover:scale-105`}
                    onClick={() => alert('Funcionalidade em desenvolvimento')}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs text-center leading-tight">{action.label}</span>
                  </Button>
                );
              }
              
              return (
                <Link key={action.label} to={action.href}>
                  <Button className={`${action.color} text-white flex flex-col gap-2 h-20 p-3 w-full transition-all duration-200 hover:scale-105`}>
                    <div className="w-5 h-5 flex items-center justify-center">
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
    </div>
  );
};

export default CustomerQuickActions;
