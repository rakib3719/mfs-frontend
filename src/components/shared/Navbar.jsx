"use client";

import { useAuth } from "@/providers/AuthProvider";
import axiosInstance from "@/utils/axios";
import { useState, useEffect, useRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useAuth();
  const profileRef = useRef(null);

  const balance = user?.balance || 0;
  const formattedBalance = balance.toLocaleString('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2
  });

  const logoutHandler = async () => {
    try {
      await axiosInstance.post('/user/logout');
      window.location.reload(); // Force refresh to clear all states
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#2b97a3] to-[#1e7c8a] text-white px-6 py-3 flex justify-between items-center shadow-lg sticky top-0 z-50">
      {/* Logo with modern typography */}
      <div className="flex items-center">
        <div className="bg-white text-[#2b97a3] rounded-lg p-1 mr-2">
          <AiOutlineUser size={20} />
        </div>
        <span className="text-xl font-bold tracking-tight">MFS Pay</span>
      </div>

      {/* Balance Display - bKash/Nagad style */}
      <div 
        className="flex flex-col items-center cursor-pointer group"
        onClick={() => setShowBalance(!showBalance)}
      >
        <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
          <span className="text-xs font-medium opacity-80">Balance</span>
          <div className="flex items-center">
            <span className={`text-lg font-bold ${showBalance ? '' : 'blur-sm'}`}>
              {showBalance ? formattedBalance : '৳XXXX'}
            </span>
            <span className="ml-2">
              {showBalance ? (
                <AiOutlineEye size={16} className="opacity-80" />
              ) : (
                <AiOutlineEyeInvisible size={16} className="opacity-80" />
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Dropdown - Modern design */}
      <div className="relative" ref={profileRef}>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          onClick={() => setShowProfile(!showProfile)}
        >
          <AiOutlineUser size={20} />
        </button>

        {showProfile && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl overflow-hidden z-50">
            <div className="p-4 bg-gradient-to-r from-[#2b97a3] to-[#1e7c8a] text-white">
              <h4 className="font-bold text-lg">{user?.name}</h4>
              <p className="text-sm opacity-90">{user?.mobileNumber}</p>
            </div>
            
            <div className="p-4 border-b">
              <p className="text-gray-600 text-sm">{user?.email}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-gray-500">Account Type:</span>
                <span className="text-xs font-medium bg-[#2b97a3] text-white px-2 py-1 rounded-full">
                  {user?.accountType || 'User'}
                </span>
              </div>
            </div>
            
            <button
              onClick={logoutHandler}
              className="w-full flex items-center justify-center space-x-2 p-3 text-red-500 hover:bg-gray-100 transition-colors"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;