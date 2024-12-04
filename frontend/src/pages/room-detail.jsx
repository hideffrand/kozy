import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Facilities from "../components/facilities";
import { API_BASE_URL } from "../config";
import { toImgUrl, toRupiah } from "../utils";
import { useRoomModal } from "../hooks";
import { FaChevronRight } from "react-icons/fa";

const RoomDetail = () => {
  const { isOpen, setIsOpen, roomId } = useRoomModal();
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/rooms/${roomId}`);
        if (!res.ok) {
          console.warn("Failed to get room.");
          return;
        }
        const parsed = await res.json();
        setRoom(parsed.data);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomDetail();
  }, [roomId]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 transition-opacity z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-1/2 lg:w-1/3 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center absolute top-4 left-4 w-12 h-12 p-2 bg-white rounded-full shadow-lg border"
        >
          <FaChevronRight size={20} color="gray" />
        </button>

        {/* Content */}
        <div className="h-full overflow-y-auto p-6 space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="loader">Loading...</div>
            </div>
          ) : !room ? (
            <div className="p-4 text-center text-gray-600">Room not found</div>
          ) : (
            <>
              {/* Room Image */}
              <img
                src={`/rooms/${toImgUrl(room.type_id)}`}
                alt={room.type_desc?.type_name || "Room"}
                className="w-full h-56 object-cover rounded-lg mb-6"
              />

              {/* Room Name */}
              <h3 className="text-2xl font-semibold text-main mb-2">
                {room.type_desc?.type_name || "Unknown Room Type"}
              </h3>

              {/* Room Price */}
              <p className="text-lg text-gray-600">
                Price:{" "}
                <span className="font-semibold text-main">
                  {toRupiah(room.type_desc?.price || 0)}
                </span>
              </p>

              {/* Room Size */}
              <p className="text-gray-500">
                Size: {room.type_desc?.size || "N/A"}
              </p>

              {/* Facilities */}
              <div className="mt-2">
                <Facilities facilities={room.type_desc} />
              </div>

              {/* Book Now Button */}
              <button
                className="mt-6 w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                onClick={() => navigate(`/booking/${room.room_id}`)}
              >
                Book Now
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RoomDetail;
