import { motion } from 'framer-motion';

const AboutClub = () => {
  return (
    <section className="bg-green-50 py-12 px-5 mx-4 md:px-10  my-15">
      <div className="max-w-5xl mx-auto">

        {/* ✅ Section Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-green-800 mb-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Goal Club
        </motion.h2>

        {/* ✅ History */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-green-700 mb-2">History</h3>
          <p className="text-gray-700 leading-relaxed">
            Founded 3 years ago in Bangladesh, Goal Club began as a small community initiative and quickly became a hub for sports enthusiasts, creating an inclusive and active sports culture in Sylhet.
          </p>
        </motion.div>

        {/* ✅ Mission */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-green-700 mb-2">Mission</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Promote health and fitness through active sports.</li>
            <li>Create an inclusive space for all ages and genders.</li>
            <li>Offer professional-grade sports facilities in Sylhet.</li>
            <li>Encourage youth participation in physical activities.</li>
            <li>Build a supportive sports community in Bangladesh.</li>
          </ul>
        </motion.div>

        {/* ✅ Contact + Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="italic text-xl font-medium text-green-800 mb-4">
            First private turf sports facility in Sylhet, offering a wide range of activities with a vision to promote health.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutClub;
