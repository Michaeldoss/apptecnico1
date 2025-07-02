
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Plus, Grid, List, MapPin, SlidersHorizontal, Map, Star as StarIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EquipmentForSaleCard from '@/components/sell-equipment/EquipmentForSaleCard';
import SellEquipmentMap from '@/components/maps/SellEquipmentMap';
import { SellEquipmentItem, equipmentConditionLabels } from '@/types/sellEquipment';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data para demonstração
const mockEquipments: SellEquipmentItem[] = [
  {
    id: '1',
    title: 'Plotter Roland VersaCAMM VS-640i Eco-Solvente',
    type: 'eco-solvent',
    brand: 'Roland',
    model: 'VersaCAMM VS-640i',
    year: 2022,
    condition: 'seminovo',
    price: 85000,
    description: 'Plotter em excelente estado de conservação, pouco uso. Inclui software original e manual completo. Ideal para gráfica rápida.',
    location: { city: 'São Paulo', state: 'SP' },
    images: ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop'],
    contactInfo: {
      name: 'João Silva',
      phone: '(11) 99999-9999',
      email: 'joao@exemplo.com',
      whatsapp: '11999999999'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    featured: true
  },
  {
    id: '2',
    title: 'Plotter de Recorte Silhouette Cameo 4',
    type: 'cutting',
    brand: 'Silhouette',
    model: 'Cameo 4',
    year: 2023,
    condition: 'novo',
    price: 2500,
    description: 'Plotter de recorte novo, ainda na caixa. Nunca foi usado. Acompanha software e materiais iniciais.',
    location: { city: 'Rio de Janeiro', state: 'RJ' },
    images: ['https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop'],
    contactInfo: {
      name: 'Maria Santos',
      phone: '(21) 88888-8888',
      email: 'maria@exemplo.com',
      whatsapp: '21888888888'
    },
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
    featured: true
  },
  {
    id: '3',
    title: 'Impressora DTF Epson L1800 Modificada',
    type: 'dtf-textile',
    brand: 'Epson',
    model: 'L1800',
    year: 2021,
    condition: 'usado',
    price: 12000,
    description: 'Impressora modificada para DTF, funcionando perfeitamente. Inclui sistema de tinta e pó DTF.',
    location: { city: 'Belo Horizonte', state: 'MG' },
    images: ['https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop'],
    contactInfo: {
      name: 'Carlos Oliveira',
      phone: '(31) 77777-7777',
      email: 'carlos@exemplo.com'
    },
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  }
];

const SellEquipment = () => {
  const [equipments, setEquipments] = useState<SellEquipmentItem[]>(mockEquipments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleContact = (equipment: SellEquipmentItem) => {
    console.log('Contacting for:', equipment.title);
    // Aqui você implementaria a lógica de contato
  };

  const handleFavorite = (equipmentId: string) => {
    setFavorites(prev => 
      prev.includes(equipmentId) 
        ? prev.filter(id => id !== equipmentId)
        : [...prev, equipmentId]
    );
  };

  const handleMapView = () => {
    setViewMode('map');
  };

  const renderMapView = () => {
    return (
      <SellEquipmentMap 
        equipments={filteredEquipments}
        onEquipmentClick={handleContact}
      />
    );
  };

  const filteredEquipments = equipments.filter(equipment => {
    const matchesSearch = equipment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCondition = selectedCondition === 'all' || equipment.condition === selectedCondition;
    const matchesType = selectedType === 'all' || equipment.type === selectedType;
    
    const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
    const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
    const matchesPrice = equipment.price >= minPrice && equipment.price <= maxPrice;

    return matchesSearch && matchesCondition && matchesType && matchesPrice;
  });

  const equipmentTypes = [
    { value: 'eco-solvent', label: 'Eco Solvente' },
    { value: 'uv-flexible', label: 'UV Flexível' },
    { value: 'cutting', label: 'Recorte' },
    { value: 'dtf-textile', label: 'DTF Têxtil' },
    { value: 'sublimation', label: 'Sublimação' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 relative overflow-hidden">
          {/* Elementos decorativos de fundo */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300/10 rounded-full blur-2xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
                Vender Equipamento
              </h1>
              <p className="text-xl mb-8 text-white/90 drop-shadow-md">
                Anuncie seu equipamento gráfico com segurança e alcance milhares de compradores interessados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/sell-equipment/create">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Anunciar Equipamento
                  </Button>
                </Link>
                <Button size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold backdrop-blur-sm" onClick={handleMapView}>
                  <Map className="h-5 w-5 mr-2" />
                  Ver no Mapa
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Equipment Carousel */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Equipamentos em Destaque</h2>
                <p className="text-gray-600">Anúncios premium que ficam em evidência</p>
              </div>
              <Badge className="bg-yellow-500 text-black font-semibold px-3 py-1">
                <StarIcon className="h-4 w-4 mr-1" />
                Premium
              </Badge>
            </div>
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {equipments.filter(eq => eq.featured).map((equipment) => (
                  <CarouselItem key={equipment.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="relative">
                      <EquipmentForSaleCard
                        equipment={equipment}
                        onContact={handleContact}
                        onFavorite={handleFavorite}
                        isFavorited={favorites.includes(equipment.id)}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4 gap-2">
                <CarouselPrevious className="static transform-none mx-0 bg-white/80 backdrop-blur-sm border-blue-600" />
                <CarouselNext className="static transform-none mx-0 bg-white/80 backdrop-blur-sm border-blue-600" />
              </div>
            </Carousel>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 mb-2">
                Destaque seu anúncio e tenha mais visibilidade
              </p>
              <Button variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-600 hover:text-white">
                <StarIcon className="h-4 w-4 mr-2" />
                Promover Meu Anúncio
              </Button>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="bg-white border-b py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Buscar equipamentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 items-center">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    {equipmentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {Object.entries(equipmentConditionLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Dialog open={showFilters} onOpenChange={setShowFilters}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Filtros Avançados</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Preço Mínimo</label>
                          <Input
                            type="number"
                            placeholder="R$ 0"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Preço Máximo</label>
                          <Input
                            type="number"
                            placeholder="R$ 999.999"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'map' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('map')}
                  >
                    <Map className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCondition !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {equipmentConditionLabels[selectedCondition as keyof typeof equipmentConditionLabels]}
                  <button onClick={() => setSelectedCondition('all')} className="ml-1">×</button>
                </Badge>
              )}
              {selectedType !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {equipmentTypes.find(t => t.value === selectedType)?.label}
                  <button onClick={() => setSelectedType('all')} className="ml-1">×</button>
                </Badge>
              )}
              {(priceRange.min || priceRange.max) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Preço: R$ {priceRange.min || '0'} - R$ {priceRange.max || '∞'}
                  <button onClick={() => setPriceRange({ min: '', max: '' })} className="ml-1">×</button>
                </Badge>
              )}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <div className="text-gray-600">
                {filteredEquipments.length} equipamento{filteredEquipments.length !== 1 ? 's' : ''} encontrado{filteredEquipments.length !== 1 ? 's' : ''}
              </div>
            </div>

            {viewMode === 'map' ? (
              <div className="h-[600px]">
                {renderMapView()}
              </div>
            ) : filteredEquipments.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredEquipments.map(equipment => (
                  <EquipmentForSaleCard
                    key={equipment.id}
                    equipment={equipment}
                    onContact={handleContact}
                    onFavorite={handleFavorite}
                    isFavorited={favorites.includes(equipment.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhum equipamento encontrado
                </h3>
                <p className="text-gray-500 mb-6">
                  Tente ajustar os filtros ou fazer uma nova busca
                </p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setSelectedCondition('all');
                  setSelectedType('all');
                  setPriceRange({ min: '', max: '' });
                }}>
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SellEquipment;
