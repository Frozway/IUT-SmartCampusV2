import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet, faSmog, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons'

const Value = (props) => {
    let unit
    let icon
    let color

    // Initialize type specific settings 
    if (props.type == "temp") {
        unit = "°C"
        icon = faTemperatureHalf
        if (props.value >= 20 && props.value <= 24) {
            color = "green" // Optimal
        } else if (props.value >= 18 && props.value <= 26) {
            color = "orange" // Acceptable
        } else if (props.value > 26) {
            color = "red" // Trop chaud
        } else if (props.value < 18) {
            color = "red" // Trop froid
        }
    } else if (props.type == "hum") {
        unit = "%"
        icon = faDroplet
        if (props.value >= 40 && props.value <= 60) {
            color = "green" // Optimal
        } else if (props.value >= 30 && props.value <= 70) {
            color = "orange" // Acceptable
        } else if (props.value > 70) {
            color = "red" // Trop humide
        } else if (props.value < 30) {
            color = "red" // Trop sec
        }
    } else if (props.type == "co2") {
        unit = "ppm"
        icon = faSmog
        if (props.value >= 400 && props.value <= 600) {
            color = "green" // Optimal
        } else if (props.value >= 400 && props.value <= 1000) {
            color = "orange" // Acceptable
        } else if (props.value > 1000) {
            color = "red" // Risqué
        }
    }

    if (props.value == null) {
        // Error message
        return (
            <p className='p-4 my-2 rounded-2xl bg-gray-light text-gray-dark strong-shadow flex items-end text-center'>
              Une erreur est survenue
            </p>
        )
        
    } else {
        return (
            <div className={'p-4 my-2 rounded-2xl strong-shadow bg-' + (color === "green" ? "green-dark" : (color === "orange" ? "yellow-dark" : "red-dark")) + ' text-white drop-shadow-md flex items-end'}>
              <span className='text-4xl font-bold'>{ props.value }</span><span>{ unit }</span>
              <FontAwesomeIcon icon={icon} className='ml-auto size-10' />
            </div>
        )
    }
}

Value.propTypes = {
    type: PropTypes.string,
    value: PropTypes.number,
}

export default Value