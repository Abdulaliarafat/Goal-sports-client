import React from 'react';
import { FaGift, FaPercentage, FaStar } from 'react-icons/fa';

const offersData = [
  {
    id: 1,
    title: ' Special',
    description: 'Get 20% off on your first month membership.',
    icon: <FaGift size={30} className="text-green-600" />,
    badge: '20% OFF',
  },
  {
    id: 2,
    title: 'Family Bundle',
    description: 'Sign up 3 family members and get 1 month free.',
    icon: <FaStar size={30} className="text-green-600" />,
    badge: 'Free Month',
  },
  {
    id: 3,
    title: 'Seasonal Offer',
    description: 'Get 15% off on all court bookings this season.',
    icon: <FaPercentage size={30} className="text-green-600" />,
    badge: '15% OFF',
  },
  {
    id: 4,
    title: 'Weekend Pack',
    description: 'Book courts for weekend  get 10% discount.',
    icon: <FaGift size={30} className="text-green-600" />,
    badge: '10% OFF',
  },
  {
    id: 5,
    title: 'Fitness Combo',
    description: 'Gym + Badminton plan at 25% off for new members.',
    icon: <FaStar size={30} className="text-green-600" />,
    badge: '25% OFF',
  },
  {
    id: 6,
    title: 'Early Bird',
    description: 'Book early morning slots and save 10%.',
    icon: <FaPercentage size={30} className="text-green-600" />,
    badge: '10% OFF',
  },
  {
    id: 7,
    title: 'Student Discount',
    description: 'Students get 20% off on monthly membership.',
    icon: <FaGift size={30} className="text-green-600" />,
    badge: '20% OFF',
  },
  {
    id: 8,
    title: 'Corporate Plan',
    description: ' get special rates for group bookings.',
    icon: <FaStar size={30} className="text-green-600" />,
    badge: 'Group Deal',
  },
  {
    id: 9,
    title: 'Summer Special',
    description: 'Enjoy summer sports packages with 15% discount.',
    icon: <FaPercentage size={30} className="text-green-600" />,
    badge: '15% OFF',
  },
  {
    id: 10,
    title: 'Referral Bonus',
    description: 'Refer a friend and get 1 week free membership.',
    icon: <FaGift size={30} className="text-green-600" />,
    badge: 'Free Week',
  },
];

const OffersSection = () => {
  return (
    <section className="bg-green-50 py-16" id="offers">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">
          🎁 Current Offers & Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {offersData.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
            >
              <div className="mb-4">{offer.icon}</div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">{offer.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
              {offer.badge && (
                <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {offer.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
