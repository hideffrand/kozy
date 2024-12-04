import { toImgUrl } from "../utils";
import { useNavigate } from "react-router-dom";

export default function OutletCard({ outlet, type }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`${
          type == 2 ? "w-full" : "w-60"
        } flex flex-col bg-white overflow-hidden cursor-pointer relative ${
          type == 2 ? "rounded-md shadow-sm" : "flex-shrink-0"
        }`}
        onClick={() => navigate(`/outlets/${outlet.outlet_id}`)}
      >
        <img
          src={`/outlets/${toImgUrl(outlet.name)}`}
          alt={outlet.name}
          className="w-full h-52 object-cover rounded-t-md"
        />
        <div className={`${type == 2 ? "p-4" : "pt-4"}`}>
          <h3 className="text-md font-semibold">{outlet.name}</h3>
          <p className="text-gray-400 mt-1 text-xs">{outlet.address}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {outlet.motorcycle_slot > 0 && (
              <span className="flex items-center text-xs bg-gray-100 text-gray-800 py-1 px-3 rounded-full">
                🛵 Motorcycle Parking ({outlet.motorcycle_slot})
              </span>
            )}
            {outlet.car_slot > 0 && (
              <span className="flex items-center text-xs bg-gray-100 text-gray-800 py-1 px-3 rounded-full">
                🚗 Car Parking ({outlet.car_slot})
              </span>
            )}
          </div>
          <button
            className="w-full mt-6 py-2 bg-gradient-to-r from-[#8542F0] to-[#9155F1] text-white font-medium rounded-md hover:from-[#792FEE] hover:to-[#6212E2] transition-all duration-300"
            onClick={() => navigate(`/outlets/${outlet.outlet_id}`)}
          >
            View Rooms
          </button>
        </div>
      </div>
    </>
  );
}
