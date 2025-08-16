import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAxios from '../../Hook/useAxios';
import Loading from '../../SharedPage/Loading';
import { Link } from 'react-router';



const ActivitiesSection = () => {
    const useAxious = useAxios()

    const { data: courts = [], isLoading } = useQuery({
        queryKey: ['courts'],
        queryFn: async () => {
            const res = await useAxious.get('/court');
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <section className="bg-green-50 py-16" id="activities">
            <div className="max-w-7xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">
                    🏅 Our Activities & Facilities
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {courts.map((court, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.01 }}
                            key={court._id}
                            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
                        >
                            <div className="mb-4">
                                <img src={court.img} className="rounded-md h-48 w-full object-cover" alt="" />
                            </div>
                            <h3 className="text-xl font-semibold text-green-700 mb-2">{court.title}</h3>
                            <p className="text-gray-600 text-sm">
                                Type: {court.type} <br />
                                Available Slots: {court.slots.join(', ')}
                            </p>
                            <Link to='/courtsPage' className='bg-green-600 text-white font-semibold px-1.5 py-1 mt-4 rounded'>See more</Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ActivitiesSection;
