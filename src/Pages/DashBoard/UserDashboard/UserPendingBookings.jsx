import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const UserPendingBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch only "pending" bookings for the logged-in user from backend
  const { data: pending = [], refetch, isLoading } = useQuery({
    queryKey: ['user-pending-bookings', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/User?email=${user.email}&status=pending`);
      return res.data;
    }
  });

  // ✅ Handle booking cancellation
  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No'
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
        refetch(); // 🔄 Refresh the data
      }
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4 bg-green-50 rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-800">Pending Bookings</h2>

      {/* ✅ Table view for larger screens */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-xl">
        <table className="table w-full">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th>#</th>
              <th>Court</th>
              <th>Date</th>
              <th>Slots</th>
              <th>Total</th>
              <th>Status</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((b, index) => (
              <tr key={b._id} className="hover:bg-green-100">
                <td>{index + 1}</td>
                <td>{b.courtTitle}</td>
                <td>{b.bookingDate}</td>
                <td>
                  <ul className="text-sm space-y-1">
                    {b.slots.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </td>
                <td>৳{b.totalPrice}</td>
                <td><span className="badge badge-warning py-3">{b.status}</span></td>
                <td>
                  <button onClick={() => handleCancel(b._id)} className="btn btn-sm btn-error bg-red-600 text-white">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile card view */}
      <div className="md:hidden space-y-4">
        {pending.map((b, index) => (
          <div key={b._id} className="bg-white shadow-md rounded-lg p-4 border-l-4 border-green-500">
            <h3 className="text-lg font-bold text-green-700">{b.courtTitle}</h3>
            <p><span className="font-medium">Date:</span> {b.bookingDate}</p>
            <p><span className="font-medium">Slots:</span> {b.slots.join(', ')}</p>
            <p><span className="font-medium">Total:</span> ৳{b.totalPrice}</p>
            <p><span className="font-medium">Status:</span> <span className="badge badge-warning text-white">{b.status}</span></p>
            <button
              onClick={() => handleCancel(b._id)}
              className="btn btn-sm btn-error mt-2 w-full text-white"
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPendingBookings;
