import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { addUserPlaces } from "./http.js";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // useEffect(() => {
  //   const addDataPlaces = async () => {
  //     try {
  //       const resAdd = await addUserPlaces(userPlaces);
  //       setSuccessMsg(resAdd);
  //     } catch (error) {
  //       setErrorMsg({
  //         message: error.message || "Failed to fetch places. Try Again Later!",
  //       });
  //     }
  //   };
  //   addDataPlaces();
  // }, [userPlaces]);

  console.log(successMsg || errorMsg);

  const handleStartRemovePlace = useCallback((place) => {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }, []);

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  const handleSelectPlace = useCallback(async (selectedPlace) => {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      const resAdd = await addUserPlaces([selectedPlace, ...userPlaces]);
      setSuccessMsg(resAdd);
    } catch (error) {
      setErrorMsg({
        message: error.message || "Failed to fetch places. Try Again Later!",
      });
    }
  }, []);

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    setModalIsOpen(false);
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
