import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

const Navbar = ({ bgColor }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav
      className={`flex justify-between py-6 px-[14%] fixed z-10 w-full ${
        bgColor ? "text-black" : "text-white"
      } ${
        bgColor
          ? `bg-${bgColor}`
          : "bg-gradient-to-b from-[rgb(10,10,10,.5)] to-transparent"
      }`}
    >
      <div className="flex gap-4 w-full items-center">
        <a href="/">
          <img src="/LOGO.png" alt="" className="w-16 aspect-square" />
        </a>
        <a href="/outlets">Outlets</a>
        <a href="/tnc">Terms and Condition</a>
      </div>
      <div className="flex items-center gap-6 w-full justify-end">
        {user ? (
          <div className="flex flex-row space-x-6 items-center">
            <h1>Welcome back, {user.name}</h1>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-fit py-2 px-6 bg-gradient-to-r from-[#8542F0] to-[#9155F1] text-white font-medium rounded-md hover:from-[#792FEE] hover:to-[#6212E2] transition-all duration-300"
            >
              Dashboard
            </button>
          </div>
        ) : (
          <span className="flex items-center gap-1">
            <FaUser color="#792FEE" />
            <a className="pl-2" href="/login">
              Login
            </a>{" "}
            / <a href="/register">Register</a>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
