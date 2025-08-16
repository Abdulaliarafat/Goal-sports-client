import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hook/useAxios';
import Loading from '../../SharedPage/Loading';



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
                <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">
                    🏅 Our Activities & Facilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {courts.map((court) => (
                        <div
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ActivitiesSection;
