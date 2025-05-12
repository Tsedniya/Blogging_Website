import React, { createContext, useState, useEffect } from "react";
import api from "../common/api/connect"; // Your API utility
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  console.log("AuthProvider", currentUser, isAuthenticated, isAdmin);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await api.get("/me", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("laravel-token")}`,
          },
        }); // API endpoint to get the current user
        if (response.status !== 200) {
          throw new Error("Failed to fetch user data");
        }
        setCurrentUser(response.data);
        setIsAdmin(response.data.is_admin);
        setIsAuthenticated(true);
      } catch (err) {
        console.log(err);

        toast.error("Failed to fetch user data. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAdmin,
        setIsAdmin,
        setIsAuthenticated,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
