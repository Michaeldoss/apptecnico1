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
      label: 'Hoje previsto',
      value: money(620),
      detail: '3 atendimentos',
      icon: Calendar,
    },
    {
      label: 'Semana',
      value: money(2450),
      detail: '+18% vs semana anterior',
      icon: Wallet,
    },
    {
      label: 'Disponíveis',
      value: '3',
      detail: 'R$ 2.030 em oportunidades',
      icon: Wrench,
    },
    {
      label: 'Ranking',
      value: '4.9 ★',
      detail: 'Técnico bem avaliado',
      icon: Star,
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
      subtitle="Controle seus chamados, ganhos, agenda e reputação em uma tela rápida de trabalho."
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
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <Card key={metric.label} className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                        {metric.label}
                      </p>
                      <p className="text-xl font-black text-slate-950">{metric.value}</p>
                      <p className="text-xs text-slate-500">{metric.detail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
            <CardHeader className="border-b border-slate-100 bg-slate-50/70 pb-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-slate-950">Chamados recomendados</CardTitle>
                  <CardDescription>
                    Serviços com melhor combinação de valor, distância e encaixe de rota.
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

            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {opportunities.map((item) => (
                  <div key={item.id} className="p-4 transition hover:bg-emerald-50/40">
                    <div className="grid gap-4 lg:grid-cols-[1fr_150px] lg:items-center">
                      <div className="flex gap-3">
                        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                          <Wrench className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
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
                          </div>

                          <p className="font-black text-slate-950">{item.title}</p>

                          <div className="mt-2 grid gap-x-4 gap-y-1 text-sm text-slate-500 md:grid-cols-3">
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
                            <span>{item.id}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-end">
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-500">Valor</p>
                          <p className="text-2xl font-black text-emerald-700">
                            {money(item.value)}
                          </p>
                        </div>

                        <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
                          Aceitar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
            <CardHeader className="border-b border-slate-100 bg-slate-50/70 pb-4">
              <CardTitle className="text-slate-950">Agenda de hoje</CardTitle>
              <CardDescription>3 serviços • {money(620)} previstos</CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {todayServices.map((service) => (
                  <div key={`${service.time}-${service.title}`} className="p-4 hover:bg-slate-50">
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
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
            <CardHeader className="border-b border-slate-100 bg-slate-50/70 pb-4">
              <CardTitle className="text-slate-950">Atenção</CardTitle>
              <CardDescription>Itens que impactam seus chamados.</CardDescription>
            </CardHeader>

            <CardContent className="p-0">
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
                      <div className="grid gap-3 p-4 transition hover:bg-slate-50 md:grid-cols-[42px_1fr_82px] md:items-center">
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
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
            <CardHeader className="border-b border-slate-100 bg-slate-50/70 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-950">Performance técnica</CardTitle>
                  <CardDescription>Indicadores que melhoram sua prioridade.</CardDescription>
                </div>

                <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                  Ranking ativo
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-4">
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
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-3 md:grid-cols-5">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link key={action.title} to={action.href}>
                <button className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md">
                  <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="font-black text-slate-950">{action.title}</span>
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
                  Para ganhar mais: aceite rápido, seja pontual e mantenha o perfil completo.
                </p>
                <p className="text-sm text-emerald-800">
                  O painel deve ajudar o técnico a decidir rápido qual chamado vale a pena pegar.
                </p>
              </div>
            </div>

            <Link to="/tecnico/perfil">
              <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
                Melhorar perfil
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianDashboard;
