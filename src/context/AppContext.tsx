import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, FilterOptions, ViewHistoryItem, ChatMessage } from '../types';

interface AppState {
  favoriteProducts: string[];
  viewHistory: ViewHistoryItem[];
  filters: FilterOptions;
  searchQuery: string;
  isLoading: boolean;
  selectedProduct: Product | null;
  chatMessages: ChatMessage[];
  isProductModalOpen: boolean;
  isChatOpen: boolean;
}

type AppAction =
  | { type: 'ADD_TO_FAVORITES'; payload: string }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'ADD_TO_HISTORY'; payload: ViewHistoryItem }
  | { type: 'SET_FILTERS'; payload: FilterOptions }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SELECTED_PRODUCT'; payload: Product | null }
  | { type: 'SET_PRODUCT_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_CHAT_OPEN'; payload: boolean }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'CLEAR_CHAT_MESSAGES' };

const initialState: AppState = {
  favoriteProducts: JSON.parse(localStorage.getItem('favoriteProducts') || '[]'),
  viewHistory: JSON.parse(localStorage.getItem('viewHistory') || '[]'),
  filters: {},
  searchQuery: '',
  isLoading: false,
  selectedProduct: null,
  chatMessages: [],
  isProductModalOpen: false,
  isChatOpen: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_FAVORITES': {
      if (state.favoriteProducts.includes(action.payload)) {
        return state;
      }
      const newFavorites = [...state.favoriteProducts, action.payload];
      localStorage.setItem('favoriteProducts', JSON.stringify(newFavorites));
      return { ...state, favoriteProducts: newFavorites };
    }
    case 'REMOVE_FROM_FAVORITES': {
      const newFavorites = state.favoriteProducts.filter(id => id !== action.payload);
      localStorage.setItem('favoriteProducts', JSON.stringify(newFavorites));
      return { ...state, favoriteProducts: newFavorites };
    }
    case 'ADD_TO_HISTORY': {
      const existingIndex = state.viewHistory.findIndex(item => item.productId === action.payload.productId);
      let newHistory;
      if (existingIndex !== -1) {
        newHistory = [...state.viewHistory];
        newHistory[existingIndex] = action.payload;
      } else {
        newHistory = [action.payload, ...state.viewHistory].slice(0, 50); // Keep only last 50 items
      }
      localStorage.setItem('viewHistory', JSON.stringify(newHistory));
      return { ...state, viewHistory: newHistory };
    }
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProduct: action.payload };
    case 'SET_PRODUCT_MODAL_OPEN':
      return { ...state, isProductModalOpen: action.payload };
    case 'SET_CHAT_OPEN':
      return { ...state, isChatOpen: action.payload };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'CLEAR_CHAT_MESSAGES':
      return { ...state, chatMessages: [] };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 