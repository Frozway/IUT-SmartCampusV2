import { useState, useEffect } from 'react';
import RoomItem from './RoomItem';
import { fetchRoomsByDepartment } from '../services/roomService'; // Importer le service

import PropTypes from 'prop-types';

const RoomList = (props) => {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // État pour suivre le chargement
    const [error, setError] = useState(null); // État pour suivre les erreurs

    useEffect(() => {
        async function fetchRoomsData() {
            try {
                const roomsData = await fetchRoomsByDepartment(props.departmentId);
                setRooms(roomsData);
                setIsLoading(false); // Mettre isLoading à false une fois que les salles sont chargées
            } catch (error) {
                console.error('Erreur lors de la récupération des salles par département : ', error);
                setError(error); // Mettre à jour l'état d'erreur en cas d'échec de la requête
                setIsLoading(false); // Mettre isLoading à false en cas d'échec de la requête
            }
        }

        fetchRoomsData();
    }, [props.departmentId]); // Effectuer une nouvelle requête lorsque departmentId change

    const nameContainsSlug = (roomName, slug) => {
      return roomName.toLowerCase().includes(slug.toLowerCase())
    }

    if (isLoading) {
      return <div>Chargement en cours...</div>;
    }

    if (error) {
      return <div>Une erreur s&apos;est produite : {error.message}</div>;
    }

    return (
        <div className="room-list">
            {/* Mapper les données des chambres pour afficher chaque RoomItem une fois que les salles sont chargées */}
            {rooms.map((roomData, index) => (
                nameContainsSlug(roomData.name, props.roomSearch) || props.roomSearch == "" ?
                  <RoomItem key={index} room={roomData} />
                :
                  null
            ))}
        </div>
    );
};

RoomList.propTypes = {
  departmentId: PropTypes.number.isRequired,
  roomSearch: PropTypes.string
};

export default RoomList;
