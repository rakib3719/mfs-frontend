'use client'
import React, { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import Swal from 'sweetalert2';
import axiosInstance from '@/utils/axios';
import useGetCashRequest from '@/hooks/useGetCashRequest';
import { toast, ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const CashRequestPage = () => {
    const { user, isLoading } = useAuth();
    const { data: cashRequests, loading, error, refetch } = useGetCashRequest();
    const [activeDropdown, setActiveDropdown] = useState(null);

    if(isLoading){
        return <p>loading...</p>
    }

    const cashRequestOperation = async () => {
        try {
            const requestData = {
                agentMobile: user?.mobileNumber,
                type: 'cashRequest'
            };
            
            const resp = await axiosInstance.post('/transaction/cash-request', requestData);
            
            if (resp?.data?.success) {
                Swal.fire(
                    'Requested!',
                    'Your cash request has been submitted.',
                    'success'
                );
                refetch();
            }
        } catch (error) {
            Swal.fire(
                'Error!',
                error.response?.data?.message || 'Failed to submit cash request',
                'error'
            );
            console.error('Cash request error:', error);
        }
    };

    const handleStatusUpdate = async(requestId, currentStatus, newStatus) => {
        if (currentStatus !== 'pending') {
            toast.info('This request has already been processed');
            return;
        }

        const data = {

            _id:requestId,
            status: newStatus
        }


     try {
        const resp =await axiosInstance.put('/cash-request/update', data);
        console.log(resp, 'This is just resp');
        if(resp?.data?.success){
            refetch()
            toast.success(resp?.data?.message || 'Success')

        }
      
        
     } catch (error) {
        toast.error(error?.data?.response?.message || error?.message)
        
     }

   
        
        setActiveDropdown(null); 
    };

    const handleNewRequest = () => {
        if (user?.accountType !== 'agent') {
            Swal.fire('Error!', 'Only agents can create cash requests', 'error');
            return;
        }

        Swal.fire({
            title: 'Confirm New Cash Request',
            text: `Are you sure you want to request new cash?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2b97a4',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, request it!'
        }).then((result) => {
            if (result.isConfirmed) {
                cashRequestOperation();
            }
        });
    };

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-500">
                    <h1 className="text-xl font-bold">Something went wrong!</h1>
                    <p>{error.message}</p>
                </div>
            </div>
        );
    }
    const client = new QueryClient()

    return (
   
         <div className="container mx-auto px-4 py-8">
            <ToastContainer/>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    {user?.accountType === 'admin' ? 'All Cash Requests' : 'My Cash Requests'}
                </h1>
                {user?.accountType === 'agent' && (
                    <button
                        onClick={handleNewRequest}
                        className="bg-[#2b97a4] hover:bg-[#248892] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                        New Cash Request
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2b97a4]"></div>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {user?.accountType === 'admin' && (
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                                )}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                {user?.accountType === 'admin' && (
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cashRequests?.data?.map((request) => {
                                const requestDate = new Date(request.createdAt);
                                const formattedDate = requestDate.toLocaleDateString();
                                const formattedTime = requestDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                
                                return (
                                    <tr key={request._id} className="hover:bg-gray-50">
                                        {user?.accountType === 'admin' && (
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div>
                                                    <p className="font-medium">{request.agentDetails?.name}</p>
                                                    <p className="text-gray-500">{request.agentMobile}</p>
                                                </div>
                                            </td>
                                        )}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formattedDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formattedTime}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${request.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                  'bg-red-100 text-red-800'}`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        {user?.accountType === 'admin' && (
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                                                <button
                                                    onClick={() => setActiveDropdown(activeDropdown === request._id ? null : request._id)}
                                                    className="text-[#2b97a4] hover:text-[#248892] font-medium"
                                                    disabled={request.status !== 'pending'}
                                                >
                                                    Actions
                                                </button>
                                                {activeDropdown === request._id && (
                                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                                                        <div className="py-1">
                                                            <button
                                                                onClick={() => handleStatusUpdate(request._id, request.status, 'approved')}
                                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusUpdate(request._id, request.status, 'rejected')}
                                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      
    );
};

export default CashRequestPage;

// import React from 'react';

// const CashRequestPage = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default CashRequestPage;