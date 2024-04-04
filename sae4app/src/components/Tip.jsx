import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCheckCircle, faCross } from "@fortawesome/free-solid-svg-icons";
import { updateTipState } from "../services/tipsService";

const Tip = ({ tip }) => {
  const { tag } = useParams();
  const [isApplied, setIsApplied] = useState(tip.isApplied);
  const [shouldCheck, setShouldCheck] = useState(tip.shouldCheck);

  const handleAcceptAdvice = () => {
    // Envoyer une requête à l'API pour mettre à jour l'état dans la base de données
    updateTipState(tag, tip.id, true)
      .then(() => {
        console.log(
          "État du conseil mis à jour avec succès dans la base de données"
        );
        setIsApplied(true);
        setShouldCheck(false);
        tip.appliedAt = new Date();
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
          shouldCheck ? "bg-orange-dark text-white" : (isApplied ? "bg-green-dark text-white" :  "bg-blue-light text-blue-dark")
      }`}
    >
      <div className="flex my-2 items-center">
        <FontAwesomeIcon
          icon={shouldCheck ? faCross : (isApplied ? faCheckCircle : faCircleInfo)}
          className="size-8 mx-2"
        />
        <p className="mx-2">{tip.text + (shouldCheck ? " Vérifiez que le conseil a bien été appliqué" : "")}</p>
      {/*  Afficher il y a combien de temps cela a été appliqué en faisant la différence de la date d'aujourdhui et tip.appliedAt */}
        {isApplied && (
          <p className="text-xs ml-auto">
            Appliqué il y a {new Date().getMinutes() - new Date(tip.appliedAt).getMinutes()} minute(s)
          </p>
        )}

      </div>
      {(!isApplied || shouldCheck) && (
        <div
          className={`${shouldCheck ? "bg-orange-light hover:text-orange-dark" : "bg-blue-dark hover:text-blue-dark"} rounded-lg py-2 px-4 text-white text-center hover:bg-white cursor-pointer`}
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
