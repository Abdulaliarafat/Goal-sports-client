// src/Hooks/useUserRole.js
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth'; // Adjust the path if needed

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data , isLoading, isError, refetch } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res.data;
    },
  });

  return {
    role: data?.role,
    roleLoading: isLoading,
    isError,
    refetch,
  };
};

export default useUserRole;
