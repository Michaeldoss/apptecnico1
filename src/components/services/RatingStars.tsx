
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  initialRating?: number | null;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const RatingStars: React.FC<RatingStarsProps> = ({
  initialRating = 0,
  onChange,
  readOnly = false,
  size = 'md',
}) => {
  const [rating, setRating] = useState<number>(initialRating || 0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  
  const sizeMap = {
    sm: 'h-3 w-3',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };
  
  const handleClick = (value: number) => {
    if (readOnly) return;
    setRating(value);
    if (onChange) onChange(value);
  };
  
  const handleMouseEnter = (value: number) => {
    if (readOnly) return;
    setHoverRating(value);
  };
  
  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={cn(
            sizeMap[size],
            "cursor-pointer transition-colors",
            {
              "text-yellow-400 fill-yellow-400": value <= (hoverRating || rating),
              "text-gray-300": value > (hoverRating || rating),
              "cursor-default": readOnly,
            }
          )}
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default RatingStars;
