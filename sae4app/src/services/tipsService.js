export async function fetchTipsList(id, temp, hum, co2) {
  const response = await fetch(
    `http://localhost:8000/api/rooms/${id}/tips/${temp}/${hum}/${co2}`
  );
  const tipsList = await response.json();
  return tipsList;
}

export async function updateTipState(tag, tipId, state) {
  const response = await fetch(
    `http://localhost:8000/api/rooms/${tag}/tips/${tipId}/updateState/${state}`, {
      method: "PUT"
    }
  );
  return response;
}