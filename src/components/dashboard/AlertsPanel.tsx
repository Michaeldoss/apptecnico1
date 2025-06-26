
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, MessageSquare, Package, Calendar, CreditCard } from 'lucide-react';
import { Alert } from '@/types/dashboard';

interface AlertsPanelProps {
  alerts: Alert[];
  urgentAlerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, urgentAlerts }) => {
  const getIcon = (type: Alert['type']) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'stock': return Package;
      case 'schedule': return Calendar;
      case 'payment': return CreditCard;
      default: return Bell;
    }
  };

  const getColor = (type: Alert['type'], urgent: boolean) => {
    if (urgent) return 'text-red-600';
    
    switch (type) {
      case 'message': return 'text-blue-600';
      case 'stock': return 'text-orange-600';
      case 'schedule': return 'text-purple-600';
      case 'payment': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Bell className="h-5 w-5" />
            Alertas e Notificações
          </CardTitle>
          {urgentAlerts.length > 0 && (
            <Badge variant="destructive">
              {urgentAlerts.length} urgente{urgentAlerts.length > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex flex-col h-full">
        <div className="space-y-3 flex-1">
          {alerts.slice(0, 5).map((alert) => {
            const Icon = getIcon(alert.type);
            const color = getColor(alert.type, alert.urgent);
            
            return (
              <div 
                key={alert.id} 
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  alert.urgent ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm mt-0.5">
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium truncate">{alert.title}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{alert.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {alert.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <Button variant="outline" className="w-full mt-4" size="sm">
          Ver Todas as Notificações
        </Button>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
