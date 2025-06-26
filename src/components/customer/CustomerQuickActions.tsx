
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  FileText, 
  Printer, 
  CreditCard, 
  MessageSquare,
  Calendar,
  Download,
  Phone
} from 'lucide-react';

const CustomerQuickActions = () => {
  const actions = [
    {
      title: 'Abrir Chamado',
      description: 'Solicitar atendimento técnico',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => console.log('Abrir chamado')
    },
    {
      title: 'Solicitar Orçamento',
      description: 'Pedir cotação de serviço',
      icon: FileText,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => console.log('Solicitar orçamento')
    },
    {
      title: 'Equipamentos',
      description: 'Gerenciar equipamentos',
      icon: Printer,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => console.log('Ver equipamentos')
    },
    {
      title: 'Pagamentos',
      description: 'Histórico financeiro',
      icon: CreditCard,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      action: () => console.log('Ver pagamentos')
    },
    {
      title: 'Chat Suporte',
      description: 'Falar com técnico',
      icon: MessageSquare,
      color: 'bg-orange-600 hover:bg-orange-700',
      action: () => console.log('Abrir chat')
    },
    {
      title: 'Agendar Visita',
      description: 'Marcar atendimento',
      icon: Calendar,
      color: 'bg-teal-600 hover:bg-teal-700',
      action: () => console.log('Agendar')
    },
    {
      title: 'Relatórios',
      description: 'Baixar comprovantes',
      icon: Download,
      color: 'bg-pink-600 hover:bg-pink-700',
      action: () => console.log('Download')
    },
    {
      title: 'Contato',
      description: 'Falar com empresa',
      icon: Phone,
      color: 'bg-red-600 hover:bg-red-700',
      action: () => console.log('Contato')
    }
  ];

  return (
    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-800">
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className={`${action.color} text-white border-0 h-24 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105`}
                onClick={action.action}
              >
                <IconComponent className="h-6 w-6" />
                <div className="text-center">
                  <div className="text-sm font-semibold">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerQuickActions;
