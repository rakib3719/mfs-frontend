'use client'

import { AuthProvider } from '@/providers/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  )
}
