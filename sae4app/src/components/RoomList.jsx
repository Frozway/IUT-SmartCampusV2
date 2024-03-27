import { useState, useEffect } from 'react';
import RoomItem from './RoomItem';
import { fetchRooms } from '../services/roomService'; // Importer le service

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // État pour suivre le chargement
    
  useEffect(() => {
    async function fetchRoomsData() {
      const roomsData = await fetchRooms();
      setRooms(roomsData);
      setIsLoading(false); // Mettre isLoading à false une fois que les salles sont chargées
    }

    fetchRoomsData();
  }, []); // Ce tableau vide indique que cet effet ne s'exécute qu'une seule fois après le rendu initial

  return (
    <div className="room-list">
      {/* Afficher le texte de chargement pendant que les salles se chargent */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
        <p className="text-3xl font-bold text-center">⌛Chargement des salles...⌛</p>
        </div>
      ) : (
        // Mapper les données des chambres pour afficher chaque RoomItem une fois que les salles sont chargées
        rooms.map((roomData, index) => (
          <RoomItem key={index} room={roomData} />
        ))
      )}
    </div>
  );
};

export default RoomList;
