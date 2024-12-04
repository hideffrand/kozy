import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/dashboard-layout";
import { API_BASE_URL } from "../../config";

export default function SupervisorDetails() {
  const { supervisorId } = useParams();
  const [supervisorDetails, setSupervisorDetails] = useState(null);

  useEffect(() => {
    const fetchSupervisorDetails = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users/${supervisorId}`);
        if (!res.ok) {
          console.error("Error fetching supervisor details.");
          return;
        }
        const parsed = await res.json();
        setSupervisorDetails(parsed.data);
      } catch (error) {
        console.error("Error fetching supervisor details:", error);
      }
    };

    fetchSupervisorDetails();
  }, [supervisorId]);

  if (!supervisorDetails) {
    return <p>Loading...</p>;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center mb-12">
        <img
          src={
            supervisorDetails.photo ||
            "https://placehold.co/200x200?text=No+Image"
          }
          alt={supervisorDetails.name}
          className="rounded-full w-40 h-40 mb-6 border-4 border-purple-500"
        />
        <h1 className="text-3xl font-bold text-purple-700">
          {supervisorDetails.name}
        </h1>
        <p className="text-gray-600 italic">Supervisor ID: {supervisorId}</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-purple-500">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Supervisor Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700">
              <strong>Address:</strong> {supervisorDetails.address}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {supervisorDetails.email}
            </p>
            <p className="text-gray-700">
              <strong>Role:</strong> {supervisorDetails.role}
            </p>
          </div>
          <div>
            {supervisorDetails.outlet_id ? (
              <p className="text-gray-700">
                <strong>Outlet ID:</strong> {supervisorDetails.outlet_id}
              </p>
            ) : (
              <p className="text-gray-700 italic text-sm">
                This supervisor is not assigned to any outlet.
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
