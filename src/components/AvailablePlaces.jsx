import { useState, useEffect, memo } from "react";
import Places from "./Places.jsx";
import ErrorMessage from "./Error.jsx";

const URL = "http://localhost:3000";
const AvailablePlaces = memo(({ onSelectPlace }) => {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetchData, setIsFetchData] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    const fetchDataPlaces = async () => {
      setIsFetchData(true);
      try {
        const response = await fetch(`${URL}/places`);
        if (!response.ok) {
          throw new Error("Failed to fetch places...");
        }
        const resData = await response.json();
        setAvailablePlaces(resData.places);
      } catch (error) {
        setErrorMsg({
          message: error.message || "Failed to fetch places. Try Again Later!",
        });
      }
      setIsFetchData(false);
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
