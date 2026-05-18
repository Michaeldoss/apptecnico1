import React from 'react';
import { Link } from 'react-router-dom';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  MessageSquare,
  Package,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Wallet,
  Wrench,
  Zap,
} from 'lucide-react';

const money = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

const TechnicianDashboard = () => {
  const opportunities = [
    {
      id: 'CH-1048',
      title: 'Instalação DTF 60cm',
      city: 'Joinville/SC',
      distance: '8 km',
      value: 650,
      urgency: 'Hoje',
      type: 'Instalação',
      duration: '3h',
      route: 'Baixo deslocamento',
      chance: 'Alta chance',
    },
    {
      id: 'CH-1049',
      title: 'Manutenção preventiva UV',
      city: 'Araquari/SC',
      distance: '22 km',
      value: 480,
      urgency: 'Amanhã',
      type: 'Preventiva',
      duration: '2h',
      route: 'Pode encaixar rota',
      chance: 'Boa chance',
    },
    {
      id: 'CH-1050',
      title: 'Cabeça entupida DTF',
      city: 'Blumenau/SC',
      distance: '92 km',
      value: 900,
      urgency: 'Urgente',
      type: 'Corretiva',
      duration: '4h',
      route: 'Exige planejamento',
      chance: 'Alto valor',
    },
  ];

  const todayServices = [
    {
      time: '09:00',
      title: 'Diagnóstico DTF',
      customer: 'Cliente industrial',
      city: 'Joinville/SC',
      value: 280,
      status: 'Confirmado',
    },
    {
      time: '14:30',
      title: 'Troca de filtro UV',
      customer: 'Comunicação visual',
      city: 'Araquari/SC',
      value: 220,
      status: 'Pendente',
    },
    {
      time: '17:00',
      title: 'Suporte remoto',
      customer: 'Estamparia',
      city: 'Online',
      value: 120,
      status: 'Aguardando',
    },
  ];

  const metrics = [
    {
      label: 'Ganhos da semana',
      value: money(2450),
      description: '+18% comparado à semana anterior',
      icon: Wallet,
      tone: 'emerald',
    },
    {
      label: 'Disponíveis',
      value: opportunities.length,
      description: 'Chamados próximos ou com bom valor',
      icon: Wrench,
      tone: 'blue',
    },
    {
      label: 'Agenda de hoje',
      value: todayServices.length,
      description: `${money(620)} previstos para hoje`,
      icon: Calendar,
      tone: 'amber',
    },
    {
      label: 'Avaliação',
      value: '4.9 ★',
      description: 'Você está acima da média',
      icon: Star,
      tone: 'violet',
    },
  ];

  const actionButtons = [
    {
      title: 'Aceitar chamado',
      description: 'Ver serviços disponíveis',
      icon: Wrench,
      href: '/tecnico/servicos',
      className: 'bg-emerald-700 text-white hover:bg-emerald-800',
    },
    {
      title: 'Ver agenda',
      description: 'Rotas e horários',
      icon: Calendar,
      href: '/tecnico/agenda',
      className: 'bg-slate-950 text-white hover:bg-slate-800',
    },
    {
      title: 'Recebimentos',
      description: 'Pagamentos e repasses',
      icon: CreditCard,
      href: '/tecnico/pagamentos',
      className: 'bg-white text-slate-950 border border-slate-200 hover:bg-slate-50',
    },
    {
      title: 'Vender peças',
      description: 'Estoque e oportunidades',
      icon: Package,
      href: '/tecnico/pecas',
      className: 'bg-white text-slate-950 border border-slate-200 hover:bg-slate-50',
    },
  ];

  const alerts = [
    {
      title: 'Perfil 82% completo',
      description: 'Adicione documentos e regiões atendidas para receber mais chamados.',
      href: '/tecnico/perfil',
      icon: ShieldCheck,
      tone: 'emerald',
      action: 'Completar',
    },
    {
      title: '2 confirmações pendentes',
      description: 'Confirme presença para não perder prioridade no ranking.',
      href: '/tecnico/agenda',
      icon: Clock,
      tone: 'amber',
      action: 'Confirmar',
    },
    {
      title: 'Estoque de peças baixo',
      description: 'Você pode perder venda adicional durante atendimento.',
      href: '/tecnico/pecas',
      icon: Package,
      tone: 'red',
      action: 'Repor',
    },
  ];

  const rankingItems = [
    { label: 'Taxa de aceite', value: '86%', status: 'Bom' },
    { label: 'Pontualidade', value: '94%', status: 'Excelente' },
    { label: 'Retorno técnico', value: '6%', status: 'Controlado' },
    { label: 'Resposta média', value: '12 min', status: 'Rápido' },
  ];

  return (
    <TechnicianLayout
      title="Central do Técnico"
      subtitle="Painel de oportunidades, agenda, ganhos e reputação para transformar atendimento técnico em receita."
      action={
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link to="/tecnico/servicos">
            <Button className="bg-white text-emerald-950 hover:bg-emerald-100">
              <Zap className="mr-2 h-4 w-4" />
              Pegar chamado
            </Button>
          </Link>

          <Link to="/tecnico/agenda">
            <Button
              variant="outline"
              className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Agenda
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            const iconClass =
              metric.tone === 'emerald'
                ? 'bg-emerald-50 text-emerald-700'
                : metric.tone === 'amber'
                  ? 'bg-amber-50 text-amber-700'
                  : metric.tone === 'violet'
                    ? 'bg-violet-50 text-violet-700'
                    : 'bg-blue-50 text-blue-700';

            return (
              <Card key={metric.label} className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <div className={`rounded-2xl p-3 ${iconClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  </div>

                  <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-950">{metric.value}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <Card className="border-emerald-200 bg-emerald-50 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-emerald-950">Melhores chamados para aceitar</CardTitle>
                  <CardDescription className="text-emerald-800">
                    Ordenados por valor, urgência e facilidade de encaixe na sua rota.
                  </CardDescription>
                </div>

                <Link to="/tecnico/servicos">
                  <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
                    Ver todos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {opportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm"
                >
                  <div className="grid gap-4 lg:grid-cols-[1fr_170px] lg:items-center">
                    <div className="flex gap-3">
                      <div className="flex w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                        <Wrench className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                            {opportunity.type}
                          </Badge>

                          <Badge
                            className={
                              opportunity.urgency === 'Urgente'
                                ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-50'
                                : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50'
                            }
                          >
                            {opportunity.urgency}
                          </Badge>

                          <Badge className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50">
                            {opportunity.chance}
                          </Badge>
                        </div>

                        <p className="text-base font-black text-slate-950">{opportunity.title}</p>

                        <div className="mt-2 grid gap-1 text-sm text-slate-500 md:grid-cols-2">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {opportunity.city} • {opportunity.distance}
                          </span>
                          <span>
                            Duração estimada: <strong>{opportunity.duration}</strong>
                          </span>
                          <span>{opportunity.route}</span>
                          <span>{opportunity.id}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-end">
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-500">Valor previsto</p>
                        <p className="text-2xl font-black text-emerald-700">
                          {money(opportunity.value)}
                        </p>
                      </div>

                      <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
                        Aceitar chamado
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-950">Agenda de hoje</CardTitle>
              <CardDescription>
                {todayServices.length} atendimentos com previsão de {money(620)}.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {todayServices.map((service) => (
                <div
                  key={`${service.time}-${service.title}`}
                  className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-200 hover:bg-emerald-50/40"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-700">
                      {service.time}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-black text-slate-950">{service.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{service.customer}</p>
                      <p className="mt-1 text-xs font-medium text-slate-400">{service.city}</p>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <Badge
                          className={
                            service.status === 'Confirmado'
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50'
                              : service.status === 'Pendente'
                                ? 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50'
                                : 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50'
                          }
                        >
                          {service.status}
                        </Badge>

                        <span className="font-black text-emerald-700">
                          {money(service.value)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Link to="/tecnico/agenda">
                <Button variant="outline" className="w-full border-slate-200">
                  Ver agenda completa
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-950">Atenção operacional</CardTitle>
              <CardDescription>
                Corrija estes pontos para receber mais chamados.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {alerts.map((alert) => {
                const Icon = alert.icon;

                const toneClass =
                  alert.tone === 'red'
                    ? 'border-red-200 bg-red-50 text-red-700'
                    : alert.tone === 'amber'
                      ? 'border-amber-200 bg-amber-50 text-amber-700'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-700';

                return (
                  <Link key={alert.title} to={alert.href} className="group block">
                    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-200 hover:bg-emerald-50/40 md:grid-cols-[44px_1fr_86px] md:items-center">
                      <div className={`rounded-xl border p-2 ${toneClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="font-black text-slate-950">{alert.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">
                          {alert.description}
                        </p>
                      </div>

                      <span className="text-sm font-black text-emerald-700">
                        {alert.action}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-slate-950">Painel de performance</CardTitle>
                  <CardDescription>
                    Indicadores que aumentam prioridade nos chamados.
                  </CardDescription>
                </div>

                <Badge className="w-fit border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                  Ranking técnico
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {rankingItems.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-500">{item.label}</p>
                      <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                        {item.status}
                      </Badge>
                    </div>

                    <p className="mt-3 text-2xl font-black text-slate-950">{item.value}</p>

                    <div className="mt-3 h-2 rounded-full bg-slate-100">
                      <div className="h-2 w-[82%] rounded-full bg-emerald-700" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex gap-3">
                  <div className="rounded-2xl bg-emerald-700 p-3 text-white">
                    <Target className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-black text-emerald-950">Meta da semana</p>
                    <p className="mt-1 text-sm text-emerald-800">
                      Falta {money(1550)} para bater a meta de {money(4000)} em serviços.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {actionButtons.map((action) => {
            const Icon = action.icon;

            return (
              <Link key={action.title} to={action.href}>
                <button
                  className={`flex h-full w-full items-center gap-3 rounded-2xl px-4 py-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${action.className}`}
                >
                  <div className="rounded-xl bg-white/20 p-2">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-black">{action.title}</p>
                    <p className="text-xs opacity-80">{action.description}</p>
                  </div>
                </button>
              </Link>
            );
          })}
        </div>

        <Card className="border-emerald-200 bg-emerald-50 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <div className="rounded-2xl bg-emerald-700 p-3 text-white">
                <CheckCircle2 className="h-6 w-6" />
              </div>

              <div>
                <p className="font-black text-emerald-950">
                  A regra é simples: perfil completo, resposta rápida e agenda organizada recebem mais chamados.
                </p>
                <p className="mt-1 text-sm text-emerald-800">
                  Esse painel deve ser seu ponto de partida diário para escolher serviços e aumentar seus ganhos.
                </p>
              </div>
            </div>

            <Link to="/tecnico/perfil">
              <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
                Melhorar meu perfil
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianDashboard;
