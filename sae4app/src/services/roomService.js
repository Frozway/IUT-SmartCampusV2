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
  return data.roomsDetails;
}
