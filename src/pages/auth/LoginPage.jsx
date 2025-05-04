'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { FaSignInAlt } from "react-icons/fa";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axios';

import { useAuth } from '@/providers/AuthProvider';


const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {refreshUser, setUser} = useAuth()
 

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axiosInstance.post('/user/login', {
      identifier: e.target.identifier.value,
      pin: e.target.pin.value
    });

    console.log(data, 'ki ase dkehi');
    try {
      const { data } = await axiosInstance.post('/user/login', {
        identifier: e.target.identifier.value,
        pin: e.target.pin.value
      });

      console.log(data, 'ki ase dkehi');
      setUser(data?.data?.user)
  
      if (data.success) {

        await refreshUser()
      
        const refreshToken ="dskhfjdhfhfdu"
    
        // Setting the refresh token in cookies
        document.cookie = `refresh_token=${refreshToken}`
    
        window.location.href = '/'; }

else{
  toast.error('Invalid Email/MobileNumber or pin')
}

    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message ||error?.message || 'Login failed');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex pb-20 items-center justify-center bg-gray-50">
      <ToastContainer />
      <div className="w-full mt-24 max-w-[700px] pb-8 space-y-6 bg-white shadow-lg">
        <div className='flex w-full items-center font-semibold text-lg gap-4 text-white px-8 py-2 bg-[#2b97a3]'>
          <h1 className='text-3xl'><FaSignInAlt /></h1>
          <h1 className=''>Login to Your Account</h1>
        </div>

        <div className='md:flex'>
          <form onSubmit={loginHandler} className="mt-8 space-y-4 px-8 w-full">
            <div className="grid grid-cols-1 gap-4">
              {/* Identifier Field (Email or Mobile) */}
              <div>
                <label htmlFor="identifier" className="sr-only">Email or Mobile Number</label>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-[#ababab] text-lg" />
                  </span>
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2b97a4] focus:border-[#2b97a4] sm:text-sm"
                    placeholder="Email or Mobile Number"
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
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2b97a4] focus:border-[#2b97a4] sm:text-sm"
                    placeholder="Enter your 5-digit PIN"
                    pattern="\d{5}"
                    title="PIN must be exactly 5 digits"
                    maxLength="5"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="group relative flex w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2b97a4] hover:bg-[#248892] transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2b97a4] items-center gap-2"
              >
                <FaSignInAlt className='mb-1' /> 
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <div className="mt-6 px-8 w-full">
  <h1 className='font-semibold text-black'>DON'T HAVE AN ACCOUNT?</h1>
  <p className="font-medium text-[#4f4f4f]">
    Register now to create your account!
  </p>

  <Link
    href={'/register'}
    className="group relative flex w-full justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2b97a4] hover:bg-[#248892] transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2b97a4]"
  >
    REGISTER NOW
  </Link>

  <div className="mt-6 text-sm text-gray-700 bg-gray-100 p-4 rounded-md shadow-sm">
    <p className="font-semibold text-black mb-1">🔐 <span className="text-[#2b97a4] font-bold">ADMIN ACCOUNT</span></p>
    <p><strong>Email:</strong> sd@gmail.com</p>
    <p><strong>Password:</strong> 12345</p>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;