import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
    return (
        <>
            <FontAwesomeIcon icon={ faCircleNotch } className="animate-spin text-gray-dark size-12 m-4 text-center"/>
        </>
    )
}

export default Spinner