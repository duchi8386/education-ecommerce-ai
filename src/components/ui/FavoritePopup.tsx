"use client";

import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface FavoritePopupProps {
  isVisible: boolean;
  isFavorite: boolean;
  productName: string;
  position: { x: number; y: number };
}

const FavoritePopup: React.FC<FavoritePopupProps> = ({
  isVisible,
  isFavorite,
  productName,
  position
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!show) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x - 100,
        top: position.y - 60,
      }}
    >
      <div className={`bg-white rounded-lg shadow-lg border p-3 transition-all duration-500 transform ${
        show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
      }`}>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Heart className={`h-5 w-5 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`} />
            {isFavorite && (
              <>
                <Heart className="h-3 w-3 absolute -top-1 -right-1 fill-red-400 text-red-400 animate-ping" />
                <Heart className="h-2 w-2 absolute -top-0.5 -left-0.5 fill-pink-400 text-pink-400 animate-pulse" />
              </>
            )}
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-900">
              {isFavorite ? 'Đã thêm vào yêu thích!' : 'Đã xóa khỏi yêu thích'}
            </div>
            <div className="text-gray-600 text-xs truncate max-w-32">
              {productName}
            </div>
          </div>
        </div>
        
        {/* Arrow pointing to button */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePopup; 