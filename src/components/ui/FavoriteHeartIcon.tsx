import React from 'react';
import { Heart } from 'lucide-react';

interface FavoriteHeartIconProps {
  isFavorite: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const FavoriteHeartIcon: React.FC<FavoriteHeartIconProps> = ({
  isFavorite,
  size = 'md',
  className = ''
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'lg':
        return 'h-6 w-6';
      case 'md':
      default:
        return 'h-5 w-5';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Heart 
        className={`${getSizeClass()} transition-all duration-300 ease-in-out ${
          isFavorite 
            ? "fill-red-500 text-red-500 scale-110 animate-bounce" 
            : "text-current hover:text-red-500 hover:scale-110"
        }`} 
      />
      
      {/* Floating hearts animation when favorited */}
      {isFavorite && (
        <>
          <Heart 
            className="h-3 w-3 absolute -top-2 -right-1 fill-red-400 text-red-400 animate-ping opacity-75" 
          />
          <Heart 
            className="h-2 w-2 absolute -top-1 -left-1 fill-pink-400 text-pink-400 animate-pulse opacity-60" 
          />
        </>
      )}
    </div>
  );
};

export default FavoriteHeartIcon; 