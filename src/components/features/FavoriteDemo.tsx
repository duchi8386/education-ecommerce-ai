import React from 'react';
import { Heart, TestTube } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const FavoriteDemo: React.FC = () => {
  const { addToast } = useToast();

  const testFavoriteAdd = () => {
    addToast({
      type: 'success',
      message: '❤️ Đã thêm "React Complete Course" vào yêu thích',
      duration: 4000,
      action: {
        label: 'Xem danh sách',
        onClick: () => {
          addToast({
            type: 'info',
            message: '📚 Chuyển đến trang yêu thích...',
            duration: 2000
          });
        }
      }
    });
  };

  const testFavoriteRemove = () => {
    addToast({
      type: 'info',
      message: '💔 Đã xóa "Machine Learning Course" khỏi yêu thích',
      duration: 4000,
      action: {
        label: 'Hoàn tác',
        onClick: () => {
          addToast({
            type: 'success',
            message: '❤️ Đã thêm lại "Machine Learning Course" vào yêu thích',
            duration: 2000
          });
        }
      }
    });
  };

  const testError = () => {
    addToast({
      type: 'error',
      message: '⚠️ Không thể thêm vào yêu thích. Vui lòng thử lại.',
      duration: 3000
    });
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <TestTube className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-800">Test Hệ thống Yêu thích</h3>
      </div>
      
      <p className="text-gray-600 mb-4 text-sm">
        Click các nút bên dưới để test toast notifications và popup yêu thích:
      </p>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={testFavoriteAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 transform hover:scale-105"
        >
          <Heart className="h-4 w-4 fill-current" />
          <span>Test Thêm Yêu thích</span>
        </button>
        
        <button
          onClick={testFavoriteRemove}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105"
        >
          <Heart className="h-4 w-4" />
          <span>Test Xóa Yêu thích</span>
        </button>
        
        <button
          onClick={testError}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 transform hover:scale-105"
        >
          <Heart className="h-4 w-4" />
          <span>Test Lỗi</span>
        </button>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        💡 Tip: Click vào heart icon ở góc product cards để test popup + toast thật!
      </div>
    </div>
  );
};

export default FavoriteDemo; 