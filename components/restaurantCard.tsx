import React from "react";

const RestaurantCard = ({ restaurant, isDark }: RestaurantCardProps) => {
  return (
    <div
      className={`rounded-lg shadow-lg p-4 m-4 ${
        isDark ? "bg-gray-800 text-white" : "bg-primary text-gray-800"
      }`}
    >
      <div className="relative">
        <img
          src={`https://via.placeholder.com/150`}
          alt={restaurant.name}
          className="rounded-t-lg w-full h-40 object-cover"
        />
        <div className="absolute top-2 left-2 right-2 flex justify-between">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ♥
          </span>
          <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
            20 min
          </span>
        </div>
      </div>
      <div className="flex flex-col mt-4 justify-center items-center text-center">
        <h2 className="text-lg font-bold">{restaurant.name}</h2>
        <p className="text-sm">{restaurant.location}</p>
        <p className="text-sm flex items-center">
          <span className="ml-1 text-yellow-500">★</span>
          <span className="ml-1">{restaurant.rating} (5)</span>
        </p>
        <p className="text-sm">Menu: {restaurant.menuItems.join(", ")}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
