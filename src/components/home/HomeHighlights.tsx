import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bolt,
  Building2,
  Headset,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const personas = [
  {
    title: "Sou uma indústria",
    description:
      "Centralize a gestão de manutenção, compare plantas em tempo real e integre ERPs com poucos cliques.",
    cta: "Abrir conta empresarial",
    href: "/store/register",
    icon: Building2
  },
  {
    title: "Preciso de suporte imediato",
    description:
      "Atendimento prioritário 24/7 com especialistas preparados para incidentes críticos e plantões.",
    cta: "Chamar suporte",
    href: "/support",
    icon: Headset
  },
  {
    title: "Quero cadastrar minha equipe",
    description:
      "Inclua técnicos internos ou parceiros, acompanhe certificações e valide SLA de cada atendimento.",
    cta: "Cadastrar técnicos",
    href: "/technician/register",
    icon: ShieldCheck
  }
];

const differentiators = [
  {
    title: "Resposta em horas",
    description:
      "Match automático com técnicos homologados e confirmação média em 72h, com visibilidade do SLA.",
    icon: Bolt
  },
  {
    title: "Cobertura nacional",
    description:
      "Especialistas auditados em mais de 250 cidades com pontuação pública e avaliações contínuas.",
    icon: Users
  },
  {
    title: "Governança de dados",
    description:
      "Indicadores de MTTR, OEE e backlog consolidados automaticamente para seus relatórios.",
    icon: BarChart3
  }
];

const playbook = [
  {
    step: "1",
    title: "Abertura guiada",
    description: "Checklist inteligente coleta informações essenciais e sugere priorização do chamado."
  },
  {
    step: "2",
    title: "Matching especialista",
    description: "Time Instalei analisa certificações, distância e performance para sugerir o técnico ideal."
  },
  {
    step: "3",
    title: "Execução transparente",
    description: "Timeline com fotos, aprovação de orçamento, checklists e assinatura digital do cliente."
  }
];

const HomeHighlights = () => {
  return (
    <section className="relative overflow-hidden bg-instalei-navy-900 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_65%)]" />
      <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 bg-accent/20 blur-3xl" />

      <div className="container-instalei relative">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="bg-white/10 text-white" variant="secondary">
            <Sparkles className="mr-2 h-3.5 w-3.5" /> Operação sem interrupções
          </Badge>
          <h2 className="mt-6 text-3xl font-black md:text-5xl">Escolha o caminho ideal para sua operação</h2>
          <p className="mt-4 text-base text-white/70 md:text-lg">
            Personalizamos fluxos, SLAs e governança conforme o porte e o segmento da sua empresa. Descubra como cada squad pode
            aproveitar a Instalei.
          </p>
        </div>

        <div className="mt-16 grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {personas.map(persona => (

                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/30 text-white">
                      <persona.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold">{persona.title}</h3>
                      <p className="text-sm text-white/70 md:text-base">{persona.description}</p>
                    </div>
                  </div>
                  <Button asChild variant="secondary" className="w-full rounded-xl bg-white text-[#13294b] hover:text-[#ff6b2c] hover:bg-slate-100">
                    <Link to={persona.href}>
                      {persona.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">

                {playbook.map(item => (
                  <div key={item.step} className="flex gap-5 rounded-2xl bg-white/10 p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/30 text-xl font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold md:text-xl">{item.title}</h4>
                      <p className="mt-2 text-sm text-white/75 md:text-base">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>


                <div className="space-y-6">
                  {differentiators.map(item => (
                    <div key={item.title} className="flex gap-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/25 text-white">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>

                      </div>
                    </div>
                  ))}
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-white/80">
                    <h4 className="text-lg font-semibold text-white">Certificação contínua</h4>
                    <p className="mt-2 text-sm md:text-base">
                      Auditorias técnicas, cursos obrigatórios e pesquisas de satisfação garantem o alto padrão Instalei.
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
