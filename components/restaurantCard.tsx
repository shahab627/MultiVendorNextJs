import React from "react";

const RestaurantCard = ({
  restaurant,
  isDark,
  getCategoryTitles,
}: RestaurantCardProps) => {
  return (
    <div
      className={`rounded-lg shadow-lg p-4 m-4 ${
        isDark ? "bg-gray-800 text-white" : "bg-primary text-gray-800"
      }`}
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="rounded-t-lg w-full h-40 object-cover"
        />
        <div className="absolute top-2 left-2 right-2 flex justify-between">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ♥
          </span>
          <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
            {restaurant.deliveryTime}
          </span>
        </div>
      </div>
      <div className="flex flex-col mt-4 justify-center items-center text-center">
        <h2 className="text-lg font-bold">{restaurant.name}</h2>
        <p className="text-sm">{restaurant.address}</p>
        <p className="text-sm flex items-center">
          <span className="ml-1 text-yellow-500">★</span>
          <span className="ml-1">
            {restaurant.reviewData.ratings} ({restaurant.reviewData.total})
          </span>
        </p>
        <p className="text-sm">Minimum Order: {restaurant.minimumOrder} $</p>
        <p className="text-sm"> {getCategoryTitles(restaurant.categories)} </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
