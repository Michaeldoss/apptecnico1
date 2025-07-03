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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Como Funciona */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Como funciona
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Em poucos passos você encontra o técnico ideal para seu equipamento
          </p>
        </div>

        {/* Passos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="text-center">
            <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl font-bold text-white">1</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Descreva seu problema</h3>
            <p className="text-gray-700 text-lg font-medium">
              Conte-nos que tipo de equipamento precisa de manutenção e onde está localizado
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl font-bold text-white">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Receba propostas</h3>
            <p className="text-gray-700 text-lg font-medium">
              Técnicos qualificados da sua região enviarão orçamentos personalizados
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl font-bold text-white">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Escolha o melhor</h3>
            <p className="text-gray-700 text-lg font-medium">
              Compare preços, avaliações e escolha o técnico ideal para você
            </p>
          </div>
        </div>

        {/* Por que escolher */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Por que escolher nossa plataforma?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: <Shield className="h-10 w-10 text-white" />,
              title: "Segurança Garantida",
              description: "Todos os técnicos são verificados e avaliados",
              color: "bg-green-600"
            },
            {
              icon: <Clock className="h-10 w-10 text-white" />,
              title: "Resposta Rápida",
              description: "Receba propostas em até 1 hora",
              color: "bg-orange-600"
            },
            {
              icon: <Star className="h-10 w-10 text-white" />,
              title: "Melhor Qualidade",
              description: "Apenas profissionais com alta avaliação",
              color: "bg-yellow-600"
            },
            {
              icon: <CreditCard className="h-10 w-10 text-white" />,
              title: "Pagamento Seguro",
              description: "Pague apenas quando o serviço for concluído",
              color: "bg-purple-600"
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-300">
              <CardContent className="p-8">
                <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700 font-medium">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seção de Cadastros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Cliente */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 text-center group hover:shadow-2xl flex flex-col">
            <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <User className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Cadastro de Cliente</h3>
            <p className="text-gray-700 mb-6 font-medium flex-grow">
              Encontre os melhores técnicos para seus equipamentos
            </p>
            <Link to="/register" className="mt-auto">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-lg shadow-lg transition-all duration-200 hover:scale-105">
                Cadastrar como Cliente
              </Button>
            </Link>
          </div>

          {/* Técnico */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-200 hover:border-green-400 transition-all duration-300 text-center group hover:shadow-2xl flex flex-col">
            <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Wrench className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Cadastro de Técnico</h3>
            <p className="text-gray-700 mb-6 font-medium flex-grow">
              Conecte-se com clientes e expanda seus negócios
            </p>
            <Link to="/technician" className="mt-auto">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg shadow-lg transition-all duration-200 hover:scale-105">
                Cadastrar como Técnico
              </Button>
            </Link>
          </div>

          {/* Lojista */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 text-center group hover:shadow-2xl flex flex-col">
            <div className="bg-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Store className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Cadastro de Lojista</h3>
            <p className="text-gray-700 mb-6 font-medium flex-grow">
              Venda produtos e peças para técnicos e clientes
            </p>
            <Link to="/store/company-register" className="mt-auto">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 text-lg shadow-lg transition-all duration-200 hover:scale-105">
                Cadastrar como Lojista
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA para Comunidade */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
            Comunidade AtendaJá
          </h3>
          <p className="text-xl mb-8 text-blue-100 font-medium max-w-2xl mx-auto drop-shadow-sm">
            Participe das nossas comunidades e conecte-se com outros profissionais
          </p>
          
          {/* Links de Comunidade */}
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
            <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Send className="h-5 w-5" />
              Telegram
            </a>
            <a href="#" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Youtube className="h-5 w-5" />
              YouTube
            </a>
            <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Facebook className="h-5 w-5" />
              Facebook
            </a>
            <a href="#" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
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
