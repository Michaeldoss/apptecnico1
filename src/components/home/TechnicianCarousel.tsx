
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
import { Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FeaturedTechnician {
  id: number;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  location: string;
  responseTime: string;
  availability: string;
}

const featuredTechnicians: FeaturedTechnician[] = [
  {
    id: 1,
    name: "Carlos Silva",
    photo: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 127,
    specialties: ["Impressoras Industriais", "Manutenção Preventiva"],
    location: "São Paulo, SP",
    responseTime: "30 min",
    availability: "Disponível"
  },
  {
    id: 2,
    name: "Maria Santos",
    photo: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 98,
    specialties: ["Equipamentos de Solda", "Instalações"],
    location: "Rio de Janeiro, RJ",
    responseTime: "45 min",
    availability: "Disponível"
  },
  {
    id: 3,
    name: "João Oliveira",
    photo: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 156,
    specialties: ["Automação Industrial", "Reparo de Máquinas"],
    location: "Belo Horizonte, MG",
    responseTime: "20 min",
    availability: "Ocupado"
  },
  {
    id: 4,
    name: "Ana Costa",
    photo: "/placeholder.svg",
    rating: 5.0,
    reviewCount: 89,
    specialties: ["Sistemas Hidráulicos", "Manutenção"],
    location: "Curitiba, PR",
    responseTime: "35 min",
    availability: "Disponível"
  }
];

const TechnicianCarousel = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-full border border-blue-200 mb-4">
            ⭐ Técnicos em Destaque
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 font-inter">
            Profissionais do Mês
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Conheça os técnicos mais bem avaliados pelos nossos clientes
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredTechnicians.map((technician) => (
                <CarouselItem key={technician.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="relative">
                          <img
                            src={technician.photo}
                            alt={technician.name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                          />
                          <Badge 
                            className={`absolute -bottom-1 -right-1 text-xs px-2 py-1 ${
                              technician.availability === 'Disponível' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-orange-500 text-white'
                            }`}
                          >
                            {technician.availability}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-blue-900 font-inter">
                            {technician.name}
                          </h3>
                          
                          <div className="flex items-center justify-center gap-1">
                            {renderStars(technician.rating)}
                            <span className="text-sm font-medium text-gray-700 ml-1">
                              {technician.rating} ({technician.reviewCount} avaliações)
                            </span>
                          </div>

                          <div className="flex items-center justify-center gap-1 text-gray-600">
                            <MapPin size={14} />
                            <span className="text-sm font-inter">{technician.location}</span>
                          </div>

                          <div className="flex items-center justify-center gap-1 text-gray-600">
                            <Clock size={14} />
                            <span className="text-sm font-inter">Resposta em {technician.responseTime}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center">
                          {technician.specialties.map((specialty, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        <Link to={`/find-technician?technicianId=${technician.id}`} className="w-full">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                            Ver Perfil
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-50" />
            <CarouselNext className="bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-50" />
          </Carousel>
        </div>

        <div className="text-center mt-8">
          <Link to="/find-technician">
            <Button 
              variant="outline" 
              className="border-2 border-blue-600 text-blue-800 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg"
            >
              Ver Todos os Técnicos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TechnicianCarousel;
