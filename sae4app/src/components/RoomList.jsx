import PropTypes from 'prop-types'
import RoomItem from "./RoomItem";

const RoomList = (props) => {
  return (
    <div className="room-list">
      {props.filteredRooms.map((roomData, index) => (
        <RoomItem key={index} room={roomData} />
      ))}
    </div>
  )
}

RoomList.propTypes = {
  filteredRooms: PropTypes.array
}

export default RoomList;
