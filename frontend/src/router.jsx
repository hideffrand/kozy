import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Outlets from "./pages/outlets";
import Outlet from "./pages/outlet";
import RoomDetail from "./pages/room-detail";

import ProtectedRoutes from "./protected-routes";
import OutletDetails from "./pages/dashboard/outlet";
import DashboardOutlets from "./pages/dashboard/outlets";
import AddOutlet from "./pages/dashboard/add-outlet";
import Dashboard from "./pages/dashboard/dashboard";
import Payments from "./pages/dashboard/payments";
import Customer from "./pages/dashboard/customer";
import RoomBooking from "./pages/booking";
import Bookings from "./pages/dashboard/bookings";
import Maintenance from "./pages/dashboard/maintenance";
import Users from "./pages/dashboard/Users";
import Transactions from "./pages/dashboard/transactions";
import TNC from "./pages/tnc";

export default function Router() {
  const protectedRoutes = [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/dashboard/payments",
      element: <Payments />,
    },
    {
      path: "/dashboard/transactions",
      element: <Transactions />,
    },
    {
      path: "/dashboard/customer",
      element: <Customer />,
    },
    {
      path: "/dashboard/maintenance",
      element: <Maintenance />,
    },
    {
      path: "/dashboard/bookings",
      element: <Bookings />,
    },
    {
      path: "/dashboard/outlets",
      element: <DashboardOutlets />,
    },
    {
      path: "/dashboard/add-outlet",
      element: <AddOutlet />,
    },
    {
      path: "/dashboard/outlet/:id",
      element: <OutletDetails />,
    },
    // {
    //   path: "/dashboard/users/:id",
    //   element: <OutletDetails />,
    // },
    {
      path: "/dashboard/users",
      element: <Users />,
    },
  ];
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/outlets" element={<Outlets />} />
        <Route path="/tnc" element={<TNC />} />
        <Route path="/outlets/:id" element={<Outlet />} />
        <Route path="/room-detail/:id" element={<RoomDetail />} />
        <Route path="/booking/:roomId" element={<RoomBooking />} />
        {protectedRoutes.map((p, i) => (
          <Route
            key={i}
            path={p.path}
            element={<ProtectedRoutes>{p.element}</ProtectedRoutes>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
