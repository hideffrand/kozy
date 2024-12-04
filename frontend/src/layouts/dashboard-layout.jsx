import { MdOutlinePayment, MdOutlinePayments } from "react-icons/md";
import { FaUsers, FaHome, FaBuilding, FaTools } from "react-icons/fa";
import { LuArrowDownRightSquare } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";

export default function DashboardLayout({ children }) {
  const { user, removeUser, removeToken } = useAuth();
  const customerLinks = [
    {
      label: "Bookings",
      href: "bookings",
      icon: LuArrowDownRightSquare,
    },
    {
      label: "Transactions",
      href: "transactions",
      icon: MdOutlinePayment,
    },
    {
      label: "Maintenance",
      href: "maintenance",
      icon: FaTools,
    },
  ];
  const spvLinks = [
    ...customerLinks,
    {
      label: "Payments",
      href: "payments",
      icon: MdOutlinePayments,
    },
  ];
  const ownerLinks = [
    ...spvLinks,
    {
      label: "Outlets",
      href: "outlets",
      icon: FaBuilding,
    },
    {
      label: "Users",
      href: "users",
      icon: FaUsers,
    },
  ];
  const links = {
    customer: customerLinks,
    spv: spvLinks,
    owner: ownerLinks,
  };
  const [currentPage, setCurrentPage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/");
    const lastPart = pathParts[pathParts.length - 1];

    setCurrentPage(lastPart);
  }, []);

  return (
    <div className="flex w-full h-screen">
      <div className="w-[360px] bg-white px-4 py-10 h-screen flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row items-center space-x-2 ml-4 py-6">
            <button
              onClick={() => navigate("/")}
              // className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded h-fit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-gray-400">
              Welcome,
              <span className="font-bold text-lg text-black">
                {user?.name}
              </span>
            </h1>
          </div>
          <div className="w-full flex flex-col gap-2">
            <button
              onClick={() => navigate("/dashboard")}
              className={`relative flex gap-4 items-center w-full px-4 py-2 rounded-md hover:bg-gray-100 ${
                currentPage == "dashboard" && "bg-gray-100"
              }`}
            >
              <FaHome size={20} color="#9155F1" />
              Dashboard
              {/* <div className="absolute top-0 left-0 w-5 h-5 pt-1 flex items-center justify-center text-white translate-x-1/3 -translate-y-1/3 text-sm bg-red-500 rounded-full">
                4
              </div> */}
            </button>
            {links[user?.role].map((link, i) => (
              <button
                onClick={() => navigate(`/dashboard/${link.href}`)}
                key={i}
                className={`relative flex gap-4 items-center w-full px-4 py-2 rounded-md hover:bg-gray-100 ${
                  currentPage == link.href && "bg-gray-100"
                }`}
              >
                <link.icon size={20} color="#9155F1" />
                {link.label}
                {/* <div className="absolute top-0 left-0 w-5 h-5 pt-1 flex items-center justify-center text-white translate-x-1/3 -translate-y-1/3 text-sm bg-red-500 rounded-full">
                  4
                </div> */}
              </button>
            ))}
          </div>
        </div>
        <button
          className={`relative flex gap-4 items-center w-full px-4 py-2 rounded-md shadow hover:bg-gray-200`}
          onClick={() => {
            removeUser();
            removeToken();
          }}
        >
          <CgLogOut />
          Logout
        </button>
      </div>
      <section className="w-full h-auto overflow-y-auto py-10 px-10">
        {children}
      </section>
    </div>
  );
}
