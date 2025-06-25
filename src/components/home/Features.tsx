
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
  Phone
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

        {/* CTA para Técnicos */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            É um técnico? Cadastre-se gratuitamente
          </h3>
          <p className="text-xl mb-8 text-blue-100 font-medium max-w-2xl mx-auto">
            Conecte-se com clientes e faça parte da nossa rede de profissionais qualificados
          </p>
          <Link to="/technician">
            <Button className="bg-white text-blue-700 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-lg shadow-lg transition-all duration-200 border-0">
              <Users className="mr-3 h-6 w-6" />
              Quero me cadastrar como Técnico
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
