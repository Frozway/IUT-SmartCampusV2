export async function fetchRoomByName(dbname) {
  const response = await fetch(
    "https://sae34.k8s.iut-larochelle.fr/api/captures/last?limit=12",
    {
      method: "GET",
      headers: {
        dbname: dbname,
        username: "k1eq3",
        userpass: "wohtuh-nigzup-diwhE4",
      },
    }
  );
  return response.json();
}

export async function fetchRoomByTag(tag) {
  const response = await fetch(`http://localhost:8000/api/rooms/${tag}`);
  return response.json();
}

export async function fetchRooms() {
  const response = await fetch("http://localhost:8000/api/rooms?page=1");
  const data = await response.json();
  return data["hydra:member"];
}

export async function fetchRoomsByDepartment(departmentId) {
  const response = await fetch(
    `http://localhost:8000/api/departments/${departmentId}`,
    {
      headers: {
        accept: "application/ld+json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data.roomsDetails;
}

export async function updateRoomState(tag, newState) {
  try {
    const response = await fetch(`http://localhost:8000/api/rooms/${tag}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ applied: newState }) // Modification de l'attribut "applied" avec la nouvelle valeur
    });
    if (response.ok) {
      console.log('État de la salle mis à jour avec succès dans la base de données');
    } else {
      console.error('Échec de la mise à jour de l\'état de la salle dans la base de données');
    }
  } catch (error) {
    console.error('Une erreur est survenue lors de la mise à jour de l\'état de la salle dans la base de données :', error);
  }
}
