"use client";

import React, { useState } from "react";
import {
  Sparkles,
  RefreshCw,
  TrendingUp,
  Zap,
  Brain,
  Target,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { mockProducts } from "../../data/mockData";
import ProductCard from "../ui/ProductCard";

const AIRecommendations: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(
    mockProducts.slice(0, 3) // Initial recommendations
  );
  const [recommendationType, setRecommendationType] = useState<
    "personalized" | "trending" | "similar"
  >("personalized");

  const handleGetRecommendations = async () => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock AI recommendations logic
      let newRecommendations;

      if (recommendationType === "personalized") {
        // Simulate personalized recommendations based on user history
        const userHistory = state.viewHistory.map((item) => item.productId);
        const viewedProducts = mockProducts.filter((p) =>
          userHistory.includes(p.id)
        );
        const categories = [...new Set(viewedProducts.map((p) => p.category))];

        if (categories.length > 0) {
          newRecommendations = mockProducts
            .filter(
              (p) =>
                categories.includes(p.category) && !userHistory.includes(p.id)
            )
            .slice(0, 3);
        } else {
          newRecommendations = mockProducts
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);
        }
      } else if (recommendationType === "trending") {
        // Trending courses (most popular)
        newRecommendations = mockProducts
          .sort((a, b) => b.students - a.students)
          .slice(0, 3);
      } else {
        // Similar to recently viewed
        const recentlyViewed = state.viewHistory[0];
        if (recentlyViewed) {
          const recentProduct = mockProducts.find(
            (p) => p.id === recentlyViewed.productId
          );
          if (recentProduct) {
            newRecommendations = mockProducts
              .filter(
                (p) =>
                  p.category === recentProduct.category &&
                  p.id !== recentProduct.id
              )
              .slice(0, 3);
          }
        }

        if (!newRecommendations || newRecommendations.length === 0) {
          newRecommendations = mockProducts.slice(3, 6);
        }
      }

      setRecommendations(newRecommendations || mockProducts.slice(0, 3));
    } catch (error) {
      console.error("Error getting recommendations:", error);
      // Handle error - could show toast notification
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (product: any) => {
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
    dispatch({ type: "SET_PRODUCT_MODAL_OPEN", payload: true });
  };

  const recommendationTypes = [
    {
      key: "personalized" as const,
      label: "Dành cho bạn",
      icon: Target,
      description: "Dựa trên lịch sử học tập",
      color: "text-purple-600 bg-purple-100",
    },
    {
      key: "trending" as const,
      label: "Thịnh hành",
      icon: TrendingUp,
      description: "Khóa học hot nhất",
      color: "text-green-600 bg-green-100",
    },
    {
      key: "similar" as const,
      label: "Tương tự",
      icon: Brain,
      description: "Giống khóa học đã xem",
      color: "text-blue-600 bg-blue-100",
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="mb-4 lg:mb-0">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-900">
              Gợi ý thông minh từ AI
            </h2>
          </div>
          <p className="text-gray-600">
            Hệ thống AI phân tích sở thích và đề xuất khóa học phù hợp nhất cho
            bạn
          </p>
        </div>

        <button
          onClick={handleGetRecommendations}
          disabled={isLoading}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Đang phân tích...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Làm mới gợi ý
            </>
          )}
        </button>
      </div>

      {/* Recommendation Type Selector */}
      <div className="flex flex-wrap gap-3 mb-6">
        {recommendationTypes.map((type) => (
          <button
            key={type.key}
            onClick={() => setRecommendationType(type.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              recommendationType === type.key
                ? `${type.color} border border-current`
                : "text-gray-600 bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <type.icon className="h-4 w-4" />
            <span>{type.label}</span>
          </button>
        ))}
      </div>

      {/* Recommendations Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl h-96 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((product, index) => (
            <div key={product.id} className="relative group">
              {/* AI Badge */}
              <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center space-x-1">
                <Sparkles className="h-3 w-3" />
                <span>AI gợi ý</span>
              </div>

              <ProductCard
                product={product}
                onViewDetails={handleViewDetails}
              />

              {/* Recommendation reason */}
              <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-gray-700">
                    {recommendationType === "personalized" &&
                      "Phù hợp với sở thích của bạn"}
                    {recommendationType === "trending" &&
                      `${product.students.toLocaleString()} học viên đang theo học`}
                    {recommendationType === "similar" &&
                      "Tương tự khóa học bạn đã xem"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Insights */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <div className="flex items-start space-x-3">
          <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Thông tin từ AI
            </h3>
            <p className="text-sm text-gray-700">
              Dựa trên phân tích {state.viewHistory.length} khóa học bạn đã xem
              và {state.favoriteProducts.length} khóa học yêu thích, chúng tôi
              nhận thấy bạn quan tâm đến các lĩnh vực công nghệ và phát triển kỹ
              năng cá nhân.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIRecommendations;
