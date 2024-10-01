import { useState, useEffect, memo } from "react";
import fetchAvailablePlaces from "../http.js";
import Places from "./Places.jsx";
import ErrorMessage from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

const AvailablePlaces = memo(({ onSelectPlace }) => {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetchData, setIsFetchData] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    const fetchDataPlaces = async () => {
      setIsFetchData(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetchData(false);
        });
      } catch (error) {
        setErrorMsg({
          message: error.message || "Failed to fetch places. Try Again Later!",
        });
        setIsFetchData(false);
      }
    };
    fetchDataPlaces();
  }, []);

  if (errorMsg) {
    return (
      <ErrorMessage title={"An Error is Occured"} message={errorMsg.message} />
    );
  }
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
