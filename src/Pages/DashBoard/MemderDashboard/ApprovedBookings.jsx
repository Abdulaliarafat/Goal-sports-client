import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const ApprovedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // ✅ Fetch approved bookings only for logged-in user
  const { data: approved = [], isLoading, refetch } = useQuery({
    queryKey: ['approved-bookings', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/approved?email=${user.email}&status=approved`);
      return res.data;
    },
  });

  // ✅ Cancel Booking
  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this approved booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No',
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
        refetch();
      }
    }
  };

  // ✅ Handle Payment Redirect
  const handlePayment = (id) => {
    navigate(`/dashboard/payment/${id}`);
    console.log(id)
  };

  if (isLoading) return <p className="text-center py-10">Loading approved bookings...</p>;

  return (
    <div className="p-4 bg-green-50 rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-800">Approved Bookings</h2>

      {/* Table for desktop */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg">
        <table className="table w-full">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th>#</th>
              <th>Court</th>
              <th>Date</th>
              <th>Slots</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {approved.map((b, index) => (
              <tr key={b._id} className="hover:bg-green-100">
                <td>{index + 1}</td>
                <td>{b.courtTitle}</td>
                <td>{b.bookingDate}</td>
                <td>
                  <ul className="text-sm space-y-1">
                    {b.slots.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </td>
                <td>৳{b.totalPrice}</td>
                <td><span className="badge badge-success py-3.5 text-white bg-green-600">{b.status}</span></td>
                <td className="space-x-2">
                  <button onClick={() => handlePayment(b._id)} className="btn btn-sm bg-green-600 text-white">
                    Pay Now
                  </button>
                  <button onClick={() => handleCancel(b._id)} className="btn btn-sm btn-error bg-red-600 text-white">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {approved.map((b) => (
          <div key={b._id} className="bg-white shadow-md rounded-lg p-4 border-l-4 border-green-500">
            <h3 className="text-lg font-bold text-green-700">{b.courtTitle}</h3>
            <p><strong>Date:</strong> {b.bookingDate}</p>
            <p><strong>Slots:</strong> {b.slots.join(', ')}</p>
            <p><strong>Total:</strong> ৳{b.totalPrice}</p>
            <p><strong>Status:</strong> <span className="badge badge-success">{b.status}</span></p>
            <div className="flex flex-col gap-2 mt-2">
              <button onClick={() => handlePayment(b._id)} className="btn btn-sm bg-green-600 text-white w-full">
                Pay Now
              </button>
              <button onClick={() => handleCancel(b._id)} className="btn btn-sm btn-error w-full text-white">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovedBookings;
