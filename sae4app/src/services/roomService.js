export async function fetchRooms() {
    const response = await fetch('http://localhost:8000/api/rooms?page=1');
    const data = await response.json();
    return data['hydra:member'];
  }
