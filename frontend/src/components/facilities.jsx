import React from "react";
import {
  FaShower,
  FaRegSnowflake,
  FaTv,
  FaCoffee,
  FaTint,
} from "react-icons/fa"; 
import {BiFridge} from "react-icons/bi"

const Facilities = ({ facilities }) => {
  const facilityList = [
    { key: "bathroom", label: "Bathroom", icon: <FaShower /> },
    { key: "ac", label: "AC", icon: <FaRegSnowflake /> },
    { key: "tv", label: "TV", icon: <FaTv /> },
    { key: "mini_pantry", label: "Mini Pantry", icon: <FaCoffee /> },
    { key: "dispenser", label: "Dispenser", icon: <FaTint /> },
    { key: "fridge", label: "Fridge", icon: <BiFridge /> },
  ];

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Facilities</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {facilityList.map(
          (facility) =>
            facilities[facility.key] && (
              <span
                key={facility.key}
                className="inline-flex items-center bg-green-100 text-green-700 py-2 px-4 rounded-full text-sm font-medium shadow-sm hover:bg-green-200 flex-wrap"
              >
                <span className="mr-2">{facility.icon}</span>
                {facility.label}
              </span>
            )
        )}
      </div>
    </div>
  );
};

export default Facilities;
