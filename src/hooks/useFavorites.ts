import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { Product } from '../types';

export const useFavorites = () => {
  const { state, dispatch } = useAppContext();
  const { addToast } = useToast();

  const toggleFavorite = useCallback((product: Product) => {
    const isFavorite = state.favoriteProducts.includes(product.id);
    
    if (isFavorite) {
      // Remove from favorites
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: product.id });
      
      addToast({
        type: 'info',
        message: `💔 Đã xóa "${product.name}" khỏi danh sách yêu thích`,
        duration: 3000,
        action: {
          label: 'Hoàn tác',
          onClick: () => {
            dispatch({ type: "ADD_TO_FAVORITES", payload: product.id });
            addToast({
              type: 'success',
              message: `❤️ Đã thêm lại "${product.name}" vào yêu thích`,
              duration: 2000
            });
          }
        }
      });
    } else {
      // Add to favorites
      dispatch({ type: "ADD_TO_FAVORITES", payload: product.id });
      
      addToast({
        type: 'success',
        message: `❤️ Đã thêm "${product.name}" vào danh sách yêu thích`,
        duration: 3000,
        action: {
          label: 'Xem danh sách',
          onClick: () => {
            // Navigate to favorites page
            window.location.href = '/favorites';
          }
        }
      });
    }
  }, [state.favoriteProducts, dispatch, addToast]);

  const addToFavorites = useCallback((product: Product) => {
    if (!state.favoriteProducts.includes(product.id)) {
      dispatch({ type: "ADD_TO_FAVORITES", payload: product.id });
      
      addToast({
        type: 'success',
        message: `❤️ Đã thêm "${product.name}" vào yêu thích`,
        duration: 3000,
        action: {
          label: 'Xem danh sách',
          onClick: () => window.location.href = '/favorites'
        }
      });
    }
  }, [state.favoriteProducts, dispatch, addToast]);

  const removeFromFavorites = useCallback((product: Product) => {
    if (state.favoriteProducts.includes(product.id)) {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: product.id });
      
      addToast({
        type: 'info',
        message: `💔 Đã xóa "${product.name}" khỏi yêu thích`,
        duration: 3000,
        action: {
          label: 'Hoàn tác',
          onClick: () => addToFavorites(product)
        }
      });
    }
  }, [state.favoriteProducts, dispatch, addToast, addToFavorites]);

  const isFavorite = useCallback((productId: string) => {
    return state.favoriteProducts.includes(productId);
  }, [state.favoriteProducts]);

  return {
    favoriteProducts: state.favoriteProducts,
    toggleFavorite,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
}; 