import RoomItem from './RoomItem'
import data from './../datas/database.json'

const RoomList = () => {
  return (
    <div className="room-list">
      {Object.values(data).map((roomData, index) => (
        <RoomItem key={index} room={roomData} />
      ))}
    </div>
  )
}

export default RoomList