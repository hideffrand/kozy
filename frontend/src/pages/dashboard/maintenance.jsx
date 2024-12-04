import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/dashboard-layout";
import { API_BASE_URL } from "../../config";
import { useAuth } from "../../hooks";

export default function Maintenance() {
  const { user } = useAuth();
  const [maintenances, setMaintenances] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    outlet_id: user?.outlet_id,
    room_number: user?.room_number,
    user_id: user.user_id,
    issue: "",
  });

  const fetchMaintenances = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/maintenance`);
      if (!res.ok) {
        console.error("Error fetching maintenance records.");
        return;
      }
      const parsed = await res.json();
      setMaintenances(parsed.data);
    } catch (error) {
      console.error("Error fetching maintenance records:", error);
    }
  };

  const fetchMaintenancesForSPV = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/maintenance?outlet_id=${user?.outlet_id}`
      );
      if (!res.ok) {
        console.error("Error fetching maintenance records.");
        return;
      }
      const parsed = await res.json();
      setMaintenances(parsed.data);
    } catch (error) {
      console.error("Error fetching maintenance records:", error);
    }
  };

  const fetchMaintenancesForCustomer = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/maintenance?user_id=${user?.user_id}`
      );
      if (!res.ok) {
        console.error("Error fetching maintenance records.");
        return;
      }
      const parsed = await res.json();
      setMaintenances(parsed.data);
    } catch (error) {
      console.error("Error fetching maintenance records:", error);
    }
  };

  useEffect(() => {
    if (user?.role == "customer") fetchMaintenancesForCustomer();
    if (user?.role == "spv") fetchMaintenancesForSPV();
    if (user?.role == "owner") fetchMaintenances();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/maintenance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        console.error("Error creating maintenance request.");
        return;
      }
      const newMaintenance = await res.json();
      setMaintenances((prev) => [newMaintenance.data, ...prev]); // Add the new maintenance at the beginning
      setModalOpen(false); // Close the modal after successful submission
    } catch (error) {
      console.error("Error creating maintenance request:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-700 mb-16">
          Maintenance
        </h1>

        {/* Button to open the modal */}
        <button
          onClick={() => setModalOpen(true)}
          className="bg-purple-700 text-white py-2 px-4 rounded-lg mb-6"
        >
          Add Maintenance Request
        </button>
      </div>

      {/* Maintenance Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse bg-white text-left shadow-sm">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="py-3 px-4 font-semibold text-sm">
                Maintenance ID
              </th>
              <th className="py-3 px-4 font-semibold text-sm">Outlet ID</th>
              <th className="py-3 px-4 font-semibold text-sm">Room Number</th>
              <th className="py-3 px-4 font-semibold text-sm">User ID</th>
              <th className="py-3 px-4 font-semibold text-sm">Issue</th>
              <th className="py-3 px-4 font-semibold text-sm">Date Reported</th>
              <th className="py-3 px-4 font-semibold text-sm">Status</th>
              <th className="py-3 px-4 font-semibold text-sm">
                Resolution Date
              </th>
            </tr>
          </thead>
          <tbody>
            {maintenances?.map((maintenance, i) => (
              <tr
                key={i}
                className={`border-b hover:bg-purple-50 ${
                  i % 2 === 0 ? "bg-blue-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4 text-gray-700">
                  {maintenance.maintenance_id}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {maintenance.outlet_id}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {maintenance.room_number}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {maintenance.user_id}
                </td>
                <td className="py-3 px-4 text-gray-700">{maintenance.issue}</td>
                <td className="py-3 px-4 text-gray-700">
                  {maintenance.date_reported || "N/A"}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {maintenance.status}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {maintenance.resolution_date || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {maintenances.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <p>No maintenance records found.</p>
          </div>
        )}
      </div>

      {/* Modal for Adding Maintenance Request */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">
              New Maintenance Request
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="outlet_id"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Outlet ID
                </label>
                <input
                  type="text"
                  id="outlet_id"
                  name="outlet_id"
                  value={formData.outlet_id}
                  className="w-full px-4 py-2 border rounded-md mt-2"
                  required
                  disabled
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="room_number"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Room Number
                </label>
                <input
                  type="text"
                  id="room_number"
                  name="room_number"
                  value={formData.room_number}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md mt-2"
                  required
                  disabled
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="user_id"
                  className="block text-sm font-semibold text-gray-700"
                >
                  User ID
                </label>
                <input
                  type="text"
                  id="user_id"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md mt-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="issue"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Issue
                </label>
                <textarea
                  id="issue"
                  name="issue"
                  value={formData.issue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md mt-2"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-700 text-white py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
