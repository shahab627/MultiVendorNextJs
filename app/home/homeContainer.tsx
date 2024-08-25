"use client";
import React, { useRef } from "react";
import Page from "./page";
import { EARTH_RADIUS_KM, FIND_RESTAURANTS_RANGE_KM } from "@/constants/values";
import { RESTAURANTS_DATA_SET } from "@/constants/restaurants";

const HomeContainer = () => {
  //    ********  Declarations *******
  const toast = useRef<any>(null);
  const [position, setPosition] = React.useState<Position | null>(null);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(
    null
  );
  const [myPosition, setMyPosition] = React.useState<any>({
    lat: null,
    lng: null,
  });
  const [map, setMap] = React.useState<any>(null);
  const [selectedRestaurant, setSelectedRestaurant] =
    React.useState<selectedRestaurant | null>(null);
  const [nearbyRestaurants, setNearbyRestaurants] = React.useState<
    Restaurant[]
  >([]);

  //    ********  useEffects *******

  React.useEffect(() => {
    // Check if Geolocation API is supported
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    // Define success and error callback functions
    const successCallback = (position: any) => {
      setMyPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const errorCallback = (error: any) => {
      alert(`Error: ${error.message}`);
    };

    // Request the user's current position
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  //    ********  Functions *******

  // Function to locate the user
  const locateUser = () => {
    if (map) {
      map.locate();
    }
  };
  // Function to calculate the distance between two latitude and longitude points using the Haversine formula
  function calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number {
    const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_KM * c;
  }

  // Function to handle the Find button click
  const handleFindChange = (id: number) => {
    if (id) {
      const restaurant = RESTAURANTS_DATA_SET.find((r) => r.id === id);
      setNearbyRestaurants([]);
      setSelectedOption(id);
      if (restaurant) {
        const dist = calculateDistance(
          restaurant.lat,
          restaurant.lng,
          myPosition.lat,
          myPosition.lng
        );
        setSelectedRestaurant({
          name: restaurant.name,
          location: restaurant.location,
          distance: dist,
          lat: restaurant.lat,
          lng: restaurant.lng,
        });
        setPosition({ lat: restaurant.lat, lng: restaurant.lng });
        map?.flyTo([restaurant.lat, restaurant.lng], map.getZoom());
      }
    }
  };
  // Function to find nearest restaurants based on a given latitude and longitude
  function findNearestRestaurants(
    currentLocation: Position,
    restaurants: Restaurant[],
    maxDistanceKm: number
  ): any {
    const { lat: currentLat, lng: currentLng } = currentLocation;
    // Filter restaurants within the maximum distance
    return restaurants.filter((restaurant) => {
      const distance = calculateDistance(
        currentLat,
        currentLng,
        restaurant.lat,
        restaurant.lng
      );
      return distance <= maxDistanceKm;
    });
  }
  // Function to handle the Nearby button click
  const handleNearbyClick = () => {
    if (myPosition) {
      const nearest = findNearestRestaurants(
        myPosition,
        RESTAURANTS_DATA_SET,
        FIND_RESTAURANTS_RANGE_KM
      );
      if (nearest.length <= 0) {
        toast.current.show({
          severity: "info",
          summary: "Info",
          detail: "No Nearest Restaurant Found",
        });
      } else {
        setNearbyRestaurants(nearest);
      }

      locateUser();
    }
  };
  //    ********  Props *******

  const functionHandlersProps = {
    calculateDistance,
    locateUser,
    handleNearbyClick,
    handleFindChange,
  };
  const useStatesProps = {
    position,
    setPosition,
    selectedOption,
    myPosition,
    setSelectedOption,
    selectedRestaurant,
    nearbyRestaurants,
    map,
    setMap,
  };
  return (
    <Page
      useStatesProps={useStatesProps}
      functionHandlersProps={functionHandlersProps}
      toast={toast}
    />
  );
};

export default HomeContainer;
