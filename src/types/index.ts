export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  reviews: number;
  students: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: string[];
  viewHistory: string[];
  favoriteProducts: string[];
}

export interface FilterOptions {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  level?: string[];
  rating?: number;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';
}

export interface AIRecommendation {
  id: string;
  productId: string;
  reason: string;
  confidence: number;
  type: 'similar' | 'popular' | 'personalized' | 'trending';
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  products?: Product[];
}

export interface ViewHistoryItem {
  productId: string;
  viewedAt: Date;
}

// Thêm interface cho user behavior analytics
export interface UserBehavior {
  viewedProducts: string[];
  likedProducts: string[];
  searchHistory: string[];
  categoryPreferences: { [category: string]: number };
  levelPreferences: { [level: string]: number };
  instructorPreferences: { [instructor: string]: number };
  tagPreferences: { [tag: string]: number };
  priceRange: { min: number; max: number };
  lastActiveAt: Date;
}

export interface RecommendationContext {
  userBehavior: UserBehavior;
  currentUser: string;
  contextualData?: {
    timeOfDay?: string;
    dayOfWeek?: string;
    recentSearches?: string[];
  };
}

export interface SmartRecommendation {
  product: Product;
  reason: string;
  confidence: number;
  score: number;
  type: 'behavior_based' | 'similar_viewed' | 'category_preference' | 'collaborative';
} 