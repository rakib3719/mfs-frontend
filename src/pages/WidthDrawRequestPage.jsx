'use client'
import useGetUser from '@/hooks/useGetUser';
import useGetWidthdraw from '@/hooks/useGetWidhDraw';
import { useAuth } from '@/providers/AuthProvider';
import axiosInstance from '@/utils/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const WidthDrawRequestPage = () => {
  const { data, isLoading, error, refetch } = useGetWidthdraw();
  const { data: user, isLoading: loader } = useGetUser();
  const [updatingId, setUpdatingId] = useState(null);
  const {refreshUser} = useAuth();

  
  const widhDrawDetails = data?.data || [];
  const userData = user?.data || [];

  // Match withdrawal requests with user data
  const getRequestWithUser = () => {
    return widhDrawDetails.map(request => {
      const user = userData.find(u => u.mobileNumber === request.agentNumber);
      return {
        ...request,
        user: user || null
      };
    });
  };

  const handleStatusUpdate = async (id, newStatus) => {
    if (updatingId) return;
    
    setUpdatingId(id);
    try {
      // Find the request being updated
      const request = widhDrawDetails.find(req => req._id === id);
      
      if (request) {
        // Log the required data to console
       const data =  {
          _id: request._id,
          status: newStatus,
          amount: request.amount,
          agentNumber: request.agentNumber
        }

     try {
        const resp = await axiosInstance.put('/widthdraw/',data);
        console.log(resp, 'widthdraw updated');
        if(resp?.data?.success){
            toast.success('Widhdraw Request Success')
            refreshUser()
            refetch()
        }
        
        
     } catch (error) {
        toast.error(error?.message)
     }


        
     
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading || loader) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const requestsWithUsers = getRequestWithUser();
  const client = new QueryClient();

  return (

      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Withdrawal Requests</h1>
      <ToastContainer/>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 border border-gray-200">
          <thead>
            <tr className="bg-gray-900">
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Mobile</th>
              <th className="py-2 px-4 border-b">Account Type</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Request Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requestsWithUsers.map((request) => (
              <tr key={request._id} className="hover:bg-gray-800">
                <td className="py-2 px-4 border-b text-center">
                  {request.user?.name || 'N/A'}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {request.agentNumber}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {request.user?.accountType || 'N/A'}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  ${request.amount?.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {new Date(request.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {request.status === 'pending' ? (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleStatusUpdate(request._id, 'approved')}
                        disabled={updatingId === request._id}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
                      >
                        {updatingId === request._id ? 'Processing...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(request._id, 'rejected')}
                        disabled={updatingId === request._id}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
                      >
                        {updatingId === request._id ? 'Processing...' : 'Reject'}
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500">Action completed</span>
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

export default WidthDrawRequestPage;

// import React from 'react';

// const WidthDrawRequestPage = () => {
//     return (
//         <div>
//             <h1>hi</h1>
//         </div>
//     );
// };

// export default WidthDrawRequestPage;