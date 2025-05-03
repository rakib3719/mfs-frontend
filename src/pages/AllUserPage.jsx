'use client'
import useGetUser from '@/hooks/useGetUser';
import axiosInstance from '@/utils/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FiMoreVertical, FiCheck, FiX } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

const AllUserPage = () => {
    const { data, isLoading, error, refetch } = useGetUser();
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleToggleActive = async(userId, currentStatus) => {
        console.log(`Toggling isActive for user ${userId} to ${!currentStatus}`);
        


       const data = {
        userId,
        isActive: !currentStatus
       }

      try {
        const resp = await axiosInstance.patch('/user/update', data);
        console.log(resp);
        if(resp?.data?.success){
         toast.success(resp?.data?.message || 'Sucecess')
         refetch()
        }
        
      } catch (error) {
        toast.error(error?.data?.response?.message || error?.message)
        
      }
     
        
        setActiveDropdown(null); 
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2b97a4]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 text-red-500">
                Error loading users: {error.message}
            </div>
        );
    }
    const client = new QueryClient()

    return (

         <div className="container mx-auto px-4 py-8">
            <ToastContainer/>
            <h1 className="text-2xl font-bold text-gray-800 mb-8">All Users</h1>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data?.data?.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.mobileNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${user.accountType === 'admin' ? 'bg-purple-100 text-purple-800' : 
                                          user.accountType === 'agent' ? 'bg-blue-100 text-blue-800' : 
                                          'bg-gray-100 text-gray-800'}`}>
                                        {user.accountType}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {user.balance.toLocaleString()} BDT
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.isActive ? 'Active' : 'Blcok'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                                    <button
                                        onClick={() => setActiveDropdown(activeDropdown === user._id ? null : user._id)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <FiMoreVertical />
                                    </button>
                                    {activeDropdown === user._id && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                            <div className="py-1">
                                                <button
                                                    onClick={() => handleToggleActive(user._id, user.isActive)}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {user.isActive ? (
                                                        <>
                                                            <FiX className="mr-2 text-red-500" />
                                                           Block
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FiCheck className="mr-2 text-green-500" />
                                                            Activate
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default AllUserPage;


// import React from 'react';

// const AllUserPage = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default AllUserPage;