'use client'
import axiosInstance from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

const useGetUser= (query) => {
    let url= '/user'

    if(query){
        url = '/user/?accountType=agent'

    }


  return useQuery({

    queryKey: ['getUser', query],
    queryFn: async () => {
      const response = await axiosInstance.get(url);
      return response.data;
    },
  });
};

export default useGetUser;
