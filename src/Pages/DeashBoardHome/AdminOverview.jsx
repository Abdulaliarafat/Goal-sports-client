import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loading from '../../SharedPage/Loading';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import CountUp from 'react-countup';

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const [chartData, setChartData] = useState([]);

  // Fetch stats from backend
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/dashboard/stats');
      return res.data;
    },
  });

  useEffect(() => {
    if (stats) {
      // Prepare data for charts
      setChartData([
        { name: 'Courts', value: stats.totalCourts },
        { name: 'Users', value: stats.totalUsers },
        { name: 'Members', value: stats.totalMembers },
      ]);
    }
  }, [stats]);

  if (isLoading) return <Loading />;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <section className="p-6 bg-gradient-to-br from-green-50 via-green-50 to-green-50 shadow-2xl rounded-3xl  space-y-6 border border-green-200 ring-1 ring-green-300 min-h-screen">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Admin Overview</h2>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Courts</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">
             <CountUp end={stats.totalCourts || 0} duration={10} />
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-green-700 mt-2"> <CountUp end={stats.totalUsers || 0} duration={10} /></p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Members</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">
            <CountUp end={stats.totalMembers || 0} duration={10} />
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Courts vs Users vs Members</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Trend (Simulated)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Proportion</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default AdminOverview;
