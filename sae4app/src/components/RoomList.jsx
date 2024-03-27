import React from "react";
import RoomItem from "./RoomItem";

const RoomList = ({ filteredRooms }) => {
  return (
    <div className="room-list">
      {filteredRooms.map((roomData, index) => (
        <RoomItem key={index} room={roomData} />
      ))}
    </div>
  );
};

export default RoomList;
