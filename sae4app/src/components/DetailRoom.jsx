import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

import Value from "./RoomValue";
import Advice from "./Advice";

import data from "./../services/database.json"; // Importation des données JSON
import { fetchRoomByName, fetchRoomByTag } from "../services/roomService";
import { fetchTipsList } from "../services/tipsService";

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

  // Convertir le tag en numéro entier
  const tagNumber = parseInt(tag);

  // Recherche de la salle en fonction du tagNumber
  var room;

  // Retreive data from the database
  useEffect(() => {
    fetchRoomByTag(tagNumber).then((jsonData) => {
      room = jsonData;
      fetchRoomByName(room.name)
        .then((jsonData) => {
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
      fetchTipsList(values.temp, values.hum, values.co2).then((tipsList) => {
        setTips(tipsList);
      }, []);
    }
  }, [values.temp, values.hum, values.co2]);

  // if (!room) {
  //   return <div>Pas de salle associée pour le tag : {tag}</div>;
  // }

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

      <div className="p-4 py-8 my-4 rounded-2xl bg-green-dark drop-shadow-md flex items-end text-white">
        <span className="text-4xl font-bold">7</span>
        <span>/10</span>
        <span className="ml-auto">CONFORT</span>
      </div>

      {valuesLoading ? (
        <p className="p-4 rounded shadow-md">Loading...</p>
      ) : apiError ? (
        <div className="p-4 py-8 my-4 rounded-2xl bg-red-light drop-shadow-md flex items-end text-red-dark text-center">
          <p className="w-full">Une erreur est survenue</p>
        </div>
      ) : (
        <div>
          <Value value={values.temp} type="temp" />
          <Value value={values.hum} type="hum" />
          <Value value={values.co2} type="co2" />
        </div>
      )}

      {tips.length > 1 ? (
        <div className="flex flex-col items-center w-full">
          <Advice adviceText={tips[currentTipIndex]} />
          <div>
            <button
              onClick={prevTip}
              className="bg-gray-300 rounded-full w-8 h-8 inline-flex justify-center items-center focus:outline-none"
            >
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>
            <button
              onClick={nextTip}
              className="bg-gray-300 rounded-full w-8 h-8 inline-flex justify-center items-center focus:outline-none"
            >
              <FontAwesomeIcon icon={faCaretRight} />
            </button>
          </div>
          <p className="mt-3 text-center text-gray-dark">
            {currentTipIndex + 1} / {tips.length}
          </p>
        </div>
      ) : tips.length === 1 ? (
        <Advice adviceText={tips[currentTipIndex]} />
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
