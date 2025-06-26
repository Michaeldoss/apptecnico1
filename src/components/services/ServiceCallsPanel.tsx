
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ServiceCall, ServiceCallStatus, statusConfig } from '@/types/service-status';
import ServiceCallCard from './ServiceCallCard';

interface ServiceCallsPanelProps {
  callsByStatus: Record<ServiceCallStatus, ServiceCall[]>;
  onOpenDetails: (call: ServiceCall) => void;
}

const ServiceCallsPanel: React.FC<ServiceCallsPanelProps> = ({ 
  callsByStatus, 
  onOpenDetails 
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<ServiceCallStatus>>(
    new Set(['novos', 'pendentes', 'retornos'])
  );

  const toggleSection = (status: ServiceCallStatus) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(status)) {
      newExpanded.delete(status);
    } else {
      newExpanded.add(status);
    }
    setExpandedSections(newExpanded);
  };

  const statusOrder: ServiceCallStatus[] = [
    'novos',
    'pendentes', 
    'retornos',
    'negociacao',
    'concluidos',
    'cancelados'
  ];

  return (
    <div className="space-y-4">
      {statusOrder.map((status) => {
        const calls = callsByStatus[status];
        const config = statusConfig[status];
        const isExpanded = expandedSections.has(status);
        
        return (
          <Card key={status} className="w-full">
            <Collapsible
              open={isExpanded}
              onOpenChange={() => toggleSection(status)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">{config.icon}</span>
                        {config.label}
                      </CardTitle>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {calls.length}
                    </Badge>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  {calls.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Nenhum chamado nesta categoria</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {calls.map((call) => (
                        <ServiceCallCard
                          key={call.id}
                          call={call}
                          onOpenDetails={onOpenDetails}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
};

export default ServiceCallsPanel;
