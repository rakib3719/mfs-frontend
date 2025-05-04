'use client'
import axiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react';

const TotalAmountPage = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/transaction/summury`);
            setData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="bg-red-900 text-red-200 px-4 py-3 rounded border border-red-700">
                    <strong>Error!</strong> Something went wrong. Please try again later.
                </div>
            </div>
        );
    }

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-100 mb-8 text-center">Financial Summary</h1>
                
                {/* Total Money Card */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
                    <h2 className="text-xl font-semibold mb-2 text-gray-300">Total System Balance</h2>
                    <p className="text-4xl font-bold text-white">{formatCurrency(data.allMoney)}</p>
                    <div className="mt-2 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Admin Summary */}
                    <div className="bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:bg-gray-750 transition duration-200">
                        <h3 className="text-lg font-medium text-gray-300 mb-2">Admin Balance</h3>
                        <p className="text-2xl font-bold text-blue-400 mb-2">{formatCurrency(data.adminAllBalance)}</p>
                        <p className="text-sm text-gray-400">{data.adminCount} admin(s)</p>
                    </div>
                    
                    {/* Agent Summary */}
                    <div className="bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-emerald-500 hover:bg-gray-750 transition duration-200">
                        <h3 className="text-lg font-medium text-gray-300 mb-2">Agent Balance</h3>
                        <p className="text-2xl font-bold text-emerald-400 mb-2">{formatCurrency(data.agentAllBalance)}</p>
                        <p className="text-sm text-gray-400">{data.agentCount} agent(s)</p>
                    </div>
                    
                    {/* User Summary */}
                    <div className="bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:bg-gray-750 transition duration-200">
                        <h3 className="text-lg font-medium text-gray-300 mb-2">User Balance</h3>
                        <p className="text-2xl font-bold text-purple-400 mb-2">{formatCurrency(data.userAllBalance)}</p>
                        <p className="text-sm text-gray-400">{data.userCount} user(s)</p>
                    </div>
                </div>
                
                {/* Summary Statistics */}
                <div className="bg-gray-800 rounded-xl shadow-md p-6 border border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-200 mb-4">Summary Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-750 p-4 rounded-lg hover:bg-gray-700 transition duration-200">
                            <p className="text-sm text-gray-400">Total Admins</p>
                            <p className="text-2xl font-bold text-white">{data.adminCount}</p>
                        </div>
                        <div className="bg-gray-750 p-4 rounded-lg hover:bg-gray-700 transition duration-200">
                            <p className="text-sm text-gray-400">Total Agents</p>
                            <p className="text-2xl font-bold text-white">{data.agentCount}</p>
                        </div>
                        <div className="bg-gray-750 p-4 rounded-lg hover:bg-gray-700 transition duration-200">
                            <p className="text-sm text-gray-400">Total Users</p>
                            <p className="text-2xl font-bold text-white">{data.userCount}</p>
                        </div>
                        <div className="bg-gray-750 p-4 rounded-lg hover:bg-gray-700 transition duration-200">
                            <p className="text-sm text-gray-400">Total Accounts</p>
                            <p className="text-2xl font-bold text-white">{(data.adminCount || 0) + (data.agentCount || 0) + (data.userCount || 0)}</p>
                        </div>
                    </div>
                </div>

            
            </div>
        </div>
    );
};

export default TotalAmountPage;