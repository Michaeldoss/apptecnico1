import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Wrench,
  Shield,
  Clock,
  Star,
  CreditCard,
  User,
  Store,
  MessageCircle,
  Send,
  Youtube,
  Facebook,
  Instagram,
  Search,
  FileText,
  CheckCircle2,
  Users,
  ArrowRight,
  Headphones
} from "lucide-react";

const Features = () => {
  const steps = [
    {
      number: "01",
      icon: <Search className="h-8 w-8 text-white" />,
      title: "Descreva seu Problema",
      description: "Conte-nos detalhadamente sobre o equipamento que precisa de manutenção, incluindo modelo, marca e o tipo de problema que está enfrentando.",
      details: ["Formulário simples e intuitivo", "Upload de fotos do equipamento", "Localização automática"],
      color: "from-instalei-orange-500 to-instalei-orange-600"
    },
    {
      number: "02",
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Receba Propostas",
      description: "Técnicos qualificados e verificados da sua região receberão sua solicitação e enviarão orçamentos personalizados.",
      details: ["Múltiplos orçamentos para comparar", "Perfil completo dos técnicos", "Avaliações de outros clientes"],
      color: "from-instalei-navy-500 to-instalei-navy-600"
    },
    {
      number: "03",
      icon: <FileText className="h-8 w-8 text-white" />,
      title: "Negocie e Aprove",
      description: "Converse diretamente com os técnicos, tire suas dúvidas e negocie os melhores termos para o serviço.",
      details: ["Chat integrado na plataforma", "Negociação transparente", "Agendamento flexível"],
      color: "from-instalei-orange-600 to-instalei-orange-700"
    },
    {
      number: "04",
      icon: <Wrench className="h-8 w-8 text-white" />,
      title: "Serviço Executado",
      description: "O técnico realiza o serviço no local combinado. Acompanhe todo o processo em tempo real pela plataforma.",
      details: ["Acompanhamento em tempo real", "Fotos antes e depois", "Ordem de serviço digital"],
      color: "from-instalei-navy-600 to-instalei-navy-700"
    },
    {
      number: "05",
      icon: <CheckCircle2 className="h-8 w-8 text-white" />,
      title: "Confirme e Pague",
      description: "Após a conclusão, confirme que o serviço foi realizado satisfatoriamente. O pagamento só é liberado após sua aprovação.",
      details: ["Pagamento seguro via plataforma", "Liberação após confirmação", "Nota fiscal automática"],
      color: "from-instalei-orange-500 to-instalei-orange-600"
    },
    {
      number: "06",
      icon: <Headphones className="h-8 w-8 text-white" />,
      title: "Suporte Contínuo",
      description: "Qualquer problema? Nossa equipe de mediação está disponível para garantir a satisfação de ambas as partes.",
      details: ["Suporte 7 dias por semana", "Mediação imparcial", "Resolução rápida de conflitos"],
      color: "from-instalei-navy-500 to-instalei-navy-600"
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-instalei">
        {/* Como Funciona - Seção Principal Elaborada */}
        <div className="text-center mb-instalei-2xl">
          <span className="inline-block bg-instalei-orange-100 text-instalei-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Processo Simples e Seguro
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-instalei-md">
            Como funciona a Instalei
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
            Em 6 etapas simples, você encontra o técnico ideal e tem todo o suporte necessário do início ao fim
          </p>
        </div>

        {/* Timeline de Passos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-instalei-lg mb-instalei-3xl">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Header com gradiente */}
                <div className={`bg-gradient-to-r ${step.color} p-instalei-md relative overflow-hidden`}>
                  <div className="absolute top-2 right-2 text-white/20 text-6xl font-black">
                    {step.number}
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    {step.icon}
                  </div>
                </div>
                
                {/* Conteúdo */}
                <div className="p-instalei-md">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-instalei-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                      ETAPA {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-instalei-orange-500 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>
                  
                  {/* Lista de detalhes */}
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-instalei-orange-500 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Central */}
        <div className="bg-gradient-to-r from-instalei-navy-600 via-instalei-navy-700 to-instalei-orange-600 rounded-2xl p-instalei-xl text-center text-white mb-instalei-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar?
            </h3>
            <p className="text-xl mb-6 text-white/90 max-w-2xl mx-auto">
              Junte-se a milhares de clientes e técnicos que já confiam na Instalei
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/find-technician">
                <Button size="lg" className="bg-instalei-orange-500 hover:bg-instalei-orange-600 text-white font-bold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                  Encontrar Técnico
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/technician">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-instalei-navy-600 font-bold px-8 py-6 text-lg">
                  Sou Técnico
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Por que escolher */}
        <div className="text-center mb-instalei-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-instalei-lg">
            Por que escolher a Instalei?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-instalei-md mb-instalei-2xl">
          {[
            {
              icon: <Shield className="h-10 w-10 text-white" />,
              title: "Segurança Garantida",
              description: "Todos os técnicos são verificados e avaliados",
              color: "bg-gradient-to-br from-instalei-navy-500 to-instalei-navy-600"
            },
            {
              icon: <Clock className="h-10 w-10 text-white" />,
              title: "Resposta Rápida",
              description: "Receba propostas em até 1 hora",
              color: "bg-gradient-to-br from-instalei-orange-500 to-instalei-orange-600"
            },
            {
              icon: <Star className="h-10 w-10 text-white" />,
              title: "Melhor Qualidade",
              description: "Apenas profissionais com alta avaliação",
              color: "bg-gradient-to-br from-instalei-navy-600 to-instalei-navy-700"
            },
            {
              icon: <CreditCard className="h-10 w-10 text-white" />,
              title: "Pagamento Seguro",
              description: "Pague apenas quando o serviço for concluído",
              color: "bg-gradient-to-br from-instalei-orange-600 to-instalei-orange-700"
            }
          ].map((feature, index) => (
            <Card key={index} className="card-instalei text-center group">
              <CardContent className="p-instalei-md">
                <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-instalei-md shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-instalei-sm text-primary">{feature.title}</h3>
                <p className="text-muted-foreground font-medium">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seção de Cadastros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-instalei-md mb-instalei-2xl">
          {/* Cliente */}
          <div className="card-instalei text-center group flex flex-col">
            <div className="bg-gradient-to-br from-instalei-navy-500 to-instalei-navy-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-instalei-md shadow-lg group-hover:scale-110 transition-transform duration-300">
              <User className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-instalei-sm text-primary">Cadastro de Cliente</h3>
            <p className="text-muted-foreground mb-instalei-md font-medium flex-grow">
              Encontre os melhores técnicos para seus equipamentos na Instalei
            </p>
            <Link to="/register" className="mt-auto">
              <Button className="btn-primary w-full">
                Cadastrar como Cliente
              </Button>
            </Link>
          </div>

          {/* Técnico */}
          <div className="card-instalei text-center group flex flex-col">
            <div className="bg-gradient-to-br from-instalei-orange-500 to-instalei-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-instalei-md shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Wrench className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-instalei-sm text-primary">Cadastro de Técnico</h3>
            <p className="text-muted-foreground mb-instalei-md font-medium flex-grow">
              Conecte-se com clientes e expanda seus negócios através da Instalei
            </p>
            <Link to="/technician" className="mt-auto">
              <Button className="btn-secondary w-full">
                Cadastrar como Técnico
              </Button>
            </Link>
          </div>

          {/* Lojista */}
          <div className="card-instalei text-center group flex flex-col">
            <div className="bg-gradient-to-br from-instalei-navy-600 to-instalei-navy-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-instalei-md shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Store className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-instalei-sm text-primary">Cadastro de Lojista</h3>
            <p className="text-muted-foreground mb-instalei-md font-medium flex-grow">
              Venda produtos e peças para técnicos e clientes na Instalei
            </p>
            <Link to="/loja/register" className="mt-auto">
              <Button className="btn-outline w-full">
                Cadastrar como Lojista
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA para Comunidade */}
        <div className="card-gradient rounded-instalei-xl p-instalei-2xl text-center text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-instalei-md drop-shadow-lg">
            Comunidade Instalei
          </h3>
          <p className="text-xl mb-instalei-lg text-instalei-gray-200 font-medium max-w-2xl mx-auto drop-shadow-sm">
            Participe das nossas comunidades e conecte-se com outros profissionais da Instalei
          </p>
          
          {/* Links de Comunidade */}
          <div className="flex flex-wrap justify-center gap-instalei-sm">
            <a href="#" className="bg-instalei-orange-500 hover:bg-instalei-orange-600 text-white px-instalei-md py-instalei-sm rounded-instalei flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
            <a href="#" className="bg-instalei-navy-600 hover:bg-instalei-navy-700 text-white px-instalei-md py-instalei-sm rounded-instalei flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <Send className="h-5 w-5" />
              Telegram
            </a>
            <a href="#" className="bg-instalei-orange-600 hover:bg-instalei-orange-700 text-white px-instalei-md py-instalei-sm rounded-instalei flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <Youtube className="h-5 w-5" />
              YouTube
            </a>
            <a href="#" className="bg-instalei-navy-700 hover:bg-instalei-navy-800 text-white px-instalei-md py-instalei-sm rounded-instalei flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <Facebook className="h-5 w-5" />
              Facebook
            </a>
            <a href="#" className="bg-instalei-orange-400 hover:bg-instalei-orange-500 text-white px-instalei-md py-instalei-sm rounded-instalei flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <Instagram className="h-5 w-5" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
