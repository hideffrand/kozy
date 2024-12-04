import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/dashboard-layout";
import { API_BASE_URL } from "../../config";
import { useAuth } from "../../hooks";

export default function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("");

  const fetchUsers = async (role) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users?role=${role}`);
      if (!res.ok) {
        console.error("Error fetching users.");
        return;
      }
      const parsed = await res.json();
      setUsers(parsed.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (user?.role === "spv") {
      setFilterRole("customer");
      fetchUsers("customer");
    } else {
      fetchUsers("");
    }
  }, []);

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setFilterRole(role);
    fetchUsers(role);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-purple-700 mb-16">All Users</h1>
      {user?.role === "owner" && (
        <div className="mb-6">
          <label
            htmlFor="roleFilter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by Role
          </label>
          <select
            id="roleFilter"
            value={filterRole}
            onChange={handleRoleChange}
            className="block w-full md:w-1/6 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm"
          >
            <option value="">–– All</option>
            <option value="Customer">Customer</option>
            <option value="spv">SPV</option>
          </select>
        </div>
      )}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse bg-white text-left shadow-sm">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="py-3 px-4 font-semibold text-sm"></th>
              <th className="py-3 px-4 font-semibold text-sm">Name</th>
              <th className="py-3 px-4 font-semibold text-sm">User ID</th>
              <th className="py-3 px-4 font-semibold text-sm">Email</th>
              <th className="py-3 px-4 font-semibold text-sm">Address</th>
              <th className="py-3 px-4 font-semibold text-sm">Outlet</th>
              <th className="py-3 px-4 font-semibold text-sm">Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((spv, i) => (
              <tr
                key={i}
                className={`border-b hover:bg-purple-50 ${
                  i % 2 === 0 ? "bg-blue-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4 text-gray-700">
                  <img
                    src={
                      spv.photo
                        ? spv.photo
                        : "https://placehold.co/200x200?text=No+Image"
                    }
                    alt={spv.photo}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4 text-gray-700">{spv.name}</td>
                <td className="py-3 px-4 text-gray-700">{spv.user_id}</td>
                <td className="py-3 px-4 text-gray-700">{spv.email}</td>
                <td className="py-3 px-4 text-gray-700">{spv.address}</td>
                <td className="py-3 px-4 text-gray-700">
                  {spv.outlet_id || "N/A"}
                </td>
                <td className="py-3 px-4 text-gray-700">{spv.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users?.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <p>No users found.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
