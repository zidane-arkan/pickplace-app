const URL = "http://localhost:3000";
export default async function fetchAvailablePlaces() {
  const response = await fetch(`${URL}/places`);
  if (!response.ok) {
    throw new Error("Failed to fetch places...");
  }
  const resData = await response.json();

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch(`${URL}/user-places`, {
    method: "PUT",
    body: JSON.stringify(places),
    headers: {
      "Content-type": "application/json",
    },
  });
  const resData = await response.json()
  return resData.message;
}
