import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const RoomItem = (props) => {
    return (
        <Link to={`/room/${props.room.id}`}>
            <div className="py-4 m-0">
                <h3>{props.room.name}</h3>
            </div>
            <hr className=''/>
        </Link>
    )
}

RoomItem.propTypes = {
    room: PropTypes.object.isRequired,
}

export default RoomItem;
