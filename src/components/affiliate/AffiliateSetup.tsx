import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Star, Users, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface AffiliateSetupProps {
  onCreateProfile: (userData: { name: string }) => Promise<boolean>;
  isLoading: boolean;
}

export const AffiliateSetup: React.FC<AffiliateSetupProps> = ({ 
  onCreateProfile,
  isLoading 
}) => {
  const [name, setName] = useState('');
  const { user, userType } = useAuth();
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      await onCreateProfile({ name: name.trim() });
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: 'Ganhe Comissão',
      description: 'Receba até 15% de comissão em cada venda realizada através do seu link',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Users,
      title: 'Rede de Indicações',
      description: 'Construa uma rede sólida de clientes e gere renda passiva',
      color: 'text-instalei-navy-600',
      bgColor: 'bg-instalei-navy-50'
    },
    {
      icon: TrendingUp,
      title: 'Crescimento Escalável',
      description: 'Quanto mais você divulga, maior é o seu potencial de ganhos',
      color: 'text-instalei-orange-600',
      bgColor: 'bg-instalei-orange-50'
    },
    {
      icon: Star,
      title: 'Ferramentas Completas',
      description: 'Links personalizados, QR codes e materiais de divulgação',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  const getUserTypeText = () => {
    switch (userType) {
      case 'technician':
        return 'Técnico';
      case 'customer':
        return 'Cliente';
      case 'company':
        return 'Lojista';
      default:
        return 'Usuário';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Star className="h-8 w-8 text-yellow-500" />
          <h1 className={cn(
            "font-bold text-gray-900",
            isMobile ? "text-2xl" : "text-3xl"
          )}>
            Programa de Afiliados
          </h1>
        </div>
        <p className={cn(
          "text-gray-600",
          isMobile ? "text-sm px-4" : ""
        )}>
          Transforme suas indicações em renda! Como {getUserTypeText()}, você pode 
          ganhar comissão compartilhando nossos produtos.
        </p>
        <Badge variant="secondary" className="bg-instalei-orange-100 text-instalei-orange-800">
          Ativação Gratuita
        </Badge>
      </div>

      {/* Benefícios */}
      <div className={cn(
        "grid gap-4",
        isMobile ? "grid-cols-1" : "grid-cols-2"
      )}>
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card key={index} className="border border-instalei-orange-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={cn("p-3 rounded-lg", benefit.bgColor)}>
                    <Icon className={cn("h-6 w-6", benefit.color)} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                    <p className={cn(
                      "text-gray-600",
                      isMobile ? "text-sm" : ""
                    )}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Formulário de Cadastro */}
      <Card className="bg-gradient-to-r from-instalei-orange-50 to-instalei-navy-50 border-instalei-orange-200">
        <CardHeader>
          <CardTitle className="text-center text-instalei-navy-800">
            Ative seu Perfil de Afiliado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome para Divulgação</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como você quer aparecer para seus clientes?"
                required
              />
              <p className="text-xs text-gray-500">
                Este nome aparecerá quando alguém for indicado por você
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-instalei-orange-500 hover:bg-instalei-orange-600"
              disabled={isLoading || !name.trim()}
            >
              {isLoading ? (
                'Criando Perfil...'
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Ativar Programa de Afiliados
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Como Funciona */}
      <Card>
        <CardHeader>
          <CardTitle>Como Funciona</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn(
            "grid gap-6",
            isMobile ? "grid-cols-1" : "grid-cols-3"
          )}>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-instalei-orange-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-instalei-orange-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold">Compartilhe</h4>
              <p className={cn(
                "text-gray-600",
                isMobile ? "text-sm" : ""
              )}>
                Use seu link personalizado para compartilhar produtos
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-emerald-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold">Cliente Compra</h4>
              <p className={cn(
                "text-gray-600",
                isMobile ? "text-sm" : ""
              )}>
                Quando alguém compra através do seu link, a venda é rastreada
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-instalei-navy-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-instalei-navy-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold">Receba Comissão</h4>
              <p className={cn(
                "text-gray-600",
                isMobile ? "text-sm" : ""
              )}>
                Sua comissão é calculada automaticamente e pode ser sacada
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};