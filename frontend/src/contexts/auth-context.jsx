import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
      return null;
    }
  });
  // localStorage.removeItem("user");
  function saveUser(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }

  function saveToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 30);
    document.cookie = `token=${encodeURIComponent(
      token
    )}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
  }

  function getToken() {
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    return match ? decodeURIComponent(match[2]) : null;
  }

  function removeToken() {
    localStorage.removeItem("token");
  }

  function removeUser() {
    localStorage.removeItem("user");
    setUser(null);
  }

  async function revalidateUser() {
    const res = await fetch(`${API_BASE_URL}/users/${user.user_id}`);
    if (!res.ok) return;

    const parsed = await res.json();
    saveUser(parsed.data);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        saveUser,
        removeUser,
        saveToken,
        getToken,
        removeToken,
        revalidateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
