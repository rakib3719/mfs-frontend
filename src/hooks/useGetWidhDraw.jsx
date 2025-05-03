'use client'
import axiosInstance from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

const useGetWidthdraw= () => {


  return useQuery({

    queryKey: ['widthdraw'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/widthdraw`);
      return response.data;
    },
  });
};

export default useGetWidthdraw;
