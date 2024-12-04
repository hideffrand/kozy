import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

const Register = () => {
  const { saveUser, saveToken } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name || form.name.length < 0) {
      newErrors.name = "Username must be at least 3 characters long.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (!form.address || form.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Registration Submitted", form);
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log(res);
      if (!res.ok) {
        alert("Failed");
        return;
      }

      const parsed = await res.json();
      saveUser(parsed.data.user);
      saveToken(parsed.data.token);
      alert("Register success");
      navigate("/dashboard");
    }
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
        <h4 className="text-2xl font-bold text-center text-gray-800">
          Welcome to IBDA-KOST!
        </h4>
        <p className="text-center text-gray-600 mb-6 text-lg">
          Where Comfort Meets Convenience
        </p>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                errors.name
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-[#D6ADFF]"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-[#D6ADFF]"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-[#D6ADFF]"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                errors.address
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-[#D6ADFF]"
              }`}
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-[#9833FF] rounded hover:bg-[#AD5CFF]"
          >
            Register
          </button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-purple-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
