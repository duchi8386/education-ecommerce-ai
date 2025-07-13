import React from 'react';
import { Sparkles, Brain } from 'lucide-react';

interface EmptyStateProps {
  totalViewed: number;
  totalLiked: number;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  totalViewed,
  totalLiked
}) => {
  const hasUserData = totalViewed > 0 || totalLiked > 0;

  return (
    <div className="text-center py-8 animate-fade-in">
      <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-bounce hover:text-purple-500 transition-colors duration-300" />
      <h3 className="text-lg font-semibold text-gray-700 mb-2 hover:text-gray-800 transition-colors duration-200">
        Khám phá khóa học phù hợp với bạn
      </h3>
      <p className="text-gray-500 mb-6 hover:text-gray-600 transition-colors duration-200">
        AI sẽ phân tích hành vi học tập và đề xuất khóa học tốt nhất dựa trên những gì bạn đã xem và thích
      </p>
      
      {/* Hiển thị thông tin hành vi hiện tại */}
      {hasUserData && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:shadow-md hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-center space-x-8 mb-3">
            <div className="text-center group cursor-pointer hover:scale-110 transition-transform duration-200">
              <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-200">{totalViewed}</div>
              <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Đã xem</div>
            </div>
            <div className="text-center group cursor-pointer hover:scale-110 transition-transform duration-200">
              <div className="text-2xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors duration-200">{totalLiked}</div>
              <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Đã thích</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 hover:text-gray-700 transition-colors duration-200">
            AI đã thu thập {totalViewed + totalLiked} dữ liệu hoạt động của bạn
          </p>
        </div>
      )}

      {/* Tips cho user mới */}
      {!hasUserData && (
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:border-yellow-300 hover:shadow-md transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-center space-x-2 mb-2 group">
            <Brain className="h-5 w-5 text-yellow-600 group-hover:text-yellow-700 transition-colors duration-200" />
            <span className="font-semibold text-yellow-800 group-hover:text-yellow-900 transition-colors duration-200">Mẹo để có gợi ý tốt hơn:</span>
          </div>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li className="hover:text-yellow-800 transition-colors duration-200 hover:scale-105 transform cursor-pointer">• Xem chi tiết các khóa học quan tâm</li>
            <li className="hover:text-yellow-800 transition-colors duration-200 hover:scale-105 transform cursor-pointer">• Thêm khóa học vào danh sách yêu thích</li>
            <li className="hover:text-yellow-800 transition-colors duration-200 hover:scale-105 transform cursor-pointer">• Tìm kiếm các chủ đề bạn muốn học</li>
          </ul>
        </div>
      )}

      <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2 group cursor-pointer hover:scale-105 transition-transform duration-200">
          <div className="w-3 h-3 bg-purple-500 rounded-full group-hover:bg-purple-600 transition-colors duration-200 group-hover:scale-110"></div>
          <span className="group-hover:text-gray-700 transition-colors duration-200">Phân tích hành vi</span>
        </div>
        <div className="flex items-center space-x-2 group cursor-pointer hover:scale-105 transition-transform duration-200">
          <div className="w-3 h-3 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors duration-200 group-hover:scale-110"></div>
          <span className="group-hover:text-gray-700 transition-colors duration-200">Học máy thông minh</span>
        </div>
        <div className="flex items-center space-x-2 group cursor-pointer hover:scale-105 transition-transform duration-200">
          <div className="w-3 h-3 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors duration-200 group-hover:scale-110"></div>
          <span className="group-hover:text-gray-700 transition-colors duration-200">Cá nhân hóa</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyState; 