import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Star, 
  ArrowLeft,
  Search,
  Filter,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Flag,
  Calendar,
  User,
  Package,
  TrendingUp
} from 'lucide-react';

const mockReviews = [
  {
    id: 'REV-001',
    customerName: 'João Silva',
    customerEmail: 'joao@empresa.com',
    rating: 5,
    title: 'Excelente produto e atendimento!',
    comment: 'Comprei a bomba de tinta para minha impressora industrial e fiquei muito satisfeito. O produto chegou rapidamente e funcionou perfeitamente. O atendimento da empresa também foi excepcional, tiraram todas as minhas dúvidas antes da compra.',
    productName: 'BOMBA DE TINTA 100/200ML',
    productId: '8006',
    orderId: 'ORD-2024-001',
    date: '2024-03-16',
    verified: true,
    helpful: 12,
    notHelpful: 0,
    response: null,
    photos: []
  },
  {
    id: 'REV-002',
    customerName: 'Maria Oliveira',
    customerEmail: 'maria@tecnico.com',
    rating: 4,
    title: 'Boa qualidade, entrega poderia ser mais rápida',
    comment: 'O produto é de boa qualidade e funciona conforme esperado. Apenas achei que a entrega poderia ter sido um pouco mais rápida, mas no geral estou satisfeita com a compra.',
    productName: 'CABEÇA DE IMPRESSÃO TÉRMICA',
    productId: '8007',
    orderId: 'ORD-2024-002',
    date: '2024-03-15',
    verified: true,
    helpful: 8,
    notHelpful: 1,
    response: {
      date: '2024-03-16',
      message: 'Olá Maria! Agradecemos seu feedback. Estamos trabalhando para melhorar nossos prazos de entrega. Fico feliz que tenha gostado da qualidade do produto!'
    },
    photos: []
  },
  {
    id: 'REV-003',
    customerName: 'Carlos Santos',
    customerEmail: 'carlos@manutencao.com',
    rating: 5,
    title: 'Produto original e preço justo',
    comment: 'Há anos compro peças para meus equipamentos e posso garantir que esta empresa oferece produtos originais com preço justo. A bomba de tinta que comprei está funcionando perfeitamente há 3 meses.',
    productName: 'BOMBA DE TINTA 100/200ML',
    productId: '8006',
    orderId: 'ORD-2024-003',
    date: '2024-03-14',
    verified: true,
    helpful: 15,
    notHelpful: 0,
    response: {
      date: '2024-03-14',
      message: 'Muito obrigado Carlos! É sempre um prazer atender clientes fiéis como você. Continuaremos trabalhando para manter a qualidade que você já conhece.'
    },
    photos: []
  },
  {
    id: 'REV-004',
    customerName: 'Ana Costa',
    customerEmail: 'ana@industria.com',
    rating: 3,
    title: 'Produto bom, mas tive problemas na instalação',
    comment: 'O produto em si é bom, mas tive algumas dificuldades na instalação. Seria interessante se viesse com um manual mais detalhado ou vídeo explicativo.',
    productName: 'SENSOR DE PROXIMIDADE',
    productId: '8009',
    orderId: 'ORD-2024-004',
    date: '2024-03-13',
    verified: true,
    helpful: 5,
    notHelpful: 2,
    response: null,
    photos: []
  },
  {
    id: 'REV-005',
    customerName: 'Pedro Lima',
    customerEmail: 'pedro@automatica.com',
    rating: 5,
    title: 'Motor de excelente qualidade!',
    comment: 'Comprei 3 motores NEMA 23 e todos chegaram em perfeito estado. A qualidade é excepcional e o desempenho está sendo exatamente o que eu precisava para meus projetos de automação.',
    productName: 'MOTOR PASO A PASO NEMA 23',
    productId: '8010',
    orderId: 'ORD-2024-005',
    date: '2024-03-12',
    verified: true,
    helpful: 9,
    notHelpful: 0,
    response: {
      date: '2024-03-13',
      message: 'Ficamos muito felizes em saber que os motores atenderam suas expectativas, Pedro! Sucesso com seus projetos de automação!'
    },
    photos: []
  }
];

const CompanyReviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [responseText, setResponseText] = useState('');
  const [respondingTo, setRespondingTo] = useState<string | null>(null);

  const ratingOptions = [
    { value: 'all', label: 'Todas as Avaliações' },
    { value: '5', label: '5 Estrelas' },
    { value: '4', label: '4 Estrelas' },
    { value: '3', label: '3 Estrelas' },
    { value: '2', label: '2 Estrelas' },
    { value: '1', label: '1 Estrela' }
  ];

  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating === 'all' || review.rating.toString() === selectedRating;
    return matchesSearch && matchesRating;
  });

  const renderStars = (rating: number, size: 'sm' | 'md' = 'md') => {
    const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleResponse = (reviewId: string) => {
    console.log('Respondendo à avaliação:', reviewId, responseText);
    setRespondingTo(null);
    setResponseText('');
  };

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;
  const totalReviews = mockReviews.length;
  const verifiedReviews = mockReviews.filter(r => r.verified).length;
  const responseRate = mockReviews.filter(r => r.response).length / totalReviews * 100;

  // Distribuição por estrelas
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    stars: rating,
    count: mockReviews.filter(r => r.rating === rating).length,
    percentage: (mockReviews.filter(r => r.rating === rating).length / totalReviews) * 100
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/loja/dashboard" className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center">
              <Star className="h-10 w-10 text-yellow-300 mr-4" />
              <div>
                <h1 className="text-4xl font-black text-white">Avaliações</h1>
                <p className="text-blue-100 text-lg">Feedback e comentários dos clientes</p>
              </div>
            </div>
          </div>

          {/* Métricas de avaliações */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-300" />
                <div className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</div>
              </div>
              <div className="text-blue-100 text-sm">Avaliação Média</div>
              <div className="mt-1">
                {renderStars(Math.round(averageRating), 'sm')}
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-5 w-5 text-blue-300" />
                <div className="text-2xl font-bold text-white">{totalReviews}</div>
              </div>
              <div className="text-blue-100 text-sm">Total de Avaliações</div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-green-300" />
                <div className="text-2xl font-bold text-white">{verifiedReviews}</div>
              </div>
              <div className="text-blue-100 text-sm">Compras Verificadas</div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Reply className="h-5 w-5 text-purple-300" />
                <div className="text-2xl font-bold text-white">{responseRate.toFixed(0)}%</div>
              </div>
              <div className="text-blue-100 text-sm">Taxa de Resposta</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar com distribuição de avaliações */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distribuição de Avaliações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {ratingDistribution.map(({ stars, count, percentage }) => (
                  <div key={stars} className="flex items-center gap-2">
                    <div className="flex items-center gap-1 min-w-0 flex-1">
                      <span className="text-sm font-medium">{stars}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 min-w-0">{count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Lista de avaliações */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar avaliações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {ratingOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Lista de avaliações */}
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{review.customerName}</div>
                            <div className="text-sm text-gray-600">
                              {new Date(review.date).toLocaleDateString('pt-BR')}
                              {review.verified && (
                                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                  Compra Verificada
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-2">
                          {renderStars(review.rating)}
                          <span className="font-semibold text-gray-900">{review.title}</span>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          <Package className="h-4 w-4 inline mr-1" />
                          {review.productName}
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="text-gray-600">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-gray-700 mb-4">{review.comment}</p>
                    
                    {/* Botões de helpful */}
                    <div className="flex items-center gap-4 mb-4">
                      <Button variant="outline" size="sm" className="text-gray-600">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Útil ({review.helpful})
                      </Button>
                      <Button variant="outline" size="sm" className="text-gray-600">
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        ({review.notHelpful})
                      </Button>
                      {!review.response && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setRespondingTo(review.id)}
                        >
                          <Reply className="h-4 w-4 mr-1" />
                          Responder
                        </Button>
                      )}
                    </div>

                    {/* Resposta da empresa */}
                    {review.response && (
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            DG
                          </div>
                          <span className="font-semibold text-blue-900">Doss Group</span>
                          <span className="text-sm text-gray-600">
                            {new Date(review.response.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.response.message}</p>
                      </div>
                    )}

                    {/* Campo de resposta */}
                    {respondingTo === review.id && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <Textarea
                          placeholder="Escreva sua resposta..."
                          value={responseText}
                          onChange={(e) => setResponseText(e.target.value)}
                          className="mb-3"
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => handleResponse(review.id)}
                          >
                            Enviar Resposta
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setRespondingTo(null);
                              setResponseText('');
                            }}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <div className="text-center py-12">
                <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma avaliação encontrada</h3>
                <p className="text-gray-600">Tente ajustar os filtros de busca.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyReviews;