import { motion } from 'framer-motion';

const promotions = [
  { code: 'GOAL5', name: 'Goal Getter', discount: 5, quantity: 10 },
  { code: 'KICK10', name: 'Kick Start', discount: 10, quantity: 7 },
  { code: 'RALLY15', name: 'Rally Master', discount: 15, quantity: 5 },
  { code: 'ACE20', name: 'Ace Shot', discount: 20, quantity: 3 },
  { code: 'DRIBBLE7', name: 'Dribble Deal', discount: 7, quantity: 8 },
  { code: 'SLAM8', name: 'Slam Dunk', discount: 8, quantity: 6 },
  { code: 'NETTT9', name: 'Net Gain', discount: 9, quantity: 4 },
  { code: 'TURF12', name: 'Turf Time', discount: 12, quantity: 9 },
  { code: 'POWER6', name: 'Power Play', discount: 6, quantity: 5 },
  { code: 'SMASH11', name: 'Smash Serve', discount: 11, quantity: 2 },
];

const Promotions = () => {
  return (
    <section className="bg-green-50   px-4 md:px-10 py-20">
      <div className="max-w-6xl mx-auto text-center">

        {/* ✅ Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-green-800 mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🎁 Exclusive Sports Coupons!
        </motion.h2>

        {/* ✅ 10 Promotions in a Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 py-20">
          {promotions.map((promo, index) => (
            <motion.div
              key={promo.code}
              className="bg-white shadow-md border-l-4 border-green-600 rounded-xl p-4 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <h3 className="text-lg font-bold text-green-800 mb-1">{promo.name}</h3>
              <p className="text-sm text-gray-700 mb-1">
                Use code <span className="text-green-700 font-semibold">{promo.code}</span> for <span className="text-green-700 font-bold">{promo.discount}% off</span>.
              </p>
              <p className="text-xs text-gray-500">Only {promo.quantity} coupons left!</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
