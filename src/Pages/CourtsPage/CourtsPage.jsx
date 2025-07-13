import football from '../../assets/football for court.jpeg';
import badminton from '../../assets/badminton for court.jpeg';
import squash from '../../assets/squash for court.jpeg';
import tableTanis from '../../assets/tableTanis for court.jpeg';
import hockey from '../../assets/hockey for court.jpeg';
import basketball from '../../assets/basketball for court.jpeg';
import CourtCard from './CourtCard';

const courts = [
  {
    id: 1,
    title: 'Football Field',
    type: 'Football',
    img: football,
  },
  {
    id: 2,
    title: 'Badminton Arena',
    type: 'Badminton',
    img: badminton,
  },
  {
    id: 3,
    title: 'Squash Court',
    type: 'Squash',
    img: squash,
  },
  {
    id: 4,
    title: 'Table Tennis Zone',
    type: 'Table Tennis',
    img: tableTanis,
  },
  {
    id: 5,
    title: 'Hockey Rink',
    type: 'Hockey',
    img: hockey,
  },
  {
    id: 6,
    title: 'Basketball Court',
    type: 'Basketball',
    img: basketball,
  },
];


const CourtsPage = () => {
  return (
    <div className="px-4 md:px-10 py-25 bg-green-50 min-h-screen ">
      {/* ✅ Sweet Styled Title */}
      <div className="text-center mb-20">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-2">
          🏟️ Explore Our Premium Sports Courts
        </h1>
        <p className="text-gray-700 text-sm md:text-base max-w-xl mx-auto">
          Book your preferred court and session with ease — fitness, fun, and sports await you!
        </p>
      </div>

      {/* ✅ Court Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {courts.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
      </div>
    </div>
  );
};

export default CourtsPage;
