import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useAuth from '../../../Hook/useAuth';
import Loading from '../../../SharedPage/Loading';

const ConfirmedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: confirmedBookings = [], isPending } = useQuery({
    queryKey: ['confirmedBookings', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/approved`, {
        params: {
          email: user.email,
          status: 'confirmed',
        },
      });
      return res.data;
    },
  });

  if (isPending) return <Loading />;

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">
        My Confirmed Bookings
      </h2>

      {confirmedBookings.length === 0 ? (
        <p className="text-center text-gray-600">No confirmed bookings yet.</p>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-green-50 divide-y divide-green-200 text-sm md:text-base">
              <thead className="bg-green-100 text-green-700">
                <tr>
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Court</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Slots</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Payment</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                {confirmedBookings.map((b, index) => (
                  <tr key={b._id} className="hover:bg-green-100 transition">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{b.courtTitle}</td>
                    <td className="px-4 py-2">{b.courtType}</td>
                    <td className="px-4 py-2">{b.bookingDate}</td>
                    <td className="px-4 py-2">
                      <ul className="list-disc list-inside space-y-1">
                        {b.slots.map((slot, i) => (
                          <li key={i}>{slot}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2 font-medium">৳{b.totalPrice}</td>
                    <td className="px-4 py-2 capitalize">{b.payment_status}</td>
                    <td className="px-4 py-2">
                      <span className="badge badge-success">{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="space-y-4 md:hidden">
            {confirmedBookings.map((b, index) => (
              <div
                key={b._id}
                className="bg-green-50 p-4 rounded-lg shadow border border-green-200"
              >
                <div className="font-semibold text-green-700">
                  #{index + 1} - {b.courtTitle} ({b.courtType})
                </div>
                <div className="text-sm mt-1 text-gray-700">
                  <p><strong>Date:</strong> {b.bookingDate}</p>
                  <p><strong>Slots:</strong> {b.slots.join(', ')}</p>
                  <p><strong>Total:</strong> ৳{b.totalPrice}</p>
                  <p><strong>Payment:</strong> {b.payment_status}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className="badge mt-0.5 badge-success text-white py-2">{b.status}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmedBookings;
