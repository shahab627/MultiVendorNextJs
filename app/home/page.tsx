import RestaurantCard from "@/components/restaurantCard";
import { RESTAURANTS_DATA_SET } from "@/constants/restaurants";
import dynamic from "next/dynamic";
import { Toast } from "primereact/toast";
// Dynamically import the Map component with no SSR
const MapLayout = dynamic(() => import("@/components/map"), { ssr: false });

export default function Home({
  useStatesProps,
  functionHandlersProps,
  toast,
}: any) {
  const { nearbyRestaurants } = useStatesProps;
  return (
    <div className="bg-white w-full h-full mt-20 ">
      <Toast ref={toast} />

      <MapLayout
        useStatesProps={useStatesProps}
        functionHandlersProps={functionHandlersProps}
      />
      {/* Lower Body  */}

      <div className="bg-primary">
        <div className=" bg-white mr-20 rounded-r-[40px]">
          {/* Nearby Shops  */}
          {nearbyRestaurants.length > 0 && (
            <div>
              <div className=" p-10">
                <div className="w-20 h-3 bg-headingBar mb-2"></div>
                <label className="font-extrabold text-[25px]">
                  Nearby Restaurants
                </label>
              </div>
              <div className="flex mt-5 flex-wrap justify-center ">
                {nearbyRestaurants.map(
                  (restaurant: Restaurant, index: number) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      isDark={index % 2 === 0}
                    />
                  )
                )}
              </div>
            </div>
          )}

          {/* All Shops  */}
          <div>
            <div className=" p-10">
              <div className="w-20 h-3 bg-headingBar mb-2"></div>
              <label className="font-extrabold text-[25px]">
                All Restaurants
              </label>
            </div>
            <div className="flex mt-5 flex-wrap justify-center ">
              {RESTAURANTS_DATA_SET.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  isDark={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
