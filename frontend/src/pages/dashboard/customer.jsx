import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/dashboard-layout";
import { API_BASE_URL } from "../../config";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch(`${API_BASE_URL}/users?role=customer`);
      if (!res.ok) {
        console.log("Error fetching customers.");
        return;
      }

      const parsed = await res.json();
      setCustomers(parsed.data);
      console.log(parsed.data);
    };

    fetchCustomers();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-purple-700 mb-16">Customers</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse bg-white text-left shadow-sm">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="py-3 px-4 font-semibold text-sm">User ID</th>
              <th className="py-3 px-4 font-semibold text-sm">Name</th>
              <th className="py-3 px-4 font-semibold text-sm">Email</th>
              <th className="py-3 px-4 font-semibold text-sm">Address</th>
              <th className="py-3 px-4 font-semibold text-sm">Room Number</th>
              <th className="py-3 px-4 font-semibold text-sm">Photo</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer, i) => (
              <tr
                key={i}
                className={`border-b hover:bg-purple-50 ${
                  i % 2 === 0 ? "bg-blue-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4 text-gray-700">{customer.user_id}</td>
                <td className="py-3 px-4 text-gray-700">{customer.name}</td>
                <td className="py-3 px-4 text-gray-700">{customer.email}</td>
                <td className="py-3 px-4 text-gray-700">{customer.address}</td>
                <td className="py-3 px-4 text-gray-700">
                  {customer.room_number || "N/A"}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {customer.photo ? (
                    <img
                      src={`${API_BASE_URL}/${customer.photo}`}
                      alt="Customer"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    "No Photo"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <p>No customers found.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
