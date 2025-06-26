
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
  HelpCircle,
  BarChart3,
  AlertTriangle,
  Clock,
  TrendingUp
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
      label: 'Histórico Financeiro',
      icon: CreditCard,
      href: '/cliente/pagamentos',
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'Faturas e custos'
    },
    {
      label: 'Agenda Técnica',
      icon: Calendar,
      href: '/cliente/agenda',
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Próximos atendimentos'
    }
  ];

  const businessActions = [
    {
      label: 'Análise de Custos',
      icon: BarChart3,
      href: '/cliente/relatorios',
      color: 'bg-indigo-600 hover:bg-indigo-700',
      description: 'ROI por equipamento'
    },
    {
      label: 'Controle de Peças',
      icon: Package,
      href: '/cliente/equipamentos',
      color: 'bg-emerald-600 hover:bg-emerald-700',
      description: 'Histórico de consumo'
    },
    {
      label: 'Chamados Urgentes',
      icon: AlertTriangle,
      href: '/cliente/emergencia',
      color: 'bg-red-600 hover:bg-red-700',
      description: 'Atendimento 24h'
    },
    {
      label: 'Manutenção Preventiva',
      icon: Clock,
      href: '/cliente/preventiva',
      color: 'bg-yellow-600 hover:bg-yellow-700',
      description: 'Agendar revisões'
    }
  ];

  const supportActions = [
    {
      label: 'WhatsApp Direto',
      icon: MessageCircle,
      action: () => window.open('https://wa.me/5511999999999?text=Olá, preciso de suporte técnico', '_blank'),
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Chat com técnico'
    },
    {
      label: 'Suporte 24h',
      icon: Phone,
      action: () => window.open('tel:+5511999999999'),
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Emergência'
    },
    {
      label: 'Rastreamento GPS',
      icon: MapPin,
      href: '/cliente/rastreamento',
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Localizar técnico'
    },
    {
      label: 'Relatórios Excel',
      icon: Download,
      action: () => {
        // Simular download de relatório
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'relatorio-custos-dezembro-2024.xlsx';
        link.click();
      },
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Exportar dados'
    },
    {
      label: 'Configurações',
      icon: Settings,
      href: '/cliente/perfil',
      color: 'bg-gray-600 hover:bg-gray-700',
      description: 'Perfil empresa'
    },
    {
      label: 'Tutorial',
      icon: HelpCircle,
      action: () => window.open('/ajuda', '_blank'),
      color: 'bg-teal-600 hover:bg-teal-700',
      description: 'Como usar'
    }
  ];

  const handleActionClick = (action: any) => {
    if (action.action) {
      action.action();
    }
  };

  return (
    <div className="space-y-6">
      {/* Ações Principais */}
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            Controle Empresarial
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Acesso rápido às funcionalidades mais importantes do seu negócio
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {primaryActions.map((action) => {
              const Icon = action.icon;
              
              return (
                <Link key={action.label} to={action.href}>
                  <Button className={`${action.color} text-white flex flex-col gap-3 h-28 p-4 w-full transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
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

      {/* Ferramentas de Análise Empresarial */}
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            Análise e Controle Operacional
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Ferramentas para otimizar seus custos e operações
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {businessActions.map((action) => {
              const Icon = action.icon;
              
              return (
                <Link key={action.label} to={action.href}>
                  <Button className={`${action.color} text-white flex flex-col gap-2 h-24 p-3 w-full transition-all duration-200 hover:scale-105`}>
                    <div className="w-6 h-6 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-medium leading-tight block">{action.label}</span>
                      <span className="text-xs opacity-80 mt-1 block text-[10px]">{action.description}</span>
                    </div>
                  </Button>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Suporte e Ferramentas */}
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Phone className="h-5 w-5 text-green-600" />
            </div>
            Suporte e Ferramentas
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Contato direto e ferramentas de apoio
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {supportActions.map((action) => {
              const Icon = action.icon;
              
              if (action.href) {
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
              }
              
              return (
                <Button 
                  key={action.label}
                  className={`${action.color} text-white flex flex-col gap-2 h-20 p-3 transition-all duration-200 hover:scale-105`}
                  onClick={() => handleActionClick(action)}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-center leading-tight">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerQuickActions;
