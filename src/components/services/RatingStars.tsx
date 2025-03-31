
import React from 'react';
import { Star } from 'lucide-react';

export interface RatingStarsProps {
  rating: number;
  onRate?: (rating: number) => void;
  readOnly?: boolean;
  size?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating = 0, 
  onRate, 
  readOnly = false,
  size = 20
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  const handleClick = (star: number) => {
    if (!readOnly && onRate) {
      onRate(star);
    }
  };

  return (
    <div className="flex">
      {stars.map((star) => (
        <Star
          key={star}
          size={size}
          className={`cursor-pointer transition-colors ${
            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          } ${!readOnly ? 'hover:text-yellow-400' : ''}`}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
};

export default RatingStars;
