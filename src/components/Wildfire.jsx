import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Loader2, AlertTriangle, MapPin, Calendar, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// MapBoundaries component remains the same
const MapBoundaries = () => {
  const map = useMap();
  
  useEffect(() => {
    const maxBounds = [[-90, -180], [90, 180]];
    map.setMaxBounds(maxBounds);
    map.on('drag', () => {
      map.panInsideBounds(maxBounds, { animate: false });
    });
    return () => {
      map.off('drag');
    };
  }, [map]);

  return null;
};

const EONET_API = 'https://eonet.gsfc.nasa.gov/api/v3';

const NasaWildfireMap = () => {
  const [wildfires, setWildfires] = useState([]);
  const [filteredWildfires, setFilteredWildfires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [timeFilter, setTimeFilter] = useState('all');
  const [showStats, setShowStats] = useState(false);

  // Fetch wildfires
  useEffect(() => {
    const fetchWildfires = async () => {
      try {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        const response = await fetch(
          `${EONET_API}/events?category=wildfires&status=all&limit=1000&start=${oneYearAgo.toISOString()}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch wildfire data');
        }
        
        const data = await response.json();
        
        const formattedWildfires = data.events.map(event => ({
          id: event.id,
          title: event.title,
          coordinates: [
            event.geometry[event.geometry.length - 1].coordinates[1],
            event.geometry[event.geometry.length - 1].coordinates[0]
          ],
          date: new Date(event.geometry[event.geometry.length - 1].date),
          sources: event.sources,
          closed: event.closed !== null
        }));
        
        setWildfires(formattedWildfires);
        setLastUpdate(new Date());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWildfires();
  }, []);

  // Updated time filtering logic
  useEffect(() => {
    const now = new Date().getTime();
    
    const filtered = wildfires.filter(fire => {
      const fireDate = fire.date.getTime();
      const timeDiff = now - fireDate;
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
      const monthsDiff = daysDiff / 30;

      switch (timeFilter) {
        case 'month1':
          return monthsDiff <= 1;
        case 'month3':
          return monthsDiff <= 3;
        case 'month6':
          return monthsDiff <= 6;
        default: // 'all'
          return true;
      }
    });

    // Sort by date, most recent first
    const sortedFiltered = filtered.sort((a, b) => b.date - a.date);
    setFilteredWildfires(sortedFiltered);
  }, [timeFilter, wildfires]);

  const getFireAge = (date) => {
    const now = new Date();
    const monthsDiff = (now - date) / (1000 * 60 * 60 * 24 * 30);
    return Math.min(Math.max(Math.floor(monthsDiff), 0), 12);
  };

  const getFireColor = (date, closed) => {
    if (closed) return '#9CA3AF';
    
    const age = getFireAge(date);
    const colors = [
      '#EF4444', // Current month
      '#F87171',
      '#F97316',
      '#FB923C',
      '#EAB308',
      '#FACC15',
      '#84CC16',
      '#22C55E',
      '#14B8A6',
      '#06B6D4',
      '#0EA5E9',
      '#3B82F6', // 12 months ago
    ];
    return colors[Math.min(age, colors.length - 1)];
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg"
      >
        <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600"
        >
          Loading wildfire data...
        </motion.p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-96 bg-red-50 rounded-lg"
      >
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-lg text-red-600">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </motion.button>
      </motion.div>
    );
  }

  const statsData = {
    total: filteredWildfires.length,
    active: filteredWildfires.filter(f => !f.closed).length,
    closed: filteredWildfires.filter(f => f.closed).length
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6 px-6"
    >
    <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex flex-col items-center justify-center my-4">
            <div className="inline-block px-3 py-2 text-sm font-semibold text-white rounded-lg text-cn bg-blue-900 hover:cursor-pointer hover:bg-opacity-90">
              Conservation Trivia
            </div>
            <motion.h1
              className="text-5xl font-bold text-center mt-4 mb-8 text-green-800"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Test your knowledge
            </motion.h1>
            <motion.p
              className="text-2xl text-center text-green-700 font-semibold"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Think Green: Take the Quiz to Discover Your Conservation IQ!
            </motion.p>
          </div>
          
        </motion.div>
      <motion.div 
        className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <MapPin className="w-8 h-8" />
            <h1 className="text-2xl font-bold">NASA EONET Wildfire Tracker</h1>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowStats(!showStats)}
            className="p-2 rounded-full hover:bg-blue-800 transition-colors"
          >
            <Info className="w-6 h-6" />
          </motion.button>
        </div>

        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 grid grid-cols-3 gap-4"
            >
              {Object.entries({
                'Total Fires': statsData.total,
                'Active Fires': statsData.active,
                'Contained Fires': statsData.closed
              }).map(([label, value], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-blue-800 bg-opacity-50 p-4 rounded-lg"
                >
                  <p className="text-sm opacity-75">{label}</p>
                  <p className="text-2xl font-bold">{value}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <motion.select
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="all">All Year</option>
          {/* <option value="month6">Last 6 Months</option> */}
          {/* <option value="month3">Last 3 Months</option> */}
          <option value="month1">Last Month</option>
        </motion.select>

        {lastUpdate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center text-sm text-gray-500"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Last Updated: {lastUpdate.toLocaleDateString()}
          </motion.div>
        )}
      </div>

      <motion.div 
        layout
        className="relative h-[600px] rounded-xl overflow-hidden shadow-xl z-0"
      >
        <MapContainer
          center={[20, 0]}
          zoom={2}
          minZoom={2}
          maxBoundsViscosity={1.0}
          className="h-full w-full"
          attributionControl={false}
        >
          <MapBoundaries />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            noWrap={true}
          />
          {filteredWildfires.map((fire) => (
            <CircleMarker
              key={fire.id}
              center={fire.coordinates}
              pathOptions={{
                color: getFireColor(fire.date, fire.closed),
                fillColor: getFireColor(fire.date, fire.closed),
                fillOpacity: 0.7
              }}
              radius={6}
            >
              <Popup>
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 space-y-2"
                >
                  <h3 className="font-bold text-lg">{fire.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Detected: {fire.date.toLocaleDateString()}</p>
                    <p>Status: {fire.closed ? 
                      <span className="text-gray-500">Contained</span> : 
                      <span className="text-red-500">Active</span>
                    }</p>
                    <p>Location: {fire.coordinates[0].toFixed(2)}°N, {fire.coordinates[1].toFixed(2)}°E</p>
                  </div>
                  {/* {fire.sources?.length > 0 && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={fire.sources[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                    >
                      View Details
                    </motion.a>
                  )} */}
                </motion.div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000] backdrop-blur-sm bg-opacity-90"
        >
          <h4 className="font-bold mb-3 text-gray-800">Fire Age</h4>
          <div className="space-y-2">
            {[
              { color: 'bg-red-500', label: 'Current Month' },
              { color: 'bg-orange-500', label: '2-3 Months Ago' },
              { color: 'bg-yellow-500', label: '4-6 Months Ago' },
              { color: 'bg-blue-500', label: '7-12 Months Ago' },
              { color: 'bg-gray-400', label: 'Contained' }
            ].map((item, index) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="flex items-center space-x-2"
              >
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm text-gray-600">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between items-center text-sm text-gray-500 px-2"
      >
        <span>Data: NASA EONET API</span>
        <span>Displaying {filteredWildfires.length} wildfires</span>
      </motion.div>
    </motion.div>
  );
};

export default NasaWildfireMap;