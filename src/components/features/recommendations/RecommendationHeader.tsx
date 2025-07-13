import React from 'react';
import { Brain, Sparkles, RefreshCw } from 'lucide-react';

interface RecommendationHeaderProps {
  onGetSuggestions: () => void;
  isLoading: boolean;
}

const RecommendationHeader: React.FC<RecommendationHeaderProps> = ({
  onGetSuggestions,
  isLoading
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Gợi ý AI cho bạn
          </h2>
          <p className="text-gray-600">
            Khám phá những khóa học phù hợp với sở thích của bạn
          </p>
        </div>
      </div>

      <button
        onClick={onGetSuggestions}
        disabled={isLoading}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out group ${
          isLoading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 hover:shadow-lg active:scale-95 shadow-md"
        }`}
      >
        {isLoading ? (
          <>
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span className="animate-pulse">Đang phân tích...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
            <span className="group-hover:tracking-wide transition-all duration-200">Gợi ý sản phẩm phù hợp</span>
          </>
        )}
      </button>
    </div>
  );
};

export default RecommendationHeader; 