import databaseJson from "./database.json"

export async function fetchRoomByName(roomName) {
    const response = await fetch(
        "https://sae34.k8s.iut-larochelle.fr/api/captures/last?limit=12",
        {
            method: "GET",
            headers: {
                "dbname": databaseJson[roomName].dbname,
                "username": "k1eq3",
                "userpass": "wohtuh-nigzup-diwhE4"
            }
        }
    )
    const data = response.json()
    return data
}