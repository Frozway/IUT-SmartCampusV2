import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';

import Value from './RoomValue';
import Advice from './Advice';

import data from './../datas/database.json'; // Importation des données JSON

const DetailRoom = () => {
    const { tag } = useParams();
    const [valuesLoading, setValuesLoading] = useState(true)
    const [apiError, setApiError] = useState(false)
    const [values, setValues] = useState({
      "temp": null,
      "hum": null,
      "co2": null
    });

    // Retreive data from the database
    useEffect(() => {
      fetch(
        "https://sae34.k8s.iut-larochelle.fr/api/captures/last?limit=12",
        {
            method: "GET",
            headers: {
                "dbname": "sae34bdk1eq3",
                "username": "k1eq3",
                "userpass": "wohtuh-nigzup-diwhE4"
            }
        }
      )
      .then(response => response.json())
      .then(jsonData => {
        console.log(jsonData)
        setValuesLoading(false)

        let roomValues = {
          "temp": null,
          "hum": null,
          "co2": null
        }

        jsonData.forEach(element => {
          if (values[element.nom] == null) {
            roomValues[element.nom] = parseInt(element.valeur)
          }
        });
        setValues(roomValues)
      })
      .catch(error => {
        console.log(`Une erreur est survenue: ${error}`)
        setApiError(true)
        setValuesLoading(false)
      }) 
    }, [])
  
    // Convertir le tag en numéro entier
    const tagNumber = parseInt(tag);
  
    // Recherche de la salle en fonction du tagNumber
    const room = Object.values(data).find(room => parseInt(room.tag) === tagNumber);
  
    if (!room) {
      return <div>Pas de salle associée pour le tag : {tag}</div>;
    }
  
    return (
      <div className='py-4 px-2'>

        <p className="text-5xl font-bold text-gray-dark">D000</p>
        
        <div className='p-4 py-8 my-4 rounded-2xl bg-green-dark drop-shadow-md flex items-end text-white'>
          <span className='text-4xl font-bold'>7</span><span>/10</span>
          <span className='ml-auto'>CONFORT</span>
        </div>

        {
        valuesLoading ?
          <p className="p-4 rounded shadow-md">Loading...</p>
        :
          apiError ?
            <div className='p-4 py-8 my-4 rounded-2xl bg-red-light drop-shadow-md flex items-end text-red-dark text-center'>
              <p className='w-full'>Une erreur est survenue</p>
            </div>
            :
            <div>
              <Value value={values.temp} type="temp" />
              <Value value={values.hum} type="hum" />
              <Value value={values.co2} type="co2" />
            </div>
        }

      <Advice adviceText="Pensez à ouvrir la fenêtre pour aérer la pièce" />         

        <div onClick={() => window.history.back()} className='p-2 my-2 rounded-lg bg-green-dark text-white text-center hover:bg-green-light'>
          <FontAwesomeIcon icon={faCaretLeft} />
          Retour
        </div>
      </div>
    );
  };
  
export default DetailRoom;
