// queries/restaurantQueries.ts

import { gql } from "graphql-request";

export const RESTAURANTS_QUERY = gql`
  query Restaurants($latitude: Float, $longitude: Float) {
    nearByRestaurants(latitude: $latitude, longitude: $longitude) {
      restaurants {
        _id
        name
        image
        slug
        address
        location {
          coordinates
          __typename
        }
        deliveryTime
        minimumOrder
        tax
        reviewData {
          total
          ratings
          reviews {
            _id
            __typename
          }
          __typename
        }
        categories {
          _id
          title
          foods {
            _id
            title
            __typename
          }
          __typename
        }
        rating
        isAvailable
        openingTimes {
          day
          times {
            startTime
            endTime
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
