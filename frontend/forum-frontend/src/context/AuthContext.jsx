import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin, getUserProfile } from "../data_acess/user_api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (username_or_email, password) => {
    try {
      const data = await apiLogin(username_or_email, password);
      localStorage.setItem("token", data.token);
      await fetchUser();
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
