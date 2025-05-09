'use client'
import AccessDenied from '@/components/shared/AccessDenied';
import TransactionPage from '@/pages/SendMoneyPage';
import { useAuth } from '@/providers/AuthProvider';

import React from 'react';


const page = () => {
    const type = 'send-money'
    const {user} = useAuth();

if(user.accountType !== 'user'){
    return <div>

      <AccessDenied message={` Only  users can access the Send Money feature. `}/>
    </div>
}
    return (
        <div>
            <TransactionPage type={type}/>
        </div>
    );
};

export default page;