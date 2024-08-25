"use client"; // Add this at the top of the file
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import fetchRestaurants from "./../slices/getRestaurantSlice";

const rootReducer = combineReducers({
  restaurants: fetchRestaurants,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
