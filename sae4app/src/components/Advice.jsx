import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { fetchRoomByTag, updateRoomState } from "../services/roomService";

const Advice = ({ adviceText }) => {
  const { tag } = useParams();
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    // Récupérer les données de la salle correspondant au tag
    fetchRoomByTag(tag)
      .then((roomData) => {
        // Vérifier si l'attribut "applied" est true
        if (roomData.applied === "true") {
          setApplied(true);
        }
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des données de la salle :",
          error
        );
      });
  }, [tag]);

  const handleAcceptAdvice = () => {
    // Envoyer une requête à l'API pour mettre à jour l'état dans la base de données
    updateRoomState(tag, "true")
      .then(() => {
        console.log(
          "État de la salle mis à jour avec succès dans la base de données"
        );
        setApplied(true);
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la mise à jour de l'état de la salle dans la base de données :",
          error
        );
      });
  };

  return (
    <div
      className={`rounded-2xl p-2 my-6 drop-shadow-md ${
        applied ? "bg-green-dark text-white" : "bg-blue-light text-blue-dark"
      }`}
    >
      <div className="flex my-2 items-center">
        <FontAwesomeIcon
          icon={applied ? faCheckCircle : faCircleInfo}
          className="size-8 mx-2 mb-3"
        />
        <p className="mx-2">{adviceText}</p>
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

Advice.propTypes = {
  adviceText: PropTypes.string.isRequired,
};

export default Advice;
