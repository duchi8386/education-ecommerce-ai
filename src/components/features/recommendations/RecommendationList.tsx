import React from 'react';
import { Sparkles, Brain } from 'lucide-react';
import { Product } from '../../../types';
import ProductCard from '../../ui/ProductCard';

interface RecommendationListProps {
  recommendations: Product[];
  reasons: string[];
  onViewDetails: (product: Product) => void;
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
  reasons,
  onViewDetails
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((product, index) => (
        <div 
          key={product.id} 
          className="relative group animate-fade-in hover:scale-[1.02] transition-all duration-300 ease-in-out"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* AI Badge */}
          <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            <Sparkles className="h-3 w-3 group-hover:rotate-12 transition-transform duration-200" />
            <span>AI gợi ý</span>
          </div>

          <div className="hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
            <ProductCard
              product={product}
              onViewDetails={onViewDetails}
            />
          </div>

          {/* Lý do gợi ý */}
          <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 group">
            <div className="flex items-start space-x-2">
              <Brain className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0 group-hover:text-purple-700 transition-colors duration-200" />
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1 group-hover:text-gray-900 transition-colors duration-200">
                  Lý do gợi ý:
                </p>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                  {reasons[index] || "Phù hợp với sở thích của bạn"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationList; 