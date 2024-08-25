interface Position {
  lat: number;
  lng: number;
}

interface Restaurant {
  name: string;
  location: string;
  rating: number;
  menuItems: string[];
  lat: number;
  lng: number;
  id: number;
}
interface selectedRestaurant {
  name: string;
  location: string;
  distance: number;
  lat: number;
  lng: number;
}
interface RestaurantCardProps {
  restaurant: Restaurant;
  isDark: boolean;
}

interface RestaurantListProps {
  restaurants: Restaurant[];
}
