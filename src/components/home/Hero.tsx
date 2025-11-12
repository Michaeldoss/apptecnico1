import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock3,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
  Wrench
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const bulletPoints = [
  "Marketplace nacional com técnicos auditados",
  "Gestão completa de chamados com indicadores em tempo real",
  "Seguro de responsabilidade e garantia Instalei em todos os serviços"
];

const metrics = [
  { value: "+1.200", label: "Chamados resolvidos por mês" },
  { value: "72h", label: "Tempo médio para alocação de técnico" },
  { value: "98%", label: "Clientes que renovam contratos" }
];

const progressItems = [
  {
    title: "Diagnóstico remoto",
    description: "Checklist concluído e orçamento em aprovação",
    status: "Em andamento"
  },
  {
    title: "Visita presencial",
    description: "Agendada para 14h com técnico credenciado",
    status: "Confirmado"
  },
  {
    title: "Relatório final",
    description: "Consolidação automática de notas, fotos e garantia",
    status: "Próximo passo"
  }
];

const trustedBy = ["Nexa", "WEG", "BRF", "Klabin", "Raízen"];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 left-20 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-instalei relative grid items-start gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-primary/10 text-primary" variant="outline">
              <Sparkles className="mr-2 h-3.5 w-3.5" /> Plataforma completa para manutenção industrial
            </Badge>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <BadgeCheck className="h-4 w-4 text-primary" />
              SLA sob medida
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-black leading-tight text-slate-900 md:text-6xl">
              Resoluções inteligentes para manter sua operação produtiva todos os dias
            </h1>
            <p className="text-lg text-slate-600 md:text-xl">
              Conecte-se com especialistas certificados, acompanhe cada etapa do chamado em tempo real e tenha previsibilidade sobre custos, prazos e qualidade.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="h-12 rounded-2xl text-base">
              <Link to="/technician/register">
                Começar agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-2xl border-primary/30 text-base text-primary">
              <Link to="/services">Explorar soluções</Link>
            </Button>
          </div>

          <ul className="grid gap-3 text-sm font-semibold text-slate-600 md:text-base">
            {bulletPoints.map(point => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <Card className="border-0 shadow-xl shadow-primary/15">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold text-slate-800 md:text-xl">
                <Wrench className="h-5 w-5 text-primary" /> Buscar um técnico certificado
              </CardTitle>
              <p className="text-sm text-slate-500 md:text-base">
                Encontre profissionais disponíveis próximos à sua planta e receba até 3 propostas detalhadas.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-800" htmlFor="equipment">
                    Tipo de equipamento
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="equipment"
                      placeholder="Ex.: impressora, torno CNC, compressores"
                      className="h-12 rounded-xl bg-slate-50 pl-12 text-base"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-800" htmlFor="location">
                    Localização
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input id="location" placeholder="Cidade, estado ou CEP" className="h-12 rounded-xl bg-slate-50 pl-12 text-base" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <Building2 className="h-5 w-5 text-primary" />
                  Cobertura nacional com especialistas auditados
                </div>
                <Button asChild size="lg" className="h-12 rounded-2xl text-base">
                  <Link to="/find-technician">
                    Buscar técnicos agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 sm:grid-cols-3">
            {metrics.map(metric => (
              <div
                key={metric.label}
                className="rounded-2xl border border-primary/10 bg-white/80 p-6 text-center shadow-sm backdrop-blur"
              >
                <div className="text-3xl font-black text-primary md:text-4xl">{metric.value}</div>
                <p className="mt-2 text-sm font-semibold text-slate-600 md:text-base">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-600">
              <TrendingUp className="h-5 w-5 text-primary" />
              Empresas líderes confiam na Instalei
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
              {trustedBy.map(brand => (
                <span key={brand} className="rounded-full border border-white/40 bg-white/50 px-4 py-2 text-slate-500">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary via-primary-dark to-accent text-white shadow-2xl">
            <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            <CardHeader className="space-y-4 p-10 pb-6">
              <Badge className="w-fit bg-white/10 text-white" variant="secondary">
                Painel em tempo real
              </Badge>
              <CardTitle className="text-3xl font-black leading-tight">Acompanhe cada chamado com transparência total</CardTitle>
              <p className="text-base text-white/80">
                Visualize diagnósticos, aprovações e deslocamentos com timelines intuitivas e alertas automáticos para o seu time.
              </p>
            </CardHeader>
            <CardContent className="space-y-6 p-10 pt-0">
              <div className="space-y-5">
                {progressItems.map(item => (
                  <div key={item.title} className="rounded-2xl bg-white/10 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <Badge className="bg-white/20 text-white" variant="secondary">
                        {item.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-white/80">{item.description}</p>
                  </div>
                ))}
              </div>
              <Button asChild variant="secondary" className="h-12 w-full rounded-2xl bg-white text-primary hover:bg-slate-100">
                <Link to="/services">Conheça a plataforma completa</Link>
              </Button>
            </CardContent>
          </Card>

          <div className="absolute -bottom-10 left-1/2 hidden w-[85%] -translate-x-1/2 rounded-3xl bg-white p-6 shadow-xl sm:block">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock3 className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1 text-left">
                <p className="text-sm font-semibold text-slate-900">Dashboard inteligente</p>
                <p className="text-sm text-slate-500">
                  KPIs de MTTR, produtividade de campo e histórico completo exportável em um clique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
