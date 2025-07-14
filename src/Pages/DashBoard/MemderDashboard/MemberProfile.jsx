import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useAuth from '../../../Hook/useAuth';
import Loading from '../../../SharedPage/Loading';
import Forbidden from '../../../SharedPage/Forbedden';

const MemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ['userProfile', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <Loading></Loading>

  if (userInfo.role !== 'member') {
    return <Forbidden></Forbidden>
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl  mx-auto mt-10"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        className=" bg-gradient-to-br from-green-100 via-green-50 to-green-100 shadow-2xl rounded-3xl p-10 space-y-6 border border-green-200 ring-1 ring-green-300"
      >
        {/* Profile Image & Name */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <img
            src={userInfo.photo}
            alt="Profile"
            className="w-58 h-58 rounded-full object-cover border-4 border-green-500 shadow-md"
          />
          <h2 className="text-2xl font-bold mt-3 text-green-700">{userInfo.name}</h2>
          <p className="text-gray-500">{userInfo.email}</p>
        </motion.div>

        <div className="divider divider-success"></div>

        {/* Info Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-5 py-5 text-sm text-gray-700"
        >
          <p>
            <span className="font-semibold text-green-600">Role:</span> {userInfo.role}
          </p>
          <p>
            <span className="font-semibold text-green-600">Account Created:</span>{' '}
            {new Date(userInfo.create_at).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold text-green-600">Last Login:</span>{' '}
            {new Date(userInfo.last_log_in).toLocaleString()}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MemberProfile;
