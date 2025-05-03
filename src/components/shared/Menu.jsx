'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FaMoneyBillWave,
  FaArrowCircleUp,
  FaArrowCircleDown,
  FaRegCreditCard,
  FaMobileAlt,
  FaWallet,
  FaHistory,
  FaUser,
} from "react-icons/fa";

const menuItems = [
  {
    label: "Send Money",
    icon: <FaArrowCircleUp size={24} />,
    bg: "bg-pink-500",
    link:'/send-money'
  },
  {
    label: "Cash Out",
    icon: <FaArrowCircleDown size={24} />,
    bg: "bg-green-500",
    link:'/cash-out'
  },
  {
    label: "Cash In",
    icon: <FaMoneyBillWave size={24} />,
    bg: "bg-yellow-500",
    link:'/cash-in'
  },
  {
    label: "Cash request",
    icon: <FaMobileAlt size={24} />,
    bg: "bg-indigo-500",
    link:'/cash-request'
  },
  {
    label: "All User",
    icon: <FaUser size={24} />,
    bg: "bg-indigo-500",
    link:'/all-user'
  },
  {
    label: "Agent Aproval",
    icon: <FaUser size={24} />,
    bg: "bg-indigo-500",
    link:'/agent-approval'
  },
  {
    label: "Pay Bill",
    icon: <FaRegCreditCard size={24} />,
    bg: "bg-blue-500",
  },
  {
    label: "Widthdraw Request",
    icon: <FaRegCreditCard size={24} />,
    bg: "bg-blue-500",
    link:'/widthdraw'
  },
  {
    label: "Widthdraw Request",
    icon: <FaRegCreditCard size={24} />,
    bg: "bg-blue-500",
    link:'/widthdraw-request'
  },
  {
    label: "My Wallet",
    icon: <FaWallet size={24} />,
    bg: "bg-purple-500",
  },
  {
    label: "Transactions",
    icon: <FaHistory size={24} />,
    bg: "bg-rose-500",
  },
];




const Menu = () => {

  const pathname = usePathname();


  if(pathname.includes('/login') || pathname.includes('register')){
 return null;
  }
  return (
    <div className="grid max-w-[700px] mx-auto mt-16 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 p-4 ">
      {menuItems.map((item, index) => (
        <Link
        href={item?.link || '#'}
          key={index}
          className="flex flex-col items-center justify-center cursor-pointer group"
        >
          <div
            className={`w-16 h-16 ${item.bg} text-white flex items-center justify-center rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300`}
          >
            {item.icon}
          </div>
          <p className="text-sm text-gray-700 mt-2 text-center">{item.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
