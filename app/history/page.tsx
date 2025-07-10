"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, Search, Filter, Trash2, Eye } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { mockProducts } from "@/data/mockData";
import ProductCard from "@/components/ui/ProductCard";
import ProductModal from "@/components/ui/ProductModal";

export default function HistoryPage() {
  const { state, dispatch } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "alphabetical">("recent");

  // Get products from view history
  const historyProducts = state.viewHistory
    .map((historyItem) => {
      const product = mockProducts.find((p) => p.id === historyItem.productId);
      return product ? { ...product, viewedAt: historyItem.viewedAt } : null;
    })
    .filter(Boolean) as any[];

  // Filter and sort history
  const filteredHistory = historyProducts
    .filter(
      (product) =>
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime();
      } else {
        return a.name.localeCompare(b.name);
      }
    });

  const handleViewDetails = (product: any) => {
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
    dispatch({ type: "SET_PRODUCT_MODAL_OPEN", payload: true });
  };

  const handleCloseModal = () => {
    dispatch({ type: "SET_PRODUCT_MODAL_OPEN", payload: false });
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: null });
  };

  const handleClearHistory = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử xem?")) {
      localStorage.removeItem("viewHistory");
      // Reset state
      dispatch({
        type: "ADD_TO_HISTORY",
        payload: { productId: "", viewedAt: new Date() },
      });
      window.location.reload();
    }
  };

  const handleRemoveItem = (productId: string) => {
    const newHistory = state.viewHistory.filter(
      (item) => item.productId !== productId
    );
    localStorage.setItem("viewHistory", JSON.stringify(newHistory));
    window.location.reload();
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours =
      (now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Vừa xem";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} giờ trước`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)} ngày trước`;
    } else {
      return new Date(date).toLocaleDateString("vi-VN");
    }
  };

  const groupByDate = (products: any[]) => {
    const groups: { [key: string]: any[] } = {};

    products.forEach((product) => {
      const date = new Date(product.viewedAt);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let groupKey;
      if (date.toDateString() === today.toDateString()) {
        groupKey = "Hôm nay";
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupKey = "Hôm qua";
      } else if (date > new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)) {
        groupKey = "Tuần này";
      } else {
        groupKey = "Cũ hơn";
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(product);
    });

    return groups;
  };

  const groupedHistory = groupByDate(filteredHistory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Clock className="h-8 w-8 text-blue-500 mr-3" />
                Lịch sử xem
              </h1>
              <p className="text-gray-600 mt-2">
                {state.viewHistory.length} khóa học đã xem gần đây
              </p>
            </div>

            {state.viewHistory.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Xóa lịch sử</span>
              </button>
            )}
          </div>
        </div>

        {state.viewHistory.length > 0 ? (
          <>
            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm trong lịch sử..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>

                {/* Sort */}
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">
                    Sắp xếp:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "recent" | "alphabetical")
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="recent">Xem gần nhất</option>
                    <option value="alphabetical">Theo tên A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* History Content */}
            {sortBy === "recent" ? (
              /* Grouped by Date */
              <div className="space-y-8">
                {Object.entries(groupedHistory).map(([dateGroup, products]) => (
                  <div key={dateGroup}>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                      {dateGroup} ({products.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <div
                          key={`${product.id}-${product.viewedAt}`}
                          className="relative"
                        >
                          <ProductCard
                            product={product}
                            onViewDetails={handleViewDetails}
                          />

                          {/* View Time & Remove Button */}
                          <div className="absolute top-3 right-12 flex items-center space-x-2">
                            <div className="bg-white/90 px-2 py-1 rounded-md text-xs text-gray-600">
                              {formatDate(product.viewedAt)}
                            </div>
                            <button
                              onClick={() => handleRemoveItem(product.id)}
                              className="p-1.5 bg-white/90 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                              title="Xóa khỏi lịch sử"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Simple Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHistory.map((product) => (
                  <div
                    key={`${product.id}-${product.viewedAt}`}
                    className="relative"
                  >
                    <ProductCard
                      product={product}
                      onViewDetails={handleViewDetails}
                    />

                    {/* View Time & Remove Button */}
                    <div className="absolute top-3 right-12 flex items-center space-x-2">
                      <div className="bg-white/90 px-2 py-1 rounded-md text-xs text-gray-600">
                        {formatDate(product.viewedAt)}
                      </div>
                      <button
                        onClick={() => handleRemoveItem(product.id)}
                        className="p-1.5 bg-white/90 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                        title="Xóa khỏi lịch sử"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredHistory.length === 0 && searchQuery && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy kết quả
                </h3>
                <p className="text-gray-600">Thử tìm kiếm với từ khóa khác</p>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-6 text-gray-300">
              <Clock className="w-full h-full" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Chưa có lịch sử xem
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Khi bạn xem chi tiết các khóa học, chúng sẽ được lưu vào đây để
              bạn dễ dàng tìm lại.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Eye className="h-5 w-5 mr-2" />
              Khám phá khóa học
            </Link>
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
}
