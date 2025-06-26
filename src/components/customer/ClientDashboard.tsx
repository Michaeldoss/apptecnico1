
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Printer, Star, DollarSign } from 'lucide-react';

interface ClientDashboardProps {
  clientData: any;
}

const ClientDashboard = ({ clientData }: ClientDashboardProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border border-yellow-300 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 font-semibold">Total de Atendimentos</p>
              <p className="text-3xl font-bold text-yellow-800">{clientData.history.totalServices}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-yellow-300 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 font-semibold">Equipamentos Ativos</p>
              <p className="text-3xl font-bold text-yellow-800">{clientData.history.activeEquipment}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Printer className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-yellow-300 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 font-semibold">Valor Total Investido</p>
              <p className="text-3xl font-bold text-yellow-800">{clientData.history.totalValue}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-yellow-300 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 font-semibold">Avaliação Geral</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-yellow-800">{clientData.history.overallRating}</p>
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
