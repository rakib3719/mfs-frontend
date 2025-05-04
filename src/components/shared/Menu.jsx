'use client'
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
  FaCreditCard,
  FaMobile,
  FaWallet,
  FaHistory,
  FaUser,
  FaUsers,
  FaUserCheck,
  FaChartBar,
  FaExchangeAlt
} from "react-icons/fa";

const Menu = () => {
  const { user } = useAuth();
  const accountType = user?.accountType;
  const pathname = usePathname();

  const getMenuItems = () => {
    const allItems = [
  
      {
        label: "Total Amount",
        icon: <FaChartBar size={20} />,
        bg: "bg-indigo-600",
        link: '/total-amount',
        roles: ['admin']
      },
      {
        label: "All Users",
        icon: <FaUsers size={20} />,
        bg: "bg-purple-600",
        link: '/all-user',
        roles: ['admin']
      },
      {
        label: "Agent Approval",
        icon: <FaUserCheck size={20} />,
        bg: "bg-blue-600",
        link: '/agent-approval',
        roles: ['admin']
      },
      {
        label: "Withdraw Request",
        icon: <FaExchangeAlt size={20} />,
        bg: "bg-amber-600",
        link: '/widthdraw-request',
        roles: ['admin']
      },
      
      // Agent specific items
      {
        label: "Cash In",
        icon: <FaArrowDown size={20} className="text-green-400" />,
        bg: "bg-gray-800 border border-green-500",
        link: '/cash-in',
        roles: ['agent']
      },
      {
        label: "Cash Request",
        icon: <FaMobile size={20} />,
        bg: "bg-gray-800 border border-blue-500",
        link: '/cash-request',
        roles: ['agent']
      },
      
      // User specific items
      {
        label: "Send Money",
        icon: <FaArrowUp size={20} className="text-blue-400" />,
        bg: "bg-gray-800 border border-blue-500",
        link: '/send-money',
        roles: ['user']
      },
      {
        label: "Cash Out",
        icon: <FaArrowUp size={20} className="text-purple-400" />,
        bg: "bg-gray-800 border border-purple-500",
        link: '/cash-out',
        roles: ['user']
      },
      
      // Shared items
      {
        label: "Pay Bill",
        icon: <FaCreditCard size={20} />,
        bg: "bg-gray-800 border border-yellow-500",
        roles: ['user', 'agent']
      },
      {
        label: "My Wallet",
        icon: <FaWallet size={20} />,
        bg: "bg-gray-800 border border-indigo-500",
        roles: ['user', 'agent', 'admin']
      },
      {
        label: "Transactions",
        icon: <FaHistory size={20} />,
        bg: "bg-gray-800 border border-rose-500",
        link: '/transaction',
        roles: ['user', 'agent', 'admin']
      },
      {
        label: "Withdraw",
        icon: <FaExchangeAlt size={20} />,
        bg: "bg-gray-800 border border-amber-500",
        link: '/widthdraw-request',
        roles: ['admin']
      },
      {
        label: "Withdraw",
        icon: <FaExchangeAlt size={20} />,
        bg: "bg-gray-800 border border-amber-500",
        link: '/widthdraw',
        roles: ['agent']
      }
    ];

    return allItems.filter(item => 
      item.roles.includes(accountType) || 
      (accountType === undefined && item.roles.includes('user'))
    );
  };

  if (pathname.includes('/login') || pathname.includes('/register')) {
    return null;
  }

  return (
    <div className="grid max-w-[800px] mx-auto mt-8 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 p-4">
      {getMenuItems().map((item, index) => (
        <Link
          href={item?.link || '#'}
          key={index}
          className="flex flex-col items-center justify-center cursor-pointer group"
        >
          <div
            className={`w-14 h-14 ${item.bg} text-white flex items-center justify-center rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300 hover:shadow-xl hover:shadow-${item.bg.split('-')[1]}-500/20`}
          >
            {item.icon}
          </div>
          <p className="text-sm text-gray-300 mt-2 text-center font-medium group-hover:text-white transition-colors">
            {item.label}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Menu;