import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../layouts/dashboard-layout";
import { API_BASE_URL } from "../../config";
import { useAuth } from "../../hooks";
import { jsPDF } from "jspdf";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  const fetchBookingsForOwner = async () => {
    const res = await fetch(`${API_BASE_URL}/bookings`);
    if (!res.ok) return;

    const parsed = await res.json();
    setBookings(parsed.data);
  };

  const fetchBookingsForSPV = async () => {
    const res = await fetch(
      `${API_BASE_URL}/bookings?outlet_id=${user?.outletId}`
    );
    if (!res.ok) return;

    const parsed = await res.json();
    setBookings(parsed.data);
  };

  const fetchBookingsForCustomer = async () => {
    const res = await fetch(
      `${API_BASE_URL}/bookings?user_id=${user?.user_id}`
    );
    if (!res.ok) return;

    const parsed = await res.json();
    setBookings(parsed.data);
  };

  useEffect(() => {
    if (user?.role == "spv") {
      fetchBookingsForSPV();
    }
    if (user?.role == "owner") {
      fetchBookingsForOwner();
    }
    if (user?.role == "customer") {
      fetchBookingsForCustomer();
    }
  }, []);

  const handleAccept = async (bookingId, userId, outletId, roomId, start, duration) => {
    try {
      const acceptRes = await fetch(`${API_BASE_URL}/bookings/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_id: bookingId,
          accepted: true,
        }),
      });

      if (!acceptRes.ok) return;
      console.log(acceptRes);

      const startDate = new Date(start);
      const dueDate = new Date(startDate);
      dueDate.setDate(startDate.getDate() + 30 * duration);

      const transactionRes = await fetch(`${API_BASE_URL}/transactions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          outlet_id: outletId,
          booking_id: bookingId,
          room_id: roomId,
          penalty: 0,
          paid_at: null,
          due_date: dueDate
        }),
      });

      if (!transactionRes.ok) return;
      console.log(transactionRes);

      alert("Booking accepted and transaction created!");
      window.location.reload();
    } catch (error) {
      console.error(`Error handling booking ${bookingId}:`, error);
    }
  };

  // const handleAccept = async (bookingId, userId, outletId, roomId) => {
  //   try {
  //     const acceptRes = await fetch(`${API_BASE_URL}/bookings/`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         booking_id: bookingId,
  //         accepted: true,
  //       }),
  //     });

  //     if (!acceptRes.ok) return;
  //     console.log(acceptRes);

  //     const transactionRes = await fetch(`${API_BASE_URL}/transactions/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         user_id: userId,
  //         outlet_id: outletId,
  //         booking_id: bookingId,
  //         room_id: roomId,
  //         penalty: 0,
  //         paid_at: null,
  //       }),
  //     });

  //     if (!transactionRes.ok) return;
  //     console.log(transactionRes);

  //     alert("Booking accepted and transaction created!");
  //     window.location.reload();
  //   } catch (error) {
  //     console.error(`Error handling booking ${bookingId}:`, error);
  //   }
  // };

  const handleDecline = async (bookingId) => {
    try {
      const acceptRes = await fetch(`${API_BASE_URL}/bookings/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_id: bookingId,
          accepted: false,
        }),
      });

      if (!acceptRes.ok) return;
      console.log(acceptRes);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const tableRef = useRef(null);
  const exportToPDF = () => {
    const doc = new jsPDF("l", "mm", "a4");

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("IBDA Kost", 10, 10);

    doc.html(tableRef.current, {
      margin: [2, 2, 2, 2],
      x: 7,
      y: 17,
      autoPaging: true,
      callback: (doc) => {
        doc.save("transactions.pdf");
      },
      html2canvas: {
        scale: 0.2,
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="flex w-full justify-between items-center mb-16">
        <h1 className="text-2xl font-bold text-purple-700 ">Bookings</h1>
        <button
          onClick={exportToPDF}
          className="bg-purple-700 text-white py-2 px-4 rounded-md h-fit"
        >
          Export to PDF
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table
          ref={tableRef}
          className="min-w-full border-collapse bg-white text-left shadow-sm"
        >
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="py-3 px-4 font-semibold text-sm">ID</th>
              <th className="py-3 px-4 font-semibold text-sm">Room</th>
              <th className="py-3 px-4 font-semibold text-sm">Outlet</th>
              <th className="py-3 px-4 font-semibold text-sm">User ID</th>
              <th className="py-3 px-4 font-semibold text-sm">Check-in Date</th>
              <th className="py-3 px-4 font-semibold text-sm">Stay Duration</th>
              <th className="py-3 px-4 font-semibold text-sm">Status</th>
              {user?.role == "customer" && (
                <th className="py-3 px-4 font-semibold text-sm">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {bookings?.map((b, i) => (
              <tr
                key={i}
                className={`border-b hover:bg-[#F5EEFC] ${
                  i % 2 === 0 ? "bg-[#F3ECFD]" : "bg-white"
                }`}
              >
                <td className="py-3 px-4 text-gray-700">{b.booking_id}</td>
                <td className="py-3 px-4 text-gray-700">{b.room_id}</td>
                <td className="py-3 px-4 text-gray-700">{b.booking_id}</td>
                <td className="py-3 px-4 text-gray-700">{b.user_id}</td>
                <td className="py-3 px-4 text-gray-700">{b.check_in_date}</td>
                <td className="py-3 px-4 text-gray-700">{b.stay_duration}</td>
                {user?.role == "customer" && (
                  <td>
                    <span
                      className={
                        b.accepted == null
                          ? "text-grey-800"
                          : b.accepted == false
                          ? "text-red-800"
                          : "text-green-800"
                      }
                    >
                      {b.accepted == null
                        ? "Pending"
                        : b.accepted == false
                        ? "Declined"
                        : "Accepted"}
                    </span>
                  </td>
                )}
                {user?.role != "customer" && (
                  <td className="py-3 px-4 font-semibold text-center">
                    {b.accepted === null ? (
                      <div className="flex items-center justify-center space-x-4">
                        <button
                          onClick={() =>
                            handleAccept(
                              b.booking_id,
                              b.user_id,
                              b.outlet_id,
                              b.room_id,
                              b.check_in_date,
                              b.stay_duration
                            )
                          }
                          className="flex items-center space-x-2 text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={() => handleDecline(b.booking_id)}
                          className="flex items-center space-x-2 text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <span>Decline</span>
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`${
                          b.accepted ? "text-blue-800" : "text-red-800"
                        }`}
                      >
                        {b.accepted ? "Accepted" : "Declined"}
                      </span>
                    )}
                  </td>
                )}
                <td>
                  {user?.role == "customer" && b.accepted == null && (
                    <button
                      onClick={() => handleDecline(b.booking_id)}
                      className="flex items-center space-x-2 text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span>Cancel</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings?.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <p>No booking records found.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
