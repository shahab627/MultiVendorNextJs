export const GET_RESTAURANTS = `
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
        }
        deliveryTime
        minimumOrder
        tax
        reviewData {
          total
          ratings
          reviews {
            _id
          }
        }
        categories {
          _id
          title
          foods {
            _id
            title
          }
        }
        rating
        isAvailable
        openingTimes {
          day
          times {
            startTime
            endTime
          }
        }
      }
    }
  }
`;
