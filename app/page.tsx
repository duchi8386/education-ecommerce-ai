"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Filter, Grid, List, TrendingUp } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { fetchProducts } from "@/data/mockData";
import { Product } from "@/types";
import ProductCard from "@/components/ui/ProductCard";
import ProductModal from "@/components/ui/ProductModal";
import FilterSidebar from "@/components/ui/FilterSidebar";
import AIRecommendations from "@/components/features/AIRecommendations";
import HeroSection from "@/components/features/HeroSection";
import SkeletonCard from "@/components/ui/SkeletonCard";

export default function HomePage() {
  const { state, dispatch } = useAppContext();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Gọi API lấy danh sách sản phẩm khi component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoadingProducts(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại.");
      } finally {
        setIsLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search
    if (state.searchQuery) {
      filtered = filtered.filter(
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
      filtered = filtered.filter(
        (product) => product.category === state.filters.category
      );
    }

    // Price range filter
    if (state.filters.priceRange) {
      const { min, max } = state.filters.priceRange;
      filtered = filtered.filter(
        (product) =>
          product.price >= min && (max === Infinity || product.price <= max)
      );
    }

    // Level filter
    if (state.filters.level && state.filters.level.length > 0) {
      filtered = filtered.filter((product) =>
        state.filters.level!.includes(product.level)
      );
    }

    // Sort
    if (state.filters.sortBy) {
      switch (state.filters.sortBy) {
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "popular":
          filtered.sort((a, b) => b.students - a.students);
          break;
        case "newest":
          filtered.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        default:
          break;
      }
    }

    return filtered;
  }, [products, state.searchQuery, state.filters]);

  const handleViewDetails = (product: Product) => {
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
    dispatch({ type: "SET_PRODUCT_MODAL_OPEN", payload: true });
  };

  const handleCloseModal = () => {
    dispatch({ type: "SET_PRODUCT_MODAL_OPEN", payload: false });
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: null });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <div className="container mx-auto px-4 py-8">
        {/* AI Recommendations Section */}
        <AIRecommendations />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="lg:w-64 lg:flex-shrink-0  ">
            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  <span>Lọc</span>
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  Khóa học ({filteredProducts.length})
                </h1>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 bg-white border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid"
                        ? "bg-blue-500 text-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list"
                        ? "bg-blue-500 text-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                <p>{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm underline hover:no-underline"
                >
                  Thử lại
                </button>
              </div>
            )}

            {/* Products Grid */}
            {isLoadingProducts ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <TrendingUp className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Không tìm thấy khóa học
                </h3>
                <p className="text-gray-600">
                  Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Modal */}
        {state.isProductModalOpen && state.selectedProduct && (
          <ProductModal
            isOpen={state.isProductModalOpen}
            product={state.selectedProduct}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}
