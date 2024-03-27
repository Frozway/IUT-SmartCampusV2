export async function fetchDepartments() {
    const response = await fetch('http://localhost:8000/api/departments?page=1');
    const data = await response.json();
    return data['hydra:member'];
  }
