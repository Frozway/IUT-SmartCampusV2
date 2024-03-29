import React, { useState } from "react";
import SearchBar from "./SearchBar";
import data from "./../datas/database.json";
import './../styles/App.css'
import DepartmentList from './DepartmentList'

const App = () => {
  const [filteredRooms, setFilteredRooms] = useState(Object.values(data));

  const handleSearch = (value) => {
    const filteredResults = Object.values(data).filter((room) =>
      room.room.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRooms(filteredResults);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <DepartmentList />
    </div>
  );
};

export default App;
