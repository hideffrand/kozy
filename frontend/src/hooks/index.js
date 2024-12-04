import { AuthContext } from "../contexts/auth-context";
import { OutletsContext } from "../contexts/outlets-context";
import { RoomModalContext } from "../contexts/room-modal-context";
import { useContext } from "react";

export const useOutlets = () => {
  const ctx = useContext(OutletsContext);

  if (!ctx) {
    console.log("OutletsContext must be used withing OutletsContext.Provider");
  }

  return ctx;
};

export const useRoomModal = () => {
  const ctx = useContext(RoomModalContext);

  if (!ctx) {
    console.log(
      "RoomModalContext must be used withing RoomModalContext.Provider"
    );
  }

  return ctx;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    console.log("AuthContext must be used withing AuthContext.Provider");
  }

  return ctx;
};
