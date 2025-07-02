
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Plus } from 'lucide-react';
import { useTransacoes } from '@/hooks/useTransacoes';
import TransacaoCard from '@/components/payments/TransacaoCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TechnicianPayments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    transacoes,
    isLoading,
    liberarPagamento,
    resumo
  } = useTransacoes();

  const filteredTransacoes = transacoes.filter(transacao =>
    transacao.servico_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transacao.meio_pagamento.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  if (isLoading) {
    return (
      <TechnicianLayout title="Pagamentos">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tech-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando transações...</p>
          </div>
        </div>
      </TechnicianLayout>
    );
  }

  return (
    <TechnicianLayout title="Pagamentos">
      <div className="space-y-6">
        {/* Informativo sobre intermediação */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            🛡️ Sistema de Intermediação de Pagamentos
          </h3>
          <p className="text-blue-700 text-sm mb-3">
            Todos os pagamentos ficam retidos em conta segura até a confirmação do serviço pelo cliente. 
            Isso garante proteção tanto para você quanto para o cliente.
          </p>
          <div className="flex gap-4 text-xs text-blue-600">
            <span>✓ Pagamento antecipado garantido</span>
            <span>✓ Liberação automática em 24h</span>
            <span>✓ Sistema de contestação</span>
            <span>✓ Saque imediato disponível</span>
          </div>
        </div>

        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Retido</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-600">
                {formatarValor(resumo.totalRetido)}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Liberado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                {formatarValor(resumo.totalLiberado)}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pendente Liberação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">
                {formatarValor(resumo.pendenteLiberacao)}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Transações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">
                {resumo.totalTransacoes}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Busca e Filtros */}
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por serviço ou meio de pagamento"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
        </div>

        {/* Lista de Transações */}
        {filteredTransacoes.length > 0 ? (
          <div className="grid gap-4">
            {filteredTransacoes.map((transacao) => (
              <TransacaoCard
                key={transacao.id}
                transacao={transacao}
                onLiberar={liberarPagamento}
                isLoading={isLoading}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900">Nenhuma transação encontrada</h3>
              <p className="text-gray-600 mb-4">
                Você ainda não tem transações de pagamento. Quando os clientes pagarem pelos seus serviços, elas aparecerão aqui.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianPayments;
