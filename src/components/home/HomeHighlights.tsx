import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bolt,
  Building2,
  CalendarClock,
  CheckCircle2,
  Headset,
  Printer,
  ShieldCheck,
  Sparkles,
  Store,
  Users
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const personas = [
  {
    title: "Sou um bureau de impressão",
    description:
      "Combine suporte corretivo e manutenção preventiva para plotters, routers CNC e acabamentos em um único painel.",
    cta: "Ver planos para bureaus",
    href: "/services#bureaus",
    icon: Printer
  },
  {
    title: "Coordeno redes varejistas",
    description:
      "Garanta comunicação visual padronizada em todas as lojas com cronogramas automáticos e relatórios por unidade.",
    cta: "Organizar manutenção",
    href: "/store/register",
    icon: Building2
  },
  {
    title: "Organizo eventos e cenografia",
    description:
      "Acione equipes especializadas 24/7 para montagens, ajustes de LED, impressão sob demanda e suporte em campo.",
    cta: "Agendar suporte",
    href: "/support",
    icon: Headset
  }
];

const pillars = [
  {
    title: "Resposta coordenada",
    description:
      "Despacho em poucas horas com rota, SLA e confirmação automática para sua operação.",
    icon: CalendarClock
  },
  {
    title: "Qualidade auditada",
    description:
      "Técnicos avaliados, certificados e com seguro de responsabilidade garantido pela Instalei.",
    icon: ShieldCheck
  },
  {
    title: "Dados acionáveis",
    description:
      "Dashboards consolidados por equipamento, unidade e prestador para planejar investimentos.",
    icon: BarChart3
  }
];

const playbook = [
  {
    step: "1",
    title: "Abertura guiada",
    description:
      "Coletamos fotos, insumos utilizados e criticidade para direcionar o especialista certo já no primeiro contato."
  },
  {
    step: "2",
    title: "Matching especialista",
    description:
      "Consideramos certificações, avaliação média e distância do cliente para confirmar o técnico ideal."
  },
  {
    step: "3",
    title: "Execução transparente",
    description:
      "Timeline com checklists, aprovações e assinatura digital garante rastreabilidade e garantia Instalei."
  }
];

const results = [
  { icon: Bolt, label: "Chamados críticos atendidos em média em 3h" },
  { icon: Users, label: "+3.500 técnicos avaliados continuamente" },
  { icon: Store, label: "Integração com ERPs, CRMs e lojas próprias" }
];

const HomeHighlights = () => {
  return (
    <section className="relative overflow-hidden bg-instalei-navy-950 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_65%)]" />
      <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 bg-accent/20 blur-3xl" />

      <div className="container-instalei relative space-y-16">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="bg-white/10 text-white" variant="secondary">
            <Sparkles className="mr-2 h-3.5 w-3.5" /> Operação sem interrupções
          </Badge>
          <h2 className="mt-6 text-3xl font-black md:text-5xl">
            Entenda rapidamente como a Instalei impulsiona sua produção visual
          </h2>
          <p className="mt-4 text-base text-white/70 md:text-lg">
            Organize chamados, agende manutenção e acompanhe indicadores de qualidade com uma plataforma criada para o mercado de impressão digital e comunicação visual.
          </p>
        </div>

        <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <Card className="border-white/5 bg-white/5 p-px text-white backdrop-blur">
              <CardHeader className="rounded-2xl bg-instalei-navy-900/70 p-8">
                <CardTitle className="text-2xl font-semibold text-white md:text-3xl">
                  Escolha o fluxo ideal para sua operação
                </CardTitle>
                <p className="mt-2 text-sm text-white/75 md:text-base">
                  Cada segmento possui gatilhos e SLA específicos. Escolha o cenário mais próximo do seu negócio e comece com orientações prontas.
                </p>
              </CardHeader>
              <CardContent className="grid gap-6 p-8 md:grid-cols-2">
                {personas.map(persona => (
                  <Card key={persona.title} className="h-full border-white/10 bg-white/10 p-px text-white">
                    <CardContent className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-instalei-navy-950/70 p-6">
                      <div className="space-y-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/25 text-white">
                          <persona.icon className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold">{persona.title}</h3>
                          <p className="text-sm text-white/70 md:text-base">{persona.description}</p>
                        </div>
                      </div>
                      <Button
                        asChild
                        variant="secondary"
                        className="w-full rounded-xl bg-white text-[#13294b] hover:bg-slate-100 hover:text-[#ff6b2c]"
                      >
                        <Link to={persona.href}>
                          {persona.cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card className="border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-transparent text-white">
              <CardHeader className="pb-2 text-white">
                <CardTitle className="text-2xl font-semibold text-white md:text-3xl">Resultados que entregamos</CardTitle>
                <p className="text-sm text-white/80 md:text-base">
                  Veja como os clientes utilizam nossa rede de especialistas para manter operações de impressão e sinalização sempre ativas.
                </p>
              </CardHeader>
              <CardContent className="grid gap-4 p-6 md:grid-cols-3">
                {results.map(item => (
                  <div key={item.label} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 text-left">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/25 text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-white/80 md:text-base">{item.label}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-white/5 bg-white text-[#0d1f3d]">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-semibold md:text-3xl">Playbook Instalei</CardTitle>
                <p className="text-sm text-slate-600 md:text-base">
                  Nosso time acompanha cada etapa com indicadores compartilhados e checkpoints validados com o cliente.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {playbook.map(item => (
                  <div key={item.step} className="flex gap-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d1f3d]/10 text-xl font-bold text-[#0d1f3d]">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold md:text-xl">{item.title}</h4>
                      <p className="mt-2 text-sm text-slate-600 md:text-base">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-white/5 bg-white/5 p-px text-white">
              <CardContent className="rounded-2xl bg-instalei-navy-950/70 p-8 text-white">
                <div className="space-y-6">
                  {pillars.map(item => (
                    <div key={item.title} className="flex gap-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/25 text-white">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white md:text-xl">{item.title}</h4>
                        <p className="mt-2 text-sm text-white/80 md:text-base">{item.description}</p>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-white/80">
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-white">
                      <CheckCircle2 className="h-5 w-5 text-accent" /> Certificação contínua
                    </h4>
                    <p className="mt-2 text-sm md:text-base">
                      Auditorias técnicas, cursos obrigatórios e pesquisas de satisfação garantem o alto padrão Instalei em cada atendimento.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHighlights;
