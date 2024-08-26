describe("API Testing with Cypress", () => {
  beforeEach(() => {
    // Intercept the GraphQL API call to provide a mock response
    cy.intercept(
      "POST",
      "https://enatega-multivendor.up.railway.app/graphql",
      (req) => {
        console.log("Intercepted request:", req); // Log the intercepted request

        if (
          req.body.operationName === "Restaurants" &&
          req.body.variables.latitude === 33.651664 &&
          req.body.variables.longitude === 73.0438767
        ) {
          req.reply({
            statusCode: 200,
            body: {
              data: {
                nearByRestaurants: {
                  restaurants: [
                    {
                      _id: "66c2f23f1755c133a1eba92e",
                      name: "Khan Food Corner",
                      image:
                        "https://res.cloudinary.com/do1ia4vzf/image/upload/v1724052693/food/cfczikj4yijbtgrpqpbu.jpg",
                      slug: "khan-food-corner",
                      address: "Karachi",
                      location: {
                        coordinates: ["72.7883842359255", "34.05709991233539"],
                        __typename: "Point",
                      },
                      deliveryTime: 20,
                      minimumOrder: 0,
                      tax: 10,
                      reviewData: {
                        total: 0,
                        ratings: 0,
                        reviews: [],
                        __typename: "ReviewData",
                      },
                      categories: [
                        {
                          _id: "66b98fb71755c133a1a96369",
                          title: "Default Category",
                          foods: [
                            {
                              _id: "66b98fb71755c133a1a96366",
                              title: "Default Food",
                              __typename: "Food",
                            },
                          ],
                          __typename: "Category",
                        },
                      ],
                      rating: null,
                      isAvailable: true,
                      openingTimes: [
                        {
                          day: "MON",
                          times: [
                            {
                              startTime: ["00", "00"],
                              endTime: ["23", "59"],
                              __typename: "Timings",
                            },
                          ],
                          __typename: "OpeningTimes",
                        },
                      ],
                      __typename: "Restaurant",
                    },
                  ],
                  __typename: "NearByRestaurants",
                },
              },
            },
          });
        }
      }
    ).as("getRestaurants"); // Alias the intercepted request
  });

  it("should display restaurants fetched from the API", () => {
    cy.visit("/");

    // Wait for the intercepted API call
    cy.wait("@getRestaurants").then((interception) => {
      // Log the intercepted request and response
      console.log("Intercepted API call:", interception);
    });

    // Assert that the restaurant is visible on the page
    cy.contains("Khan Food Corner").should("be.visible");
  });
});
