import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/dashboard-layout";
import { toImgUrl, toRupiah } from "../../utils";
import { API_BASE_URL } from "../../config";

export default function OutletDetails() {
  const { id } = useParams();
  const [outletDetails, setOutletDetails] = useState();

  useEffect(() => {
    const fetchOutletDetails = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/outlets/${id}`);
        if (!res.ok) {
          console.error("Error fetching outlet details.");
          return;
        }
        const parsed = await res.json();

        setOutletDetails(parsed.data);
      } catch (error) {
        console.error("Error fetching outlet details:", error);
      }
    };

    fetchOutletDetails();
  }, [id]);

  if (!outletDetails) {
    return <p>Loading...</p>;
  }

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
        <h1 className="text-3xl items-center font-bold text-purple-700">
          {outletDetails.name}
        </h1>
      </div>
      <div className="mb-8">
        <p>
          <strong>Address:</strong> {outletDetails.address}
        </p>
        <p>
          <strong>City:</strong> {outletDetails.city}
        </p>
        <p>
          <strong>Phone:</strong> {outletDetails.phone}
        </p>
      </div>

      {/* Room Details */}
      <h2 className="text-2xl font-semibold mb-4">Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {outletDetails.rooms.map((room) => (
          <div
            key={room.room_id}
            className="border rounded-t-lg shadow hover:shadow-md"
          >
            <img
              src={
                `../../rooms/${toImgUrl(room.type_id)}` ||
                "https://placehold.co/300x300?text=No+Image"
              }
              alt={`Room ${room.room_number}`}
              className="rounded mb-4"
            />
            <div className="pb-4 px-4">
              <p>
                <strong>Room {room.room_number}</strong> -{" "}
                <span
                  className={`${
                    room.availability_status ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {room.availability_status ? "Available" : "Unavailable"}
                </span>
              </p>
              <p>
                <strong>Type:</strong> {room.type_name}
              </p>
              <p>
                <strong>Size:</strong> {room.size}
              </p>
              <p>
                <strong>Price:</strong> {room.price.toLocaleString()} IDR
              </p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
