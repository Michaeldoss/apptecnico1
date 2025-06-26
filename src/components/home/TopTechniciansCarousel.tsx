
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface TopTechnician {
  id: number;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  state: string;
  city: string;
  segment: string;
  ranking: number;
}

const topTechnicians: TopTechnician[] = [
  {
    id: 1,
    name: "Carlos Silva",
    photo: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 247,
    state: "SP",
    city: "São Paulo",
    segment: "Impressoras Industriais",
    ranking: 1
  },
  {
    id: 2,
    name: "Maria Santos",
    photo: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 198,
    state: "RJ",
    city: "Rio de Janeiro",
    segment: "Equipamentos de Solda",
    ranking: 1
  },
  {
    id: 3,
    name: "João Oliveira",
    photo: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 156,
    state: "MG",
    city: "Belo Horizonte",
    segment: "Automação Industrial",
    ranking: 1
  },
  {
    id: 4,
    name: "Ana Costa",
    photo: "/placeholder.svg",
    rating: 5.0,
    reviewCount: 189,
    state: "PR",
    city: "Curitiba",
    segment: "Sistemas Hidráulicos",
    ranking: 1
  },
  {
    id: 5,
    name: "Roberto Lima",
    photo: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 203,
    state: "RS",
    city: "Porto Alegre",
    segment: "Máquinas CNC",
    ranking: 1
  },
  {
    id: 6,
    name: "Patricia Mendes",
    photo: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 167,
    state: "BA",
    city: "Salvador",
    segment: "Plotters UV",
    ranking: 1
  },
  {
    id: 7,
    name: "Fernando Rocha",
    photo: "/placeholder.svg",
    rating: 4.7,
    reviewCount: 134,
    state: "PE",
    city: "Recife",
    segment: "Equipamentos Têxteis",
    ranking: 1
  },
  {
    id: 8,
    name: "Camila Ferreira",
    photo: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 221,
    state: "SC",
    city: "Florianópolis",
    segment: "Laser e Gravação",
    ranking: 1
  }
];

const TopTechniciansCarousel = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="h-6 w-6 text-yellow-500" />
            <span className="inline-block px-4 py-2 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full border border-yellow-200">
              🏆 Técnicos #1 do Brasil
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-inter">
            Os Melhores Técnicos de Cada Estado
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Conheça os profissionais mais bem avaliados em cada região do país
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {topTechnicians.map((technician) => (
                <CarouselItem key={technician.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                  <Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:scale-105 h-[350px] relative overflow-hidden">
                    {/* Ranking Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="bg-yellow-500 text-white font-bold px-2 py-1 rounded-full">
                        #{technician.ranking} {technician.state}
                      </Badge>
                    </div>

                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Header com foto */}
                      <div className="flex flex-col items-center text-center mb-4">
                        <div className="relative mb-3">
                          <img
                            src={technician.photo}
                            alt={technician.name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-md"
                          />
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Award className="h-3 w-3 text-white" />
                          </div>
                        </div>

                        {/* Nome */}
                        <h3 className="text-xl font-bold text-gray-900 font-inter mb-1">
                          {technician.name}
                        </h3>
                      </div>

                      {/* Localização */}
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-3">
                        <MapPin size={16} className="text-blue-600" />
                        <span className="text-sm font-semibold font-inter">
                          {technician.city}, {technician.state}
                        </span>
                      </div>

                      {/* Avaliação */}
                      <div className="flex items-center justify-center gap-1 mb-3">
                        {renderStars(technician.rating)}
                        <span className="text-sm font-bold text-gray-900 ml-1 font-inter">
                          {technician.rating} ({technician.reviewCount})
                        </span>
                      </div>

                      {/* Segmento */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="text-center mb-4">
                          <Badge 
                            variant="secondary" 
                            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 font-inter font-medium"
                          >
                            {technician.segment}
                          </Badge>
                        </div>

                        {/* Botão */}
                        <Link to={`/technician/profile/${technician.id}`} className="w-full">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 font-inter shadow-md">
                            Ver Perfil
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-50 shadow-lg -left-6" />
            <CarouselNext className="bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-50 shadow-lg -right-6" />
          </Carousel>
        </div>

        <div className="text-center mt-10">
          <Link to="/find-technician">
            <Button 
              variant="outline" 
              className="border-2 border-blue-600 text-blue-800 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg font-inter text-lg"
            >
              Ver Todos os Estados
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopTechniciansCarousel;
