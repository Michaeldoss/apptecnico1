import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  BarChart3, 
  ArrowLeft,
  Download,
  TrendingUp,
  Users,
  DollarSign,
  Wrench,
  Calendar,
  FileText,
  PieChart,
  Activity
} from 'lucide-react';

const AdminReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periodOptions = [
    { value: 'week', label: 'Última Semana' },
    { value: 'month', label: 'Último Mês' },
    { value: 'quarter', label: 'Último Trimestre' },
    { value: 'year', label: 'Último Ano' }
  ];

  // Mock data para relatórios
  const dashboardData = {
    revenue: {
      current: 125480.50,
      previous: 98750.30,
      growth: 27.1
    },
    users: {
      current: 1703,
      previous: 1545,
      growth: 10.2
    },
    services: {
      current: 847,
      previous: 723,
      growth: 17.1
    },
    satisfaction: {
      current: 4.7,
      previous: 4.5,
      growth: 4.4
    }
  };

  const reportTypes = [
    {
      title: 'Relatório Financeiro',
      description: 'Receitas, comissões e lucros da plataforma',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Relatório de Usuários',
      description: 'Cadastros, atividade e retenção de usuários',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Relatório de Serviços',
      description: 'OSs executadas, tipos de serviço e performance',
      icon: Wrench,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Relatório de Satisfação',
      description: 'Avaliações, feedbacks e NPS',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Relatório Operacional',
      description: 'Tempos de resposta, SLA e produtividade',
      icon: BarChart3,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Relatório de Auditoria',
      description: 'Logs de atividade e segurança',
      icon: FileText,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/admin/dashboard" className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center">
              <BarChart3 className="h-10 w-10 text-yellow-300 mr-4" />
              <div>
                <h1 className="text-4xl font-black text-white">Relatórios e Analytics</h1>
                <p className="text-purple-100 text-lg">Dashboards e análises detalhadas</p>
              </div>
            </div>
          </div>

          {/* Métricas principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-5 w-5 text-green-300" />
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-300" />
                  <span className="text-sm text-green-300">+{dashboardData.revenue.growth}%</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">
                R$ {dashboardData.revenue.current.toLocaleString('pt-BR')}
              </div>
              <div className="text-purple-100 text-sm">Receita Total</div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-blue-300" />
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-300" />
                  <span className="text-sm text-green-300">+{dashboardData.users.growth}%</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{dashboardData.users.current}</div>
              <div className="text-purple-100 text-sm">Usuários Ativos</div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center justify-between mb-2">
                <Wrench className="h-5 w-5 text-orange-300" />
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-300" />
                  <span className="text-sm text-green-300">+{dashboardData.services.growth}%</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{dashboardData.services.current}</div>
              <div className="text-purple-100 text-sm">Serviços Executados</div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-5 w-5 text-yellow-300" />
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-300" />
                  <span className="text-sm text-green-300">+{dashboardData.satisfaction.growth}%</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{dashboardData.satisfaction.current}</div>
              <div className="text-purple-100 text-sm">Satisfação Média</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Seletor de período */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Relatórios Disponíveis</h2>
            <p className="text-gray-600">Gere relatórios detalhados para análise</p>
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {periodOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid de tipos de relatórios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reportTypes.map((report, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 ${report.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <report.icon className={`h-6 w-6 ${report.color}`} />
                </div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <PieChart className="mr-2 h-4 w-4" />
                    Visualizar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Relatórios rápidos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Relatórios Agendados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Relatório Financeiro Mensal</div>
                    <div className="text-sm text-gray-600">Todo dia 1º às 9:00</div>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Relatório de Performance</div>
                    <div className="text-sm text-gray-600">Toda segunda-feira às 8:00</div>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Relatório de Auditoria</div>
                    <div className="text-sm text-gray-600">Diariamente às 23:00</div>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Últimos Relatórios Gerados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Relatório Financeiro - Março 2024</div>
                    <div className="text-sm text-gray-600">Gerado em 01/04/2024</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Relatório de Usuários - Semanal</div>
                    <div className="text-sm text-gray-600">Gerado em 15/03/2024</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Relatório de Satisfação - Q1</div>
                    <div className="text-sm text-gray-600">Gerado em 10/03/2024</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminReports;