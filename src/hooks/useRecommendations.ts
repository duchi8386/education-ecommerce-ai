import { useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  UseRecommendationsReturn, 
  RecommendationApiRequest, 
  RecommendationApiResponse,
  UserBehaviorInfo 
} from '../types/recommendation';
import { Product } from '../types';

export const useRecommendations = (): UseRecommendationsReturn => {
  const { state, dispatch } = useAppContext();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [reasons, setReasons] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<number>(0);
  const [userBehaviorInfo, setUserBehaviorInfo] = useState<UserBehaviorInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const requestData: RecommendationApiRequest = {
        userId: "user1", // TODO: Get from auth context
        favoriteProducts: state.favoriteProducts,
        viewHistory: state.viewHistory,
        searchQuery: state.searchQuery
      };

      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: RecommendationApiResponse = await response.json();

      if (result.success) {
        setRecommendations(result.data.products);
        setReasons(result.data.reasons);
        setConfidence(result.data.confidence);
        setUserBehaviorInfo(result.data.userBehavior);
      } else {
        throw new Error(result.error || "API returned error");
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Không thể lấy gợi ý lúc này. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  }, [state.favoriteProducts, state.viewHistory, state.searchQuery]);

  const handleViewDetails = useCallback((product: Product) => {
    // Add to view history to improve recommendations
    dispatch({ 
      type: "ADD_TO_HISTORY", 
      payload: { 
        productId: product.id, 
        viewedAt: new Date() 
      } 
    });
    
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
    dispatch({ type: "SET_PRODUCT_MODAL_OPEN", payload: true });
  }, [dispatch]);

  return {
    recommendations,
    reasons,
    confidence,
    userBehaviorInfo,
    isLoading,
    error,
    fetchRecommendations,
    handleViewDetails
  };
}; 