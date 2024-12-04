import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router.jsx";
import OutletsProvider from "./contexts/outlets-context.jsx";
import RoomsProvider from "./contexts/rooms-context.jsx";
import RoomModalProvider from "./contexts/room-modal-context.jsx";
import AuthProvider from "./contexts/auth-context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <OutletsProvider>
        <RoomsProvider>
          <RoomModalProvider>
            <Router />
          </RoomModalProvider>
        </RoomsProvider>
      </OutletsProvider>
    </AuthProvider>
  </StrictMode>
);
