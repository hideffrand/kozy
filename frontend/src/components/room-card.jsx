import { toImgUrl } from "../utils";
import { useNavigate } from "react-router-dom";

export default function RoomCard({ room, isAvailable, onClick }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`border rounded-lg shadow-md p-4 ${
          isAvailable ? "bg-white cursor-pointer" : "bg-gray-200 cursor-not-allowed"
        }`}
        onClick={isAvailable ? onClick : undefined}
      >
        <img
          src={room.photo || "https://placehold.co/300x200?text=Room"}
          alt={room.type_name}
          loading="lazy"
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <h3 className="mt-2 text-lg font-semibold">
          {room.type_name} Type {room.room_id}
        </h3>
        <p className="font-bold">
          Price: Rp{room.price.toLocaleString("id-ID")}
        </p>
        <p className="text-gray-500">Size: {room.size}</p>
        {isAvailable && (
          <button className="mt-6 w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-[#8440ef] transition-all">
            View Details
          </button>
        )}
      </div>
    </>
  );
}
