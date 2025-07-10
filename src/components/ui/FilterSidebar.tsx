"use client";

import React from "react";
import { Filter, X } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { categories, priceRanges } from "../../data/mockData";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useAppContext();

  const handleCategoryChange = (category: string) => {
    const newCategory = category === "Tất cả" ? undefined : category;
    dispatch({
      type: "SET_FILTERS",
      payload: { ...state.filters, category: newCategory },
    });
  };

  const handlePriceRangeChange = (range: { min: number; max: number }) => {
    dispatch({
      type: "SET_FILTERS",
      payload: { ...state.filters, priceRange: range },
    });
  };

  const handleLevelChange = (level: string) => {
    const currentLevels = state.filters.level || [];
    let newLevels;

    if (currentLevels.includes(level)) {
      newLevels = currentLevels.filter((l) => l !== level);
    } else {
      newLevels = [...currentLevels, level];
    }

    dispatch({
      type: "SET_FILTERS",
      payload: { ...state.filters, level: newLevels },
    });
  };

  const handleSortChange = (sortBy: string) => {
    dispatch({
      type: "SET_FILTERS",
      payload: { ...state.filters, sortBy: sortBy as any },
    });
  };

  const clearFilters = () => {
    dispatch({ type: "SET_FILTERS", payload: {} });
  };

  const levels = ["Beginner", "Intermediate", "Advanced"];
  const sortOptions = [
    { value: "newest", label: "Mới nhất" },
    { value: "price-asc", label: "Giá tăng dần" },
    { value: "price-desc", label: "Giá giảm dần" },
    { value: "rating", label: "Đánh giá cao" },
    { value: "popular", label: "Phổ biến nhất" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 lg:relative lg:transform-none lg:shadow-none lg:z-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Bộ lọc
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="hidden lg:block mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Bộ lọc
            </h2>
          </div>

          {/* Clear Filters */}
          <div className="mb-6">
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Xóa tất cả bộ lọc
            </button>
          </div>

          {/* Sort */}
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-900 mb-3">
              Sắp xếp theo
            </h3>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={state.filters.sortBy === option.value}
                    onChange={() => handleSortChange(option.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-900 mb-3">
              Danh mục
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={
                      state.filters.category === category ||
                      (!state.filters.category && category === "Tất cả")
                    }
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-900 mb-3">
              Khoảng giá
            </h3>
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    value={index}
                    checked={
                      state.filters.priceRange?.min === range.min &&
                      state.filters.priceRange?.max === range.max
                    }
                    onChange={() =>
                      handlePriceRangeChange({ min: range.min, max: range.max })
                    }
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Level */}
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-900 mb-3">Mức độ</h3>
            <div className="space-y-2">
              {levels.map((level) => (
                <label key={level} className="flex items-center">
                  <input
                    type="checkbox"
                    value={level}
                    checked={state.filters.level?.includes(level) || false}
                    onChange={() => handleLevelChange(level)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
