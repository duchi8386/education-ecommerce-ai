import { Product, UserBehavior, RecommendationContext, SmartRecommendation, ViewHistoryItem } from '../types';

export class RecommendationService {
  
  /**
   * Phân tích hành vi người dùng từ localStorage và context
   */
  static analyzeUserBehavior(
    favoriteProducts: string[],
    viewHistory: ViewHistoryItem[],
    searchQuery: string,
    allProducts: Product[]
  ): UserBehavior {
    const viewedProducts = viewHistory.map(item => item.productId);
    const likedProducts = favoriteProducts;
    
    // Phân tích sở thích danh mục
    const categoryPreferences: { [category: string]: number } = {};
    const levelPreferences: { [level: string]: number } = {};
    const instructorPreferences: { [instructor: string]: number } = {};
    const tagPreferences: { [tag: string]: number } = {};
    
    // Tính điểm sở thích dựa trên lịch sử xem và yêu thích
    [...viewedProducts, ...likedProducts].forEach(productId => {
      const product = allProducts.find(p => p.id === productId);
      if (product) {
        // Danh mục (liked products có trọng số cao hơn)
        const weight = likedProducts.includes(productId) ? 3 : 1;
        categoryPreferences[product.category] = (categoryPreferences[product.category] || 0) + weight;
        levelPreferences[product.level] = (levelPreferences[product.level] || 0) + weight;
        instructorPreferences[product.instructor] = (instructorPreferences[product.instructor] || 0) + weight;
        
        // Tags
        product.tags.forEach(tag => {
          tagPreferences[tag] = (tagPreferences[tag] || 0) + weight;
        });
      }
    });
    
    // Phân tích khoảng giá yêu thích
    const likedProductsPrices = likedProducts
      .map(id => allProducts.find(p => p.id === id)?.price)
      .filter(price => price !== undefined) as number[];
    
    let priceRange = { min: 0, max: Infinity };
    if (likedProductsPrices.length > 0) {
      const avgPrice = likedProductsPrices.reduce((sum, price) => sum + price, 0) / likedProductsPrices.length;
      priceRange = {
        min: Math.max(0, avgPrice - 500000),
        max: avgPrice + 500000
      };
    }
    
    return {
      viewedProducts,
      likedProducts,
      searchHistory: searchQuery ? [searchQuery] : [],
      categoryPreferences,
      levelPreferences,
      instructorPreferences,
      tagPreferences,
      priceRange,
      lastActiveAt: new Date()
    };
  }

  /**
   * Tính điểm similarity giữa 2 sản phẩm
   */
  static calculateProductSimilarity(product1: Product, product2: Product): number {
    let similarity = 0;
    
    // Cùng danh mục
    if (product1.category === product2.category) similarity += 0.3;
    
    // Cùng level
    if (product1.level === product2.level) similarity += 0.2;
    
    // Cùng instructor
    if (product1.instructor === product2.instructor) similarity += 0.2;
    
    // Tags chung
    const commonTags = product1.tags.filter(tag => product2.tags.includes(tag));
    similarity += (commonTags.length / Math.max(product1.tags.length, product2.tags.length)) * 0.3;
    
    return similarity;
  }

  /**
   * Generate recommendations dựa trên hành vi người dùng
   */
  static generateSmartRecommendations(
    userBehavior: UserBehavior,
    allProducts: Product[],
    excludeProductIds: string[] = []
  ): SmartRecommendation[] {
    const recommendations: SmartRecommendation[] = [];
    
    // Lọc sản phẩm đã xem/thích
    const candidateProducts = allProducts.filter(
      product => !excludeProductIds.includes(product.id) && 
                 !userBehavior.viewedProducts.includes(product.id) &&
                 !userBehavior.likedProducts.includes(product.id)
    );

    candidateProducts.forEach(product => {
      let score = 0;
      let reason = '';
      let type: SmartRecommendation['type'] = 'behavior_based';
      
      // 1. Điểm dựa trên danh mục yêu thích
      const categoryScore = (userBehavior.categoryPreferences[product.category] || 0) / 10;
      score += categoryScore * 0.3;
      
      // 2. Điểm dựa trên level yêu thích
      const levelScore = (userBehavior.levelPreferences[product.level] || 0) / 10;
      score += levelScore * 0.2;
      
      // 3. Điểm dựa trên instructor
      const instructorScore = (userBehavior.instructorPreferences[product.instructor] || 0) / 10;
      score += instructorScore * 0.15;
      
      // 4. Điểm dựa trên tags
      let tagScore = 0;
      product.tags.forEach(tag => {
        tagScore += (userBehavior.tagPreferences[tag] || 0) / 20;
      });
      score += tagScore * 0.25;
      
      // 5. Điểm dựa trên sản phẩm tương tự đã xem
      let similarityScore = 0;
      userBehavior.likedProducts.forEach(likedId => {
        const likedProduct = allProducts.find(p => p.id === likedId);
        if (likedProduct) {
          const similarity = this.calculateProductSimilarity(product, likedProduct);
          similarityScore = Math.max(similarityScore, similarity);
        }
      });
      score += similarityScore * 0.1;
      
      // 6. Điểm dựa trên khoảng giá
      if (product.price >= userBehavior.priceRange.min && product.price <= userBehavior.priceRange.max) {
        score += 0.1;
      }
      
      // 7. Bonus cho sản phẩm chất lượng cao
      if (product.rating >= 4.5) score += 0.05;
      if (product.students >= 10000) score += 0.05;
      
      // Tạo reason dựa trên điểm cao nhất
      if (categoryScore > 0.5) {
        reason = `Bạn đã quan tâm đến ${userBehavior.categoryPreferences[product.category]} khóa học ${product.category}`;
        type = 'category_preference';
      } else if (instructorScore > 0.3) {
        reason = `Bạn đã theo dõi các khóa học của ${product.instructor}`;
        type = 'behavior_based';
      } else if (similarityScore > 0.4) {
        reason = `Tương tự với các khóa học bạn đã thích`;
        type = 'similar_viewed';
      } else if (tagScore > 0.3) {
        const topTags = product.tags.filter(tag => userBehavior.tagPreferences[tag] > 0);
        reason = `Phù hợp với sở thích ${topTags.slice(0, 2).join(', ')}`;
        type = 'behavior_based';
      } else {
        reason = `Được đề xuất dựa trên hoạt động học tập của bạn`;
        type = 'behavior_based';
      }
      
      if (score > 0.1) { // Chỉ gợi ý sản phẩm có điểm đủ cao
        recommendations.push({
          product,
          reason,
          confidence: Math.min(score, 1),
          score,
          type
        });
      }
    });
    
    // Sắp xếp theo điểm và lấy top recommendations
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }

  /**
   * Fallback recommendations cho user mới
   */
  static generateFallbackRecommendations(allProducts: Product[]): SmartRecommendation[] {
    const popularProducts = allProducts
      .filter(product => product.rating >= 4.5 && product.students >= 5000)
      .sort((a, b) => b.students - a.students)
      .slice(0, 6);
    
    return popularProducts.map(product => ({
      product,
      reason: `Khóa học phổ biến với ${product.students.toLocaleString()} học viên`,
      confidence: 0.7,
      score: 0.7,
      type: 'collaborative' as const
    }));
  }
} 