'use client'
import AccessDenied from '@/components/shared/AccessDenied';
import AgentUserPage from '@/pages/AgentUserPage';
import { useAuth } from '@/providers/AuthProvider';
import React from 'react';

const page = () => {
    
    const {user} = useAuth();

    if(user.accountType !== 'admin'){
        return <div>
    
          <AccessDenied message={` Only  Admin can access the Agent Aproval Page. `}/>
        </div>
    }
    return (
        <div>
            <AgentUserPage/>
        </div>
    );
};

export default page;