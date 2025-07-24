import React from "react";
import { CheckCircle, Heart, Shield, Users, Lightbulb, Zap } from "lucide-react";
const CompanyValues = () => {
  const values = [{
    title: "Satisfação do cliente em 1º lugar",
    description: "Nosso compromisso é garantir que cada cliente tenha a melhor experiência possível",
    icon: <CheckCircle className="h-8 w-8" />
  }, {
    title: "Se apaixonar pelo problema",
    description: "Entendemos profundamente os desafios dos nossos usuários para criar as melhores soluções",
    icon: <Heart className="h-8 w-8" />
  }, {
    title: "Segurança é inegociável",
    description: "Protegemos os dados e garantimos transações seguras em toda a plataforma",
    icon: <Shield className="h-8 w-8" />
  }, {
    title: "Gerar valor para o nosso ecossistema",
    description: "Criamos oportunidades e benefícios para todos os participantes da nossa rede",
    icon: <Users className="h-8 w-8" />
  }, {
    title: "Inovar com simplicidade",
    description: "Desenvolvemos soluções tecnológicas avançadas, mas sempre fáceis de usar",
    icon: <Lightbulb className="h-8 w-8" />
  }, {
    title: "Desafio é a nossa diversão",
    description: "Enfrentamos problemas complexos com entusiasmo e determinação",
    icon: <Zap className="h-8 w-8" />
  }];
  return;
};
export default CompanyValues;