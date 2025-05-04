'use client'
import axiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react';

const Transaction = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const getData = async () => {
        setLoading(true);
        const response = await axiosInstance.get(`/transaction/all`);
        console.log(response);
        try {
            const response = await axiosInstance.get(`/transaction/all`);
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

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    // Get transaction type color
    const getTypeColor = (type) => {
        switch (type) {
            case 'send-money':
                return 'text-blue-400';
            case 'cash-out':
                return 'text-purple-400';
            case 'cash-in':
                return 'text-green-400';
            case 'cash-request':
                return 'text-yellow-400';
            case 'agent-bonus':
                return 'text-pink-400';
            default:
                return 'text-gray-400';
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-100 mb-8 text-center">Transaction History</h1>
                
                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-400">Total Transactions</p>
                        <p className="text-2xl font-bold text-white">{data.length}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-400">Send Money</p>
                        <p className="text-2xl font-bold text-blue-400">
                            {data.filter(t => t.type === 'send-money').length}
                        </p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-400">Cash Out</p>
                        <p className="text-2xl font-bold text-purple-400">
                            {data.filter(t => t.type === 'cash-out').length}
                        </p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-400">Cash In</p>
                        <p className="text-2xl font-bold text-green-400">
                            {data.filter(t => t.type === 'cash-in').length}
                        </p>
                    </div>
                </div>

                {/* Transaction Table */}
                <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-750">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        TRX ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Sender
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Recipient/Agent
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {currentItems.map((transaction) => (
                                    <tr key={transaction._id} className="hover:bg-gray-750 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-300">
                                            {transaction._id.substring(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {transaction.sender}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {transaction.recipient || transaction.agent || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <span className={transaction.amount < 0 ? 'text-red-400' : 'text-green-400'}>
                                                {formatCurrency(transaction.amount)}
                                            </span>
                                            {transaction.fee > 0 && (
                                                <span className="block text-xs text-gray-400">
                                                    Fee: {formatCurrency(transaction.fee)}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(transaction.type)}`}>
                                                {transaction.type.replace('-', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {formatDate(transaction.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="bg-gray-750 px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">
                                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                                        <span className="font-medium">
                                            {Math.min(indexOfLastItem, data.length)}
                                        </span>{' '}
                                        of <span className="font-medium">{data.length}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <button
                                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50"
                                        >
                                            <span className="sr-only">Previous</span>
                                            &larr;
                                        </button>
                                        
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                            <button
                                                key={number}
                                                onClick={() => paginate(number)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    currentPage === number
                                                        ? 'bg-indigo-600 border-indigo-600 text-white'
                                                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                                                }`}
                                            >
                                                {number}
                                            </button>
                                        ))}
                                        
                                        <button
                                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50"
                                        >
                                            <span className="sr-only">Next</span>
                                            &rarr;
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transaction;