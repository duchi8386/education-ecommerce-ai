"use client";

import React from "react";
import { Star, Users, Clock } from "lucide-react";
import { Product } from "../../types";
import { useAppContext } from "../../context/AppContext";
import { useFavorites } from "../../hooks/useFavorites";
import FavoriteHeartIcon from "./FavoriteHeartIcon";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
}) => {
  const { dispatch } = useAppContext();
  const { toggleFavorite, isFavorite: checkIsFavorite } = useFavorites();
  const isFavorite = checkIsFavorite(product.id);


  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleCardClick = () => {
    // Add to view history
    dispatch({
      type: "ADD_TO_HISTORY",
      payload: { productId: product.id, viewedAt: new Date() },
    });
    onViewDetails(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
        onClick={handleCardClick}
      >
      {/* Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 shadow-md hover:shadow-lg ${
            isFavorite
              ? "bg-red-50 text-red-500 border-2 border-red-200"
              : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500 backdrop-blur-sm border-2 border-white/20 hover:border-red-200"
          }`}
        >
          <FavoriteHeartIcon 
            isFavorite={isFavorite} 
            size="sm"
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category & Level */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
            {product.category}
          </span>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-md ${getLevelColor(
              product.level
            )}`}
          >
            {product.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-600 mb-2">
          Giảng viên: {product.instructor}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span>{product.rating}</span>
              <span>({product.reviews})</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{product.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{product.duration}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="btn-primary text-sm px-4 py-2"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default ProductCard;
