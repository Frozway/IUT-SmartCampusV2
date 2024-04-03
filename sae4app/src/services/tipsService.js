export async function fetchTipsList(id, temp, hum, co2) {
  const response = await fetch(
    `http://localhost:8000/api/rooms/${id}/tips/${temp}/${hum}/${co2}`
  );
  const tipsList = await response.json();
  return tipsList;
}
