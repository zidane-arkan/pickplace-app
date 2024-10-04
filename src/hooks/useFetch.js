import { useState, useEffect } from "react";
// import React, { useState } from 'reactaeasdfas';

export default function useFetch(fetchFn) {
  const [isLoading, setIsLoading] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [placesData, setDataPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resData = await fetchFn();
        setDataPlaces(resData);
        setIsLoading(false);
      } catch (error) {
        setDataPlaces([]);
        setErrorMsg({
          message: error.message || "Error fetching user places...",
        });
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { isLoading, errorMsg, placesData };
}
