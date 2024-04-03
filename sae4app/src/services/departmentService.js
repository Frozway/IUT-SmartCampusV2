export async function fetchDepartments() {
  const response = await fetch('http://localhost:8000/api/departments?page=1');
  const data = await response.json();
  return data['hydra:member'];
}

export async function fetchAlertByDepartement(departmentId) {
  const response = await fetch(
    `http://localhost:8000/api/departements/${departmentId}/get-alerts`,
    {
      method: "GET"
    }
  )

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Service indisponible")
  }
}
