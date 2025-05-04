'use client'
import AccessDenied from '@/components/shared/AccessDenied';
import TransactionPage from '@/pages/SendMoneyPage';
import { useAuth } from '@/providers/AuthProvider';
import React from 'react';

const page = () => {
    const type = 'cash-out'

    const {user} = useAuth();

    if(user.accountType !== 'user'){
        return <div>
    
          <AccessDenied message={` Only  users can access the Cash Out feature. `}/>
        </div>
    }
    return (
        <div>
                        <TransactionPage type={type}/>
        </div>
    );
};

export default page;