export async function fetchTipsList(temp, hum, co2) {
  const response = await fetch(
    `http://localhost:8000/api/tips/${temp}/${hum}/${co2}`
  );
  const tipsList = await response.json();
  return tipsList;
}
