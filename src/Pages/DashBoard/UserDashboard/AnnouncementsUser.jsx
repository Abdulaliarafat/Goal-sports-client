import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const AnnouncementsUser = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcementsUser');
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center py-10 text-lg text-green-600 font-semibold">Loading Announcements...</p>;
  }

  return (
    <section className="px-4 md:px-10 py-20 bg-green-50 min-h-screen">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-green-800"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📢 Latest Announcements
        </motion.h2>
        <p className="text-gray-600 text-sm md:text-base mt-2">
          Stay updated with the latest announcements and club news!
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {announcements.map((a, index) => (
          <motion.div
            key={a._id}
            className="bg-green-100 border-l-4 border-green-600 rounded-2xl p-6 shadow-md text-left hover:shadow-lg transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <h3 className="text-xl font-bold text-green-800 mb-2">{a.title}</h3>
            <p className="text-gray-700 text-sm mb-3">{a.message}</p>

            <div className="text-xs text-gray-500 space-y-1">
              <p><strong>🎯 Audience:</strong> {a.audience}</p>
              <p><strong>📅 Date:</strong> {a.date}</p>
              <p><strong>👤 Posted By:</strong> {a.postedBy}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AnnouncementsUser;
