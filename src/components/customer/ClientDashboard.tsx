
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Printer, Star, DollarSign } from 'lucide-react';

interface ClientDashboardProps {
  clientData: any;
}

const ClientDashboard = ({ clientData }: ClientDashboardProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-2 border-blue-800 bg-white shadow-xl hover:shadow-2xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-800 font-semibold">Total de Atendimentos</p>
              <p className="text-3xl font-bold text-blue-900">{clientData.history.totalServices}</p>
            </div>
            <FileText className="h-10 w-10 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-800 bg-white shadow-xl hover:shadow-2xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-800 font-semibold">Equipamentos Ativos</p>
              <p className="text-3xl font-bold text-blue-900">{clientData.history.activeEquipment}</p>
            </div>
            <Printer className="h-10 w-10 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-800 bg-white shadow-xl hover:shadow-2xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-800 font-semibold">Valor Total Investido</p>
              <p className="text-3xl font-bold text-blue-900">{clientData.history.totalValue}</p>
            </div>
            <DollarSign className="h-10 w-10 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-800 bg-white shadow-xl hover:shadow-2xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-800 font-semibold">Avaliação Geral</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-blue-900">{clientData.history.overallRating}</p>
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <Star className="h-10 w-10 text-blue-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
