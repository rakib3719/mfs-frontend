"use client";


import axiosInstance from "@/utils/axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const resp = await axiosInstance.post('/user/getUserOne');
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
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};