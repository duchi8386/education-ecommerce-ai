"use client";

import React from "react";
import { Search } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const SearchBar: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value });
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={state.searchQuery}
        onChange={handleSearchChange}
        placeholder="Tìm kiếm khóa học, giảng viên, chủ đề..."
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors duration-200"
      />
    </div>
  );
};

export default SearchBar;
