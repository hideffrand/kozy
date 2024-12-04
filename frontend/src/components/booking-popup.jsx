import React, { useState } from "react";
import { API_BASE_URL } from "../config";

const BookingPopup = ({ onCancel, onConfirm }) => {
  const [step, setStep] = useState("confirm");
  const [countdown, setCountdown] = useState(3);

  const handleConfirm = async () => {
    setStep("countdown");
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          onConfirm(); // Proceed after countdown
        }
        return prev - 1;
      });
    }, 1000);

    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      body: JSON.stringify({
        room_id: room_id,
        user_id: user_id,
        check_in_date: check_in_date,
        stay_duration: stay_duration,
      }),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full">
        {step === "confirm" && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Are you sure you want to proceed?
            </h2>
            <p className="text-center text-gray-600 mt-2">
              Once you confirm, this action cannot be undone.
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                I'll think again
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Let's go
              </button>
            </div>
          </>
        )}

        {step === "countdown" && (
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-green-500 text-white rounded-full p-6 inline-block text-3xl">
                ✔
              </div>
            </div>
            <p className="text-lg text-gray-600">
              Redirecting in {countdown}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPopup;
