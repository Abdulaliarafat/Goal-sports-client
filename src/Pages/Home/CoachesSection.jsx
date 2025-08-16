import React from 'react';
import { motion } from 'framer-motion';


const coachesData = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Football Coach',
    bio: '10 years of professional coaching experience, focusing on youth development and team strategies.',
    img: 'https://i.ibb.co.com/DfXryvFJ/Whats-App-Image-2025-07-13-at-12-12-43-eda9f489.jpg',
  },
  {
    id: 2,
    name: 'Emily Davis',
    role: 'Badminton Trainer',
    bio: 'Certified badminton trainer with expertise in improving agility, reflexes, and match tactics.',
    img: 'https://i.ibb.co.com/Fk5TFq4M/images-3.jpg',
  },
  {
    id: 3,
    name: 'Michael Lee',
    role: 'Tennis Coach',
    bio: 'Specializes in advanced techniques and competitive training for all skill levels.',
    img: 'https://i.ibb.co.com/cSb5h4rV/Whats-App-Image-2025-07-13-at-12-13-38-66586687.jpg',
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    role: 'Fitness Trainer',
    bio: 'Expert in functional training, weight management, and building personalized fitness plans.',
    img: 'https://i.ibb.co.com/hRj5xq1s/images-4.jpg',
  },
];

const CoachesSection = () => {
  return (
    <section className="bg-green-50 py-16" id="coaches">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-12">
          🏅 Meet Our Coaches
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {coachesData.map((coach,index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={coach.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition text-center">
              <img
                src={coach.img}
                alt={coach.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-green-700"
              />
              <h3 className="text-xl font-bold text-green-700">{coach.name}</h3>
              <p className="text-green-600 font-semibold mb-2">{coach.role}</p>
              <p className="text-gray-600 text-sm">{coach.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoachesSection;
