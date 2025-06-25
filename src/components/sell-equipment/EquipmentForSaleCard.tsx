
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Phone, MessageCircle, Heart, Share2 } from 'lucide-react';
import { SellEquipmentItem, equipmentConditionLabels } from '@/types/sellEquipment';

interface EquipmentForSaleCardProps {
  equipment: SellEquipmentItem;
  onContact: (equipment: SellEquipmentItem) => void;
  onFavorite?: (equipmentId: string) => void;
  isFavorited?: boolean;
}

const EquipmentForSaleCard: React.FC<EquipmentForSaleCardProps> = ({
  equipment,
  onContact,
  onFavorite,
  isFavorited = false
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'novo': return 'bg-green-100 text-green-800';
      case 'seminovo': return 'bg-blue-100 text-blue-800';
      case 'usado': return 'bg-yellow-100 text-yellow-800';
      case 'para-pecas': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 relative overflow-hidden">
      {equipment.featured && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-yellow-500 text-black font-semibold">
            Destaque
          </Badge>
        </div>
      )}
      
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 bg-white/90 hover:bg-white"
          onClick={() => onFavorite?.(equipment.id)}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 bg-white/90 hover:bg-white"
        >
          <Share2 className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      <div className="relative h-48 overflow-hidden">
        <img
          src={equipment.images[0] || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop&crop=entropy&auto=format&fm=webp"}
          alt={equipment.title}
          className="w-full h-full object-cover"
        />
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {equipment.title}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {formatPrice(equipment.price)}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="text-xs">
            {equipment.brand}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {equipment.model}
          </Badge>
          <Badge className={`text-xs ${getConditionColor(equipment.condition)}`}>
            {equipmentConditionLabels[equipment.condition]}
          </Badge>
          {equipment.year && (
            <Badge variant="outline" className="text-xs">
              {equipment.year}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {equipment.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{equipment.location.city}, {equipment.location.state}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(equipment.createdAt)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => onContact(equipment)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Phone className="h-4 w-4 mr-1" />
            Contato
          </Button>
          {equipment.contactInfo.whatsapp && (
            <Button
              onClick={() => window.open(`https://wa.me/55${equipment.contactInfo.whatsapp}?text=Olá! Vi seu anúncio do ${equipment.title} e tenho interesse.`, '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentForSaleCard;
