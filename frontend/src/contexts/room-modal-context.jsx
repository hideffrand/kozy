import { createContext, useEffect, useState } from "react";

export const RoomModalContext = createContext();

export default function RoomModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [roomId, setRoomId] = useState("");

  return (
    <RoomModalContext.Provider value={{ isOpen, setIsOpen, roomId, setRoomId }}>
      {children}
    </RoomModalContext.Provider>
  );
}
