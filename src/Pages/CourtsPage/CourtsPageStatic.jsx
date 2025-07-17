import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../Hook/useAuth';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const CourtsPageStatic = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courts, setCourts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courts data from local JSON file
  useEffect(() => {
    fetch('/Court.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch court data');
        return res.json();
      })
      .then((data) => {
        setCourts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const [selectedCourt, setSelectedCourt] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookingDate, setBookingDate] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const courtsPerPage = 6;

  const totalPages = Math.ceil(courts.length / courtsPerPage);
  const indexOfLastCourt = currentPage * courtsPerPage;
  const indexOfFirstCourt = indexOfLastCourt - courtsPerPage;
  const currentCourts = courts.slice(indexOfFirstCourt, indexOfLastCourt);

  const handleBookNow = (court) => {
    if (!user) {
      navigate('/login');
    } else {
      setSelectedCourt(court);
      setIsOpen(true);
    }
  };

  const toggleSlot = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingDate || selectedSlots.length === 0) {
      return Swal.fire('Please select a date and at least one slot.');
    }

    // Dummy booking object - replace with your API call if needed
    const booking = {
      courtId: selectedCourt._id,
      courtTitle: selectedCourt.title,
      userEmail: user.email,
      userName: user.displayName,
      courtType: selectedCourt.type,
      bookingDate: format(new Date(bookingDate), 'yyyy-MM-dd'),
      slots: selectedSlots,
      status: 'pending',
      payment_status: 'unpaid',
      pricePerSlot: 500,
      totalPrice: 500 * selectedSlots.length,
      createdAt: new Date().toISOString(),
    };

    // For now just show success alert (replace with actual API call)
    Swal.fire({
      icon: 'success',
      title: 'Booking Request Sent',
      text: 'Your booking is pending admin approval.',
    });
    setIsOpen(false);
    setSelectedSlots([]);
    setBookingDate('');
  };

  if (isLoading) return <p className="text-center py-10">Loading courts...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="px-4 md:px-10 py-20 bg-green-50 min-h-screen">
      {/* Title */}
      <div className="text-center mb-15">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-2">
          🏟️ Explore Our Premium Sports Courts
        </h1>
        <p className="text-gray-700 text-sm md:text-base max-w-xl mx-auto mt-4">
          Book your preferred court and session with ease — fitness, fun, and sports await you!
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {currentCourts.map((court) => (
          <motion.div
            key={court._id}
            className="card bg-green-100 shadow-md rounded-md p-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <img
              src={court.img}
              alt={court.title}
              className="rounded-md h-48 w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-court-image.jpg';
              }}
            />
            <div className="mt-4 space-y-1">
              <h2 className="text-lg font-bold">{court.title}</h2>
              <p className="text-sm text-gray-600">{court.type}</p>
              <p className="text-sm font-semibold text-green-700">৳ 500 per session</p>
              <button
                onClick={() => handleBookNow(court)}
                className="btn btn-sm bg-green-700 text-white mt-2"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-10">
        <button
          className="btn btn-sm bg-green-600 text-white disabled:bg-gray-300"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${
              currentPage === i + 1 ? 'bg-green-800 text-white' : 'bg-green-400 text-white'
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-sm bg-green-600 text-white disabled:bg-gray-300"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && selectedCourt && (
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
              <h2 className="text-xl font-semibold mb-2">Booking - {selectedCourt.title}</h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-xl font-bold text-gray-500"
              >
                ×
              </button>

              <div>
                <label className="label text-sm">Court Type</label>
                <input
                  type="text"
                  value={selectedCourt.type}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label text-sm">Price per session</label>
                <input
                  type="text"
                  value="৳ 500"
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label text-sm">Select Date</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="input input-bordered w-full"
                  min={new Date().toISOString().split('T')[0]} // prevent past dates
                />
              </div>

              <div>
                <label className="label text-sm">Select Slots</label>
                <div className="grid grid-cols-2 gap-2">
                  {(selectedCourt.slots || []).map((slot) => (
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

              <div>
                <p className="text-sm text-gray-700">
                  Total Price:{' '}
                  <span className="font-semibold text-green-700">৳{selectedSlots.length * 500}</span>
                </p>
              </div>

              <button type="submit" className="btn bg-green-700 text-white w-full">
                Confirm Booking
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourtsPageStatic;
