import { useState, useEffect, memo, useMemo } from "react";
import Places from "./Places.jsx";

const URL = "http://localhost:3000";
const AvailablePlaces = memo(({ onSelectPlace }) => {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetchData, setIsFetchData] = useState(false);

  useEffect(() => {
    const fetchDataPlaces = async () => {
      setIsFetchData(true);
      const response = await fetch(`${URL}/places`);
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setIsFetchData(false);
    };
    fetchDataPlaces();
  }, []);
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetchData}
      loadingText={"Fetching Place Data..."}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
});

export default AvailablePlaces;
