import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { mockProducts } from '../data/mockData';
import ProductCard from '../components/ui/ProductCard';
import ProductModal from '../components/ui/ProductModal';

const FavoritesPage: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const favoriteProducts = mockProducts.filter(product => 
    state.favoriteProducts.includes(product.id)
  );

  const handleViewDetails = (product: any) => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
    dispatch({ type: 'SET_PRODUCT_MODAL_OPEN', payload: true });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'SET_PRODUCT_MODAL_OPEN', payload: false });
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: null });
  };

  const handleClearAllFavorites = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả khóa học yêu thích?')) {
      state.favoriteProducts.forEach(productId => {
        dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId });
      });
    }
  };

  const totalValue = favoriteProducts.reduce((sum, product) => sum + product.price, 0);
  const totalOriginalValue = favoriteProducts.reduce((sum, product) => 
    sum + (product.originalPrice || product.price), 0
  );
  const totalSavings = totalOriginalValue - totalValue;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Heart className="h-8 w-8 text-red-500 mr-3 fill-current" />
                Khóa học yêu thích
              </h1>
              <p className="text-gray-600 mt-2">
                {favoriteProducts.length} khóa học đã được lưu vào danh sách yêu thích
              </p>
            </div>
            
            {favoriteProducts.length > 0 && (
              <button
                onClick={handleClearAllFavorites}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Xóa tất cả</span>
              </button>
            )}
          </div>
        </div>

        {favoriteProducts.length > 0 ? (
          <>
            {/* Summary Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Tổng giá trị</h3>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(totalValue)}
                    </span>
                    {totalSavings > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(totalOriginalValue)}
                      </span>
                    )}
                  </div>
                </div>
                
                {totalSavings > 0 && (
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Tiết kiệm</h3>
                    <span className="text-2xl font-bold text-green-600">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(totalSavings)}
                    </span>
                  </div>
                )}

                <div className="flex justify-center md:justify-end">
                  <button className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Thêm tất cả vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                  
                  {/* Quick Actions */}
                  <div className="absolute top-3 right-12 flex space-x-2">
                    <button
                      onClick={() => {
                        // Add to cart logic would go here
                        console.log('Added to cart:', product.name);
                      }}
                      className="p-2 bg-white/90 hover:bg-white text-gray-600 hover:text-primary-600 rounded-full shadow-md transition-colors"
                      title="Thêm vào giỏ hàng"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-6 text-gray-300">
              <Heart className="w-full h-full" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Chưa có khóa học yêu thích
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Hãy khám phá và thêm những khóa học mà bạn quan tâm vào danh sách yêu thích để dễ dàng theo dõi.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Heart className="h-5 w-5 mr-2" />
              Khám phá khóa học
            </a>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={state.selectedProduct}
        isOpen={state.isProductModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default FavoritesPage; 