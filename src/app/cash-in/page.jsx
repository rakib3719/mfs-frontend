'use client'
import AccessDenied from '@/components/shared/AccessDenied';
import TransactionPage from '@/pages/SendMoneyPage';
import { useAuth } from '@/providers/AuthProvider';
import React from 'react';

const page = () => {

    const type = 'cash-in'

    const {user} = useAuth();

    if(user.accountType !== 'agent'){
        return <div>
    
          <AccessDenied message={` Only  Ageent can access the Cash In feature. `}/>
        </div>
    }
    return (
        
        <div>
                        <TransactionPage type={type}/>
        </div>
    );
};

export default page;