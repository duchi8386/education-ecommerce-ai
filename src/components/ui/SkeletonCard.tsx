import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-200"></div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Category & Level */}
        <div className="flex items-center justify-between mb-2">
          <div className="h-5 bg-gray-200 rounded w-20"></div>
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Title */}
        <div className="space-y-2 mb-2">
          <div className="h-5 bg-gray-200 rounded w-full"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Instructor */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>

        {/* Description */}
        <div className="space-y-1 mb-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="h-3 bg-gray-200 rounded w-12"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-12"></div>
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard; 