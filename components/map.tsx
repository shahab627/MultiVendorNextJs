"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";
import { Dropdown } from "primereact/dropdown";
import locationIcon from "@/assets/icons/myLocIcon.png";
import restIcon from "@/assets/icons/restIcon.png";
import L, { Icon } from "leaflet"; // Import Leaflet and Icon class
import { RESTAURANTS_DATA_SET } from "@/constants/restaurants";
import { error } from "console";

// locate function
const LocationMarker = ({
  setPosition,
  setMap,
}: {
  setPosition: (position: Position) => void;
  setMap: (map: any) => void;
}) => {
  const map = useMap();

  useEffect(() => {
    setMap(map);
  }, [map, setMap]);

  useEffect(() => {
    if (!map) return;

    map.on("locationfound", (e: any) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map, setPosition]);

  return null;
};

const MapLayout = ({ useStatesProps, functionHandlersProps }: any) => {
  const {
    position,
    setPosition,
    selectedOption,
    selectedRestaurant,
    nearbyRestaurants,
    map,
    setMap,
    myPosition,
    restaurantList,
  } = useStatesProps;

  const { locateUser, handleNearbyClick, handleFindChange } =
    functionHandlersProps;

  // Custom Marker User Icon on Map
  const customUserIcon = new L.Icon({
    iconUrl: locationIcon.src,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });
  // Custom Marker Icon on Map
  const customShopIcon = new L.Icon({
    iconUrl: restIcon.src,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  return (
    <div className="relative">
      {/* Map Section */}
      <MapContainer
        center={[51.505, -0.09]}
        zoom={15}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker setPosition={setPosition} setMap={setMap} />
        {position && (
          <Marker position={myPosition} icon={customUserIcon}>
            <Popup>My Location</Popup>
          </Marker>
        )}
        {selectedRestaurant && (
          <Marker
            position={{
              lat: selectedRestaurant.lat,
              lng: selectedRestaurant.lng,
            }}
            icon={customShopIcon}
          >
            <Popup>
              <strong>{selectedRestaurant.name}</strong>
              <br />
              {selectedRestaurant.location}
              <br />
              Distance: {selectedRestaurant.distance.toFixed(3)} Km
            </Popup>
          </Marker>
        )}
        {nearbyRestaurants.map((restaurant: Restaurant, index: number) => (
          <Marker
            key={index}
            position={{ lat: restaurant.lat, lng: restaurant.lng }}
            icon={customShopIcon}
          >
            <Popup>
              <strong>{restaurant.name}</strong>
              <br />
              {restaurant.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div
        className="fixed top-40 left-20 z-50 p-4 shadow-lg bg-white rounded-md w-100"
        style={{ zIndex: 999 }}
      >
        <div className="flex flex-row space-y-2">
          {/* Shops Listing  */}
          <Dropdown
            value={selectedOption}
            options={restaurantList}
            onChange={(e) => handleFindChange(e.value)}
            placeholder="Select Location"
            className="w-80"
            optionLabel="name"
            optionValue="_id"
          />
          <div className="flex space-x-2 mx-9 ">
            <button
              onClick={handleNearbyClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Nearby Me
            </button>
            {/* Locate Me Button  */}
            <button
              onClick={locateUser}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-white hover:text-primary flex items-center"
            >
              <i className="pi pi-map-marker mr-2"></i>
              Locate Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLayout;
