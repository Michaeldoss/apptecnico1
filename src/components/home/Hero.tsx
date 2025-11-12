import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Clock,
  Users,
  Sparkles,
  Wrench,
  MessageCircle
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-workana-blue-50 via-white to-white py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-10 h-[420px] w-[420px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-instalei relative grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm shadow-primary/20">
            <Sparkles className="h-4 w-4" />
            Uma nova experiência em manutenção industrial
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-black leading-tight text-slate-900 md:text-6xl">
              Resolva qualquer manutenção com especialistas verificados em até
              <span className="text-transparent bg-gradient-to-r from-primary via-accent to-primary-dark bg-clip-text"> 72 horas</span>
            </h1>
            <p className="text-lg text-slate-600 md:text-xl">
              A Instalei conecta sua empresa à maior rede de técnicos certificados do país.
              Solicite propostas personalizadas, acompanhe cada etapa em tempo real e tenha garantia completa do serviço.
            </p>
          </div>

          <Card className="border-0 shadow-xl shadow-primary/10">
            <CardContent className="space-y-6 p-8">
              <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-slate-800">Tipo de equipamento</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Ex: Impressora, CNC, Torno..." className="h-12 rounded-xl bg-slate-50 pl-12 text-base" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-slate-800">Localização</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Cidade, estado ou CEP" className="h-12 rounded-xl bg-slate-50 pl-12 text-base" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4 text-sm font-semibold text-slate-600">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Técnicos auditados e com seguro de responsabilidade
                </div>
                <Link to="/find-technician" className="flex-1 sm:flex-none">
                  <Button size="lg" className="h-12 w-full rounded-xl text-base font-semibold">
                    Buscar técnicos agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 sm:grid-cols-3">
            {[{
              value: "+1200",
              label: "Chamados solucionados por mês"
            },
            {
              value: "3 dias",
              label: "Tempo médio para confirmação"
            },
            {
              value: "98%",
              label: "Clientes que indicariam a Instalei"
            }].map(metric => (
              <div key={metric.label} className="rounded-2xl border border-primary/10 bg-white/80 p-6 shadow-sm backdrop-blur">
                <div className="text-3xl font-black text-primary md:text-4xl">{metric.value}</div>
                <p className="mt-2 text-sm font-semibold text-slate-600 md:text-base">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-600">
            <Users className="h-5 w-5 text-primary" />
            Mais de 5 mil empresas confiam na Instalei para manter seus parques fabris operando.
          </div>
        </div>

        <div className="relative">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary via-primary-dark to-accent text-white shadow-2xl">
            <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            <CardContent className="relative space-y-8 p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide">
                Painel em tempo real
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black leading-tight">Acompanhe o atendimento do seu equipamento como se estivesse lá</h3>
                <p className="text-base text-white/90">
                  Converse com o técnico, aprove o orçamento, agende visitas e receba relatórios fotográficos sem sair do escritório.
                </p>
              </div>
              <div className="space-y-4">
                {[{
                  icon: Wrench,
                  title: "Diagnóstico remoto",
                  description: "Vídeochamadas e mensagens para acelerar a primeira análise"
                },
                {
                  icon: Clock,
                  title: "Agendamento inteligente",
                  description: "Escolha janelas de atendimento alinhadas à sua produção"
                },
                {
                  icon: MessageCircle,
                  title: "Central de comunicação",
                  description: "Todas as conversas e aprovações organizadas em um único lugar"
                }].map(feature => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{feature.title}</h4>
                      <p className="text-sm text-white/80">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/services" className="block">
                <Button variant="secondary" className="h-12 w-full rounded-xl bg-white text-primary hover:bg-slate-100">
                  Conheça a plataforma completa
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;