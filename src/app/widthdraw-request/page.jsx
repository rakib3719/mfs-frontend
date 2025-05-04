'use client'
import AccessDenied from '@/components/shared/AccessDenied';
import WidthDrawRequestPage from '@/pages/WidthDrawRequestPage';
import { useAuth } from '@/providers/AuthProvider';
import React from 'react';

const page = () => {

    
    const {user} = useAuth();

    if(user.accountType !== 'admin'){
        return <div>
    
          <AccessDenied message={` Only  Admin can access the Widhdraw reqeust Page. `}/>
        </div>
    }
    return (
        <div>
            <WidthDrawRequestPage/>
        </div>
    );
};

export default page;