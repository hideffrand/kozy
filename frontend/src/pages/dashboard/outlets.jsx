import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutlets } from "../../hooks";
import DashboardLayout from "../../layouts/dashboard-layout";
import { API_BASE_URL } from "../../config";

export default function Outlets() {
  const { outlets, outletCities } = useOutlets();
  const [selectedCity, setSelectedCity] = useState("All");
  const navigate = useNavigate();

  const filteredOutlets =
    selectedCity === "All"
      ? outlets
      : outlets.filter((outlet) => outlet.city === selectedCity);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-purple-700 mb-16">Outlets</h1>
      <div className="mb-8 flex w-full justify-between">
        <div className="">
          <label className="text-gray-700 font-medium mr-4">
            Filter by City:
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-300"
          >
            <option value="All">–– All</option>
            {outletCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => navigate("/dashboard/add-outlet")}
          className="px-4 py-2 bg-purple-700 text-white font-medium rounded-md shadow-sm hover:bg-purple-800 transition"
        >
          Add New
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse bg-white text-left shadow-sm">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="py-3 px-4 font-semibold text-sm">Outlet ID</th>
              <th className="py-3 px-4 font-semibold text-sm">Name</th>
              <th className="py-3 px-4 font-semibold text-sm">Address</th>
              <th className="py-3 px-4 font-semibold text-sm">Phone</th>
              <th className="py-3 px-4 font-semibold text-sm">Supervisor</th>
            </tr>
          </thead>
          <tbody>
            {filteredOutlets.map((outlet, i) => (
              <tr
                key={i}
                className={`border-b hover:bg-purple-50 ${
                  i % 2 === 0 ? "bg-blue-50" : "bg-white"
                }`}
              >
                <td
                  className="py-3 px-4 text-purple-600 underline cursor-pointer"
                  onClick={() =>
                    navigate(`/dashboard/outlet/${outlet.outlet_id}`)
                  }
                >
                  {outlet.outlet_id}
                </td>
                <td className="py-3 px-4 text-gray-700">{outlet.name}</td>
                <td className="py-3 px-4 text-gray-700">{outlet.address}</td>
                <td className="py-3 px-4 text-gray-700">{outlet.phone}</td>
                <td
                  className="py-3 px-4 text-blue-600 underline cursor-pointer"
                  onClick={() => navigate(`/users/${outlet.spv_id}`)}
                >
                  {outlet.spv_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOutlets.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <p>No outlets available for the selected city.</p>
        </div>
      )}
    </DashboardLayout>
  );
}
