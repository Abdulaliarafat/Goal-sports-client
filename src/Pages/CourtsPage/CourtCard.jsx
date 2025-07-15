import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../Hook/useAuth';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const slots = [
  '08:00 - 09:00 AM',
  '09:00 - 10:00 AM',
  '10:00 - 11:00 AM',
  '03:00 - 04:00 PM',
  '04:00 - 05:00 PM',
  '08:00 - 09:00 PM',
];

const CourtCard = ({ court }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookingDate, setBookingDate] = useState('');

  const toggleSlot = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
    } else {
      setIsOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingDate || selectedSlots.length === 0) {
      return Swal.fire('Please select a date and at least one slot.');
    }

    const booking = {
      courtId: court.id,
      courtTitle: court.title,
      userEmail: user.email,
      userName: user.displayName,
      courtType: court.type,
      bookingDate: format(new Date(bookingDate), 'yyyy-MM-dd'),
      slots: selectedSlots,
      status: 'pending',
      payment_status:'unpaid',
      pricePerSlot: 500,
      totalPrice: 500 * selectedSlots.length,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post('/bookings', booking);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Booking Request Sent',
          text: 'Your booking is pending admin approval.',
        });
        setIsOpen(false);
        setSelectedSlots([]);
        setBookingDate('');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: error.message,
      });
    }
  };

  return (
    <>
      {/* ✅ Animated Court Card */}
      <motion.div
        className="card bg-green-100 shadow-md rounded-md p-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <img src={court.img} alt={court.title} className="rounded-md h-48 w-full object-cover" />
        <div className="mt-4 space-y-1">
          <h2 className="text-lg font-bold">{court.title}</h2>
          <p className="text-sm text-gray-600">{court.type}</p>
          <p className="text-sm font-semibold text-green-700">৳ 500 per session</p>
          <button onClick={handleBookNow} className="btn btn-sm bg-green-700 text-white mt-2">Book Now</button>
        </div>
      </motion.div>

      {/* ✅ Animated Modal with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-green-50 rounded-3xl p-6 w-full max-w-lg space-y-4 relative border-2 border-green-300"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-2">Booking - {court.title}</h2>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-xl font-bold text-gray-500"
              >
                ×
              </button>

              {/* Court Info */}
              <div>
                <label className="label text-sm">Court Type</label>
                <input type="text" value={court.type} readOnly className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label text-sm">Price per session</label>
                <input type="text" value="৳ 500" readOnly className="input input-bordered w-full" />
              </div>

              {/* Select Date */}
              <div>
                <label className="label text-sm">Select Date</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Slot Selection */}
              <div>
                <label className="label text-sm">Select Slots</label>
                <div className="grid grid-cols-2 gap-2">
                  {slots.map((slot) => (
                    <label key={slot} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={slot}
                        checked={selectedSlots.includes(slot)}
                        onChange={() => toggleSlot(slot)}
                      />
                      <span className="text-sm">{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total Price */}
              <div>
                <p className="text-sm text-gray-700">
                  Total Price: <span className="font-semibold text-green-700">৳{selectedSlots.length * 500}</span>
                </p>
              </div>

              {/* Submit */}
              <button type="submit" className="btn bg-green-700 text-white w-full">Confirm Booking</button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CourtCard;
