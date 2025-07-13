import { Product } from './index';

export interface UserBehaviorInfo {
  totalViewed: number;
  totalLiked: number;
  topCategory: string;
  recommendationType: 'behavior_based' | 'category_preference' | 'similar_viewed' | 'collaborative';
}

export interface RecommendationApiRequest {
  userId: string;
  favoriteProducts: string[];
  viewHistory: Array<{
    productId: string;
    viewedAt: Date;
  }>;
  searchQuery: string;
}

export interface RecommendationApiResponse {
  success: boolean;
  data: {
    products: Product[];
    reasons: string[];
    confidence: number;
    userBehavior: UserBehaviorInfo;
  };
  error?: string;
}

export interface UseRecommendationsReturn {
  recommendations: Product[];
  reasons: string[];
  confidence: number;
  userBehaviorInfo: UserBehaviorInfo | null;
  isLoading: boolean;
  error: string | null;
  fetchRecommendations: () => Promise<void>;
  handleViewDetails: (product: Product) => void;
} 