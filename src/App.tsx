import React, { useEffect, useState } from "react";
import "./App.css";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  getPositionOfLineAndCharacter,
  hasOnlyExpressionInitializer,
  isTypeOnlyImportOrExportDeclaration,
} from "typescript";

export default function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [markerPosition, setMarkerPosition] = useState({
    lat: latitude,
    lng: longitude,
  });

  useEffect(() => {
    home();
  }, []);

  function teleport() {
    setLatitude(Math.random() * 180 - 90);
    setLongitude(Math.random() * 360 - 180);
  }
  function home() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    setMarkerPosition({
      lat: latitude,
      lng: longitude,
    });
  }
  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      const newLocation = document.createElement("p");
      const coordinates = document.createTextNode(
        `Latitude: ${latitude.toString()}, Longitude: ${longitude.toString()}`
      );
      newLocation.appendChild(coordinates);
      const element = document.getElementById("list");
      element?.appendChild(newLocation);
    }
  }, [home, teleport]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });
  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="main">
        <div id="title">Map Project</div>
        <GoogleMap
          zoom={10}
          center={{ lat: latitude, lng: longitude }}
          id="map"
          mapContainerClassName="map-container"
        >
          <Marker position={markerPosition} />
        </GoogleMap>
        <button id="teleport-container" onClick={teleport}>
          <p id="teleport">Teleport me to somewhere random</p>
        </button>
        <button id="home-container" onClick={home}>
          <p id="home">Bring me back home</p>
        </button>
        <div id="display">
          Lattitude: {latitude}, Longitude: {longitude}
        </div>
        <div id="list"></div>
      </div>
    );
  }
}
