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

// Dados fake removidos - array vazio
const topTechnicians: TopTechnician[] = [];

const TopTechniciansCarousel = () => {
  const renderStars = (rating: number) => {
    return Array.from({
      length: 5
    }, (_, i) => <Star key={i} size={16} className={`${i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />);
  };

  return <section className="py-20 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          
          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 font-inter leading-tight">
            Os <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-dark">Melhores Técnicos</span><br />
            de Cada Estado
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-bold leading-relaxed">
            Conheça os profissionais mais bem avaliados e especializados em cada região do país
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          {topTechnicians.length > 0 ? (
            <Carousel plugins={[Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }) as any]} opts={{
              align: "center",
              loop: true,
              slidesToScroll: 1
            }} className="w-full">
              <CarouselContent className="-ml-6">
                {topTechnicians.map(technician => (
                  <CarouselItem key={technician.id} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <Card className="bg-white/95 backdrop-blur-sm border-2 border-gray-200 shadow-xl hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:scale-[1.02] h-[400px] relative overflow-hidden group mx-auto max-w-[280px]">
                      <CardContent className="p-6 h-full flex flex-col relative z-10">
                        <div className="text-center text-gray-500">
                          Nenhum técnico cadastrado ainda
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-white/95 backdrop-blur-sm border-3 border-primary/30 text-primary hover:bg-primary/10 shadow-2xl -left-6 w-14 h-14 hover:scale-110 transition-all duration-300" />
              <CarouselNext className="bg-white/95 backdrop-blur-sm border-3 border-primary/30 text-primary hover:bg-primary/10 shadow-2xl -right-6 w-14 h-14 hover:scale-110 transition-all duration-300" />
            </Carousel>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm border-2 border-gray-200 rounded-xl p-8 shadow-xl">
                <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  Técnicos em Breve
                </h3>
                <p className="text-gray-500">
                  Em breve você poderá encontrar os melhores técnicos de cada estado aqui.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link to="/find-technician">
            <Button variant="outline" className="border-3 border-primary text-primary hover:bg-primary/10 font-black px-12 py-4 rounded-2xl font-inter text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 bg-white/95 backdrop-blur-sm">
              <Trophy className="mr-3 h-6 w-6" />
              Encontrar Técnicos
            </Button>
          </Link>
        </div>
      </div>
    </section>;
};

export default TopTechniciansCarousel;