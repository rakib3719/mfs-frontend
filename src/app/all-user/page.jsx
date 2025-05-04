'use client'
import AccessDenied from '@/components/shared/AccessDenied';
import AllUserPage from '@/pages/AllUserPage';
import { useAuth } from '@/providers/AuthProvider';
import React from 'react';

const page = () => {
    
    const {user} = useAuth();

    if(user.accountType !== 'admin'){
        return <div>
    
          <AccessDenied message={` Only  Admin can access All User Page. `}/>
        </div>
    }
    return (
        <div>
            <AllUserPage/>
        </div>
    );
};

export default page;