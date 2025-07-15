import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loading from '../../../SharedPage/Loading';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">My Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment history available.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow">
            <table className="min-w-full  text-sm md:text-base divide-y divide-blue-200">
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
                  <tr key={p._id} className="hover:bg-green-100">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{p.email}</td>
                    <td className="px-4 py-2 font-semibold">৳{p.amount}</td>
                    <td className="px-4 py-2 capitalize">{p.paymentMethod?.[0]}</td>
                    <td className="px-4 py-2">
                      {new Date(p.paid_At).toLocaleString('en-BD')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {payments.map((p, index) => (
              <div
                key={p._id}
                className="bg-blue-50 p-4 rounded-lg shadow border border-blue-200"
              >
                <h3 className="text-blue-700 font-semibold">#{index + 1} Payment</h3>
                <p><span className="font-medium">Email:</span> {p.email}</p>
                <p><span className="font-medium">Amount:</span> ৳{p.amount}</p>
                <p><span className="font-medium">Method:</span> {p.paymentMethod?.[0]}</p>
                <p><span className="font-medium">Date:</span> {new Date(p.paid_At).toLocaleString('en-BD')}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
