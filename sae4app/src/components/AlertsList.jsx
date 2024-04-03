import { PropTypes } from 'prop-types';
import { fetchAlertByDepartement } from '../services/departmentService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Spinner from './Spinner';

const AlertsList = (props) => {
    const [alerts, setAlerts] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [isOpen, setIsOpen] = useState(false) 

    // Api call
    useEffect(() => {
        
            fetchAlertByDepartement(props.departmentId)
            .catch(error => {
                console.error(error)
                setHasError(true)
                setAlerts([])
            })
            .then(data => {
                setAlerts(data),
                setIsLoading(false)
            })
    }, [])

    return (
        <div className="p-4 m-2 rounded-lg shadow-lg border-s-green-dark border-l-8 drop-shadow-md relative">
            <h2 className='font-medium flex' onClick={() => {setIsOpen(!isOpen)}}>
                Alertes &#x2022; {props.departmentName}
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className='ml-auto text-gray-light' />
            </h2>
            { isOpen ?
                hasError ?
                    <p className='px-4 py-2 bg-red-light text-white rounded-lg mt-2 font-medium text-center'>
                        Une erreur est survenue
                    </p>
                :
                    isLoading ? 
                        <div className="flex justify-center">
                            <Spinner />
                        </div>
                    :
                        alerts.length == 0 ?
                            <p className='text-gray-light'>Aucune alerte</p>
                        :
                            Object.keys(alerts).map((room, index) => (
                                <Link to={`/room/${room}`} key={index} >
                                    <p className={`p-2 my-2 bg-${alerts[room].alertLevel}-dark rounded-lg text-white font-bold strong-shadow`}>{alerts[room].roomName}</p>
                                </Link>
                            ))
                    
                    :
                        null
            }
        </div>
    )
}

AlertsList.propTypes = {
    departmentId: PropTypes.number.isRequired,
    departmentName: PropTypes.string.isRequired
}

export default AlertsList