import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Award, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Autoplay from "embla-carousel-autoplay";
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
  specialty: string;
}
const topTechnicians: TopTechnician[] = [{
  id: 1,
  name: "Carlos Silva",
  photo: "/placeholder.svg",
  rating: 4.9,
  reviewCount: 247,
  state: "SP",
  city: "São Paulo",
  segment: "Impressoras Industriais",
  ranking: 1,
  specialty: "Especialista em HP e Canon"
}, {
  id: 2,
  name: "Maria Santos",
  photo: "/placeholder.svg",
  rating: 4.8,
  reviewCount: 198,
  state: "RJ",
  city: "Rio de Janeiro",
  segment: "Equipamentos de Solda",
  ranking: 1,
  specialty: "Soldas TIG e MIG"
}, {
  id: 3,
  name: "João Oliveira",
  photo: "/placeholder.svg",
  rating: 4.9,
  reviewCount: 156,
  state: "MG",
  city: "Belo Horizonte",
  segment: "Automação Industrial",
  ranking: 1,
  specialty: "PLC e CLP Siemens"
}, {
  id: 4,
  name: "Ana Costa",
  photo: "/placeholder.svg",
  rating: 5.0,
  reviewCount: 189,
  state: "PR",
  city: "Curitiba",
  segment: "Sistemas Hidráulicos",
  ranking: 1,
  specialty: "Bombas e Compressores"
}, {
  id: 5,
  name: "Roberto Lima",
  photo: "/placeholder.svg",
  rating: 4.8,
  reviewCount: 203,
  state: "RS",
  city: "Porto Alegre",
  segment: "Máquinas CNC",
  ranking: 1,
  specialty: "Tornos e Fresas CNC"
}, {
  id: 6,
  name: "Patricia Mendes",
  photo: "/placeholder.svg",
  rating: 4.9,
  reviewCount: 167,
  state: "BA",
  city: "Salvador",
  segment: "Plotters UV",
  ranking: 1,
  specialty: "Impressão Digital"
}, {
  id: 7,
  name: "Fernando Rocha",
  photo: "/placeholder.svg",
  rating: 4.7,
  reviewCount: 134,
  state: "PE",
  city: "Recife",
  segment: "Equipamentos Têxteis",
  ranking: 1,
  specialty: "Máquinas de Costura Industrial"
}, {
  id: 8,
  name: "Camila Ferreira",
  photo: "/placeholder.svg",
  rating: 4.8,
  reviewCount: 221,
  state: "SC",
  city: "Florianópolis",
  segment: "Laser e Gravação",
  ranking: 1,
  specialty: "Corte e Gravação a Laser"
}, {
  id: 9,
  name: "André Souza",
  photo: "/placeholder.svg",
  rating: 4.9,
  reviewCount: 178,
  state: "GO",
  city: "Goiânia",
  segment: "Refrigeração Industrial",
  ranking: 1,
  specialty: "Câmaras Frias"
}, {
  id: 10,
  name: "Luciana Alves",
  photo: "/placeholder.svg",
  rating: 4.8,
  reviewCount: 192,
  state: "CE",
  city: "Fortaleza",
  segment: "Energia Solar",
  ranking: 1,
  specialty: "Sistemas Fotovoltaicos"
}];
const TopTechniciansCarousel = () => {
  const renderStars = (rating: number) => {
    return Array.from({
      length: 5
    }, (_, i) => <Star key={i} size={16} className={`${i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />);
  };
  return <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-transparent to-purple-100/30"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 font-inter leading-tight">
            Os <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">Melhores Técnicos</span><br />
            de Cada Estado
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-bold leading-relaxed">
            Conheça os profissionais mais bem avaliados e especializados em cada região do país
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Carousel plugins={[Autoplay({
          delay: 3000,
          stopOnInteraction: true
        })]} opts={{
          align: "start",
          loop: true
        }} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {topTechnicians.map(technician => <CarouselItem key={technician.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Card className="bg-white/95 backdrop-blur-sm border-2 border-gray-200 shadow-2xl hover:shadow-3xl hover:border-blue-300 transition-all duration-500 hover:scale-105 h-[420px] relative overflow-hidden group">
                    {/* Fundo gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Ranking Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-black px-3 py-2 rounded-full shadow-lg border-2 border-yellow-400 text-sm">
                        #{technician.ranking} {technician.state}
                      </Badge>
                    </div>

                    {/* Crown Icon for #1 */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-300">
                        <Trophy className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    <CardContent className="p-6 h-full flex flex-col relative z-10">
                      {/* Header com foto */}
                      <div className="flex flex-col items-center text-center mb-5">
                        <div className="relative mb-4">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 p-1 shadow-xl">
                            <img src={technician.photo} alt={technician.name} className="w-full h-full rounded-full object-cover border-3 border-white shadow-lg" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                            <Award className="h-4 w-4 text-white" />
                          </div>
                        </div>

                        {/* Nome */}
                        <h3 className="text-xl font-black text-gray-900 font-inter mb-2 leading-tight">
                          {technician.name}
                        </h3>
                      </div>

                      {/* Localização */}
                      <div className="flex items-center justify-center gap-2 text-gray-700 mb-4">
                        <MapPin size={18} className="text-blue-600" />
                        <span className="text-base font-bold font-inter">
                          {technician.city}, {technician.state}
                        </span>
                      </div>

                      {/* Avaliação */}
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {renderStars(technician.rating)}
                        </div>
                        <span className="text-base font-black text-gray-900 ml-1 font-inter">
                          {technician.rating} ({technician.reviewCount})
                        </span>
                      </div>

                      {/* Segmento */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="text-center mb-4 space-y-2">
                          <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-sm px-4 py-2 font-inter font-bold border border-blue-300">
                            {technician.segment}
                          </Badge>
                          <p className="text-sm text-gray-600 font-semibold">
                            {technician.specialty}
                          </p>
                        </div>

                        {/* Botão */}
                        <Link to={`/technician/profile/${technician.id}`} className="w-full">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black py-3 px-4 rounded-xl transition-all duration-300 font-inter shadow-xl hover:shadow-2xl hover:scale-105 border-2 border-blue-500">
                            Ver Perfil Completo
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="bg-white/95 backdrop-blur-sm border-3 border-blue-300 text-blue-700 hover:bg-blue-50 shadow-2xl -left-6 w-14 h-14 hover:scale-110 transition-all duration-300" />
            <CarouselNext className="bg-white/95 backdrop-blur-sm border-3 border-blue-300 text-blue-700 hover:bg-blue-50 shadow-2xl -right-6 w-14 h-14 hover:scale-110 transition-all duration-300" />
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <Link to="/find-technician">
            <Button variant="outline" className="border-3 border-blue-600 text-blue-800 hover:bg-blue-50 font-black px-12 py-4 rounded-2xl font-inter text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 bg-white/95 backdrop-blur-sm">
              <Trophy className="mr-3 h-6 w-6" />
              Ver Todos os Estados
            </Button>
          </Link>
        </div>
      </div>
    </section>;
};
export default TopTechniciansCarousel;