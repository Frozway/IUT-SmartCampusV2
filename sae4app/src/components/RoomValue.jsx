import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet, faSmog, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons'

const Value = ({ value, type }) => {
    let unit
    let icon

    // Initialize type specific settings 
    if (type == "temp") {
        unit = "°C"
        icon = faTemperatureHalf
    } else if (type == "hum") {
        unit = "%"
        icon = faDroplet
    } else if (type == "co2") {
        unit = "ppm"
        icon = faSmog
    }

    return (
        <div className='p-4 my-2 rounded-2xl bg-green-dark drop-shadow-md flex items-end'>
          <span className='text-4xl font-black'>{ value }</span><span>{ unit }</span>
          <FontAwesomeIcon icon={icon} className='ml-auto size-10' />
        </div>
    )
}

Value.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
}

export default Value