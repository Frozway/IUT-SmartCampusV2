import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'

import Value from './RoomValue';
import Advice from './Advice';

import data from './../datas/database.json'; // Importation des données JSON

const DetailRoom = () => {
    const { tag } = useParams();
  
    // Convertir le tag en numéro entier
    const tagNumber = parseInt(tag);
  
    // Recherche de la salle en fonction du tagNumber
    const room = Object.values(data).find(room => parseInt(room.tag) === tagNumber);
  
    if (!room) {
      return <div>Pas de salle associée pour le tag : {tag}</div>;
    }
  
    return (
      <div className='py-4 px-2 text-white'>
        
        <div className='p-4 py-8 my-4 rounded-2xl bg-green-dark drop-shadow-md flex items-end'>
          <span className='text-4xl font-black'>7</span><span>/10</span>
          <span className='ml-auto'>CONFORTABILITE</span>
        </div>

        <Value value="19" type="temp" />
        <Value value="70" type="hum" />
        <Value value="400" type="co2" />

      <Advice adviceText="Pensez à ouvrir la fenêtre pour aérer la pièce" />        

        <div onClick={() => window.history.back()} className='p-2 my-2 rounded-lg bg-green-dark text-white text-center hover:bg-green-light'>
          <FontAwesomeIcon icon={faCaretLeft} />
          Retour
        </div>
      </div>
    );
  };
  
export default DetailRoom;
