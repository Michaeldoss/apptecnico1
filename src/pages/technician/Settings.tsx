
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WhatsAppConfig } from '@/components/technician/WhatsAppConfig';
import AppSettings from '@/components/technician/AppSettings';
import { MessageCircle, Settings } from 'lucide-react';

const TechnicianSettings = () => {
  return (
    <TechnicianLayout title="Configurações">
      <Tabs defaultValue="whatsapp" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted border border-border">
          <TabsTrigger 
            value="whatsapp" 
            className="font-semibold text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp Business
          </TabsTrigger>
          <TabsTrigger 
            value="app"
            className="font-semibold text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurações do App
          </TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp" className="mt-6">
          <WhatsAppConfig />
        </TabsContent>

        <TabsContent value="app" className="mt-6">
          <AppSettings />
        </TabsContent>
      </Tabs>
    </TechnicianLayout>
  );
};

export default TechnicianSettings;
