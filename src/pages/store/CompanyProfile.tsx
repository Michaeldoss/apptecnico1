
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { 
  Building2, 
  UserRound, 
  MapPin, 
  Phone,
  Mail,
  FileText,
  Save,
  ArrowLeft,
  Wrench,
  CheckCircle,
  ShieldCheck,
  AlertCircle,
  Globe,
  Clock,
  Award,
  Users,
  Target,
  Heart,
  Facebook,
  Instagram,
  Linkedin,
  Twitter
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const CompanyProfile = () => {
  const { isAuthenticated, userType, user } = useAuth();
  const [offersTechnicalService, setOffersTechnicalService] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Redirect to login if not authenticated or not a company
  if (!isAuthenticated || userType !== 'company') {
    return <Navigate to="/loja/register" replace />;
  }

  // Handle form submission (mock)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envio
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Perfil atualizado",
        description: "As alterações foram salvas com sucesso.",
      });
    }, 1500);
  };

  const handleTechProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envio
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Configurações técnicas salvas",
        description: "Seu perfil de assistência técnica foi atualizado com sucesso.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Building2 className="h-10 w-10 text-primary mr-4" />
              <div>
                <h1 className="text-3xl font-bold">Meu Perfil - Lojista</h1>
                <p className="text-muted-foreground">
                  Gerencie as informações da sua empresa
                </p>
              </div>
            </div>
            <Link to="/loja/dashboard">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Dashboard
              </Button>
            </Link>
          </div>
          
          <Tabs defaultValue="company">
            <TabsList className="w-full mb-6 grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="company">Empresa</TabsTrigger>
              <TabsTrigger value="about">Quem Somos</TabsTrigger>
              <TabsTrigger value="technical">Assistência Técnica</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="company">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building2 className="h-5 w-5 mr-2" /> 
                        Informações da Empresa
                      </CardTitle>
                      <CardDescription>
                        Dados básicos da sua empresa na plataforma
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="h-24 w-24 rounded-md border flex items-center justify-center bg-muted">
                          <img 
                            src={user?.logo || "/placeholder.svg"} 
                            alt="Logo" 
                            className="max-h-20 max-w-20 object-contain" 
                          />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="companyName">Nome da Empresa</Label>
                          <Input 
                            id="companyName" 
                            defaultValue={user?.name || "Doss Group"} 
                            className="mb-2"
                          />
                          <Button type="button" variant="outline" size="sm">
                            Alterar Logo
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Descrição Resumida</Label>
                        <Textarea 
                          id="description" 
                          defaultValue={user?.description || "Peças originais e componentes para impressoras industriais. Distribuidores autorizados das principais marcas."} 
                          rows={2}
                          placeholder="Breve descrição da sua empresa (aparece em listagens e buscas)"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cnpj">CNPJ</Label>
                          <Input 
                            id="cnpj" 
                            defaultValue={user?.cnpj || ""}
                            placeholder="00.000.000/0001-00"
                          />
                        </div>
                        <div>
                          <Label htmlFor="foundedYear">Ano de Fundação</Label>
                          <Input 
                            id="foundedYear" 
                            type="number"
                            placeholder="2010"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="employeeCount">Número de Funcionários</Label>
                          <Input 
                            id="employeeCount" 
                            type="number"
                            placeholder="50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="websiteUrl">Website</Label>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="websiteUrl" 
                              type="url"
                              placeholder="https://www.suaempresa.com.br"
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" /> 
                        Endereço e Contato
                      </CardTitle>
                      <CardDescription>
                        Informações de localização e contato
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Endereço Completo</Label>
                          <Input 
                            id="address" 
                            defaultValue={user?.address || "Av. Rio Branco, 156 - Centro"}
                            placeholder="Rua, número, complemento"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="zipCode">CEP</Label>
                          <Input 
                            id="zipCode" 
                            defaultValue={user?.zipCode || "20040-901"}
                            placeholder="00000-000"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="neighborhood">Bairro</Label>
                            <Input 
                              id="neighborhood" 
                              placeholder="Centro"
                            />
                          </div>
                          <div>
                            <Label htmlFor="city">Cidade</Label>
                            <Input 
                              id="city" 
                              defaultValue={user?.city || "Rio de Janeiro"}
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">Estado</Label>
                            <Input 
                              id="state" 
                              defaultValue={user?.state || "RJ"}
                              placeholder="UF"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="contactName">Nome do Responsável</Label>
                          <Input 
                            id="contactName" 
                            defaultValue={user?.contactName || "João Silva"}
                            placeholder="Nome completo"
                          />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <Label htmlFor="phone">Telefone Principal</Label>
                            <Input 
                              id="phone" 
                              defaultValue={user?.phone || "(21) 99999-9999"}
                              placeholder="(00) 00000-0000"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <Label htmlFor="phone2">Telefone Secundário</Label>
                            <Input 
                              id="phone2" 
                              placeholder="(00) 0000-0000"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <Label htmlFor="email">Email Principal</Label>
                            <Input 
                              id="email" 
                              type="email"
                              defaultValue={user?.email || "loja@exemplo.com"}
                              placeholder="contato@empresa.com.br"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <Label htmlFor="email2">Email Comercial</Label>
                            <Input 
                              id="email2" 
                              type="email"
                              placeholder="vendas@empresa.com.br"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="h-5 w-5 mr-2" /> 
                        Horário de Funcionamento
                      </CardTitle>
                      <CardDescription>
                        Informe os horários de atendimento da sua empresa
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map((day) => (
                          <div key={day} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                            <Label className="font-medium">{day}</Label>
                            <Input placeholder="08:00" />
                            <Input placeholder="18:00" />
                            <div className="flex items-center space-x-2">
                              <Checkbox id={`closed-${day}`} />
                              <Label htmlFor={`closed-${day}`}>Fechado</Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="h-5 w-5 mr-2" /> 
                        Redes Sociais
                      </CardTitle>
                      <CardDescription>
                        Links para suas redes sociais e canais de comunicação
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Facebook className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <Label htmlFor="facebook">Facebook</Label>
                            <Input 
                              id="facebook" 
                              placeholder="https://facebook.com/suaempresa"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input 
                              id="instagram" 
                              placeholder="https://instagram.com/suaempresa"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input 
                              id="linkedin" 
                              placeholder="https://linkedin.com/company/suaempresa"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Twitter className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <Label htmlFor="twitter">X (Twitter)</Label>
                            <Input 
                              id="twitter" 
                              placeholder="https://twitter.com/suaempresa"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" disabled={loading}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Salvando..." : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="about">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building2 className="h-5 w-5 mr-2" /> 
                        Sobre a Empresa
                      </CardTitle>
                      <CardDescription>
                        Conte a história da sua empresa e mostre seus diferenciais
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="aboutHistory">Nossa História</Label>
                        <Textarea 
                          id="aboutHistory" 
                          rows={6}
                          placeholder="Conte como sua empresa começou, principais marcos, evolução ao longo dos anos..."
                          defaultValue="Fundada em 2010, a Doss Group iniciou suas atividades com o objetivo de fornecer soluções completas em peças e componentes para impressoras industriais. Ao longo de mais de uma década de atuação, nos tornamos referência no mercado, oferecendo produtos de alta qualidade e atendimento personalizado aos nossos clientes."
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Target className="h-5 w-5 mr-2" /> 
                        Missão, Visão e Valores
                      </CardTitle>
                      <CardDescription>
                        Defina os princípios que guiam sua empresa
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="mission">Missão</Label>
                        <Textarea 
                          id="mission" 
                          rows={3}
                          placeholder="Qual é o propósito da sua empresa?"
                          defaultValue="Fornecer soluções inovadoras e confiáveis em peças e componentes para impressoras industriais, garantindo a satisfação dos nossos clientes através de excelência em qualidade, agilidade no atendimento e preços competitivos."
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="vision">Visão</Label>
                        <Textarea 
                          id="vision" 
                          rows={3}
                          placeholder="Onde sua empresa quer chegar?"
                          defaultValue="Ser reconhecida como a principal referência nacional em distribuição de peças para impressoras industriais, expandindo nossa atuação para toda América Latina até 2030."
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="values">Valores</Label>
                        <Textarea 
                          id="values" 
                          rows={4}
                          placeholder="Quais são os valores que sua empresa pratica? (separe por linha)"
                          defaultValue="• Compromisso com a qualidade
• Integridade e transparência
• Inovação constante
• Foco no cliente
• Responsabilidade socioambiental
• Valorização dos colaboradores"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Heart className="h-5 w-5 mr-2" /> 
                        Diferenciais Competitivos
                      </CardTitle>
                      <CardDescription>
                        O que torna sua empresa única no mercado
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="differentials">Nossos Diferenciais</Label>
                        <Textarea 
                          id="differentials" 
                          rows={6}
                          placeholder="Liste os principais diferenciais da sua empresa (separe por linha ou use marcadores)"
                          defaultValue="• Estoque próprio com mais de 5.000 itens disponíveis para entrega imediata
• Equipe técnica especializada com mais de 15 anos de experiência
• Garantia estendida em todos os produtos
• Programa de fidelidade com descontos progressivos
• Entrega expressa para todo Brasil
• Suporte técnico gratuito para auxiliar na escolha da peça correta
• Parcerias exclusivas com fabricantes internacionais
• Sistema de rastreamento em tempo real de pedidos"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 mr-2" /> 
                        Certificações e Prêmios
                      </CardTitle>
                      <CardDescription>
                        Reconhecimentos e certificações que sua empresa possui
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="certifications">Certificações</Label>
                        <Textarea 
                          id="certifications" 
                          rows={4}
                          placeholder="Liste as certificações da empresa (ISO, qualidade, etc.)"
                          defaultValue="• ISO 9001:2015 - Sistema de Gestão da Qualidade
• Distribuidor Autorizado HP, Canon, Epson
• Certificação Inmetro para componentes eletrônicos
• Certificação de Responsabilidade Ambiental"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="awards">Prêmios e Reconhecimentos</Label>
                        <Textarea 
                          id="awards" 
                          rows={4}
                          placeholder="Prêmios recebidos, reconhecimentos do mercado, etc."
                          defaultValue="• Prêmio Excelência em Atendimento 2024 - Associação Comercial
• Top 10 Fornecedores do Ano 2023 - Revista do Setor Gráfico
• Melhor Distribuidor Regional 2022 - Canon do Brasil"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="h-5 w-5 mr-2" /> 
                        Nossa Equipe
                      </CardTitle>
                      <CardDescription>
                        Informações sobre a equipe e cultura da empresa
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="team">Sobre Nossa Equipe</Label>
                        <Textarea 
                          id="team" 
                          rows={5}
                          placeholder="Fale sobre sua equipe, estrutura, cultura organizacional..."
                          defaultValue="Nossa equipe é composta por mais de 50 profissionais especializados, incluindo técnicos certificados, consultores comerciais e atendimento ao cliente. Investimos continuamente em capacitação e treinamento para garantir que nosso time esteja sempre atualizado com as últimas tecnologias e melhores práticas do mercado."
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="departments">Departamentos e Especialidades</Label>
                        <Textarea 
                          id="departments" 
                          rows={4}
                          placeholder="Liste os principais departamentos e suas especialidades"
                          defaultValue="• Departamento Técnico - Especialistas em diagnóstico e suporte
• Vendas Corporativas - Atendimento personalizado para grandes empresas
• Logística - Gestão de estoque e entregas
• Pós-venda - Garantia e suporte contínuo"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building2 className="h-5 w-5 mr-2" /> 
                        Infraestrutura
                      </CardTitle>
                      <CardDescription>
                        Informações sobre instalações, área de cobertura e capacidade
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="warehouseSize">Área do Armazém (m²)</Label>
                          <Input 
                            id="warehouseSize" 
                            type="number"
                            placeholder="2000"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="deliveryRadius">Raio de Entrega (km)</Label>
                          <Input 
                            id="deliveryRadius" 
                            type="number"
                            placeholder="100"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="infrastructure">Descrição da Infraestrutura</Label>
                        <Textarea 
                          id="infrastructure" 
                          rows={4}
                          placeholder="Descreva suas instalações, equipamentos, recursos..."
                          defaultValue="Contamos com um centro de distribuição moderno de 2.500m², totalmente climatizado e equipado com sistema de gestão de estoque automatizado. Nossa infraestrutura inclui área de armazenamento vertical, setor de conferência e embalagem, além de frota própria para entregas locais."
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="serviceAreas">Áreas de Atendimento</Label>
                        <Textarea 
                          id="serviceAreas" 
                          rows={3}
                          placeholder="Regiões, cidades ou estados que você atende"
                          defaultValue="Rio de Janeiro (capital e região metropolitana), São Paulo (capital), Minas Gerais (Belo Horizonte), além de entregas para todo território nacional via transportadora."
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" /> 
                        Políticas e Garantias
                      </CardTitle>
                      <CardDescription>
                        Informações sobre garantias, devoluções e políticas da empresa
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="warrantyPolicy">Política de Garantia</Label>
                        <Textarea 
                          id="warrantyPolicy" 
                          rows={3}
                          placeholder="Descreva sua política de garantia"
                          defaultValue="Todos os nossos produtos possuem garantia mínima de 90 dias contra defeitos de fabricação, podendo ser estendida para até 12 meses em itens selecionados. A garantia cobre peças e mão de obra em caso de defeito comprovado."
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="returnPolicy">Política de Troca e Devolução</Label>
                        <Textarea 
                          id="returnPolicy" 
                          rows={3}
                          placeholder="Descreva sua política de trocas e devoluções"
                          defaultValue="Aceitamos trocas em até 7 dias corridos após o recebimento, desde que o produto esteja em sua embalagem original e sem sinais de uso. Para devoluções, consulte nossas condições específicas conforme o tipo de produto."
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="shippingPolicy">Política de Entrega</Label>
                        <Textarea 
                          id="shippingPolicy" 
                          rows={3}
                          placeholder="Informações sobre prazos e condições de entrega"
                          defaultValue="Entregas para a região metropolitana em até 24h. Para outras localidades, o prazo varia de 3 a 7 dias úteis. Frete grátis para pedidos acima de R$ 500,00 na capital e região metropolitana."
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" disabled={loading}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Salvando..." : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Informações
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="technical">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wrench className="h-5 w-5 mr-2" /> 
                    Assistência Técnica
                  </CardTitle>
                  <CardDescription>
                    Configure sua empresa como prestadora de serviços técnicos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="technical-services" 
                      checked={offersTechnicalService}
                      onCheckedChange={setOffersTechnicalService}
                    />
                    <Label htmlFor="technical-services">Oferecer serviços de assistência técnica</Label>
                  </div>
                  
                  {offersTechnicalService && (
                    <form onSubmit={handleTechProfileSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="tech-description">Descrição dos serviços técnicos</Label>
                        <Textarea 
                          id="tech-description" 
                          placeholder="Descreva quais tipos de serviços técnicos sua empresa oferece, especialidades, equipamentos atendidos, etc."
                          rows={4}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="service-area">Área de atendimento (km)</Label>
                          <Input 
                            id="service-area" 
                            type="number"
                            placeholder="10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="hourly-rate">Valor hora técnica (R$)</Label>
                          <Input 
                            id="hourly-rate" 
                            type="number"
                            placeholder="100"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-3">Especialidades</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="computers" />
                            <Label htmlFor="computers">Computadores</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="printers" />
                            <Label htmlFor="printers">Impressoras</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="networks" />
                            <Label htmlFor="networks">Redes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="electronics" />
                            <Label htmlFor="electronics">Eletrônicos</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="appliances" />
                            <Label htmlFor="appliances">Eletrodomésticos</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="other" />
                            <Label htmlFor="other">Outros</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-3">Certificações</h4>
                        <div className="space-y-2">
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                                <div>
                                  <p className="font-medium">Autorizada Fabricante X</p>
                                  <p className="text-sm text-muted-foreground">Certificação válida até 12/2025</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">Visualizar</Button>
                            </div>
                          </div>
                          
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                                <div>
                                  <p className="font-medium">Certificação Técnica</p>
                                  <p className="text-sm text-muted-foreground">Aguardando aprovação</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">Visualizar</Button>
                            </div>
                          </div>
                          
                          <div className="border-dashed border-2 border-gray-300 p-4 rounded-md text-center">
                            <p className="text-sm text-muted-foreground mb-2">
                              Adicione certificações técnicas, autorizações de fabricantes, etc.
                            </p>
                            <Button variant="outline" type="button" size="sm">
                              Adicionar Nova Certificação
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" disabled={loading}>
                          {loading ? "Salvando..." : "Salvar Configurações Técnicas"}
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" /> 
                    Documentação
                  </CardTitle>
                  <CardDescription>
                    Documentos e certificações da empresa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="font-medium">Contrato de Fornecedor</p>
                        <p className="text-sm text-muted-foreground">Última atualização: 25/03/2025</p>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-green-600 mr-4">Aprovado</span>
                        <Button variant="outline" size="sm">Visualizar</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="font-medium">Certidão Negativa</p>
                        <p className="text-sm text-muted-foreground">Última atualização: 10/02/2025</p>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-green-600 mr-4">Aprovado</span>
                        <Button variant="outline" size="sm">Visualizar</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="font-medium">Adicionar novo documento</p>
                        <p className="text-sm text-muted-foreground">Anexe documentos necessários para sua operação</p>
                      </div>
                      <Button variant="outline" size="sm">Enviar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyProfile;
