import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// Fix default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const Location = () => {
  const position = [24.8917, 91.8700]; // Sylhet coordinate

  return (
    <section className="bg-green-50 py-12 px-4 md:px-10 my-15">
      <div className="max-w-5xl mx-auto">

        {/* ✅ Heading */}
        <motion.h2
          className="text-3xl font-bold text-green-800 mb-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Location
        </motion.h2>

        {/* ✅ Address */}
        <motion.div
          className="text-center text-gray-700 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg font-medium mb-2">
            Ad Bangla Media, Bhatipara House, 35/2 Kumarpara Rd, Sylhet 3100, Bangladesh
          </p>
          <p>Phone: 01302-750374 | Email: goal.sylhet@gmail.com</p>
        </motion.div>

        {/* ✅ Map */}
        <motion.div
          className="h-[400px] rounded-lg overflow-hidden mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-full w-full z-10">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Goal Sports Club <br /> Sylhet, Bangladesh
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
        {/* ✅ Google Maps Navigation Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=24.8917,91.8700"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm md:btn-md bg-green-700 text-white hover:bg-green-800"
          >
            Navigate via Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
