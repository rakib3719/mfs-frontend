'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { TbUserPlus } from "react-icons/tb";
import { FaRegUser, FaEnvelope, FaLock, FaPhone, FaIdCard } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axios';

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState('user'); // Default to 'user'

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const userData = {
      name: e.target.name.value,
      pin: e.target.pin.value,
      mobileNumber: e.target.phone.value,
      email: e.target.email.value.toLowerCase(),
      nid: e.target.nid.value,
      accountType: accountType,
    };

   try {
    const resp = await axiosInstance.post('/user/register', userData);
    console.log(resp, 'done');
    
   } catch (error) {
    console.log(error);
   }

    console.log('Prepared User Data:', userData);

    // Here you would typically send the data to your API
    // try {
    //   const response = await fetch('/api/register', {
    //     method: "POST",
    //     body: JSON.stringify(userData),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    //   });
    //   // Handle response...
    // } catch (error) {
    //   // Handle error...
    // }

    setLoading(false);
  };

  return (
    <div className="flex p-2 md:p-12 lg:p-20  items-center justify-center bg-gray-50">
      <ToastContainer />
      <div className="w-full mt-24  pb-8 space-y-6 bg-white shadow-lg">
        <div className='flex w-full items-center font-semibold text-lg gap-4 text-white px-8 py-2 bg-[#2b97a3]'>
          <h1 className='text-3xl'><TbUserPlus /></h1>
          <h1 className=''>Create an Account</h1>
        </div>

        <div className='md:flex'>
          <form onSubmit={registerHandler} className="mt-8 space-y-4 px-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="sr-only">Full Name</label>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaRegUser className="text-[#ababab] text-lg" />
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2b97a4] focus:border-[#2b97a4] sm:text-sm"
                    placeholder="Full Name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-[#ababab] text-lg" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2b97a4] focus:border-[#2b97a4] sm:text-sm"
                    placeholder="Email Address"
                  />
                </div>
              </div>

              {/* PIN Field */}
              <div>
                <label htmlFor="pin" className="sr-only">PIN</label>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-[#ababab] text-lg" />
                  </span>
                  <input
                    id="pin"
                    name="pin"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2b97a4] focus:border-[#2b97a4] sm:text-sm"
                    placeholder="Create PIN (5 digits)"
                    pattern="\d{5}"
                    title="PIN must be exactly 5 digits"
                    maxLength="5"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="sr-only">Mobile Number</label>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-[#ababab] text-lg" />
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2b97a4] focus:border-[#2b97a4] sm:text-sm"
                    placeholder="Mobile Number"
                  />
                </div>
              </div>

              {/* Account Type Dropdown */}
              <div>
                <label htmlFor="accountType" className="sr-only">Account Type</label>
                <div className="relative flex items-center">
                  <select
                    id="accountType"
                    name="accountType"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    required
                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-[#2b97a4] focus:border-[#2b97a4] sm:text-sm"
                  >
                    <option value="user">User</option>
                    <option value="agent">Agent</option>
                  </select>
                </div>
              </div>

              {/* NID Field */}
              <div>
                <label htmlFor="nid" className="sr-only">NID Number</label>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaIdCard className="text-[#ababab] text-lg" />
                  </span>
                  <input
                    id="nid"
                    name="nid"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2b97a4] focus:border-[#2b97a4] sm:text-sm"
                    placeholder="National ID Number"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="group relative flex w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2b97a4] hover:bg-[#248892] transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2b97a4] items-center gap-2"
              >
                <FaUserAlt className='mb-1' /> 
                {loading ? "Processing..." : "Register"}
              </button>
            </div>
          </form>

          <div className="mt-6 px-8 w-full">
            <h1 className='font-semibold text-black'>ALREADY HAVE AN ACCOUNT?</h1>
            <p className="font-medium text-[#4f4f4f]">
              Sign in to your account to continue!
            </p>

            <Link
              href={'/login'}
              className="group relative flex w-full justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2b97a4] hover:bg-[#248892] transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2b97a4]"
            >
              SIGN IN NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;