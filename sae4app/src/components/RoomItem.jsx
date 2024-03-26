import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RoomItem = ({ room }) => {
        return (
            <div className="room-item">
                <Link to={`/room/${room.tag}`}><h3>{room.room}</h3></Link>
            </div>
        );
    };

RoomItem.propTypes = {
    room: PropTypes.object.isRequired,
};

export default RoomItem;
