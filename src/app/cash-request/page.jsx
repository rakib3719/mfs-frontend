'use client'
import AccessDenied from '@/components/shared/AccessDenied';
import CashRequestPage from '@/pages/CashRequestPage';
import { useAuth } from '@/providers/AuthProvider';
import React from 'react';

const page = () => {

    
        const {user} = useAuth();
    
        if(user.accountType !== 'agent'){
            return <div>
        
              <AccessDenied message={` Only  Agent can access the Cash Request feature. `}/>
            </div>
        }
    return (
        <div>
            <CashRequestPage/>
        </div>
    );
};

export default page;