import { useState, useEffect, memo } from "react";
import Places from "./Places.jsx";

const URL = "http://localhost:3000";
const AvailablePlaces = memo(({ onSelectPlace }) => {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    const fetchDataPlaces = async () => {
      const response = await fetch(`${URL}/places`);
      const resData = await response.json();
      setAvailablePlaces(resData.places);
    };
    fetchDataPlaces();
  }, []);
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
});

export default AvailablePlaces;
