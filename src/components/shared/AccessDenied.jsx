'use client'
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AccessDenied = ({message}) => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        // Redirect to home after 3 seconds if user is not logged in as 'user'
        if (user?.accountType !== 'user') {
            const timer = setTimeout(() => {
                router.push('/');
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [user, router]);

    if (user?.accountType === 'user') {
        return null; // Don't show this if user has access
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-center">
            <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 border border-red-600/50">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-900/50 p-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                </div>
                
                <h1 className="text-2xl font-bold text-red-400 mb-4">Access Restricted</h1>
                
                <p className="text-gray-300 mb-6">
             {message}
                    {user ? ' Your account type does not have permission.' : ' Please login as a user first.'}
                </p>
                
                <div className="flex justify-center">
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div 
                            className="bg-red-600 h-2.5 rounded-full animate-pulse" 
                            style={{ animationDuration: '3s' }}
                        ></div>
                    </div>
                </div>
                
                <p className="text-gray-400 text-sm mt-4">
                    Redirecting you to the homepage in 8 seconds...
                </p>
            </div>
        </div>
    );
};

export default AccessDenied;