import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { toRupiah } from "../utils";
import Facilities from "../components/facilities";
import DatePicker from "react-datepicker";
import { useAuth } from "../hooks";

const RoomBooking = () => {
  const { user } = useAuth();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [typeDesc, setTypeDesc] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const checkInDateRef = useRef();
  const stayDurationRef = useRef();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
          method: "GET",
        });
        if (!res.ok) {
          console.warn("Failed to fetch room.");
          return;
        }
        const parsed = await res.json();
        setRoom(parsed.data);
        setTypeDesc(parsed.data.type_desc);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    if (!checkInDateRef.current.value | !stayDurationRef.current.value) return;

    console.log(checkInDateRef.current.value);
    console.log(stayDurationRef.current.value);
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.user_id,
          room_id: roomId,
          outlet_id: room.outlet_id,
          check_in_date: checkInDateRef.current.value,
          stay_duration: stayDurationRef.current.value,
        }),
      });

      if (!response.ok) {
        alert("Failed to make booking");
        console.log(response);
      }
      alert("Booking confirmed!");
      navigate("/dashboard/bookings");
    } catch (error) {
      console.error("Error during booking:", error);
    } finally {
      setShowModal(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Room Image and Gallery */}
      <div className="space-y-6">
        {/* Large Image */}
        <img
          src={room.photo || "https://placehold.co/600x400?text=Room"}
          alt="Room"
          className="w-full h-[350px] object-cover rounded-xl shadow-lg"
        />

        {/* Image Gallery - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, idx) => (
            <img
              key={idx}
              src={room.photo || "https://placehold.co/300x200?text=Room"}
              alt={`Room ${idx + 1}`}
              className="w-full h-[200px] object-cover rounded-xl shadow-lg"
            />
          ))}
        </div>
      </div>

      {/* Right Column: Room Details, Facilities, and Booking Form */}
      <div className="space-y-6">
        {/* Room Information */}
        <div>
          <h2 className="text-3xl font-semibold mb-2">
            Room: {room.type_desc.type_name} ({room.room_number})
          </h2>
          <p className="text-xl text-gray-600">
            Price: {toRupiah(room.type_desc.price)}
          </p>
        </div>

        {/* Facilities Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Facilities</h3>
          <Facilities facilities={typeDesc} />
        </div>

        {/* Booking Form */}
        <form onSubmit={handleConfirmBooking} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="check_in_date"
              className="font-semibold text-gray-700"
            >
              Check-In Date:
            </label>
            {/* <DatePicker
              // selected={
              //   formData.check_in_date ? new Date(formData.check_in_date) : null
              // }
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              dateFormat="yyyy-MM-dd"  // disini bukan mslhnya, hrsnya engga sih coba gw pake date biasa
              ref={checkInDateRef}
              required
            /> */}
            <input type="date" ref={checkInDateRef} required />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="stay_duration"
              className="font-semibold text-gray-700"
            >
              Stay Duration (in months):
            </label>
            <select
              id="stay_duration"
              name="stay_duration"
              ref={stayDurationRef}
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              {[...Array(12)].map((_, idx) => (
                <option key={idx} value={idx + 1}>
                  {idx + 1} Month{idx + 1 > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-purple-600 text-white font-semibold rounded-xl shadow-md hover:bg-purple-700 transition duration-300"
          >
            Confirm Booking
          </button>
        </form>
      </div>

      {/* Modal for Booking Confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
            <h3 className="text-lg font-semibold text-center text-gray-700 mb-4">
              Confirm Your Booking
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to confirm this booking? This action cannot
              be undone.
            </p>
            <div className="flex justify-around">
              <button
                onClick={setShowModal(false)}
                className="py-2 px-6 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmBooking(e)}
                className="py-2 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomBooking;
