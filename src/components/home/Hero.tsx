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
  Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type BulletPoint = {
  readonly icon: React.ReactNode;
  readonly text: string;
};

type Metric = {
  readonly value: string;
  readonly label: string;
};

type ProgressItem = {
  readonly title: string;
  readonly description: string;
  readonly status: string;
};

const HERO_BULLETS: BulletPoint[] = [
  {
    icon: <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />,
    text: "Profissionais homologados para impressão digital, comunicação visual e corte a laser",
  },
  {
    icon: <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />,
    text: "Checklists guiados, orçamentos e aprovações em um único painel",
  },
  {
    icon: <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />,
    text: "Atendimento em campo ou remoto com garantia Instalei",
  },
];

const HERO_METRICS: Metric[] = [
  { value: "+850", label: "equipamentos reativados no último trimestre" },
  { value: "18h", label: "tempo médio para primeiro atendimento" },
  { value: "97%", label: "chamados avaliados como excelentes" },
];

const HERO_PROGRESS: ProgressItem[] = [
  {
    title: "Briefing guiado",
    description: "Chamado criado para plotter UV com fotos e histórico anexados",
    status: "Aberto",
  },
  {
    title: "Match especialista",
    description: "Técnico certificado designado e rota sincronizada com sua equipe",
    status: "Confirmado",
  },
  {
    title: "Entrega validada",
    description: "Checklist assinado e relatório final disponível para download",
    status: "Concluído",
  },
];

const HERO_TAGS = [
  "Plotters eco-solvente",
  "Impressão UV e látex",
  "Comunicação visual 3D",
  "Prensas térmicas",
  "Corte e gravação a laser",
];

const HERO_TRUSTED = ["Atos", "Klabin", "Raízen", "Coca-Cola FEMSA", "Tilibra"] as const;

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#06142b] via-[#0b1f3c] to-[#112a4c] py-24 text-white">
      <DecorativeGlow />

      <div className="container-instalei relative grid items-start gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-10">
          <HeroIntro />
          <HeroCtas />
          <HeroBulletList />
          <HeroServiceTags />
          <GuidedTicketCard />
          <HeroMetrics />
          <HeroTrustedBy />
        </div>

        <div className="relative">
          <HeroDashboardPreview />
          <HeroInsight />
        </div>
      </div>
    </section>
  );
};

const DecorativeGlow: React.FC = () => (
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
    <div className="absolute -bottom-24 left-20 h-[420px] w-[420px] rounded-full bg-primary/25 blur-3xl" />
    <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
  </div>
);

const HeroIntro: React.FC = () => (
  <div className="space-y-6">
    <div className="flex flex-wrap items-center gap-3">
      <Badge className="bg-white/10 text-white" variant="secondary">
        <Sparkles className="mr-2 h-3.5 w-3.5" /> Plataforma para contratação de técnicos de impressão digital
      </Badge>
      <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
        <BadgeCheck className="h-4 w-4 text-accent" />
        Homologação e cobertura nacional
      </div>
    </div>

    <div className="space-y-6">
      <h1 className="text-4xl font-black leading-tight md:text-6xl">
        Conecte-se com especialistas em impressão digital em minutos
      </h1>
      <p className="text-lg text-white/80 md:text-xl">
        A Instalei centraliza chamados para bureaus, redes varejistas e operações de comunicação visual. Solicite suporte
        emergencial, cadastre manutenção preventiva e acompanhe cada passo com total transparência.
      </p>
    </div>
  </div>
);

const HeroCtas: React.FC = () => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
    <Button asChild size="lg" className="h-12 rounded-2xl bg-accent text-base text-[#06142b] hover:bg-accent/90">
      <Link to="/technician/register">
        Criar chamado agora
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>
    <Button
      asChild
      variant="outline"
      size="lg"
      className="h-12 rounded-2xl border-white/30 text-base text-white hover:border-white/60 hover:bg-white/10"
    >
      <Link to="/services">Ver planos e integrações</Link>
    </Button>
  </div>
);

const HeroBulletList: React.FC = () => (
  <ul className="grid gap-3 text-sm font-semibold text-white/80 md:text-base">
    {HERO_BULLETS.map(item => (
      <li key={item.text} className="flex items-start gap-3">
        {item.icon}
        <span>{item.text}</span>
      </li>
    ))}
  </ul>
);

const HeroServiceTags: React.FC = () => (
  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/60 md:text-sm">
    {HERO_TAGS.map(tag => (
      <span key={tag} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/80">
        {tag}
      </span>
    ))}
  </div>
);

