import React, { useState } from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Calendar,
  Flag,
  MessageCircle,
  Package,
  Reply,
  Search,
  Star,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  User,
} from 'lucide-react';

const mockReviews = [
  {
    id: 'REV-001',
    customerName: 'João Silva',
    customerEmail: 'joao@empresa.com',
    rating: 5,
    title: 'Excelente produto e atendimento!',
    comment:
      'Comprei a bomba de tinta para minha impressora industrial e fiquei muito satisfeito. O produto chegou rapidamente e funcionou perfeitamente.',
    productName: 'BOMBA DE TINTA 100/200ML',
    productId: '8006',
    orderId: 'ORD-2024-001',
    date: '2024-03-16',
    verified: true,
    helpful: 12,
    notHelpful: 0,
    response: null,
  },
  {
    id: 'REV-002',
    customerName: 'Maria Oliveira',
    customerEmail: 'maria@tecnico.com',
    rating: 4,
    title: 'Boa qualidade, entrega poderia ser mais rápida',
    comment:
      'O produto é de boa qualidade e funciona conforme esperado. Apenas achei que a entrega poderia ter sido um pouco mais rápida.',
    productName: 'CABEÇA DE IMPRESSÃO TÉRMICA',
    productId: '8007',
    orderId: 'ORD-2024-002',
    date: '2024-03-15',
    verified: true,
    helpful: 8,
    notHelpful: 1,
    response: {
      date: '2024-03-16',
      message:
        'Olá Maria! Agradecemos seu feedback. Estamos trabalhando para melhorar nossos prazos de entrega.',
    },
  },
  {
    id: 'REV-003',
    customerName: 'Carlos Santos',
    customerEmail: 'carlos@manutencao.com',
    rating: 5,
    title: 'Produto original e preço justo',
    comment:
      'Há anos compro peças para meus equipamentos e posso garantir que esta empresa oferece produtos originais com preço justo.',
    productName: 'BOMBA DE TINTA 100/200ML',
    productId: '8006',
    orderId: 'ORD-2024-003',
    date: '2024-03-14',
    verified: true,
    helpful: 15,
    notHelpful: 0,
    response: {
      date: '2024-03-14',
      message:
        'Muito obrigado Carlos! É sempre um prazer atender clientes fiéis como você.',
    },
  },
  {
    id: 'REV-004',
    customerName: 'Ana Costa',
    customerEmail: 'ana@industria.com',
    rating: 3,
    title: 'Produto bom, mas precisei de suporte',
    comment:
      'O produto chegou certo, mas precisei de suporte para instalação. Depois do atendimento funcionou normalmente.',
    productName: 'SENSOR DE PROXIMIDADE',
    productId: '8009',
    orderId: 'ORD-2024-004',
    date: '2024-03-12',
    verified: true,
    helpful: 4,
    notHelpful: 2,
    response: null,
  },
];

const CompanyReviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [responseDrafts, setResponseDrafts] = useState<Record<string, string>>({});

  const totalReviews = mockReviews.length;
  const averageRating =
    mockReviews.reduce((sum, review) => sum + review.rating, 0) / Math.max(totalReviews, 1);
  const answeredReviews = mockReviews.filter((review) => review.response).length;
  const pendingReviews = mockReviews.filter((review) => !review.response).length;

  const filteredReviews = mockReviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating =
      selectedRating === 'all' || review.rating === Number(selectedRating);

    return matchesSearch && matchesRating;
  });

  const ratingOptions = [
    { value: 'all', label: 'Todas as avaliações' },
    { value: '5', label: '5 estrelas' },
    { value: '4', label: '4 estrelas' },
    { value: '3', label: '3 estrelas' },
    { value: '2', label: '2 estrelas' },
    { value: '1', label: '1 estrela' },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const metricCards = [
    {
      label: 'Avaliação média',
      value: averageRating.toFixed(1),
      description: 'Nota geral da loja',
      icon: Star,
    },
    {
      label: 'Total de avaliações',
      value: totalReviews,
      description: 'Feedbacks recebidos',
      icon: MessageCircle,
    },
    {
      label: 'Respondidas',
      value: answeredReviews,
      description: 'Avaliações com resposta',
      icon: Reply,
    },
    {
      label: 'Pendentes',
      value: pendingReviews,
      description: 'Aguardando retorno',
      icon: TrendingUp,
    },
  ];

  return (
    <StoreLayout
      title="Avaliações"
      subtitle="Monitore a reputação da loja, responda clientes e acompanhe feedbacks dos produtos."
      action={
        <Button className="bg-white text-violet-950 hover:bg-violet-100">
          <MessageCircle className="mr-2 h-4 w-4" />
          Central de respostas
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((metric) => {
            const Icon = metric.icon;

            return (
              <Card key={metric.label} className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <p className="text-sm font-bold text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-3xl font-black text-slate-950">{metric.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{metric.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-slate-950">Lista de avaliações</CardTitle>
                <CardDescription>
                  Visualize comentários, notas, pedidos vinculados e respostas da loja.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Buscar por cliente, produto ou título..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="h-11 border-slate-200 bg-white pl-10"
                />
              </div>

              <select
                value={selectedRating}
                onChange={(event) => setSelectedRating(event.target.value)}
                className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-violet-200"
              >
                {ratingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="border-slate-200 bg-white">
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          {renderStars(review.rating)}

                          {review.verified && (
                            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                              Compra verificada
                            </Badge>
                          )}

                          {review.response ? (
                            <Badge className="border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-50">
                              Respondida
                            </Badge>
                          ) : (
                            <Badge className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50">
                              Pendente
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-lg font-black text-slate-950">{review.title}</h3>

                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {review.comment}
                        </p>

                        <div className="mt-4 grid gap-2 text-sm text-slate-500 md:grid-cols-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-slate-400" />
                            <span>
                              {review.customerName} • {review.customerEmail}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-slate-400" />
                            <span>
                              {review.productName} • #{review.productId}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span>
                              {new Date(review.date).toLocaleDateString('pt-BR')} •{' '}
                              {review.orderId}
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="inline-flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4 text-emerald-600" />
                              {review.helpful}
                            </span>

                            <span className="inline-flex items-center gap-1">
                              <ThumbsDown className="h-4 w-4 text-red-600" />
                              {review.notHelpful}
                            </span>

                            <span className="inline-flex items-center gap-1">
                              <Flag className="h-4 w-4 text-slate-400" />
                              Reportar
                            </span>
                          </div>
                        </div>

                        {review.response && (
                          <div className="mt-4 rounded-2xl border border-violet-200 bg-violet-50 p-4">
                            <div className="mb-1 flex items-center gap-2">
                              <Reply className="h-4 w-4 text-violet-700" />
                              <p className="font-black text-violet-950">Resposta da loja</p>
                              <span className="text-xs text-violet-700">
                                {new Date(review.response.date).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed text-violet-900">
                              {review.response.message}
                            </p>
                          </div>
                        )}

                        {!review.response && (
                          <div className="mt-4 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="font-black text-slate-950">Responder avaliação</p>

                            <Textarea
                              placeholder="Escreva uma resposta profissional para o cliente..."
                              value={responseDrafts[review.id] || ''}
                              onChange={(event) =>
                                setResponseDrafts((prev) => ({
                                  ...prev,
                                  [review.id]: event.target.value,
                                }))
                              }
                              className="min-h-[90px] border-slate-200 bg-white"
                            />

                            <div className="flex justify-end">
                              <Button className="bg-violet-700 text-white hover:bg-violet-800">
                                <Reply className="mr-2 h-4 w-4" />
                                Enviar resposta
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredReviews.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
                  <Star className="mx-auto mb-4 h-14 w-14 text-slate-300" />
                  <h3 className="text-lg font-bold text-slate-950">
                    Nenhuma avaliação encontrada
                  </h3>
                  <p className="text-sm text-slate-500">
                    Ajuste os filtros ou aguarde novas avaliações dos clientes.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </StoreLayout>
  );
};

export default CompanyReviews;
