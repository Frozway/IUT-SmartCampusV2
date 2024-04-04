import { useState } from "react";
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    props.onSearch(value);
  };

  return (
    <div className="fixed bottom-0 z-50">
      {isExpanded ? (
        <div className="w-screen flex justify-center strong-shadow bg-white p-4">
          <input
            type="text"
            placeholder="Recherche..."
            value={searchInput}
            onChange={handleSearchInputChange}
            className="p-2 border shadow-md rounded-lg focus:outline-none w-full"
          />
          <button onClick={toggleExpanded} className="ml-2 text-gray-dark">
            <FontAwesomeIcon icon={faCircleXmark} className="size-7"/>
          </button>
        </div>
      ) : (
        <div
          className="p-3 fixed bottom-4 right-4 flex justify-center items-center bg-green-dark text-white rounded-full cursor-pointer strong-shadow"
          onClick={toggleExpanded}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="size-7"/>
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func
}

export default SearchBar;
