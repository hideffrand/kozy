import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import DashboardLayout from "../../layouts/dashboard-layout";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import { FaUser, FaBuilding, FaListAlt } from "react-icons/fa";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState();

  async function fetchRooms() {
    const res = await fetch(`${API_BASE_URL}/outlets/${user?.outlet_id}`);
    if (!res.ok) {
      console.log(`Failed getting ${user?.name} outlet rooms`);
      return;
    }

    const parsed = await res.json();
    setRooms(parsed.data.rooms);
  }

  useEffect(() => {
    if (user?.role === "spv") {
      fetchRooms();
    }
  }, [user?.role]);

  const [bookings, setBookings] = useState([]);
  async function fetchBookings() {
    const res = await fetch(
      `${API_BASE_URL}/bookings?user_id=${user?.user_id}`
    );
    if (!res.ok) {
      console.log(`Failed getting ${res?.booking_id}`);
      return;
    }
    const parsed = await res.json();
    console.log(parsed.data);
    setBookings(parsed.data);
  }

  useEffect(() => {
    if (user?.role == "customer") {
      fetchBookings();
    }
  }, []);

  const [denda, setDenda] = useState("");
  const [isAlerted, setIsAlerted] = useState(true);

  function getNextPayment(last_payment, booking_id) {
    const lastPaymentDate = new Date(last_payment);
    const nextPaymentDate = new Date(lastPaymentDate);
    nextPaymentDate.setDate(lastPaymentDate.getDate() + 30);
    const currentDate = new Date();
    const timeDiff = nextPaymentDate - currentDate;

    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    // if (daysLeft == -5) {
    //   handleCancelBookingAfter4Days(booking_id);
    //   setIsAlerted(false);
    //   // return;
    // }
    // if (daysLeft == -4) {
    //   setDenda("Rp375.000");
    // }
    if (daysLeft < 0) {
      // setDenda("Rp375.000");
      return `You are ${Math.abs(daysLeft)} days late`;
    }
    return `${daysLeft} days left`;
  }

  async function handleCancelBookingAfter4Days(booking_id) {
    if (!isAlerted) {
      const res = await fetch(`${API_BASE_URL}/bookings/cancel/${booking_id}`);
      if (!res.ok) return;

      alert("ANDA TELAT BAYAR 4 HARI");
      setIsAlerted(false);
      return;
    }
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-8">
        {/* Dashboard Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-800">
            Welcome, {user?.name}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Overview of your account and rooms.
          </p>
        </header>

        {/* User Profile Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center mb-4">
              <FaUser className="text-purple-600 mr-2" /> Profile
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>User ID:</strong> {user?.user_id}
              </p>
              <p>
                <strong>Role:</strong> {user?.role}
              </p>
              <p>
                <strong>Address:</strong> {user?.address}
              </p>
              <p>
                <strong>Outlet ID:</strong> {user?.outlet_id}
              </p>
            </div>
          </div>

          {/* Outlet Info Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center mb-4">
              <FaListAlt className="text-purple-600 mr-2" /> Your Next Payment
            </h2>
            {bookings?.map((t, i) => (
              <div
                key={i}
                className="bg-blue-200 shadow-md rounded-lg p-4 border border-gray-200 text-center"
              >
                <div className="flex items-center justify-center mb-3">
                  <h2 className="text-lg font-bold text-blue-800">
                    {user?.room_id}
                  </h2>
                </div>
                <p className="text-blue-800 text-lg font-medium">
                  {getNextPayment(t.last_payment, t.booking_id)}
                </p>
                <br />
                <p className="text-red-500">
                  {getNextPayment(t.last_payment, t.booking_id) ==
                  "You are 4 days late"
                    ? "Denda: Rp375.000"
                    : ""}
                </p>
              </div>
            ))}
          </div>

          {/* Role/Permissions Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center mb-4">
              <FaListAlt className="text-purple-600 mr-2" /> Permissions
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Role:</strong> {user?.role}
              </p>
              <p>
                <strong>Status:</strong> {user?.status || "Active"}
              </p>
              {/* Additional role-based information can go here */}
            </div>
          </div>
        </div>

        {/* Rooms Section for Supervisors */}
        {user?.role === "spv" && (
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 flex items-center mb-4">
              <FaListAlt className="text-purple-600 mr-2" /> Rooms List
            </h2>
            {rooms?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      Room ID: {room.room_id}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {room.description || "No description available."}
                    </p>
                    {/* Add other room details here, like availability, capacity, etc. */}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                No rooms available for this outlet.
              </p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
