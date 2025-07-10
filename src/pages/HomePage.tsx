import React, { useState, useMemo } from "react";
import { Filter, Grid, List, Sparkles, TrendingUp } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { mockProducts } from "../data/mockData";
import ProductCard from "../components/ui/ProductCard";
import ProductModal from "../components/ui/ProductModal";
import FilterSidebar from "../components/ui/FilterSidebar";
import AIRecommendations from "../components/features/AIRecommendations";
import HeroSection from "../components/features/HeroSection";
import SkeletonCard from "../components/ui/SkeletonCard";

const HomePage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    // Search
    if (state.searchQuery) {
      products = products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          product.instructor
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          product.shortDescription
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
      );
    }

    // Category filter
    if (state.filters.category) {
      products = products.filter(
        (product) => product.category === state.filters.category
      );
    }

    // Price range filter
    if (state.filters.priceRange) {
      const { min, max } = state.filters.priceRange;
      products = products.filter(
        (product) =>
          product.price >= min && (max === Infinity || product.price <= max)
      );
    }

    // Level filter
    if (state.filters.level && state.filters.level.length > 0) {
      products = products.filter((product) =>
        state.filters.level!.includes(product.level)
      );
    }

    // Sort
    if (state.filters.sortBy) {
      switch (state.filters.sortBy) {
        case "price-asc":
          products.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          products.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          products.sort((a, b) => b.rating - a.rating);
          break;
        case "popular":
          products.sort((a, b) => b.students - a.students);
          break;
        case "newest":
          products.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        default:
          break;
      }
    }

    return products;
  }, [mockProducts, state.searchQuery, state.filters]);

  const handleViewDetails = (product: any) => {
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
    dispatch({ type: "SET_PRODUCT_MODAL_OPEN", payload: true });
  };

  const handleCloseModal = () => {
    dispatch({ type: "SET_PRODUCT_MODAL_OPEN", payload: false });
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: null });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* AI Recommendations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AIRecommendations />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Filter Sidebar */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <FilterSidebar isOpen={true} onClose={() => {}} />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Mobile Filter Button & View Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  <span>Bộ lọc</span>
                </button>

                <h2 className="text-xl font-semibold text-gray-900">
                  Khóa học ({filteredProducts.length})
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${
                      viewMode === "grid"
                        ? "bg-primary-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${
                      viewMode === "list"
                        ? "bg-primary-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {state.isLoading && (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            )}

            {/* Products Grid/List */}
            {!state.isLoading && (
              <>
                {filteredProducts.length > 0 ? (
                  <div
                    className={`grid gap-6 ${
                      viewMode === "grid"
                        ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                        : "grid-cols-1"
                    }`}
                  >
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Không tìm thấy khóa học phù hợp
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
                    </p>
                    <button
                      onClick={() => {
                        dispatch({ type: "SET_FILTERS", payload: {} });
                        dispatch({ type: "SET_SEARCH_QUERY", payload: "" });
                      }}
                      className="btn-primary"
                    >
                      Xóa bộ lọc
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      {/* <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      /> */}

      {/* Product Modal */}
      <ProductModal
        product={state.selectedProduct}
        isOpen={state.isProductModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default HomePage;
