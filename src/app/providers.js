'use client'

import { AuthProvider, useAuth } from '@/providers/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'




export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const {user} = useAuth();
  if(user?.accountType === 'agent'){
    if(!user.isApproved ){
      return <div>

        <h1>Your agent account is under proccesisng......</h1>
        <p>waitaing for admit aproval.......</p>
      </div>

    }
  }

  if(user){
    if(user.accountType === 'null'){
      window.location('/login')
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  )
}
