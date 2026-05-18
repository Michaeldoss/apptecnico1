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
  TrendingUp,
  Wallet,
  Wrench,
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
    },
    {
      id: 'CH-1049',
      title: 'Manutenção preventiva UV',
      city: 'Araquari/SC',
      distance: '22 km',
      value: 480,
      urgency: 'Amanhã',
      type: 'Preventiva',
    },
    {
      id: 'CH-1050',
      title: 'Cabeça entupida DTF',
      city: 'Blumenau/SC',
      distance: '92 km',
      value: 900,
      urgency: 'Urgente',
      type: 'Corretiva',
    },
  ];

  const todayServices = [
    {
      time: '09:00',
      title: 'Diagnóstico DTF',
      customer: 'Cliente industrial',
      status: 'Confirmado',
    },
    {
      time: '14:30',
      title: 'Troca de filtro UV',
      customer: 'Comunicação visual',
      status: 'Pendente',
    },
  ];

  const metrics = [
    {
      label: 'Ganhos da semana',
      value: money(2450),
      description: 'Serviços concluídos e previstos',
      icon: Wallet,
    },
    {
      label: 'Chamados disponíveis',
      value: opportunities.length,
      description: 'Na sua região ou rota',
      icon: Wrench,
    },
    {
      label: 'Agenda de hoje',
      value: todayServices.length,
      description: 'Serviços programados',
      icon: Calendar,
    },
    {
      label: 'Avaliação',
      value: '4.9 ★',
      description: 'Reputação técnica',
      icon: Star,
    },
  ];

  const quickActions = [
    {
      title: 'Ver chamados',
      description: 'Escolher serviços disponíveis para aceitar.',
      icon: Wrench,
      href: '/tecnico/servicos',
      primary: true,
    },
    {
      title: 'Minha agenda',
      description: 'Organizar atendimentos e rotas.',
      icon: Calendar,
      href: '/tecnico/agenda',
      primary: false,
    },
    {
      title: 'Meus ganhos',
      description: 'Acompanhar pagamentos e repasses.',
      icon: CreditCard,
      href: '/tecnico/pagamentos',
      primary: false,
    },
    {
      title: 'Mensagens',
      description: 'Conversar com clientes e suporte.',
      icon: MessageSquare,
      href: '/tecnico/chat',
      primary: false,
    },
  ];

  const alerts = [
    {
      title: 'Complete seu perfil técnico',
      description: 'Técnicos com perfil completo recebem mais chamados.',
      href: '/tecnico/perfil',
      icon: ShieldCheck,
      tone: 'emerald',
    },
    {
      title: '2 serviços aguardando confirmação',
      description: 'Confirme presença para evitar perda de reputação.',
      href: '/tecnico/agenda',
      icon: Clock,
      tone: 'amber',
    },
    {
      title: 'Peças com estoque baixo',
      description: 'Atualize peças disponíveis para vender durante os atendimentos.',
      href: '/tecnico/pecas',
      icon: Package,
      tone: 'red',
    },
  ];

  return (
    <TechnicianLayout
      title="Central do Técnico"
      subtitle="Ganhe mais aceitando chamados, organizando sua agenda, vendendo peças e mantendo uma boa reputação."
      action={
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link to="/tecnico/servicos">
            <Button className="bg-white text-emerald-950 hover:bg-emerald-100">
              <Wrench className="mr-2 h-4 w-4" />
              Ver chamados
            </Button>
          </Link>

          <Link to="/tecnico/agenda">
            <Button
              variant="outline"
              className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Minha agenda
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <Card key={metric.label} className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <p className="text-sm font-bold text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-2xl font-black text-slate-950">{metric.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{metric.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <Card className="border-emerald-200 bg-emerald-50 shadow-sm">
            <CardHeader>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-emerald-950">Chamados disponíveis</CardTitle>
                  <CardDescription className="text-emerald-800">
                    Oportunidades próximas para gerar receita.
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
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex gap-3">
                      <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                        <Wrench className="h-5 w-5" />
                      </div>

                      <div>
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
                        </div>

                        <p className="font-black text-slate-950">{opportunity.title}</p>

                        <div className="mt-1 flex flex-wrap gap-3 text-sm text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {opportunity.city}
                          </span>
                          <span>{opportunity.distance}</span>
                          <span>{opportunity.id}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <p className="text-xl font-black text-emerald-700">
                        {money(opportunity.value)}
                      </p>

                      <Button className="bg-emerald-700 text-white hover:bg-emerald-800">
                        Aceitar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-950">Agenda de hoje</CardTitle>
              <CardDescription>Serviços programados e compromissos do dia.</CardDescription>
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

                    <div className="flex-1">
                      <p className="font-black text-slate-950">{service.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{service.customer}</p>

                      <div className="mt-3 flex items-center justify-between">
                        <Badge
                          className={
                            service.status === 'Confirmado'
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50'
                              : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50'
                          }
                        >
                          {service.status}
                        </Badge>

                        <Link
                          to="/tecnico/agenda"
                          className="text-sm font-bold text-emerald-700"
                        >
                          Abrir
                        </Link>
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

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.4fr]">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-950">Atenção</CardTitle>
              <CardDescription>Pontos que influenciam chamados e reputação.</CardDescription>
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
                    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-200 hover:bg-emerald-50/40">
                      <div className={`rounded-xl border p-2 ${toneClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <p className="font-black text-slate-950">{alert.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">
                          {alert.description}
                        </p>
                      </div>

                      <ArrowRight className="mt-1 h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-700" />
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-slate-950">Ações rápidas</CardTitle>
                  <CardDescription>Atalhos para o técnico trabalhar melhor.</CardDescription>
                </div>

                <Badge className="w-fit border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                  Central técnica
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <Link key={action.title} to={action.href} className="group">
                      <div
                        className={`flex h-full items-start gap-4 rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-md ${
                          action.primary
                            ? 'border-emerald-200 bg-emerald-50'
                            : 'border-slate-200 bg-white hover:border-emerald-200'
                        }`}
                      >
                        <div
                          className={`rounded-2xl p-3 ${
                            action.primary
                              ? 'bg-emerald-700 text-white'
                              : 'bg-slate-100 text-slate-700 group-hover:bg-emerald-700 group-hover:text-white'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-black text-slate-950">{action.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-slate-500">
                            {action.description}
                          </p>

                          <p className="mt-4 inline-flex items-center text-sm font-bold text-emerald-700">
                            Acessar
                            <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-emerald-200 bg-emerald-50 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <div className="rounded-2xl bg-emerald-700 p-3 text-white">
                <TrendingUp className="h-6 w-6" />
              </div>

              <div>
                <p className="font-black text-emerald-950">Quanto melhor seu perfil, mais chamados você recebe.</p>
                <p className="mt-1 text-sm text-emerald-800">
                  Complete especialidades, regiões atendidas, documentos e disponibilidade para aumentar sua chance de contratação.
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
