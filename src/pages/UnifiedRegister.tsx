import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserRegistrationForm from '@/components/auth/UserRegistrationForm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { User, Briefcase, Building, ArrowRight, CheckCircle } from 'lucide-react';

type UserType = 'client' | 'technician' | 'store' | null;

const UnifiedRegister = () => {
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);
  const navigate = useNavigate();

  const userTypes = [
    {
      type: 'client' as const,
      title: 'Cliente',
      description: 'Encontre técnicos especializados para manutenção e reparo dos seus equipamentos',
      icon: User,
      color: 'from-blue-600 to-blue-700',
      benefits: [
        'Encontre técnicos qualificados',
        'Agende serviços rapidamente',
        'Acompanhe em tempo real',
        'Avalie e comente'
      ]
    },
    {
      type: 'technician' as const,
      title: 'Técnico',
      description: 'Ofereça seus serviços técnicos especializados e encontre novos clientes',
      icon: Briefcase,
      color: 'from-yellow-500 to-yellow-600',
      benefits: [
        'Receba novos chamados',
        'Gerencie sua agenda',
        'Aumente sua renda',
        'Construa sua reputação'
      ]
    },
    {
      type: 'store' as const,
      title: 'Lojista',
      description: 'Venda produtos e equipamentos na nossa plataforma digital',
      icon: Building,
      color: 'from-purple-600 to-purple-700',
      benefits: [
        'Venda online facilmente',
        'Gerencie seu estoque',
        'Alcance mais clientes',
        'Acompanhe vendas'
      ]
    }
  ];

  const handleUserTypeSelect = (type: UserType) => {
    setSelectedUserType(type);
  };

  const handleRegistrationSuccess = () => {
    // Redireciona automaticamente para o dashboard correto
    switch (selectedUserType) {
      case 'client':
        navigate('/cliente/dashboard');
        break;
      case 'technician':
        navigate('/tecnico/dashboard');
        break;
      case 'store':
        navigate('/loja/dashboard');
        break;
      default:
        navigate('/login');
    }
  };

  const handleBack = () => {
    setSelectedUserType(null);
  };

  if (selectedUserType) {
    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <UserRegistrationForm
            userType={selectedUserType}
            onSuccess={handleRegistrationSuccess}
            onBack={handleBack}
          />
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            Crie sua conta
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto font-medium">
            Escolha o tipo de conta que melhor se adequa ao seu perfil
          </p>
        </div>
      </section>
      
      <main className="flex-grow px-4 py-12 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((userType) => {
              const IconComponent = userType.icon;
              
              return (
                <Card 
                  key={userType.type}
                  className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0 bg-white/95 backdrop-blur-xl relative overflow-hidden"
                  onClick={() => handleUserTypeSelect(userType.type)}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${userType.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <CardHeader className="text-center pb-4 relative z-10">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${userType.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {userType.title}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {userType.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 relative z-10">
                    {/* Benefits */}
                    <div className="space-y-3">
                      {userType.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`w-full mt-6 bg-gradient-to-r ${userType.color} hover:opacity-90 text-white font-semibold py-3 group-hover:scale-105 transition-all duration-300`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUserTypeSelect(userType.type);
                      }}
                    >
                      Escolher {userType.title}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Login Link */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Já tem uma conta?</p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Fazer Login
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UnifiedRegister;