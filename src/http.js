const URL = "http://localhost:3000";
export default async function fetchAvailablePlaces() {
  const response = await fetch(`${URL}/places`);
  if (!response.ok) {
    throw new Error("Failed to fetch places...");
  }
  const resData = await response.json();

  return resData.places;
}

export async function addUserPlaces(places) {
  const response = await fetch(`${URL}/user-places`, {
    method: "PUT",
    body: JSON.stringify({ places : places }),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to add places...");
  }
  const resData = await response.json();
  return resData.message;
}

export async function fetchUserPlaces(){
  const response = await fetch(`${URL}/user-places`);
  if(!response.ok){
    throw new Error("Failed to fetch user places...");
  }
  const resData = await response.json();  
  return resData.places;
}