import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loading from '../../SharedPage/Loading';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import CountUp from 'react-countup';

const MemberOverview = () => {
  const axiosSecure = useAxiosSecure();
  const [chartData, setChartData] = useState([]);

  // Fetch member stats from backend
  const { data: stats, isLoading } = useQuery({
    queryKey: ['memberStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/dashboard/member-stats');
      return res.data;
    },
  });

  useEffect(() => {
    if (stats) {
      setChartData([
        { name: 'Total Bookings', value: stats.totalBookings },
        { name: 'Approved Bookings', value: stats.totalApproved },
        { name: 'Payments', value: stats.totalPayments },
      ]);
    }
  }, [stats]);

  if (isLoading) return <Loading />;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <section className="p-6 bg-gray-50 min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-green-50 ">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Member Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Bookings</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">
            <CountUp end={stats.totalBookings || 0} duration={10} />
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-semibold text-gray-700">Approved Bookings</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">
            <CountUp end={stats.totalApproved || 0} duration={10} />
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Payments</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">
            <CountUp end={stats.totalPayments || 0} duration={10} />
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Booking & Payments Overview</h3>
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
          <h3 className="text-xl font-semibold mb-4">Trend</h3>
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

export default MemberOverview;
