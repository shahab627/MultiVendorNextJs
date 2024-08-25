"use client"; // Add this at the top of the file
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../graphqlClient";
import { GET_RESTAURANTS } from "@/lib/graphQl/qurries";

interface FetchRestaurantsArgs {
  latitude: number;
  longitude: number;
}

const initialState = {
  result: null,
  status: "idle",
  error: null as string | null,
};
interface FetchRestaurantsArgs {
  latitude: number;
  longitude: number;
}

interface FetchRestaurantsResponse {
  nearByRestaurants: {
    restaurants: Restaurant[];
  };
}

export const fetchRestaurants = createAsyncThunk(
  "fetchRestaurants",
  async ({ latitude, longitude }: any, thunkAPI: any) => {
    try {
      const data: FetchRestaurantsResponse = await client.request(
        GET_RESTAURANTS,
        {
          latitude,
          longitude,
        }
      );
      return data; // Assuming the correct return type is FetchRestaurantsResponse
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error.response.data,
        status: error.response.status,
      });
    }
  }
);
// export const fetchRestaurants = createAsyncThunk<
//   Restaurant[],
//   FetchRestaurantsArgs,
//   { rejectValue: string }
// >(
//   "restaurants/fetchRestaurants",
//   async ({ latitude, longitude }, { rejectWithValue }) => {
//     try {
//       const data: FetchRestaurantsResponse = await client.request(
//         GET_RESTAURANTS,
//         {
//           latitude,
//           longitude,
//         }
//       );
//       return data.nearByRestaurants.restaurants;
//     } catch (error) {
//       return rejectWithValue("Failed to fetch restaurants");
//     }
//   }
// );

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default restaurantSlice.reducer;
