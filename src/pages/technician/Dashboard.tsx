import React from 'react';
import { Link } from 'react-router-dom';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  MessageSquare,
  Package,
  Route,
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
      route: 'Rota curta',
      client: 'Confecção têxtil',
      difficulty: 'Média',
      score: 92,
    },
    {
      id: 'CH-1049',
      title: 'Preventiva UV DTF',
      city: 'Araquari/SC',
      distance: '22 km',
      value: 480,
      urgency: 'Amanhã',
      type: 'Preventiva',
      duration: '2h',
      route: 'Encaixe bom',
      client: 'Comunicação visual',
      difficulty: 'Baixa',
      score: 84,
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
      route: 'Planejar viagem',
      client: 'Estamparia',
      difficulty: 'Alta',
      score: 78,
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

  const summaryCards = [
    {
      label: 'Hoje previsto',
      value: money(620),
      detail: '3 atendimentos',
      icon: Calendar,
      className: 'from-emerald-600 to-teal-500',
    },
    {
      label: 'Semana',
      value: money(2450),
      detail: '+18% vs anterior',
      icon: Wallet,
      className: 'from-blue-600 to-cyan-500',
    },
    {
      label: 'Chamados',
      value: '3 disponíveis',
      detail: 'R$ 2.030 em aberto',
      icon: Wrench,
      className: 'from-violet-600 to-fuchsia-500',
    },
    {
      label: 'Ranking',
      value: '4.9 ★',
      detail: 'Alta prioridade',
      icon: Star,
      className: 'from-amber-500 to-orange-500',
    },
  ];

  const alerts = [
    {
      title: 'Perfil 82%',
      description: 'Complete documentos e regiões.',
      href: '/tecnico/perfil',
      icon: ShieldCheck,
      color: 'emerald',
      action: 'Completar',
    },
    {
      title: '2 confirmações',
      description: 'Confirme serviços de hoje.',
      href: '/tecnico/agenda',
      icon: Clock,
      color: 'amber',
      action: 'Confirmar',
    },
    {
      title: 'Peças baixas',
      description: 'Atualize estoque para vender mais.',
      href: '/tecnico/pecas',
      icon: Package,
      color: 'red',
      action: 'Ver peças',
    },
  ];

  const performance = [
    { label: 'Aceite', value: '86%', width: '86%' },
    { label: 'Pontualidade', value: '94%', width: '94%' },
    { label: 'Resposta', value: '12 min', width: '78%' },
    { label: 'Retorno', value: '6%', width: '20%' },
  ];

  const actions = [
    { title: 'Chamados', href: '/tecnico/servicos', icon: Wrench },
    { title: 'Agenda', href: '/tecnico/agenda', icon: Calendar },
    { title: 'Ganhos', href: '/tecnico/pagamentos', icon: CreditCard },
    { title: 'Peças', href: '/tecnico/pecas', icon: Package },
    { title: 'Chat', href: '/tecnico/chat', icon: MessageSquare },
  ];

  return (
    <TechnicianLayout
      title="Central do Técnico"
      subtitle="Escolha chamados, acompanhe ganhos, organize agenda e melhore sua prioridade na plataforma."
      action={
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link to="/tecnico/servicos">
            <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
              <Zap className="mr-2 h-4 w-4" />
              Pegar chamado
            </Button>
          </Link>

          <Link to="/tecnico/agenda">
            <Button variant="outline" className="border-slate-200 bg-white">
              <Calendar className="mr-2 h-4 w-4" />
              Agenda
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 p-5 text-white shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black text-emerald-100">
                <TrendingUp className="h-3.5 w-3.5" />
                Resumo do dia
              </div>

              <h2 className="text-2xl font-black md:text-3xl">
                R$ 620,00 previstos hoje
              </h2>

              <p className="mt-1 max-w-2xl text-sm text-emerald-50">
                3 atendimentos na agenda, 3 chamados disponíveis e R$ 2.030,00 em oportunidades abertas.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-2">
              {actions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link key={action.title} to={action.href}>
                    <button className="flex w-full items-center gap-2 rounded-2xl bg-white/10 px-3 py-3 text-left text-sm font-black text-white transition hover:bg-white/20">
                      <Icon className="h-4 w-4 text-emerald-200" />
                      {action.title}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                className={`rounded-2xl bg-gradient-to-br ${card.className} p-4 text-white shadow-sm`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-white/80">
                      {card.label}
                    </p>
                    <p className="mt-1 text-2xl font-black">{card.value}</p>
                    <p className="mt-1 text-sm text-white/80">{card.detail}</p>
                  </div>

                  <div className="rounded-2xl bg-white/20 p-3">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-950">Chamados recomendados</h3>
                <p className="text-sm text-slate-500">
                  Priorizados por valor, distância, urgência e encaixe de rota.
                </p>
              </div>

              <Link to="/tecnico/servicos">
                <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
                  Ver todos
                </Button>
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {opportunities.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-3 px-5 py-4 transition hover:bg-emerald-50/40 lg:grid-cols-[1fr_150px_120px] lg:items-center"
                >
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                        {item.type}
                      </Badge>

                      <Badge
                        className={
                          item.urgency === 'Urgente'
                            ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-50'
                            : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50'
                        }
                      >
                        {item.urgency}
                      </Badge>

                      <Badge className="border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-50">
                        {item.difficulty}
                      </Badge>

                      <Badge className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50">
                        Score {item.score}
                      </Badge>
                    </div>

                    <p className="font-black text-slate-950">{item.title}</p>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {item.city}
                      </span>
                      <span>{item.distance}</span>
                      <span>{item.client}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {item.duration}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Route className="h-4 w-4" />
                        {item.route}
                      </span>
                    </div>
                  </div>

                  <div className="lg:text-right">
                    <p className="text-xs font-bold text-slate-500">Valor previsto</p>
                    <p className="text-2xl font-black text-emerald-700">{money(item.value)}</p>
                    <p className="text-xs text-slate-400">{item.id}</p>
                  </div>

                  <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
                    Aceitar
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
              <h3 className="text-xl font-black text-slate-950">Agenda de hoje</h3>
              <p className="text-sm text-slate-500">3 serviços • {money(620)} previstos</p>
            </div>

            <div className="divide-y divide-slate-100">
              {todayServices.map((service) => (
                <div key={`${service.time}-${service.title}`} className="px-5 py-4 hover:bg-slate-50">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-700">
                      {service.time}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-black text-slate-950">{service.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{service.customer}</p>
                      <p className="text-xs text-slate-400">{service.city}</p>

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
            </div>

            <div className="border-t border-slate-100 p-4">
              <Link to="/tecnico/agenda">
                <Button variant="outline" className="w-full border-slate-200">
                  Ver agenda completa
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
              <h3 className="text-xl font-black text-slate-950">Atenção</h3>
              <p className="text-sm text-slate-500">Itens que afetam prioridade e recebimentos.</p>
            </div>

            <div className="divide-y divide-slate-100">
              {alerts.map((alert) => {
                const Icon = alert.icon;

                const color =
                  alert.color === 'red'
                    ? 'bg-red-50 text-red-700'
                    : alert.color === 'amber'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-emerald-50 text-emerald-700';

                return (
                  <Link key={alert.title} to={alert.href} className="block">
                    <div className="grid gap-3 px-5 py-4 transition hover:bg-slate-50 md:grid-cols-[42px_1fr_82px] md:items-center">
                      <div className={`rounded-xl p-2 ${color}`}>
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="font-black text-slate-950">{alert.title}</p>
                        <p className="text-sm text-slate-500">{alert.description}</p>
                      </div>

                      <span className="text-sm font-black text-emerald-700">
                        {alert.action}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-950">Performance técnica</h3>
                <p className="text-sm text-slate-500">Indicadores que aumentam prioridade.</p>
              </div>

              <Badge className="w-fit border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                Ranking ativo
              </Badge>
            </div>

            <div className="p-5">
              <div className="grid gap-3 md:grid-cols-2">
                {performance.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-500">{item.label}</p>
                      <p className="font-black text-slate-950">{item.value}</p>
                    </div>

                    <div className="mt-3 h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-emerald-700"
                        style={{ width: item.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex gap-3">
                  <div className="rounded-xl bg-emerald-700 p-3 text-white">
                    <Target className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-black text-emerald-950">Meta da semana</p>
                    <p className="text-sm text-emerald-800">
                      Falta {money(1550)} para bater {money(4000)} em serviços.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <div className="rounded-2xl bg-emerald-700 p-3 text-white">
                <CheckCircle2 className="h-6 w-6" />
              </div>

              <div>
                <p className="font-black text-emerald-950">
                  Para ganhar mais: aceite rápido, seja pontual e mantenha o perfil completo.
                </p>
                <p className="text-sm text-emerald-800">
                  O painel precisa ajudar o técnico a escolher rápido qual chamado vale a pena.
                </p>
              </div>
            </div>

            <Link to="/tecnico/perfil">
              <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
                Melhorar perfil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianDashboard;
