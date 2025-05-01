import React from "react";
import {
  FaMoneyBillWave,
  FaArrowCircleUp,
  FaArrowCircleDown,
  FaRegCreditCard,
  FaMobileAlt,
  FaWallet,
  FaHistory,
} from "react-icons/fa";

const menuItems = [
  {
    label: "Send Money",
    icon: <FaArrowCircleUp size={24} />,
    bg: "bg-pink-500",
  },
  {
    label: "Cash In",
    icon: <FaArrowCircleDown size={24} />,
    bg: "bg-green-500",
  },
  {
    label: "Cash Out",
    icon: <FaMoneyBillWave size={24} />,
    bg: "bg-yellow-500",
  },
  {
    label: "Mobile Recharge",
    icon: <FaMobileAlt size={24} />,
    bg: "bg-indigo-500",
  },
  {
    label: "Pay Bill",
    icon: <FaRegCreditCard size={24} />,
    bg: "bg-blue-500",
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
  return (
    <div className="grid max-w-[700px] mx-auto mt-16 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 p-4 ">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center cursor-pointer group"
        >
          <div
            className={`w-16 h-16 ${item.bg} text-white flex items-center justify-center rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300`}
          >
            {item.icon}
          </div>
          <p className="text-sm text-gray-700 mt-2 text-center">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Menu;
