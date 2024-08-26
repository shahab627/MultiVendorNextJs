# Next.js Restaurant Finder Portal

Welcome to the Next.js Restaurant Finder Portal! This project allows users to find nearby restaurants based on their current location. Below is a quick overview of how to use the portal and some details about the project setup.

## Introduction

- **Visit Home Page**: Start by visiting the home page of the portal.
- **Locate Your Current Location**: Click on the "Locate" button to identify your current location on the map.
- **Find Nearby Restaurants**: Click on the "Nearby" button to display all restaurants within a specified range, defined by `FIND_RESTAURANTS_RANGE_KM` in the constants file.
- **Select a Restaurant**: Choose a restaurant from the list to view specific details about it.
- **Show Overlay**: Click on an icon to display an overlay with additional information or actions.

### Note:

To update the range in kilometers for finding nearby restaurants, modify the `FIND_RESTAURANTS_RANGE_KM` value in the constants file.

## Packages Used in the Project

| Package Name            | Usage/Purpose                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| `@reduxjs/toolkit`      | Used for managing the application state effectively.                                     |
| `@tanstack/react-query` | Used for managing API calls and caching responses for performance optimization.          |
| `graphql-request`       | A client-side GraphQL request library for making API requests with ease.                 |
| `leaflet`               | A library to render UI components on the map, enabling interactive maps.                 |
| `primereact`            | A library for importing various UI elements into the project.                            |
| `react-leaflet`         | An open-source library for integrating Leaflet maps with React applications.             |
| `sass`                  | Used for styling some UI elements (though Tailwind CSS is primarily used).               |
| `cypress`               | A module for end-to-end testing to ensure the application functions correctly.           |
| `tailwindcss`           | A utility-first CSS framework for designing UI elements quickly and efficiently.         |
| `typescript`            | Used for adding static typing to JavaScript to improve code quality and maintainability. |

## Task Status

| Task                                                                                         | Status |
| -------------------------------------------------------------------------------------------- | ------ |
| 1. Getting the current location of the user                                                  | Done   |
| 2. Displaying user location in the text area                                                 | Done   |
| 3. Displaying user location in the dropdown                                                  | Done   |
| 4. Clicking "Find Restaurant" should query the endpoint with latitude and longitude          | Done   |
| 5. Clicking "Find Restaurants" should display restaurants in a grid format for user location | Done   |

Feel free to explore and contribute to the project. If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.
