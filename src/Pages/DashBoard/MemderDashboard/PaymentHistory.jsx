import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTable, FaThLarge } from 'react-icons/fa';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loading from '../../../SharedPage/Loading';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [layout, setLayout] = useState('table');

  const { data: payments = [], isPending } = useQuery({
    queryKey: ['paymentHistory', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/payments', {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  if (isPending) return <Loading />;

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      {/* 🔰 Title + Layout Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-center md:text-left text-green-600">
          My Payment History
        </h2>
        <button
          onClick={() => setLayout(layout === 'table' ? 'card' : 'table')}
          className="btn btn-sm bg-green-600 text-white flex items-center gap-2"
        >
          {layout === 'table' ? (
            <>
              <FaThLarge /> Card View
            </>
          ) : (
            <>
              <FaTable /> Table View
            </>
          )}
        </button>
      </div>

      {/* 🔁 No Payment Fallback */}
      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment history available.</p>
      ) : (
        <>
          {/* 🖥️ Table View (fully responsive now) */}
          {layout === 'table' && (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-x-auto rounded-lg shadow"
            >
              <table className="min-w-full text-sm md:text-base divide-y divide-blue-200">
                <thead className="bg-green-100 text-green-600">
                  <tr>
                    <th className="text-left px-4 py-2">#</th>
                    <th className="text-left px-4 py-2">Email</th>
                    <th className="text-left px-4 py-2">Amount</th>
                    <th className="text-left px-4 py-2">Method</th>
                    <th className="text-left px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {payments.map((p, index) => (
                    <tr key={p._id} className="hover:bg-green-50">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 break-all">{p.email}</td>
                      <td className="px-4 py-2 font-semibold">৳{p.amount}</td>
                      <td className="px-4 py-2 capitalize">{p.paymentMethod?.[0]}</td>
                      <td className="px-4 py-2">
                        {new Date(p.paid_At).toLocaleString('en-BD')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {/* 📱 Fancy Card View */}
          {layout === 'card' && (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {payments.map((p, index) => (
                <motion.div
                  key={p._id}
                  className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-md"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-green-700 font-bold mb-1">#{index + 1} Payment</h3>
                  <p><span className="font-semibold">Email:</span> {p.email}</p>
                  <p><span className="font-semibold">Amount:</span> ৳{p.amount}</p>
                  <p><span className="font-semibold">Method:</span> {p.paymentMethod?.[0]}</p>
                  <p><span className="font-semibold">Date:</span> {new Date(p.paid_At).toLocaleString('en-BD')}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
