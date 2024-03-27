import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const RoomItem = (props) => {
    return (
        <Link to={`/room/${props.room.tag}`}>
            <div className="p-4 m-2 rounded-lg shadow-lg border-s-green-dark border-l-8 drop-shadow-md">
                <h3>{props.room.room}</h3>
            </div>
        </Link>
    )
}

RoomItem.propTypes = {
    room: PropTypes.object.isRequired,
}

export default RoomItem;
