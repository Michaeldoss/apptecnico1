
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, FileText, TrendingUp } from 'lucide-react';
import PartsInventory from '@/components/parts/PartsInventory';
import PartForm from '@/components/parts/PartForm';
import PartsReports from '@/components/parts/PartsReports';
import PartsAlerts from '@/components/parts/PartsAlerts';

const TechnicianParts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingPart, setIsAddingPart] = useState(false);

  return (
    <TechnicianLayout title="Controle de Peças e Estoque">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, MCM, máquina..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button onClick={() => setIsAddingPart(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Peça
          </Button>
        </div>

        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">Estoque</TabsTrigger>
            <TabsTrigger value="alerts">Alertas</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inventory" className="space-y-4">
            <PartsInventory searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-4">
            <PartsAlerts />
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <PartsReports />
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4" />
              <p>Histórico de movimentações será implementado em breve</p>
            </div>
          </TabsContent>
        </Tabs>

        <PartForm 
          isOpen={isAddingPart}
          onClose={() => setIsAddingPart(false)}
        />
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianParts;
