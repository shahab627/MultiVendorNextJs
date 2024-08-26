interface Position {
  lat: number;
  lng: number;
}

interface RestaurantSelected {
  name: string;
  location: string;
  rating: number;
  menuItems: string[];
  lat: number;
  lng: number;
  id: number;
}
interface Timings {
  startTime: [string, string];
  endTime: [string, string];
  __typename: string;
}

interface OpeningTimes {
  day: string;
  times: Timings[];
  __typename: string;
}

interface Food {
  _id: string;
  title: string;
  __typename: string;
}

interface Category {
  _id: string;
  title: string;
  foods: Food[];
  __typename: string;
}

interface ReviewData {
  total: number;
  ratings: number;
  reviews: any[];
  __typename: string;
}

interface Location {
  coordinates: [string, string];
  __typename: string;
}

interface Restaurant {
  _id: string;
  name: string;
  image: string;
  slug: string;
  address: string;
  location: Location;
  deliveryTime: number;
  minimumOrder: number;
  tax: number;
  reviewData: ReviewData;
  categories: Category[];
  rating: number | null;
  isAvailable: boolean;
  openingTimes: OpeningTimes[];
  __typename: string;
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
  getCategoryTitles: any;
}

interface RestaurantListProps {
  restaurants: Restaurant[];
}

interface mapComponentProp {
  useStatesProps: any;
  functionHandlersProps: any;
}
