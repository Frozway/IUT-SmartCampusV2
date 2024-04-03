import { PropTypes } from 'prop-types';
import { fetchAlertByDepartement } from '../services/departmentService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AlertsList = (props) => {
    const [alerts, setAlerts] = useState()
    const [isLoading, setIsLoading] = useState(true)

    // Api call
    useEffect(() => {
        fetchAlertByDepartement(props.departementId)
        .then(data => {
            setAlerts(data),
            setIsLoading(false)
        })
    }, [])

    return (
        <div className="p-4 m-2 rounded-lg shadow-lg border-s-blue-dark border-l-8 drop-shadow-md relative">
            <h2 className='font-medium'>Alertes</h2>
            {
                isLoading ? 
                    <p>Loading...</p>
                :
                    alerts.length == 0 ?
                        <p className='text-gray-light'>Aucune alerte</p>
                    :
                        Object.keys(alerts).map((room, index) => (
                            <Link to={`/room/${room}`} key={index} >
                                <p className={`p-2 my-2 bg-${alerts[room].alertLevel}-dark rounded-lg text-white font-bold strong-shadow`}>{alerts[room].roomName}</p>
                            </Link>
                        ))
            }
        </div>
    )
}

AlertsList.propTypes = {
    departementId: PropTypes.number.isRequired
}

export default AlertsList