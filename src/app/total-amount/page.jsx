'use client'
import AccessDenied from '@/components/shared/AccessDenied';
import TotalAmountPage from '@/pages/TotalAmountPage';
import { useAuth } from '@/providers/AuthProvider';
import React from 'react';

const page = () => {
    
    const {user} = useAuth();

    if(user.accountType !== 'admin'){
        return <div>
    
          <AccessDenied message={` Only  users can access the Send Money feature. `}/>
        </div>
    }
    return (
        <div>
            <TotalAmountPage/>
            
        </div>
    );
};

export default page;