import React from 'react';
import { Brain } from 'lucide-react';
import { UserBehaviorInfo } from '../../../types/recommendation';

interface BehaviorAnalyticsProps {
  userBehaviorInfo: UserBehaviorInfo;
  confidence: number;
  recommendationCount: number;
}

const BehaviorAnalytics: React.FC<BehaviorAnalyticsProps> = ({
  userBehaviorInfo,
  confidence,
  recommendationCount
}) => {
  const getRecommendationTypeLabel = (type: string) => {
    switch (type) {
      case 'behavior_based':
        return 'Dựa trên hành vi';
      case 'category_preference':
        return 'Theo danh mục yêu thích';
      case 'similar_viewed':
        return 'Tương tự đã xem';
      case 'collaborative':
        return 'Phổ biến';
      default:
        return 'Thông minh';
    }
  };

  return (
    <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2 group">
          <Brain className="h-5 w-5 text-blue-600 group-hover:text-blue-700 transition-colors duration-200" />
          <span className="group-hover:text-blue-700 transition-colors duration-200">Phân tích hành vi học tập</span>
        </h3>
        <div className="text-sm text-gray-600 px-3 py-1 bg-white/50 rounded-full hover:bg-white/70 transition-colors duration-200">
          {getRecommendationTypeLabel(userBehaviorInfo.recommendationType)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
        <div className="text-center group hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
            {userBehaviorInfo.totalViewed}
          </div>
          <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Đã xem</div>
        </div>
        <div className="text-center group hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="text-2xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors duration-200">
            {userBehaviorInfo.totalLiked}
          </div>
          <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Đã thích</div>
        </div>
        <div className="text-center col-span-2 group hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
            {userBehaviorInfo.topCategory}
          </div>
          <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Danh mục quan tâm</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          AI đã phân tích{' '}
          {userBehaviorInfo.totalViewed + userBehaviorInfo.totalLiked} hoạt động
          và đề xuất {recommendationCount} khóa học phù hợp nhất
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Độ tin cậy:</span>
          <span className="text-sm font-semibold text-gray-800">
            {Math.round(confidence * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default BehaviorAnalytics; 