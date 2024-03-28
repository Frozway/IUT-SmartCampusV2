import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';

import Value from './RoomValue';
import Advice from './Advice';

import data from './../services/database.json'; // Importation des données JSON
import {fetchRoomByName, fetchRoomByTag} from '../services/roomService';

const DetailRoom = () => {
    const { tag } = useParams();
    const [valuesLoading, setValuesLoading] = useState(true)
    const [apiError, setApiError] = useState(false)
    const [values, setValues] = useState({
      "temp": null,
      "hum": null,
      "co2": null
    });
      
    // Convertir le tag en numéro entier
    const tagNumber = parseInt(tag);
  
    // Recherche de la salle en fonction du tagNumber
    var room;

    // Retreive data from the database
    useEffect(() => {
        fetchRoomByTag(tagNumber).then(jsonData => {
            console.log(jsonData)
                room = jsonData
                console.log("caca");
                fetchRoomByName(room.name)
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
            
        })

    }, [])

  
    // if (!room) {
    //   return <div>Pas de salle associée pour le tag : {tag}</div>;
    // }
  
    return (
      <div className='py-4 px-2'>

        <p className="text-5xl font-bold text-gray-dark">{room ? room.room : ""}</p>
        
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
