import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

import Value from "./RoomValue";
import Tip from "./Tip";
import {fetchRoomByName, fetchRoomByTag} from '../services/roomService';
import { fetchTipsList } from "../services/tipsService";
import Spinner from "./Spinner";

function getComfortIndex(temperature, humidity, co2) {
  // Définition des plages de confort et des pénalités
  const tempThresholds = { optimal: [20, 24], acceptable: [18, 26] };
  const humidityThresholds = { optimal: [40, 60], acceptable: [30, 70] };
  const co2Thresholds = { optimal: [400, 600], acceptable: [400, 1000] };

  const tempPenaltyFactors = { high: 12, low: 15 };
  const humidityPenaltyFactors = { high: 5, low: 5 };
  const co2PenaltyFactor = { high: 0.3, low: 0.3 };

  // Pondération des facteurs
  const factorWeights = { temperature: 0.5, humidity: 0.5, co2: 0.3 };

  // Calcul des distances par rapport aux plages de confort
  const distanceTemp = distanceFromThresholds(
    temperature,
    tempThresholds,
    tempPenaltyFactors
  );
  const distanceHumidity = distanceFromThresholds(
    humidity,
    humidityThresholds,
    humidityPenaltyFactors
  );
  const distanceCO2 = distanceFromThresholds(
    co2,
    co2Thresholds,
    co2PenaltyFactor
  );

  // Pondération des distances
  const weightedDistances = {
    temperature: distanceTemp * factorWeights["temperature"],
    humidity: distanceHumidity * factorWeights["humidity"],
    co2: distanceCO2 * factorWeights["co2"],
  };

  // Calcul du ratio de confort
  let comfortRatio =
    100.0 -
    (weightedDistances.temperature +
      weightedDistances.humidity +
      weightedDistances.co2);

  // Normalisation du ratio
  comfortRatio = Math.max(comfortRatio, 0.0) / 10.0;

  return comfortRatio;
}

// Fonction utilitaire pour calculer la distance par rapport aux plages de confort
function distanceFromThresholds(value, thresholds, penaltyFactors) {
  let distance = 0;

  if (value >= thresholds["optimal"][0] && value <= thresholds["optimal"][1]) {
    return distance;
  }

  if (value < thresholds["optimal"][0]) {
    distance = (thresholds["optimal"][0] - value) * (penaltyFactors["low"] / 2);
  }

  if (value > thresholds["optimal"][1]) {
    distance =
      (value - thresholds["optimal"][1]) * (penaltyFactors["high"] / 2);
  }

  if (value < thresholds["acceptable"][0]) {
    distance = (thresholds["acceptable"][0] - value) * penaltyFactors["low"];
  }

  if (value > thresholds["acceptable"][1]) {
    distance = (value - thresholds["acceptable"][1]) * penaltyFactors["high"];
  }

  return distance;
}

const DetailRoom = () => {
  const { tag } = useParams();
  const [valuesLoading, setValuesLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [values, setValues] = useState({
    temp: null,
    hum: null,
    co2: null,
  });
  const [tips, setTips] = useState([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [comfortIndex, setComfortIndex] = useState(0);

  // Convertir le tag en numéro entier
  const tagNumber = parseInt(tag);

  // Recherche de la salle en fonction du tagNumber
  var room;

  // Retreive data from the database
  useEffect(() => {
    fetchRoomByTag(tagNumber).then((jsonData) => {
      room = jsonData;
      fetchRoomByName(room.dbname)
        .then((jsonData) => {
          console.log(jsonData);
          setValuesLoading(false);

          let roomValues = {
            temp: null,
            hum: null,
            co2: null,
          };

          jsonData.forEach((element) => {
            if (roomValues[element.nom] == null) {
              roomValues[element.nom] = parseInt(element.valeur);
            }
          });
          setValues(roomValues);
          setComfortIndex(
            getComfortIndex(roomValues.temp, roomValues.hum, roomValues.co2)
          );
        })
        .catch((error) => {
          console.log(`Une erreur est survenue: ${error}`);
          setApiError(true);
          setValuesLoading(false);
        });
    });
  }, []);

  useEffect(() => {
    if (!valuesLoading && !apiError) {
      fetchTipsList(tagNumber, values.temp, values.hum, values.co2).then(
        (tipsList) => {
          setTips(tipsList);
        },
        []
      );
    }
  }, [values.temp, values.hum, values.co2]);

  const nextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prevIndex) =>
      prevIndex === 0 ? tips.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="py-4 px-2 flex flex-col">
      <p className="text-5xl font-bold text-gray-dark">
        {room ? room.room : ""}
      </p>

      {valuesLoading ? (
        <div className="flex w-full justify-center mb-2">
          <Spinner />
        </div>
      ) : apiError ? (
        <div className="p-4 py-8 my-4 rounded-2xl bg-red-light drop-shadow-md flex items-end text-red-dark text-center">
          <p className="w-full">Une erreur est survenue</p>
        </div>
      ) : (
        <div>
          <div
            className={
              "bg-green-dark bg-red-dark bg-orange-dark bg-yellow-dark"
            }
          ></div>
          <div
            className={
              "p-4 py-8 my-4 rounded-2xl bg-" +
              (comfortIndex > 8
                ? "green-dark"
                : comfortIndex > 6
                ? "yellow-dark"
                : comfortIndex > 4
                ? "orange-dark"
                : "red-dark") +
              " drop-shadow-md flex items-end text-white"
            }
          >
            <span className="text-4xl font-bold">{comfortIndex}</span>
            <span>/10</span>
            {/*  Note supérieur à 8 = confort optimal, note supérieur à 6 = confort acceptable, note supérieur à 4 = confort médiocre sinon confort insuffisant*/}
            <span className="ml-auto">
              {comfortIndex > 8
                ? "CONFORT OPTIMAL"
                : comfortIndex > 6
                ? "CONFORT ACCEPTABLE"
                : comfortIndex > 4
                ? "CONFORT MEDIOCRE"
                : "CONFORT INSUFFISANT"}
            </span>
          </div>
          <Value value={values.temp} type="temp" />
          <Value value={values.hum} type="hum" />
          <Value value={values.co2} type="co2" />
        </div>
      )}

      {tips.length > 1 ? (
        <div className="flex flex-col items-center w-full mb-4">
          <Tip tip={tips[currentTipIndex]} />
          <div className="flex items-center">
            <button
              onClick={prevTip}
              className="bg-gray-300 rounded-full w-8 h-8 inline-flex justify-center items-center focus:outline-none"
            >
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>

            <p className="mx-4 text-center text-gray-dark">
              {currentTipIndex + 1} / {tips.length}
            </p>

            <button
              onClick={nextTip}
              className="bg-gray-300 rounded-full w-8 h-8 inline-flex justify-center items-center focus:outline-none"
            >
              <FontAwesomeIcon icon={faCaretRight} />
            </button>
          </div>
          
        </div>
      ) : tips.length === 1 ? (
        <Tip tip={tips[currentTipIndex]} />
      ) : null}

      <div
        onClick={() => window.history.back()}
        className="p-2 my-2 rounded-lg bg-green-dark text-white text-center hover:bg-green-light mt-auto"
      >
        <FontAwesomeIcon icon={faCaretLeft} />
        Retour
      </div>
    </div>
  );
};

export default DetailRoom;
