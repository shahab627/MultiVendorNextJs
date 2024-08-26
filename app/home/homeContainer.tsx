"use client";
import React, { useRef } from "react";
import Page from "./page";
import { EARTH_RADIUS_KM, FIND_RESTAURANTS_RANGE_KM } from "@/constants/values";
import { RESTAURANTS_DATA_SET } from "@/constants/restaurants";

import { RESTAURANTS_QUERY } from "@/lib/graphQl/qurries";
import client from "@/lib/graphqlClient";
import { useQuery } from "@tanstack/react-query";
import { json } from "stream/consumers";
import { Float } from "graphql-request/alpha/schema/scalars";
const fetchRestaurants = async (
  latitude: number,
  longitude: number
): Promise<Restaurant[]> => {
  const data: any = await client.request(RESTAURANTS_QUERY, {
    latitude,
    longitude,
  });
  return data;
};
const HomeContainer = () => {
  //    ********  Declarations *******
  const toast = useRef<any>(null);
  const [position, setPosition] = React.useState<Position | null>(null);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
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
  const [restaurantList, setRestaurantList] = React.useState<[]>([]);
  const [address, setAddress] = React.useState<String>("");
  const [optionList, setOptionList] = React.useState<any>([]);

  //    ********  useQuery *******

  const { data, error, isLoading } = useQuery<Restaurant[], Error>({
    queryKey: ["restaurants", myPosition.lat, myPosition.lng],
    queryFn: () => fetchRestaurants(myPosition.lat, myPosition.lng),
  });

  //    ********  useEffects *******

  React.useEffect(() => {
    // Check if Geolocation API is supported
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    // setting up user location
    const successCallback = (position: any) => {
      setMyPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      fetchAddressLocation(position.coords.latitude, position.coords.longitude);
    };

    const errorCallback = (error: any) => {
      alert(`Error: ${error.message}`);
    };

    // Request the user's current position
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);
  React.useEffect(() => {
    if (data) {
      setRestaurantList(data?.nearByRestaurants.restaurants);
      const dropdownData = [
        {
          name: "My Location",
          _id: "00",
          items: [{ name: address, _id: "88", disabled: true }],
        },
        {
          name: "Available Restaurants",
          _id: "01",
          items: data?.nearByRestaurants.restaurants.map((restaurant: any) => ({
            name: restaurant.name,
            _id: restaurant._id,
            disabled: false, // Adjust based on your requirement
          })),
        },
      ];
      setOptionList(dropdownData);
    }
  }, [data]);

  //    ********  Functions *******

  const fetchAddressLocation = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`
      );
      const data = await response.json();
      setAddress(data.display_name);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const truncateString = (str: string, length: number): string => {
    return str.length > length ? `${str.slice(0, length)}...` : str;
  };

  const getCategoryTitles = (categories: Category[]): string => {
    const titles = categories.map((category) => category.title).join(", ");

    // Truncate if longer than 30 characters
    return truncateString(titles, 30);
  };
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
  const handleFindChange = (id: string) => {
    if (id) {
      const restaurant: any = restaurantList.find(
        (r: Restaurant) => r._id === id
      );
      setNearbyRestaurants([]);
      setSelectedOption(id);
      if (restaurant) {
        const dist = calculateDistance(
          parseFloat(restaurant.location.coordinates[0]),
          parseFloat(restaurant.location.coordinates[1]),
          myPosition.lat,
          myPosition.lng
        );
        setSelectedRestaurant({
          name: restaurant.name,
          location: restaurant.address,
          distance: dist,
          lat: parseFloat(restaurant.location.coordinates[0]),
          lng: parseFloat(restaurant.location.coordinates[1]),
        });
        setPosition({
          lat: parseFloat(restaurant.location.coordinates[0]),
          lng: parseFloat(restaurant.location.coordinates[1]),
        });
        map?.flyTo(
          [
            parseFloat(restaurant.location.coordinates[0]),
            parseFloat(restaurant.location.coordinates[1]),
          ],
          map.getZoom()
        );
      }
    }
  };
  // Function to find nearest restaurants based on a given latitude and longitude
  function findNearestRestaurants(
    currentLocation: Position,
    restaurants: [],
    maxDistanceKm: number
  ): any {
    const { lat: currentLat, lng: currentLng } = currentLocation;
    // Filter restaurants within the maximum distance
    return restaurants.filter((restaurant: any) => {
      const distance = calculateDistance(
        currentLat,
        currentLng,
        parseFloat(restaurant.location.coordinates[0]),
        parseFloat(restaurant.location.coordinates[1])
      );
      return distance <= maxDistanceKm;
    });
  }
  // Function to handle the Nearby button click
  const handleNearbyClick = () => {
    if (myPosition) {
      const nearest = findNearestRestaurants(
        myPosition,
        restaurantList,
        FIND_RESTAURANTS_RANGE_KM
      );
      if (nearest.length <= 0) {
        toast.current.show({
          severity: "info",
          summary: "Info",
          detail: "No Nearest Restaurant Found within 10 Km",
        });
      } else {
        toast.current.show({
          severity: "success",
          summary: "Restaurants Found",
          detail: "About " + nearest.length + " restaurants found near you.",
        });
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
    getCategoryTitles,
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
    restaurantList,
    optionList,
  };
  return (
    <Page
      useStatesProps={useStatesProps}
      functionHandlersProps={functionHandlersProps}
      isLoading={isLoading}
      toast={toast}
    />
  );
};

export default HomeContainer;
