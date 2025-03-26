
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import BlurContainer from '@/components/ui/BlurContainer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState('client');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular chamada de API
    setTimeout(() => {
      setIsLoading(false);
      // Lógica de registro
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-2xl">
          <AnimatedContainer animation="scale" className="text-center mb-8">
            <h1 className="text-3xl font-bold">Criar uma Conta</h1>
            <p className="text-muted-foreground mt-2">Junte-se à nossa plataforma para acessar serviços técnicos especializados</p>
          </AnimatedContainer>
          
          <BlurContainer className="p-8">
            <Tabs defaultValue="client" className="mb-6" onValueChange={setAccountType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client">Conta de Cliente</TabsTrigger>
                <TabsTrigger value="technician">Conta de Técnico</TabsTrigger>
              </TabsList>
              
              <TabsContent value="client" className="mt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Crie uma conta de cliente para solicitar serviços técnicos, comprar peças e obter suporte.
                </p>
              </TabsContent>
              
              <TabsContent value="technician" className="mt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Crie uma conta de técnico para oferecer seus serviços, vender peças e fazer crescer seu negócio.
                </p>
              </TabsContent>
            </Tabs>
            
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Nome</Label>
                  <Input 
                    id="first-name"
                    placeholder="João" 
                    required 
                    className="rounded-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="last-name">Sobrenome</Label>
                  <Input 
                    id="last-name"
                    placeholder="Silva" 
                    required 
                    className="rounded-lg"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="nome@exemplo.com" 
                  required 
                  className="rounded-lg"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone"
                    type="tel" 
                    placeholder="(11) 98765-4321" 
                    required 
                    className="rounded-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="document">
                    {accountType === 'client' ? 'CPF/CNPJ' : 'CNPJ'}
                  </Label>
                  <Input 
                    id="document"
                    placeholder={accountType === 'client' ? "000.000.000-00" : "00.000.000/0000-00"} 
                    required 
                    className="rounded-lg"
                  />
                </div>
              </div>
              
              {accountType === 'technician' && (
                <div className="space-y-2">
                  <Label>Especialidades</Label>
                  <RadioGroup defaultValue="general">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general">Reparos Gerais</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="computers" id="computers" />
                        <Label htmlFor="computers">Computadores</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="appliances" id="appliances" />
                        <Label htmlFor="appliances">Eletrodomésticos</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="electronics" id="electronics" />
                        <Label htmlFor="electronics">Eletrônicos</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="networking" id="networking" />
                        <Label htmlFor="networking">Redes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Outros</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    className="rounded-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  <Input 
                    id="confirm-password"
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    className="rounded-lg"
                  />
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" required className="mt-1" />
                <div>
                  <Label htmlFor="terms" className="text-sm">
                    Eu concordo com os{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Termos de Serviço
                    </Link>{' '}
                    e{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Política de Privacidade
                    </Link>
                  </Label>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full rounded-lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Criando conta...
                  </span>
                ) : (
                  'Criar Conta'
                )}
              </Button>
              
              <div className="relative flex items-center justify-center mt-6 mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative px-4 bg-card text-sm">Ou cadastre-se com</div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" type="button" className="rounded-lg">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </Button>
              </div>
            </form>
          </BlurContainer>
          
          <p className="text-center text-sm mt-6">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Entre
            </Link>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
