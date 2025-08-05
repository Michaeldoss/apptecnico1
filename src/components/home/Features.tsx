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
  Users,
  CheckCircle,
  Phone,
  User,
  Store,
  MessageCircle,
  Send,
  Youtube,
  Facebook,
  Instagram
} from "lucide-react";

const Features = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-instalei">
        {/* Como Funciona */}
        <div className="text-center mb-instalei-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-instalei-md">
            Como funciona a Instalei
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Em poucos passos você encontra o técnico ideal para seu equipamento através da nossa plataforma
          </p>
        </div>

        {/* Passos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-instalei-lg mb-instalei-2xl">
          <div className="text-center">
            <div className="bg-gradient-to-br from-instalei-purple-500 to-instalei-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-instalei-md shadow-lg hover:scale-110 transition-transform duration-200">
              <span className="text-3xl font-bold text-white">1</span>
            </div>
            <h3 className="text-2xl font-bold mb-instalei-sm text-primary">Descreva seu problema</h3>
            <p className="text-muted-foreground text-lg font-medium">
              Conte-nos que tipo de equipamento precisa de manutenção e onde está localizado
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-instalei-purple-500 to-instalei-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-instalei-md shadow-lg hover:scale-110 transition-transform duration-200">
              <span className="text-3xl font-bold text-white">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-instalei-sm text-primary">Receba propostas</h3>
            <p className="text-muted-foreground text-lg font-medium">
              Técnicos qualificados da sua região enviarão orçamentos personalizados
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-instalei-purple-500 to-instalei-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-instalei-md shadow-lg hover:scale-110 transition-transform duration-200">
              <span className="text-3xl font-bold text-white">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-instalei-sm text-primary">Escolha o melhor</h3>
            <p className="text-muted-foreground text-lg font-medium">
              Compare preços, avaliações e escolha o técnico ideal para você
            </p>
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
              color: "bg-gradient-to-br from-instalei-purple-500 to-instalei-purple-600"
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
              color: "bg-gradient-to-br from-instalei-purple-600 to-instalei-purple-700"
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
            <div className="bg-gradient-to-br from-instalei-purple-500 to-instalei-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-instalei-md shadow-lg group-hover:scale-110 transition-transform duration-300">
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
            <div className="bg-gradient-to-br from-instalei-purple-600 to-instalei-purple-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-instalei-md shadow-lg group-hover:scale-110 transition-transform duration-300">
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
            <a href="#" className="bg-green-500 hover:bg-green-600 text-white px-instalei-md py-instalei-sm rounded-instalei flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
            <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white px-instalei-md py-instalei-sm rounded-instalei flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <Send className="h-5 w-5" />
              Telegram
            </a>
            <a href="#" className="bg-red-600 hover:bg-red-700 text-white px-instalei-md py-instalei-sm rounded-instalei flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <Youtube className="h-5 w-5" />
              YouTube
            </a>
            <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white px-instalei-md py-instalei-sm rounded-instalei flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <Facebook className="h-5 w-5" />
              Facebook
            </a>
            <a href="#" className="bg-pink-500 hover:bg-pink-600 text-white px-instalei-md py-instalei-sm rounded-instalei flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
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
