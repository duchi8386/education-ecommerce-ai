import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="relative mb-6">
        <Brain className="h-16 w-16 text-purple-400 mx-auto animate-pulse" />
        <Sparkles className="h-8 w-8 text-blue-400 absolute -top-2 -right-2 animate-bounce" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        AI đang phân tích hành vi học tập...
      </h3>
      
      <div className="flex justify-center space-x-2 mb-4">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      
      <p className="text-gray-500 text-sm">
        Đang tìm kiếm những khóa học phù hợp nhất với bạn...
      </p>
      
      {/* Progress bar animation */}
      <div className="mt-4 max-w-xs mx-auto">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState; 