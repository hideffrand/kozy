import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/dashboard-layout";
import { API_BASE_URL } from "../../config";

const AddOutlet = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    spv_id: "S0123",
    type: "",
    motorcycle_slot: 0,
    car_slot: 0,
  });

  const [image, setImage] = useState(null);
  const [supervisors, setSupervisors] = useState([]);

  // Fetch supervisors and types
  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users?role=spv`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch supervisors");
        }
        const parsed = await response.json();
        console.log(parsed);
        const filteredSupervisors = parsed.data.filter(
          (spv) => spv.outlet_id == null
        );
        setSupervisors(filteredSupervisors);
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      }
    };

    fetchSupervisors();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Rename image
    const formattedName = formData.name
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^\w\-]+/g, "");
    const imageName = `${formattedName}.webp`;

    // Save the image locally
    if (image) {
      const imageData = new FormData();
      imageData.append("file", image, imageName);

      try {
        const response = await fetch(`${API_BASE_URL}/upload`, {
          method: "POST",
          body: imageData,
        });
        if (!response.ok) {
          throw new Error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    // Submit outlet data
    const outletData = { ...formData, photo: imageName };

    try {
      const response = await fetch(`${API_BASE_URL}/outlets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(outletData),
      });
      if (!response.ok) {
        throw new Error("Failed to add outlet");
      }
      alert("Outlet successfully added!");
    } catch (error) {
      console.error("Error adding outlet:", error);
      alert("Failed to add outlet.");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center gap-4 mb-16">
        <button
          onClick={() => window.history.back()}
          className="text-purple-700 hover:text-purple-500 inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-purple-700">Add New Outlet</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 flex h-2/3 w-full gap-12"
      >
        {/* Image */}
        <div className="flex flex-col items-center justify-center h-full w-1/3 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-500 transition">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 group-hover:text-purple-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-center mt-2 text-sm text-gray-600 group-hover:text-purple-700">
              Drag and drop your image here, or click to upload
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
          {image && (
            <p className="mt-3 text-sm text-gray-700">
              Selected File: <strong>{image.name}</strong>
            </p>
          )}
        </div>

        <div className="flex flex-col justify-center w-full h-full gap-4">
          {/* Outlet Name */}
          <div>
            <label className="block font-medium text-gray-700">
              Outlet Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>

          {/* City */}
          <div>
            <label className="block font-medium text-gray-700">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              required
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>

          {/* Supervisor */}
          <div>
            <label className="block font-medium text-gray-700">
              Supervisor
            </label>
            <select
              value={formData.spv_id}
              onChange={(e) =>
                setFormData({ ...formData, spv_id: e.target.value })
              }
              // required
              disabled
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-300"
            >
              <option value="" disabled>
                Select Supervisor
              </option>
              {supervisors?.map((spv, i) => (
                <option key={i} value={spv.user_id}>
                  {spv.name}
                </option>
              ))}
            </select>
          </div>

          {/* Motorcycle Slot */}
          <div>
            <label className="block font-medium text-gray-700">
              Motorcycle Slot
            </label>
            <input
              type="number"
              value={formData.motorcycle_slot}
              onChange={(e) =>
                setFormData({ ...formData, motorcycle_slot: +e.target.value })
              }
              required
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>

          {/* Car Slot */}
          <div>
            <label className="block font-medium text-gray-700">Car Slot</label>
            <input
              type="number"
              value={formData.car_slot}
              onChange={(e) =>
                setFormData({ ...formData, car_slot: +e.target.value })
              }
              required
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 focus:outline-none focus:ring focus:ring-purple-300"
          >
            Add Outlet
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default AddOutlet;
