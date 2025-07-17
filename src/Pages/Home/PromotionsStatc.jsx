import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../SharedPage/Loading';

const PromotionsStatc = () => {
  const { data: Promotions = [], isLoading, error } = useQuery({
    queryKey: ['promotions'],
    queryFn: async () => {
      const res = await fetch('/Coupuon.json'); // ✅ Corrected path
      if (!res.ok) throw new Error('Failed to fetch local JSON');
      return res.json();
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <p className="text-center py-10 text-red-500">Failed to load promotions.</p>;

  return (
    <section className="bg-green-50 px-4 md:px-10 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-green-800 mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🎁 Exclusive Sports Coupons!
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 py-20">
          {Promotions.map((promo, index) => (
            <motion.div
              key={promo._id}
              className="bg-white shadow-md border-l-4 border-green-600 rounded-xl p-4 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <h3 className="text-lg font-bold text-green-800 mb-1">{promo.name}</h3>
              <p className="text-sm text-gray-700 mb-1">
                Use code <span className="text-green-700 font-semibold">{promo.code}</span> for{' '}
                <span className="text-green-700 font-bold">{promo.discount}% off</span>.
              </p>
              <p className="text-xs text-gray-500">Only {promo.quantity} coupons left!</p>
              <p className="text-xs text-gray-400 mt-1">
                Expires on: {new Date(promo.expiresAt).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsStatc;
