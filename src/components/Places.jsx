/* eslint-disable react/prop-types */
import React from "react";
import { memo } from "react";

const Places = memo(
  ({ title, places, fallbackText, isLoading, loadingText, onSelectPlace }) => {
    console.log(places);
    return (
      <section className="places-category">
        <h2>{title}</h2>
        {isLoading && <p className="fallback-text">{loadingText}</p>}
        {(!isLoading && places.length) === 0 && (
          <p className="fallback-text">{fallbackText}</p>
        )}
        {places.length > 0 && (
          <ul className="places">
            {places.map((place) => (
              <li key={place.id} className="place-item">
                <button onClick={() => onSelectPlace(place)}>
                  <img
                    src={`http://localhost:3000/${place.image.src}`}
                    alt={place.image.alt}
                  />
                  <h3>{place.title}</h3>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
);

Places.displayName = "Places";

export default Places;
