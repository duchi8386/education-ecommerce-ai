"use client";

import React from "react";
import {
  X,
  Star,
  Users,
  Clock,
  Heart,
  Share2,
  BookOpen,
  Award,
  Calendar,
} from "lucide-react";
import { Product } from "../../types";
import { useAppContext } from "../../context/AppContext";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { state, dispatch } = useAppContext();

  if (!isOpen || !product) return null;

  const isFavorite = state.favoriteProducts.includes(product.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: product.id });
    } else {
      dispatch({ type: "ADD_TO_FAVORITES", payload: product.id });
    }
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          {product.originalPrice && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md font-semibold">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              OFF
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Course Info */}
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="flex-1">
              {/* Tags */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${getLevelColor(
                    product.level
                  )}`}
                >
                  {product.level}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Instructor */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">
                    {product.instructor.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {product.instructor}
                  </p>
                  <p className="text-sm text-gray-600">
                    Chuyên gia {product.category}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{product.rating}</span>
                  <span>({product.reviews} đánh giá)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{product.students.toLocaleString()} học viên</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{product.duration}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Mô tả khóa học</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {/* What you'll learn */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">
                  Bạn sẽ học được gì
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <BookOpen className="h-6 w-6 text-primary-600 mx-auto mb-1" />
                  <p className="text-sm font-medium text-gray-900">Trọn đời</p>
                  <p className="text-xs text-gray-600">Truy cập</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-6 w-6 text-primary-600 mx-auto mb-1" />
                  <p className="text-sm font-medium text-gray-900">
                    {product.duration}
                  </p>
                  <p className="text-xs text-gray-600">Video</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary-600 mx-auto mb-1" />
                  <p className="text-sm font-medium text-gray-900">Cập nhật</p>
                  <p className="text-xs text-gray-600">Định kỳ</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Award className="h-6 w-6 text-primary-600 mx-auto mb-1" />
                  <p className="text-sm font-medium text-gray-900">Chứng chỉ</p>
                  <p className="text-xs text-gray-600">Hoàn thành</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <p className="text-sm text-green-600 font-medium">
                      Tiết kiệm{" "}
                      {formatPrice(product.originalPrice - product.price)}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-3 mb-6">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                    Đăng ký ngay
                  </button>
                  <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors">
                    Thêm vào giỏ hàng
                  </button>
                </div>

                {/* Additional Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={handleToggleFavorite}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
                      isFavorite
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
                    />
                    <span className="text-sm">
                      {isFavorite ? "Đã thích" : "Yêu thích"}
                    </span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">Chia sẻ</span>
                  </button>
                </div>

                {/* Guarantee */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 font-medium mb-1">
                    🛡️ Đảm bảo hoàn tiền 30 ngày
                  </p>
                  <p className="text-xs text-green-700">
                    Không hài lòng? Chúng tôi hoàn tiền 100%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
