import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { toImgUrl } from "../utils";
import PageLayout from "../layouts/page-layout";
import RoomDetail from "./room-detail";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import { useRoomModal } from "../hooks";

const Outlet = () => {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [outlet, setOutlet] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, setIsOpen, setRoomId } = useRoomModal();

  useEffect(() => {
    const fetchOutlet = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/outlets/${id}`, {
          method: "GET",
        });
        if (!res.ok) {
          console.warn("Failed to fetch outlet.");
          return;
        }
        const parsed = await res.json();
        setOutlet(parsed.data);
        setRooms(parsed.data.rooms);
      } catch (error) {
        console.error("Error fetching outlet:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOutlet();
  }, [id]);

  if (isLoading) {
    return <p>Loading outlet data...</p>;
  }

  return (
    <PageLayout navBgColor="white">
      {/* Outlet Info */}
      <section className="px-[14%] pt-40 w-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
          <div className="w-full h-60">
            <img
              src={toImgUrl(outlet.name)}
              alt={outlet.outletId}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(2)].map((_, idx) => (
              <img
                key={idx}
                src={toImgUrl(outlet.name)}
                alt={`Room gallery ${idx}`}
                className="w-full h-60 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-[14%] w-full py-10">
        <div className="flex gap-8">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-4">{outlet.name}</h1>
            <span className="flex gap-1 items-center">
              <IoLocationSharp size={20} color="gray" />
              <p className="text-gray-600">{outlet.address}</p>
            </span>
            <div className="mt-12 flex flex-wrap gap-2">
              {outlet.motorcycle_slot > 0 && (
                <span className="flex items-center text-md bg-white text-gray-800 py-1 px-3 rounded-full">
                  🛵 Motorcycle Parking ({outlet.motorcycle_slot})
                </span>
              )}
              {outlet.car_slot > 0 && (
                <span className="flex items-center text-md bg-white text-gray-800 py-1 px-3 rounded-full">
                  🚗 Car Parking ({outlet.car_slot})
                </span>
              )}
            </div>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Contact</h2>
            <p className="text-gray-600 text-sm">
              Call us at the number below for inquiries:
            </p>
            <button className="flex gap-2 items-center justify-center mt-4 w-full py-2 bg-gradient-to-r from-[#8542F0] to-[#9155F1] text-white rounded-md">
              <IoIosCall />
              {outlet.phone || "Click to view phone number"}
            </button>
          </div>
        </div>
      </section>

      <div className="flex gap-4 px-[14%] w-full py-10">
        {/* Room Cards */}
        <div className="space-y-8 flex-grow">
          {/* Available Rooms */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms
                .filter((room) => room.availability_status)
                .map((room) => (
                  <div
                    key={room.room_id}
                    className="border rounded-lg shadow-md bg-white cursor-pointer relative overflow-hidden"
                    onClick={() => {
                      setRoomId(room.room_id);
                      setIsOpen(true);
                    }}
                  >
                    <div className="py-2 px-4 absolute bg-gray-100">
                      {room.type_name}
                    </div>
                    <img
                      src={`/rooms/${toImgUrl(room.type_id)}`}
                      alt={room.type_name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="px-4 py-4 relative">
                      <p className="absolute right-4 -top-4 w-4 h-4 flex items-center justify-center p-4 shadow-md rounded-full bg-white border">
                        {room.room_number}
                      </p>
                      {/* <h3 className="text-md font-semibold">{room.room_id}</h3> */}
                      <p className="text-gray-500">
                        Room number: {room.room_number}
                      </p>
                      <p className="text-gray-500">Size: {room.size}</p>
                      <br />
                      <p className="text-lg border-t border-dashed pt-2 font-bold">
                        <span className="text-sm font-normal pr-1">Rp</span>
                        {room.price.toLocaleString("id-ID")}
                        <span className="text-sm text-gray-400">/ month</span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Room Detail Component */}
      {isOpen && <RoomDetail />}
    </PageLayout>
  );
};

export default Outlet;
