
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, MapPin, Wrench } from 'lucide-react';

interface TechnicianPricingProps {
  pricing?: {
    quotePrice: number;
    visitPrice: number;
    laborPrice: number;
  };
}

const TechnicianPricing: React.FC<TechnicianPricingProps> = ({ 
  pricing = { quotePrice: 0, visitPrice: 80, laborPrice: 120 } 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-blue-600">Tabela de Preços</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Orçamento */}
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-3">
            <Calculator className="h-5 w-5 text-green-600" />
            <div>
              <h4 className="font-medium text-green-800">Orçamento</h4>
              <p className="text-sm text-green-600">Estimativa detalhada</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Gratuito
          </Badge>
        </div>

        {/* Visita Técnica */}
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-800">Visita Técnica</h4>
              <p className="text-sm text-blue-600">Taxa de deslocamento</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            R$ {pricing.visitPrice.toFixed(2)}
          </Badge>
        </div>

        {/* Mão de Obra */}
        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center gap-3">
            <Wrench className="h-5 w-5 text-orange-600" />
            <div>
              <h4 className="font-medium text-orange-800">Mão de Obra</h4>
              <p className="text-sm text-orange-600">Por hora trabalhada</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            R$ {pricing.laborPrice.toFixed(2)}/h
          </Badge>
        </div>

        <div className="text-xs text-gray-500 mt-4 p-2 bg-gray-50 rounded">
          * Materiais e peças são cobrados à parte conforme necessário
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicianPricing;
