
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useServices } from '@/hooks/useServices';
import { useToast } from '@/hooks/use-toast';
import { ServiceOrder } from '@/types/service';

const ServiceOrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const { services } = useServices();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the service by ID
  const service = services.find(s => s.id === Number(id));
  
  // Mock data for service order
  const [serviceOrder, setServiceOrder] = useState<ServiceOrder>({
    id: 1,
    number: `OS-${String(service?.id).padStart(4, '0')}`,
    serviceId: Number(id),
    createdAt: new Date().toLocaleDateString('pt-BR'),
    materials: [
      { id: 1, name: 'Fonte de Alimentação', quantity: 1, price: 'R$ 180,00' }
    ],
    laborHours: 2,
    technicalReport: ''
  });
  
  const [newMaterial, setNewMaterial] = useState({ name: '', quantity: 1, price: '' });
  
  const addMaterial = () => {
    if (!newMaterial.name || !newMaterial.price) return;
    
    setServiceOrder({
      ...serviceOrder,
      materials: [
        ...(serviceOrder.materials || []),
        {
          id: Date.now(),
          name: newMaterial.name,
          quantity: newMaterial.quantity,
          price: newMaterial.price
        }
      ]
    });
    
    setNewMaterial({ name: '', quantity: 1, price: '' });
  };
  
  const removeMaterial = (id: number) => {
    setServiceOrder({
      ...serviceOrder,
      materials: serviceOrder.materials?.filter(m => m.id !== id)
    });
  };
  
  const handleSave = () => {
    // Here would be an API call to save the service order
    toast({
      title: "Ordem de serviço salva",
      description: "A O.S. foi salva com sucesso!",
    });
    
    // Navigate back to the service page
    navigate('/tecnico/servicos');
  };
  
  const handleComplete = () => {
    // Here would be an API call to complete the service order
    toast({
      title: "Ordem de serviço finalizada",
      description: "A O.S. foi finalizada e o cliente será notificado.",
    });
    
    // Navigate back to the service page
    navigate('/tecnico/servicos');
  };
  
  if (!service) {
    return (
      <TechnicianLayout title="Serviço não encontrado">
        <div className="text-center p-6">
          <p>Serviço não encontrado.</p>
          <Button 
            onClick={() => navigate('/tecnico/servicos')}
            className="mt-4"
          >
            Voltar para serviços
          </Button>
        </div>
      </TechnicianLayout>
    );
  }
  
  return (
    <TechnicianLayout title={`Ordem de Serviço - ${serviceOrder.number}`}>
      <div className="space-y-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Serviço</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client">Cliente</Label>
              <Input id="client" value={service.client} readOnly />
            </div>
            <div>
              <Label htmlFor="service-type">Tipo de Serviço</Label>
              <Input id="service-type" value={service.type} readOnly />
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" value={service.description} readOnly />
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input id="address" value={service.address} readOnly />
            </div>
          </CardContent>
        </Card>
        
        {/* Materiais Utilizados */}
        <Card>
          <CardHeader>
            <CardTitle>Materiais e Peças Utilizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Lista de materiais */}
              {serviceOrder.materials && serviceOrder.materials.length > 0 ? (
                <div className="border rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {serviceOrder.materials.map((material) => (
                        <tr key={material.id}>
                          <td className="px-4 py-2 whitespace-nowrap">{material.name}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{material.quantity}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{material.price}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeMaterial(material.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              Remover
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground py-4">
                  Nenhum material adicionado
                </p>
              )}
              
              {/* Formulário para adicionar novos materiais */}
              <div className="grid md:grid-cols-3 gap-4 items-end pt-4 border-t">
                <div>
                  <Label htmlFor="material-name">Nome do Material</Label>
                  <Input 
                    id="material-name" 
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                    placeholder="Ex: Fonte de Alimentação"
                  />
                </div>
                <div>
                  <Label htmlFor="material-quantity">Quantidade</Label>
                  <Input 
                    id="material-quantity"
                    type="number"
                    min="1"
                    value={newMaterial.quantity}
                    onChange={(e) => setNewMaterial({...newMaterial, quantity: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="material-price">Preço</Label>
                  <Input 
                    id="material-price"
                    value={newMaterial.price}
                    onChange={(e) => setNewMaterial({...newMaterial, price: e.target.value})}
                    placeholder="Ex: R$ 100,00"
                  />
                </div>
              </div>
              
              <Button onClick={addMaterial} className="w-full">
                Adicionar Material
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Horas trabalhadas */}
        <Card>
          <CardHeader>
            <CardTitle>Horas Trabalhadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-xs">
              <Label htmlFor="labor-hours">Quantidade de Horas</Label>
              <Input 
                id="labor-hours"
                type="number"
                min="0.5"
                step="0.5"
                value={serviceOrder.laborHours}
                onChange={(e) => setServiceOrder({...serviceOrder, laborHours: Number(e.target.value)})}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Relatório Técnico */}
        <Card>
          <CardHeader>
            <CardTitle>Relatório Técnico</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="technical-report">Descreva o problema encontrado e a solução aplicada</Label>
            <Textarea 
              id="technical-report"
              className="min-h-[150px]"
              value={serviceOrder.technicalReport || ''}
              onChange={(e) => setServiceOrder({...serviceOrder, technicalReport: e.target.value})}
              placeholder="Descreva em detalhes o que foi feito..."
            />
          </CardContent>
        </Card>
        
        {/* Botões de ação */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate('/tecnico/servicos')}>
            Cancelar
          </Button>
          <Button variant="outline" onClick={handleSave}>
            Salvar Rascunho
          </Button>
          <Button onClick={handleComplete}>
            Finalizar O.S.
          </Button>
        </div>
      </div>
    </TechnicianLayout>
  );
};

export default ServiceOrderPage;
