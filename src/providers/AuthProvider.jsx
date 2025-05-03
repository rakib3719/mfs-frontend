"use client";



import axiosInstance from "@/utils/axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const resp = await axiosInstance.get('/user/getUserOne');
      console.log('User data:', resp.data); 
      if (resp) {
        setUser(resp.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUser();
  }, []);


  useEffect(() => {
    const interval = setInterval(fetchUser, 15 * 60 * 1000); 
    return () => clearInterval(interval);
  }, []);

  const value = {
    user,
    setUser,
    refreshUser: fetchUser, 
    isLoading: loading
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-pulse text-xl font-semibold text-gray-700 dark:text-gray-300">
          Loading user data...
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value || { _id: "6812361c62ae78fd5244f6db",
      name: "John Doe",
      mobileNumber: "01712345678",
      email: "john@example.com",
      nid: "1234567890",
      accountType: "user",
      balance: 490,
      isActive: true,
      isApproved: true,
      createdAt: "2025-04-30T14:39:24.994Z",
      updatedAt: "2025-05-02T10:53:51.069Z",
      __v: 0}}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
     return { user: null, setUser: () => {}, isLoading: true };
  }
  return context;
};