const GuidedTicketCard: React.FC = () => (
  <Card className="border-0 bg-white/10 text-white shadow-xl shadow-black/30 backdrop-blur">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-3 text-lg font-semibold md:text-xl">
        <Wrench className="h-5 w-5 text-accent" /> Abrir chamado orientado
      </CardTitle>
      <p className="text-sm text-white/75 md:text-base">
        Cadastre o equipamento, descreva o problema e receba a confirmação do técnico ideal sem sair da plataforma.
      </p>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <FormField
          id="equipment"
          icon={<Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />}
          label="Tipo de equipamento"
          placeholder="Ex.: plotter UV, mesa de corte, router CNC"
        />
        <FormField
          id="location"
          icon={<MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />}
          label="Localização"
          placeholder="Cidade, estado ou CEP"
        />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm font-semibold text-white/80">
          <Building2 className="h-5 w-5 text-accent" />
          Cobertura nacional com técnicos especializados em impressão digital
        </div>
        <Button asChild size="lg" className="h-12 rounded-2xl bg-accent text-base text-[#06142b] hover:bg-accent/90">
          <Link to="/find-technician">
            Buscar técnicos disponíveis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

type FormFieldProps = {
  readonly id: string;
  readonly label: string;
  readonly placeholder: string;
  readonly icon: React.ReactNode;
};

const FormField: React.FC<FormFieldProps> = ({ id, label, placeholder, icon }) => (
  <div className="space-y-3">
    <label className="text-sm font-semibold text-white" htmlFor={id}>
      {label}
    </label>
    <div className="relative">
      {icon}
      <Input
        id={id}
        placeholder={placeholder}
        className="h-12 rounded-xl border-white/20 bg-white/10 pl-12 text-base text-white placeholder:text-white/50"
      />
    </div>
  </div>
);

const HeroMetrics: React.FC = () => (
  <div className="grid gap-6 sm:grid-cols-3">
    {HERO_METRICS.map(metric => (
      <div key={metric.label} className="rounded-2xl border border-white/15 bg-white/10 p-6 text-center shadow-sm backdrop-blur">
        <div className="text-3xl font-black text-accent md:text-4xl">{metric.value}</div>
        <p className="mt-2 text-sm font-semibold text-white/70 md:text-base">{metric.label}</p>
      </div>
    ))}
  </div>
);

const HeroTrustedBy: React.FC = () => (
  <div className="space-y-4">
    <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-white/70">
      <TrendingUp className="h-5 w-5 text-accent" />
      Operações que confiam na Instalei
    </div>
    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
      {HERO_TRUSTED.map(brand => (
        <span key={brand} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/70">
          {brand}
        </span>
      ))}
    </div>
  </div>
);

const HeroDashboardPreview: React.FC = () => (
  <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent text-white shadow-2xl backdrop-blur">
    <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
    <CardHeader className="space-y-4 p-10 pb-6">
      <Badge className="w-fit bg-accent/20 text-accent" variant="secondary">
        Painel do chamado
      </Badge>
      <CardTitle className="text-3xl font-black leading-tight">Tudo o que sua equipe precisa em um só lugar</CardTitle>
      <p className="text-base text-white/75">
        Visualize SLA, deslocamento e checklists em tempo real. Acompanhe aprovações e mantenha o cliente informado a cada etapa.
      </p>
    </CardHeader>
    <CardContent className="space-y-6 p-10 pt-0">
      <div className="space-y-5">
        {HERO_PROGRESS.map(item => (
          <div key={item.title} className="rounded-2xl border border-white/15 bg-white/10 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <Badge className="bg-white/15 text-white" variant="secondary">
                {item.status}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-white/75">{item.description}</p>
          </div>
        ))}
      </div>
      <Button
        asChild
        variant="secondary"
        className="h-12 w-full rounded-2xl border border-white/20 bg-white/90 text-[#06142b] hover:bg-white"
      >
        <Link to="/services">Conheça a plataforma completa</Link>
      </Button>
    </CardContent>
  </Card>
);

const HeroInsight: React.FC = () => (
  <div className="absolute -bottom-10 left-1/2 hidden w-[85%] -translate-x-1/2 rounded-3xl bg-white/95 p-6 text-[#06142b] shadow-xl sm:block">
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
        <Clock3 className="h-6 w-6 text-accent" />
      </div>
      <div className="space-y-1 text-left">
        <p className="text-sm font-semibold">Dashboard inteligente</p>
        <p className="text-sm text-slate-600">
          KPIs de MTTR, produtividade de campo e histórico fotográfico exportável em um clique.
        </p>
      </div>
    </div>
  </div>
);

export default Hero;
