import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loading from '../../../SharedPage/Loading';

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['confirmed-bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings/confirmed');
      return res.data;
    }
  });

  if (isLoading) return <Loading />;

  const filteredBookings = bookings.filter(b =>
    b.courtTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-green-700">📋 Manage Confirmed Bookings</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by court title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full max-w-sm mb-6 block mx-auto border-1 border-green-500"
      />

      {/* 📱 Card View (Mobile) */}
      <div className="grid md:hidden gap-4">
        {filteredBookings.map((b, idx) => (
          <div key={b._id} className="bg-white shadow-md rounded p-4 border-l-4 border-green-500 space-y-2">
            <h3 className="font-bold text-lg text-green-700">{b.courtTitle}</h3>
            <p><strong>Type:</strong> {b.courtType}</p>
            <p><strong>Date:</strong> {b.bookingDate}</p>
            <p><strong>Slots:</strong> {b.slots.join(', ')}</p>
            <p><strong>Total:</strong> ৳{b.totalPrice}</p>
            <p><strong>Status:</strong> <span className="text-green-600 font-medium ">{b.status}</span></p>
            <p><strong>Payment:</strong> <span className="text-green-600 font-medium ">{b.payment_status}</span></p>
            <p><strong>User:</strong> {b.userName} ({b.userEmail})</p>
            <p><strong>Approved By:</strong> {b.approvedBy || 'N/A'}</p>
          </div>
        ))}
      </div>

      {/* 🖥️ Table View (Desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full bg-green-50 rounded shadow-md">
          <thead className="bg-green-100 text-green-800">
            <tr >
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Date</th>
              <th>Slots</th>
              <th>User</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Approved By</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b, idx) => (
              <tr key={b._id} className='hover:bg-green-100'>
                <td>{idx + 1}</td>
                <td>{b.courtTitle}</td>
                <td>{b.courtType}</td>
                <td>{b.bookingDate}</td>
                <td><ul>{b.slots.map((s, i) => <li key={i}>{s}</li>)}</ul></td>
                <td>{b.userName} <br /> <small>{b.userEmail}</small></td>
                <td>৳{b.totalPrice}</td>
                <td className="text-green-600 font-medium">{b.payment_status}</td>
                <td className="text-green-600 font-normal"><span className='py-1 px-2 bg-green-400 text-white rounded-xl '>{b.status}</span></td>
                <td>{b.approvedBy || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
