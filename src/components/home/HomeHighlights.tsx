import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Headset, ShieldCheck, Bolt } from "lucide-react";

const quickActions = [
  {
    title: "Sou uma indústria",
    description: "Centralize a gestão de manutenção e acompanhe múltiplas plantas em um único painel.",
    icon: Building2,
    cta: "Abrir conta empresarial",
    href: "/store/register"
  },
  {
    title: "Preciso de suporte imediato",
    description: "Acesse nossa central 24/7 e receba acompanhamento prioritário em chamados críticos.",
    icon: Headset,
    cta: "Chamar suporte",
    href: "/support"
  },
  {
    title: "Quero cadastrar minha equipe",
    description: "Integre técnicos internos ou parceiros e mantenha todos certificados e auditados.",
    icon: ShieldCheck,
    cta: "Cadastrar técnicos",
    href: "/technician/register"
  }
];

const highlightItems = [
  {
    title: "Resposta mais rápida do mercado",
    description: "Técnico confirmado em até 3 dias corridos, com SLA contratado e penalidades claras.",
    icon: Bolt
  },
  {
    title: "Escalabilidade nacional",
    description: "Rede de especialistas em mais de 250 cidades, com avaliação contínua de performance.",
    icon: Building2
  },
  {
    title: "Suporte humano sempre disponível",
    description: "Time de sucesso do cliente acompanha cada chamado com indicadores compartilhados.",
    icon: Headset
  }
];

const HomeHighlights = () => {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_65%)]" />
      <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

      <div className="container-instalei relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">para quem vive a operação</span>
          <h2 className="mt-6 text-3xl font-black md:text-5xl">A Instalei está pronta para qualquer cenário</h2>
          <p className="mt-4 text-base text-white/70 md:text-lg">
            Escolha o caminho que melhor representa sua necessidade e veja como podemos manter seus equipamentos operando com máxima disponibilidade.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {quickActions.map(action => (
              <Card key={action.title} className="border-white/5 bg-white/5 p-px backdrop-blur">
                <CardContent className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-slate-950/60 p-8">
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/30 text-white">
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">{action.title}</h3>
                      <p className="mt-2 text-sm text-white/70 md:text-base">{action.description}</p>
                    </div>
                  </div>
                  <Link to={action.href} className="inline-flex">
                    <Button variant="secondary" className="w-full rounded-xl bg-white text-slate-900 hover:bg-slate-100">
                      {action.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-transparent">
            <CardContent className="h-full rounded-2xl bg-slate-950/50 p-10">
              <div className="space-y-8">
                {highlightItems.map(item => (
                  <div key={item.title} className="flex gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/30 text-white">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold md:text-2xl">{item.title}</h3>
                      <p className="mt-2 text-sm text-white/70 md:text-base">{item.description}</p>
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl bg-white/10 p-6 text-white/80">
                  <h4 className="text-lg font-semibold text-white">Relatórios completos em poucos cliques</h4>
                  <p className="mt-2 text-sm md:text-base">
                    Gere históricos de manutenção, anexos e notas fiscais automaticamente para auditorias e contratos de SLA.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeHighlights;
