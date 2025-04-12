
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wrench,
  MapPin,
  Clock,
  MessageSquare,
  Star,
  Shield,
  CreditCard,
  Search,
} from "lucide-react";

const Features = () => {
  return (
    <section className="py-16 bg-muted/50" id="features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge className="px-3 py-1 text-sm font-medium" variant="secondary">
              Recursos
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Por que escolher nossa plataforma?
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              A plataforma mais completa para conectar clientes e técnicos de
              forma simples e segura.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Encontre Técnicos</h3>
                <p className="text-muted-foreground">
                  Busque por técnicos qualificados na sua região através do nosso mapa interativo.
                </p>
                <Link to="/find-technician">
                  <Button variant="outline">Encontrar Técnicos</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Wrench className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Serviços Sob Demanda</h3>
                <p className="text-muted-foreground">
                  Solicite serviços de acordo com sua necessidade e disponibilidade.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Rastreamento em Tempo Real</h3>
                <p className="text-muted-foreground">
                  Acompanhe em tempo real o status do seu serviço e a chegada do técnico.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Agendamento Flexível</h3>
                <p className="text-muted-foreground">
                  Escolha o melhor horário para você, com disponibilidade 7 dias por semana.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Comunicação Direta</h3>
                <p className="text-muted-foreground">
                  Chat integrado para comunicação direta e segura entre cliente e técnico.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Avaliações Verificadas</h3>
                <p className="text-muted-foreground">
                  Veja avaliações reais de outros clientes para escolher o melhor técnico.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all md:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Segurança Garantida</h3>
                <p className="text-muted-foreground">
                  Todos os técnicos são verificados e as transações são protegidas.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all md:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Pagamento Facilitado</h3>
                <p className="text-muted-foreground">
                  Diversas opções de pagamento, com processamento seguro e garantido.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all md:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Wrench className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Garantia de Serviço</h3>
                <p className="text-muted-foreground">
                  Satisfação garantida ou seu dinheiro de volta em serviços selecionados.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
