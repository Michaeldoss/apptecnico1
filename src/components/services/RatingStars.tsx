
import React from 'react';
import { Star } from 'lucide-react';

export interface RatingStarsProps {
  rating?: number;
  initialRating?: number;
  onChange?: (rating: number) => void;
  onRate?: (rating: number) => void;
  readOnly?: boolean;
  size?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating = 0, 
  initialRating,
  onChange,
  onRate, 
  readOnly = false,
  size = 20
}) => {
  // Use initialRating if provided, otherwise fall back to rating
  const effectiveRating = initialRating !== undefined ? initialRating : rating;
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  const handleClick = (star: number) => {
    if (!readOnly) {
      if (onChange) {
        onChange(star);
      }
      if (onRate) {
        onRate(star);
      }
    }
  };

  return (
    <div className="flex">
      {stars.map((star) => (
        <Star
          key={star}
          size={size}
          className={`cursor-pointer transition-colors ${
            star <= effectiveRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          } ${!readOnly ? 'hover:text-yellow-400' : ''}`}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
};

export default RatingStars;
