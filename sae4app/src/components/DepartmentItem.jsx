import { useState } from 'react'
import PropTypes from 'prop-types'
import RoomList from './RoomList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const DepartmentItem = (props) => {
    const [showRooms, setShowRooms] = useState(false)

    const handleDepartmentClick = async () => {
        setShowRooms(!showRooms)
    }

    return (
        <div 
            className="p-4 m-2 rounded-lg shadow-lg border-s-green-dark border-l-8 drop-shadow-md relative"
            style={{ cursor: 'pointer' }}
        >
            <div onClick={handleDepartmentClick} className="flex justify-between items-center">
                <h3 className="mr-4 font-medium">{props.department.name}</h3>
                <FontAwesomeIcon icon={showRooms ? faChevronUp : faChevronDown} className="text-blue-dark" />
            </div>
            {showRooms && <RoomList departmentId={props.department.id} roomSearch={props.roomSearch}/>}
        </div>
    )
}

DepartmentItem.propTypes = {
    department: PropTypes.object.isRequired,
    roomSearch: PropTypes.string
}

export default DepartmentItem
