
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { User, Wrench, Store } from 'lucide-react';

interface UserTypeSelectorProps {
  isOpen: boolean;
  onSelect: (userType: 'customer' | 'technician' | 'company') => void;
  userEmail: string;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ isOpen, onSelect, userEmail }) => {
  const [selectedType, setSelectedType] = useState<'customer' | 'technician' | 'company'>('customer');

  const handleConfirm = () => {
    onSelect(selectedType);
  };

  const userTypes = [
    {
      value: 'customer' as const,
      label: 'Cliente',
      description: 'Solicitar serviços técnicos',
      icon: User,
    },
    {
      value: 'technician' as const,
      label: 'Técnico',
      description: 'Prestar serviços técnicos',
      icon: Wrench,
    },
    {
      value: 'company' as const,
      label: 'Loja',
      description: 'Vender produtos e peças',
      icon: Store,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Escolha seu tipo de conta</DialogTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Como você deseja acessar a plataforma com {userEmail}?
          </p>
        </DialogHeader>
        
        <div className="space-y-4">
          <RadioGroup
            value={selectedType}
            onValueChange={(value) => setSelectedType(value as 'customer' | 'technician' | 'company')}
            className="space-y-3"
          >
            {userTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value={type.value} id={type.value} />
                  <Icon className="h-5 w-5 text-gray-600" />
                  <div className="flex-1">
                    <Label htmlFor={type.value} className="font-medium cursor-pointer">
                      {type.label}
                    </Label>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
          
          <Button onClick={handleConfirm} className="w-full">
            Continuar como {userTypes.find(t => t.value === selectedType)?.label}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserTypeSelector;
