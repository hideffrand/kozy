import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { saveUser, saveToken } = useAuth();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login Submitted", { email, password });

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {alert("Failed to Login!")};
    const parsed = await response.json();
    console.log(parsed.data);
    saveUser(parsed.data.user);
    saveToken(parsed.data.token);
    alert("Login success!");
    navigate("/dashboard");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-2xl">
        <div className="flex justify-center">
          <img
            src="./LOGO.png"
            alt="App Logo"
            className="w-28 h-28 rounded-full shadow-lg"
          />
        </div>
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome Back!
        </h3>
        <p className="text-center text-gray-600 mb-6 text-lg">
          Please login to your account
        </p>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-purple-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
