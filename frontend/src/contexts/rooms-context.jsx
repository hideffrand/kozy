import React, { createContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../config";

export const RoomsContext = createContext();

export default function RoomsProvider({ children }) {
  const [rooms, setRooms] = useState();
  const [isFetchingRooms, setIsFetchingRooms] = useState(false);

  const fetchRooms = async () => {
    setIsFetchingRooms(true);
    try {
      const res = await fetch(`${API_BASE_URL}/rooms`);
      if (!res.ok) throw Error;

      const parsed = await res.json();
      setRooms(parsed.data);
    } catch (error) {
      console.error("Error fecthing rooms: ", error.message);
    } finally {
      setIsFetchingRooms(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <RoomsContext.Provider value={(rooms, isFetchingRooms)}>
      {children}
    </RoomsContext.Provider>
  );
}
