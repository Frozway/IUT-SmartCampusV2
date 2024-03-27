import React, { useState } from "react";
import searchIcon from "./../assets/searchIcon.svg";

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isExpanded ? (
        <input
          type="text"
          placeholder="Recherche..."
          value={searchInput}
          onChange={handleSearchInputChange}
          className="p-2 border border-gray-300 rounded focus:outline-none w-full"
          style={{ width: "calc(100vw - 32px)" }}
        />
      ) : (
        <div
          className="w-16 h-16 flex justify-center items-center bg-gray-200 rounded-full cursor-pointer"
          onClick={toggleExpanded}
        >
          <img src={searchIcon} alt="Search" className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
