
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Como Funciona */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Em poucos passos você encontra o técnico ideal para seu equipamento
          </p>
        </div>

        {/* Passos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Descreva seu problema</h3>
            <p className="text-gray-600">
              Conte-nos que tipo de equipamento precisa de manutenção e onde está localizado
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Receba propostas</h3>
            <p className="text-gray-600">
              Técnicos qualificados da sua região enviarão orçamentos personalizados
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Escolha o melhor</h3>
            <p className="text-gray-600">
              Compare preços, avaliações e escolha o técnico ideal para você
            </p>
          </div>
        </div>

        {/* Por que escolher */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por que escolher nossa plataforma?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Shield className="h-8 w-8 text-blue-600" />,
              title: "Segurança Garantida",
              description: "Todos os técnicos são verificados e avaliados"
            },
            {
              icon: <Clock className="h-8 w-8 text-blue-600" />,
              title: "Resposta Rápida",
              description: "Receba propostas em até 1 hora"
            },
            {
              icon: <Star className="h-8 w-8 text-blue-600" />,
              title: "Melhor Qualidade",
              description: "Apenas profissionais com alta avaliação"
            },
            {
              icon: <CreditCard className="h-8 w-8 text-blue-600" />,
              title: "Pagamento Seguro",
              description: "Pague apenas quando o serviço for concluído"
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA para Técnicos */}
        <div className="bg-blue-600 rounded-lg p-8 mt-16 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            É um técnico? Cadastre-se gratuitamente
          </h3>
          <p className="text-xl mb-6 text-blue-100">
            Conecte-se com clientes e faça parte da nossa rede de profissionais
          </p>
          <Link to="/technician">
            <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Users className="mr-2 h-5 w-5" />
              Quero me cadastrar
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
