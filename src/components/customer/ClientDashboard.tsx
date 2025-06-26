
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Printer, Star, DollarSign } from 'lucide-react';

interface ClientDashboardProps {
  clientData: any;
}

const ClientDashboard = ({ clientData }: ClientDashboardProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-yellow-300 bg-gradient-to-br from-yellow-100 to-amber-100 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 font-medium">Total de Atendimentos</p>
              <p className="text-2xl font-bold text-yellow-800">{clientData.history.totalServices}</p>
            </div>
            <FileText className="h-8 w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-300 bg-gradient-to-br from-yellow-100 to-amber-100 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 font-medium">Equipamentos Ativos</p>
              <p className="text-2xl font-bold text-yellow-800">{clientData.history.activeEquipment}</p>
            </div>
            <Printer className="h-8 w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-300 bg-gradient-to-br from-yellow-100 to-amber-100 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 font-medium">Valor Total Investido</p>
              <p className="text-2xl font-bold text-yellow-800">{clientData.history.totalValue}</p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-300 bg-gradient-to-br from-yellow-100 to-amber-100 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 font-medium">Avaliação Geral</p>
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold text-yellow-800">{clientData.history.overallRating}</p>
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
              </div>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
