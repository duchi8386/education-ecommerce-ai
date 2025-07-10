import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Clock, MessageCircle, BookOpen } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import SearchBar from '../ui/SearchBar';

const Header: React.FC = () => {
  const location = useLocation();
  const { state, dispatch } = useAppContext();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">EduCommerce AI</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Khám phá</span>
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                isActive('/favorites') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Yêu thích</span>
              {state.favoriteProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.favoriteProducts.length}
                </span>
              )}
            </Link>

            <Link
              to="/history"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/history') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Lịch sử</span>
            </Link>

            <button
              onClick={() => dispatch({ type: 'SET_CHAT_OPEN', payload: !state.isChatOpen })}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">AI Chat</span>
            </button>
          </nav>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header; 