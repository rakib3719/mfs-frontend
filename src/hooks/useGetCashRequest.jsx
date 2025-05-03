'use client'
import axiosInstance from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

const useGetCashRequest= () => {


  return useQuery({

    queryKey: ['getCashRequest'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/transaction/cash-request`);
      return response.data;
    },
  });
};

export default useGetCashRequest;
