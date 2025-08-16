import React from 'react';
import { format } from 'date-fns';

const eventsData = [
  { id: 1, title: 'Summer Football Cup', date: '2025-08-20', location: 'Main Field', img: 'https://i.ibb.co.com/Jwx426s2/images.jpg' },
  { id: 2, title: 'Badminton Open', date: '2025-08-25', location: 'Indoor Court 2', img: 'https://i.ibb.co.com/MkKySt1N/download-2.jpg' },
  { id: 3, title: 'Tennis Tournament', date: '2025-09-01', location: 'Tennis Court 1', img: 'https://i.ibb.co.com/gLz3WbYv/download-3.jpg' },
  { id: 4, title: 'Fitness Challenge', date: '2025-09-05', location: 'Gym Area', img: 'https://i.ibb.co.com/hRDnJbzv/download-5.jpg' },
  { id: 5, title: 'Youth Football Camp', date: '2025-09-10', location: 'Main Field', img: 'https://i.ibb.co.com/5hb5Rnzs/download-6.jpg' },
  { id: 6, title: 'Tennis Workshop', date: '2025-09-15', location: 'Tennis Court 2', img: 'https://i.ibb.co/event6.jpg' },
  { id: 7, title: 'Annual Club Meet', date: '2025-09-20', location: 'Club Hall', img: 'https://i.ibb.co/event7.jpg' },
];

const EventsSection = () => {
  return (
    <section className="bg-green-50 py-16" id="events">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-12">
          🎉 Upcoming Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-green-700 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-1">{format(new Date(event.date), 'MMMM d, yyyy')}</p>
                <p className="text-green-600 font-semibold">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
