"use client";

import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useRecommendations } from "../../hooks/useRecommendations";
import {
  BehaviorAnalytics,
  RecommendationHeader,
  RecommendationList,
  EmptyState,
  ErrorMessage,
  LoadingState,
} from "./recommendations";

const AIRecommendations: React.FC = () => {
  const { state } = useAppContext();
  const {
    recommendations,
    reasons,
    confidence,
    userBehaviorInfo,
    isLoading,
    error,
    fetchRecommendations,
    handleViewDetails,
  } = useRecommendations();

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg mb-8 hover:shadow-xl transition-all duration-500 ease-in-out hover:scale-[1.005] border border-purple-100 hover:border-purple-200 animate-fade-in">
      <RecommendationHeader
        onGetSuggestions={fetchRecommendations}
        isLoading={isLoading}
      />

      {error && <ErrorMessage error={error} />}

      {isLoading && <LoadingState />}

      {recommendations.length > 0 && !isLoading && (
        <div>
          {userBehaviorInfo && (
            <BehaviorAnalytics
              userBehaviorInfo={userBehaviorInfo}
              confidence={confidence}
              recommendationCount={recommendations.length}
            />
          )}

          <RecommendationList
            recommendations={recommendations}
            reasons={reasons}
            onViewDetails={handleViewDetails}
          />
        </div>
      )}

      {recommendations.length === 0 && !isLoading && !error && (
        <EmptyState
          totalViewed={state.viewHistory.length}
          totalLiked={state.favoriteProducts.length}
        />
      )}
    </div>
  );
};

export default AIRecommendations;
