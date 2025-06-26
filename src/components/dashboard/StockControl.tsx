
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, AlertTriangle, ShoppingCart } from 'lucide-react';
import { StockItem } from '@/types/dashboard';

interface StockControlProps {
  stockItems: StockItem[];
  urgentItems: StockItem[];
}

const StockControl: React.FC<StockControlProps> = ({ stockItems, urgentItems }) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Package className="h-5 w-5" />
            Controle de Estoque
          </CardTitle>
          {urgentItems.length > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {urgentItems.length} urgente{urgentItems.length > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex flex-col h-full">
        <div className="space-y-3 flex-1">
          {stockItems.slice(0, 4).map((item) => {
            const isLow = item.currentStock <= item.minStock;
            const percentage = (item.currentStock / item.minStock) * 100;
            
            return (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">{item.name}</span>
                    {isLow && (
                      <Badge variant="destructive" className="text-xs">
                        Baixo
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          percentage <= 50 ? 'bg-red-500' : 
                          percentage <= 80 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium min-w-fit">
                      {item.currentStock}/{item.minStock}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {urgentItems.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              {urgentItems.length} ite{urgentItems.length > 1 ? 'ns' : 'm'} precisa{urgentItems.length > 1 ? 'm' : ''} reposição urgente
            </p>
            <Button size="sm" className="w-full" variant="outline">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Solicitar Reposição
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StockControl;
