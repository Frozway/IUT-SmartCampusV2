import { useParams } from 'react-router-dom';
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
      <div className="detail-room">
        <h2>Détails de la salle</h2>
        <p>Team: {room.team}</p>
        <p>Room: {room.room}</p>
        <p>DB Name: {room.dbname}</p>
        <p>Username: {room.username}</p>
        <p>Tag: {room.tag}</p>

        <button onClick={() => window.history.back()}>Retour</button>
      </div>
    );
  };
  
export default DetailRoom;
