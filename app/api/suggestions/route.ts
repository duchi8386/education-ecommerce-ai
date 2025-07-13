import { NextRequest, NextResponse } from "next/server";
import { RecommendationService } from "../../../src/services/recommendationService";
import { fetchProducts } from "../../../src/data/mockData";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      userId: _userId = "default", 
      favoriteProducts = [], 
      viewHistory = [], 
      searchQuery = "" 
    } = body;

    // Lấy tất cả sản phẩm để phân tích
    const allProducts = await fetchProducts();

    // Phân tích hành vi người dùng
    const userBehavior = RecommendationService.analyzeUserBehavior(
      favoriteProducts,
      viewHistory,
      searchQuery,
      allProducts
    );

    // Generate recommendations thông minh
    let recommendations = RecommendationService.generateSmartRecommendations(
      userBehavior,
      allProducts
    );

    // Nếu không có đủ recommendations, sử dụng fallback
    if (recommendations.length < 3) {
      const fallbackRecommendations = RecommendationService.generateFallbackRecommendations(allProducts);
      recommendations = [
        ...recommendations,
        ...fallbackRecommendations.slice(0, 6 - recommendations.length)
      ];
    }

    // Tính confidence tổng thể
    const averageConfidence = recommendations.length > 0 
      ? recommendations.reduce((sum, rec) => sum + rec.confidence, 0) / recommendations.length
      : 0.5;

    return NextResponse.json({
      success: true,
      data: {
        products: recommendations.map(rec => rec.product),
        reasons: recommendations.map(rec => rec.reason),
        confidence: averageConfidence,
        userBehavior: {
          totalViewed: userBehavior.viewedProducts.length,
          totalLiked: userBehavior.likedProducts.length,
          topCategory: Object.keys(userBehavior.categoryPreferences).sort((a, b) => 
            userBehavior.categoryPreferences[b] - userBehavior.categoryPreferences[a]
          )[0] || "Chưa xác định",
          recommendationType: recommendations.length > 0 ? recommendations[0].type : "collaborative"
        }
      },
    });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Không thể lấy gợi ý lúc này",
      },
      { status: 500 }
    );
  }
} 