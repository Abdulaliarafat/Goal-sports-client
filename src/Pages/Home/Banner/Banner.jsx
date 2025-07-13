import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import football from '../../../assets/football.jpg';
import badminton from '../../../assets/badminton.jpg';
import squish from '../../../assets/squash.jpg';
import tableTanis from '../../../assets/table-tennis-1208378_960_720.jpg';
import hockey from '../../../assets/hocky.jpg';
import basketball from '../../../assets/basketball.jpg';

// ✅ 1. Courts data
const courts = [
    {
        id: 1,
        title: 'Football Field',
        img: football,
        description: 'Join the thrill on our premium football court designed for pros and beginners.',
    },
    {
        id: 2,
        title: 'Badminton Arena',
        img: badminton,
        description: 'Smash your goals in our well-lit indoor badminton arena anytime.',
    },
    {
        id: 3,
        title: 'Squash Court',
        img: squish,
        description: 'Challenge your agility and speed on our fast-paced squash court.',
    },
    {
        id: 4,
        title: 'Table Tennis Zone',
        img: tableTanis,
        description: 'Perfect your spin and rally in our competitive table tennis zone.',
    },
    {
        id: 5,
        title: 'Hockey Rink',
        img: hockey,
        description: 'Experience the speed and power of the game on our smooth hockey rink.',
    },
    {
        id: 6,
        title: 'Basketball Court',
        img: basketball,
        description: 'Score big in our full-sized indoor basketball court built for every level.',
    },
];


const Banner = () => {
    return (
        <div className="relative">
            {/* ✅ 2. Swiper carousel */}
            <Swiper
                spaceBetween={30}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                }}
                navigation={true}
                modules={[Pagination, Autoplay, Navigation]}
                className="h-[70vh] md:h-[80vh] w-full"
            >
                {courts.map((court) => (
                    <SwiperSlide key={court.id}>
                        <div
                            className="w-full h-full bg-cover object-cover bg-center flex items-center justify-center"
                            style={{ backgroundImage: `url(${court.img})` }}
                        >
                            {/* ✅ 3. Framer motion animation block */}
                            <motion.div
                                className="bg-black/60 p-6 md:p-12 rounded-xl text-white max-w-xl mx-4 text-center"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-2xl md:text-4xl font-bold mb-4">{court.title}</h2>
                                <p className="mb-6 text-sm md:text-base">{court.description}</p>
                                <button className="btn btn-sm md:btn-md bg-green-700 text-white hover:bg-green-800 transition">
                                    View Court
                                </button>
                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
