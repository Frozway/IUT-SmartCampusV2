import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { updateTipState } from "../services/tipsService";

const Tip = ({ tip }) => {
  const { tag } = useParams();
  const [applied, setApplied] = useState(tip.isApplied);

  const handleAcceptAdvice = () => {
    // Envoyer une requête à l'API pour mettre à jour l'état dans la base de données
    updateTipState(tag, tip.id, true)
      .then(() => {
        console.log(
          "État du conseil mis à jour avec succès dans la base de données"
        );
        setApplied(true);
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la mise à jour de l'état du conseil dans la base de données :",
          error
        );
      });
  };

  return (
    <div
      className={`rounded-2xl p-2 my-6 drop-shadow-md w-full ${
        applied ? "bg-green-dark text-white" : "bg-blue-light text-blue-dark"
      }`}
    >
      <div className="flex my-2 items-center">
        <FontAwesomeIcon
          icon={applied ? faCheckCircle : faCircleInfo}
          className="size-8 mx-2"
        />
        <p className="mx-2">{tip.text}</p>
      </div>
      {!applied && (
        <div
          className="bg-blue-dark rounded-lg py-2 px-4 text-white text-center hover:bg-white hover:text-blue-dark cursor-pointer"
          onClick={handleAcceptAdvice}
        >
          <FontAwesomeIcon icon={faCheckCircle} />
          <p>C'est fait</p>
        </div>
      )}
    </div>
  );
};

Tip.propTypes = {
  tip: PropTypes.object.isRequired,
};

export default Tip;
