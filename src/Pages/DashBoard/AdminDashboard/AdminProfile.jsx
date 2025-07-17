import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useAuth from '../../../Hook/useAuth';
import Loading from '../../../SharedPage/Loading';
import Forbidden from '../../../SharedPage/Forbedden';
import CountUp from 'react-countup';
import { FaTableTennis, FaUserCheck, FaUsers } from 'react-icons/fa';

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {}, isPending } = useQuery({
    queryKey: ['adminProfile', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    }
  });
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/dashboard/stats');
      return res.data;
    },
  });


  if (isPending) return <Loading></Loading>
  if (isLoading) return <Loading></Loading>

  if (userInfo.role !== 'admin') {
    return <Forbidden></Forbidden>
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl  mx-auto my-5"
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
            className="w-48 h-48 rounded-full object-cover border-4 border-green-500 shadow-md"
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

        >
          <div className='space-y-2.5'>
            <p>
              <span className="font-bold text-green-600">Role:</span> <span className='font-bold text-lg text-green-700'>{userInfo.role}</span>
            </p>
            <p>
              <span className="font-semibold text-green-600">Account Created:</span>{' '}
              {new Date(userInfo.create_at).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold text-green-600">Last Login:</span>{' '}
              {new Date(userInfo.last_log_in).toLocaleString()}
            </p>
          </div>
          {/* stack */}
          <h1 className="text-xl md:text-xl font-extrabold text-center text-green-700 my-2 mt-2">
            Club Statistics Overview
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-center items-center my-4 px-2">
            {/* Total Courts */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-green-600 text-white rounded-xl py-6 px-5 flex items-center gap-4 shadow-md"
            >

              <FaTableTennis className="text-4xl" />
              <div>
                <p className="text-sm font-medium">Courts</p>
                <p className="text-2xl font-bold">
                  <CountUp end={stats.totalCourts || 0} duration={10} />
                </p>
              </div>
            </motion.div>

            {/* Total Users */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-green-600 text-white rounded-xl py-6 px-5 flex items-center gap-4 shadow-md"
            >
              <FaUsers className="text-4xl" />
              <div>
                <p className="text-sm font-medium">Users</p>
                <p className="text-2xl font-bold">
                  <CountUp end={stats.totalUsers || 0} duration={10} />
                </p>
              </div>
            </motion.div>

            {/* Total Members */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-green-600 text-white rounded-xl py-6 px-5 flex items-center gap-4 shadow-md"
            >
              <FaUserCheck className="text-4xl" />
              <div>
                <p className="text-sm font-medium">Members</p>
                <p className="text-2xl font-bold">
                  <CountUp end={stats.totalMembers || 0} duration={15} />
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdminProfile;
