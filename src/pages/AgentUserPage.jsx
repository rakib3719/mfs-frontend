'use client'

import axiosInstance from '@/utils/axios';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FiMoreVertical, FiCheck, FiX, FiFilter } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';


const queryClient = new QueryClient();
const AgentUserComponent = () => {
   

    const { data: users, isLoading, error, refetch } = useQuery({
        queryKey: ['getAgentUserPage'],
        queryFn: async () => {
          const res = await axiosInstance.get('/user');
          return res.data;
        },
      });
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [filter, setFilter] = useState('pending');

    // Filter agents from all users
    const agents = users?.data?.filter(user => user.accountType === 'agent');

    // Filter agents based on selected filter
    const filteredAgents = agents?.filter(agent => {
        if (filter === 'pending') return !agent.isApproved;
        if (filter === 'active') return agent.isApproved && agent.isActive;
        if (filter === 'blocked') return !agent.isActive;
        return true; // 'all' filter
    });

    const handleToggleApproval = async (userId, currentStatus) => {
        try {
            const response = await axiosInstance.patch(`/user/update-agent/`, {
                isApproved: !currentStatus,
                userId

            });
            console.log(response, 'keno holo na');

            if (response.data.success) {
                toast.success(`Agent ${!currentStatus ? 'approved' : 'disapproved'} successfully`);
                refetch();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update approval status');
        } finally {
            setActiveDropdown(null);
        }
    };

    const handleToggleActive = async (userId, currentStatus) => {
        try {
            const response = await axiosInstance.patch('/user/update', {
                userId,
                isActive: !currentStatus
            });

            if (response.data.success) {
                toast.success(`Agent ${!currentStatus ? 'activated' : 'blocked'} successfully`);
                refetch();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update status');
        } finally {
            setActiveDropdown(null);
        }
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
            <ToastContainer />
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Agent Management</h1>
                
                <div className="flex items-center space-x-2">
                    <FiFilter className="text-gray-500" />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                    >
                        <option value="pending">Pending Agents</option>
                        <option value="active">Active Agents</option>
                        <option value="blocked">Blocked Agents</option>
                        <option value="all">All Agents</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAgents?.map((agent) => (
                            <tr key={agent._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                                            <p className="text-sm text-gray-500">{agent.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {agent.mobileNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {agent.nid}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${agent.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {agent.isApproved ? 'Approved' : 'Pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${agent.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {agent.isActive ? 'Active' : 'Blocked'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                                    <button
                                        onClick={() => setActiveDropdown(activeDropdown === agent._id ? null : agent._id)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <FiMoreVertical />
                                    </button>
                                    {activeDropdown === agent._id && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                            <div className="py-1">
                                                {!agent.isApproved && (
                                                    <button
                                                        onClick={() => handleToggleApproval(agent._id, agent.isApproved)}
                                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <FiCheck className="mr-2 text-green-500" />
                                                        Approve Agent
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleToggleActive(agent._id, agent.isActive)}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {agent.isActive ? (
                                                        <>
                                                            <FiX className="mr-2 text-red-500" />
                                                            Block Agent
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FiCheck className="mr-2 text-green-500" />
                                                            Activate Agent
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



const AgentUserPage= () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AgentUserComponent />
    </QueryClientProvider>
  );
};

export default AgentUserPage;
