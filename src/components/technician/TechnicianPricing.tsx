
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, Clock, DollarSign } from 'lucide-react';

interface TechnicianPricingProps {
  pricing: {
    quotePrice: number;
    visitPrice: number;
    laborPrice: number;
  };
}

const TechnicianPricing: React.FC<TechnicianPricingProps> = ({ pricing }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-600">
          <DollarSign className="h-5 w-5" />
          Preços
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Orçamento</span>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {pricing.quotePrice === 0 ? 'Gratuito' : `R$ ${pricing.quotePrice}`}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Visita técnica</span>
          </div>
          <Badge variant="outline">
            R$ {pricing.visitPrice}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium">Mão de obra/hora</span>
          </div>
          <Badge variant="outline">
            R$ {pricing.laborPrice}
          </Badge>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            * Preços podem variar dependendo da complexidade do serviço e localização
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicianPricing;
