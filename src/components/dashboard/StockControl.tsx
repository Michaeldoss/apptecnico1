
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, AlertTriangle, Plus } from 'lucide-react';
import { StockItem } from '@/types/dashboard';

interface StockControlProps {
  stockItems: StockItem[];
  urgentItems: StockItem[];
}

const StockControl: React.FC<StockControlProps> = ({ stockItems, urgentItems }) => {
  return (
    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-lg font-bold">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Controle de Estoque
            </span>
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
          {stockItems.slice(0, 4).map((item) => (
            <div 
              key={item.id} 
              className={`flex items-center justify-between p-3 rounded-lg border ${
                item.urgent || item.currentStock <= item.minStock
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${
                  item.urgent || item.currentStock <= item.minStock
                    ? 'bg-red-100' 
                    : 'bg-white'
                }`}>
                  <Package className={`h-4 w-4 ${
                    item.urgent || item.currentStock <= item.minStock
                      ? 'text-red-600' 
                      : 'text-orange-600'
                  }`} />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    Mín: {item.minStock} unidades
                  </p>
                </div>
              </div>
              <Badge 
                variant={item.urgent || item.currentStock <= item.minStock ? "destructive" : "secondary"}
                className="font-semibold"
              >
                {item.currentStock}
              </Badge>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4 flex items-center gap-2" size="sm">
          <Plus className="h-4 w-4" />
          Gerenciar Estoque
        </Button>
      </CardContent>
    </Card>
  );
};

export default StockControl;
