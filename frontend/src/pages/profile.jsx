import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { API_BASE_URL } from "../../config";

const UserProfile = () => {
  const { user } = useAuth(); // Fetch user info from cookie
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users/${user.user_id}`);
        if (!res.ok) {
          console.warn("Failed to fetch user data.");
          return;
        }
        const data = await res.json();
        setUserData(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user.user_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${user.user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        console.warn("Failed to update user data.");
        return;
      }

      const updatedData = await res.json();
      setUserData(updatedData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="px-8 py-10">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        {!isEditing ? (
          <div>
            <p>
              <strong>User ID:</strong> {userData.user_id}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Address:</strong> {userData.address || "Not provided"}
            </p>
            <p>
              <strong>Role:</strong> {userData.role}
            </p>
            <p>
              <strong>Outlet ID:</strong> {userData.outlet_id || "Not assigned"}
            </p>
            <p>
              <strong>Room Number:</strong> {userData.room_number || "Not assigned"}
            </p>
            <p>
              <strong>Photo:</strong>{" "}
              {userData.photo ? (
                <img
                  src={userData.photo}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                "No photo uploaded"
              )}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Photo URL</label>
              <input
                type="text"
                name="photo"
                value={formData.photo || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;