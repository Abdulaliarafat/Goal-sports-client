import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const PendingBooking = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ['bookings'],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings');
      return res.data;
    }
  });

  const handleDecision = async (booking, decision, admin) => {
    const res = await axiosSecure.patch(`/bookings/decision/${booking._id}`, {
      decision,
      adminEmail: admin,
      userEmail: booking.userEmail,
    });

    if (res.data.bookingUpdate?.modifiedCount > 0) {
      Swal.fire({
        icon: 'success',
        title: `${decision === 'approved' ? 'Booking Approved' : 'Booking Rejected'}`,
        text: decision === 'approved'
          ? `${booking.userName} has been promoted to a member.`
          : 'Booking has been rejected.',
      });
      refetch();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center  text-green-600">All Booking Requests</h2>

      {/* 🖥️ Desktop & Tablet Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full shadow-2xl">
          <thead className='bg-green-100 text-green-800'>
            <tr>
              <th>User</th>
              <th>Court</th>
              <th>Date</th>
              <th>Slots</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.userName}</td>
                <td>{b.courtTitle}</td>
                <td>{b.bookingDate}</td>
                <td>
                  <ul>{b.slots.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </td>
                <td>৳{b.totalPrice}</td>
                <td>
                  <span className={`badge ${
                    b.status === 'approved' ? 'badge-success py-3.5 text-white bg-green-600' :
                      b.status === 'pending' ? 'badge-warning  text-white bg-yellow-600 py-3.5' :
                        'badge-success py-3.5 text-white'
                  }`}>{b.status}</span>
                </td>
                <td className="space-x-2">
                  {b.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleDecision(b, 'approved', user.email)}
                        className="btn btn-sm btn-success text-white bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecision(b, 'rejected', user.email)}
                        className="btn btn-sm btn-error text-white bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile View - Cards */}
      <div className="md:hidden space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white shadow-md rounded-lg p-4 space-y-1 border-l-4 border-green-500">
            <h3 className="font-bold text-lg">{b.courtTitle}</h3>
            <p><span className="font-medium">User:</span> {b.userName}</p>
            <p><span className="font-medium">Date:</span> {b.bookingDate}</p>
            <p><span className="font-medium">Slots:</span> {b.slots.join(', ')}</p>
            <p><span className="font-medium">Total:</span> ৳{b.totalPrice}</p>
            <p><span className="font-medium">Status:</span>
              <span className={`ml-1 badge ${
                b.status === 'approved' ? 'badge-success' :
                  b.status === 'pending' ? 'badge-warning' :
                    'badge-error'
              }`}>{b.status}</span>
            </p>

            {b.status === 'pending' && (
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleDecision(b, 'approved', user.email)}
                  className="btn btn-sm btn-success w-1/2"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecision(b, 'rejected', user.email)}
                  className="btn btn-sm btn-error w-1/2"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingBooking;
