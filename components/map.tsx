"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";
import { Dropdown } from "primereact/dropdown";
import locationIcon from "@/assets/icons/myLocIcon.png";
import restIcon from "@/assets/icons/restIcon.png";
import L, { Icon } from "leaflet";
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
const groupedItemTemplate = (option: any) => {
  return (
    <div className="flex align-items-center">
      <div>{option.optionGroup.name}</div>
    </div>
  );
};

const MapLayout = ({
  useStatesProps,
  functionHandlersProps,
}: mapComponentProp) => {
  const {
    position,
    setPosition,
    selectedOption,
    selectedRestaurant,
    nearbyRestaurants,
    map,
    setMap,
    myPosition,
    optionList,
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
            position={{
              lat: parseFloat(restaurant.location.coordinates[0]),
              lng: parseFloat(restaurant.location.coordinates[1]),
            }}
            icon={customShopIcon}
          >
            <Popup>
              <strong>{restaurant.name}</strong>
              <br />
              {restaurant.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Controls Section */}
      <div
        className="fixed top-40 left-20 z-50 p-4 shadow-lg bg-white rounded-md  max-w-xs md:max-w-3xl"
        style={{ zIndex: 999 }}
      >
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          {/* Shops Listing */}
          <Dropdown
            value={selectedOption}
            options={optionList}
            onChange={(e) => handleFindChange(e.value)}
            placeholder="Select Location"
            className="w-full md:w-80"
            optionLabel="name"
            optionValue="_id"
            optionGroupChildren="items"
            optionGroupLabel="name"
            optionGroupTemplate={groupedItemTemplate}
          />
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2">
            {/* Nearby Me Button */}
            <button
              onClick={handleNearbyClick}
              className="bg-blue-500 h-10 my-auto text-white  px-4 py-2 rounded-md hover:bg-blue-600 w-full md:w-auto"
            >
              Nearby Restaurant
            </button>
            {/* Locate Me Button */}
            <button
              onClick={locateUser}
              className="bg-transparent  text-primary  px-4 py-2 rounded-md hover:bg-white hover:text-gray-400 flex items-center w-full md:w-auto"
            >
              <i className="pi pi-map-marker text-2xl mr-2"></i>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLayout;
