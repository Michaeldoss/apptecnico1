
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package, Clock, TrendingDown, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

const PartsAlerts = () => {
  const lowStockAlerts = [
    {
      id: 1,
      name: 'Capping DX5',
      mcmCode: 'CAP-DX5-001',
      currentStock: 3,
      minStock: 5,
      machine: 'Grando 60cm',
      lastUsed: '2024-01-20'
    },
    {
      id: 2,
      name: 'Correia Motor Principal',
      mcmCode: 'COR-MOT-003',
      currentStock: 2,
      minStock: 4,
      machine: 'Roland VersaCAMM',
      lastUsed: '2024-01-18'
    }
  ];

  const noMovementAlerts = [
    {
      id: 1,
      name: 'Sensor de Papel Antigo',
      mcmCode: 'SEN-PAP-005',
      currentStock: 8,
      lastMovement: '2023-10-15',
      daysWithoutMovement: 98,
      totalValue: 320.00
    }
  ];

  const pricingErrorAlerts = [
    {
      id: 1,
      name: 'Placa Principal X1',
      mcmCode: 'PLA-X1-007',
      totalCost: 450.00,
      currentPrice: 400.00,
      suggestedPrice: 675.00
    }
  ];

  return (
    <div className="space-y-6">
      {/* Alertas de Estoque Baixo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Estoque Baixo ({lowStockAlerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lowStockAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Package className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">{alert.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {alert.mcmCode}
                      </Badge>
                      <span>•</span>
                      <span>{alert.machine}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-bold">
                      {alert.currentStock}/{alert.minStock}
                    </span>
                    <Button size="sm" variant="outline">
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Comprar
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Último uso: {alert.lastUsed}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alertas de Peças Paradas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-600">
            <Clock className="h-5 w-5" />
            Peças sem Movimento (90+ dias)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {noMovementAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <TrendingDown className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">{alert.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {alert.mcmCode}
                      </Badge>
                      <span>•</span>
                      <span>Estoque: {alert.currentStock}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-yellow-600">
                    {alert.daysWithoutMovement} dias
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Valor: {formatCurrency(alert.totalValue)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Último movimento: {alert.lastMovement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alertas de Erro de Preço */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-600">
            <AlertTriangle className="h-5 w-5" />
            Erros de Precificação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pricingErrorAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <AlertTriangle className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">{alert.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {alert.mcmCode}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Custo:</span>{' '}
                    <span className="font-medium">{formatCurrency(alert.totalCost)}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Preço atual:</span>{' '}
                    <span className="font-medium text-red-600">{formatCurrency(alert.currentPrice)}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Sugerido:</span>{' '}
                    <span className="font-medium text-green-600">{formatCurrency(alert.suggestedPrice)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartsAlerts;
