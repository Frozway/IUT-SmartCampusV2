export async function fetchRooms() {
    const response = await fetch('http://localhost:8000/api/rooms?page=1');
    const data = await response.json();
    return data['hydra:member'];
  }


export async function fetchRoomsByDepartment(departmentId) {
  const response = await fetch(`http://localhost:8000/api/departments/${departmentId}`, {
    headers: {
      'accept': 'application/ld+json'
    }
  });
  const data = await response.json();
  console.log(data);
  return data.roomsDetails;
}