'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { TbUserPlus } from "react-icons/tb";
import { FaRegUser, FaEnvelope, FaLock, FaUpload, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaIdCard } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { imageUpload } from '../utilities/photoUpload';

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Collect all form data
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phone: e.target.phone.value,
      dob: e.target.dob.value,
      address: e.target.address.value,
      nid: e.target.nid.value,
      photo: e.target.photo.files[0] || null
    };

    // Log form data to console
    console.log('Form Data:', formData);

    try {
      // Upload image if exists
      let photoURL = null;
      if (formData.photo) {
        const imageURL = await imageUpload(formData.photo);
        photoURL = imageURL?.data?.data?.delete_url || null;
      }

      const user = {
        ...formData,
        photoURL
      };

      const response = await fetch('registar/api', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("API Response:", response);

      if (response.status === 200) {
        toast.success("Registration successful");
        setLoading(false);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        toast.error(response.statusText);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex pb-20 items-center justify-center bg-gray-50">
      <ToastContainer />
      <div className="w-full mt-24 max-w-[700px] pb-8 space-y-6 bg-white shadow-lg">
        <div className='flex w-full items-center font-semibold text-lg gap-4 text-white px-8 py-2 bg-[#2b97a3]'>
          <h1 className='text-3xl'><TbUserPlus /></h1>
          <h1 className=''>Create an Account</h1>
        </div>

        <div className='md:flex'>
          <form onSubmit={registerHandler} className="mt-8 space-y-4 px-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
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

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-[#ababab] text-lg" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2b97a4] focus:border-[#2b97a4] sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="sr-only">Phone Number</label>
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
                    placeholder="Phone Number"
                  />
                </div>
              </div>

              {/* Date of Birth Field */}
              <div>
                <label htmlFor="dob" className="sr-only">Date of Birth</label>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-[#ababab] text-lg" />
                  </span>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2b97a4] focus:border-[#2b97a4] sm:text-sm"
                  />
                </div>
              </div>

              {/* Address Field */}
              <div className="md:col-span-2">
                <label htmlFor="address" className="sr-only">Address</label>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-[#ababab] text-lg" />
                  </span>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2b97a4] focus:border-[#2b97a4] sm:text-sm"
                    placeholder="Full Address"
                  />
                </div>
              </div>

              {/* NID Field */}
              <div className="md:col-span-2">
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

              {/* Photo Upload Field */}
              <div className="md:col-span-2">
                <label htmlFor="photo" className="sr-only">Profile Photo</label>
                <div className="relative flex items-center">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUpload className="text-[#ababab] text-lg" />
                  </span>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2b97a4] focus:border-[#2b97a4] sm:text-sm"
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
            <h1 className='font-semibold'>ALREADY HAVE AN ACCOUNT?</h1>
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