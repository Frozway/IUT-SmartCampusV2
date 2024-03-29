import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const Advice = (props) => {
  return (
    <div className="bg-blue-light rounded-2xl p-2 my-6 drop-shadow-md text-blue-dark w-full">
      <div className="flex my-2 items-center">
        <FontAwesomeIcon icon={faCircleInfo} className="size-8 mx-2 mb-3" />
        <p className="mx-2">{props.adviceText}</p>
      </div>
      <div className="bg-blue-dark rounded-lg py-2 px-4 text-white text-center hover:bg-white hover:text-blue-dark">
        <p>C&apos;est fait</p>
      </div>
    </div>
  );
};

Advice.propTypes = {
  adviceText: PropTypes.string,
};

export default Advice;
