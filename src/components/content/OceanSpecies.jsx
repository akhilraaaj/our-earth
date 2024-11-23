import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightCircle, ArrowLeftCircle, Shield, Globe2, Binary, AlertTriangle } from 'lucide-react';
import blueWhale from '../../assets/blue-whale.png';
import vaquita from '../../assets/vaquita.png';
import seaTurtle from '../../assets/hawksbill-sea-turtle.png';
import shark from '../../assets/great-white-shark.png';
import octopus from '../../assets/giant-pacific-octopus.png';

const MarineSpeciesShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [selectedTab, setSelectedTab] = useState('facts');
  const [direction, setDirection] = useState(1);

  const speciesData = [
    {
      name: "Blue Whale",
      scientificName: "Balaenoptera musculus",
      status: "Endangered",
      habitat: "Open Ocean, All major oceans",
      threats: "Ship strikes, Entanglement, Climate change",
      population: "10,000-25,000",
      icon: blueWhale,
      color: "blue",
      width: 500,
      height: 300, // Custom dimensions
      details: {
        length: "Up to 30 meters",
        weight: "Up to 200 tons",
        diet: "Krill, small fish",
        lifespan: "80-90 years",
        funFacts: [
          "Largest animal to ever exist",
          "Heart weighs as much as a car",
          "Can communicate over hundreds of miles",
        ],
        conservation: [
          "Protected by International Whaling Commission",
          "Marine protected areas established",
          "Ship speed restrictions in key areas",
        ],
      },
    },
    {
      name: "Great White Shark",
      scientificName: "Carcharodon carcharias",
      status: "Vulnerable",
      habitat: "Coastal and offshore waters, temperate and tropical oceans",
      threats: "Overfishing, Bycatch, Habitat loss",
      population: "Unknown, decreasing",
      icon: shark,
      color: "gray",
      width: 400,
      height: 300,
      details: {
        length: "4.5-6 meters",
        weight: "1,100-2,400 kg",
        diet: "Fish, seals, sea lions, carrion",
        lifespan: "70 years",
        funFacts: [
          "Can detect blood in water from miles away",
          "Powerful bite force of up to 4,000 psi",
          "Plays a critical role in ocean ecosystems as an apex predator",
        ],
        conservation: [
          "Protected under CITES",
          "Fishing restrictions in many areas",
          "Shark fin trade bans implemented in various countries",
        ],
      },
    },
    {
      name: "Giant Pacific Octopus",
      scientificName: "Enteroctopus dofleini",
      status: "Not Evaluated",
      habitat: "Rocky coastal areas, Coral reefs, Deep ocean",
      threats: "Fishing, Pollution, Climate change",
      population: "Unknown",
      icon: octopus,
      color: "red",
      width: 400,
      height: 300,
      details: {
        length: "Up to 5 meters (arm span)",
        weight: "50 kg",
        diet: "Crabs, clams, small fish",
        lifespan: "3-5 years",
        funFacts: [
          "Known for their intelligence and problem-solving abilities",
          "Can change color and texture to camouflage",
          "Has three hearts and blue blood",
        ],
        conservation: [
          "Research into octopus populations ongoing",
          "Marine protected areas provide some habitat safety",
          "Awareness campaigns to reduce bycatch",
        ],
      },
    },
    {
      name: "Hawksbill Sea Turtle",
      scientificName: "Eretmochelys imbricata",
      status: "Critically Endangered",
      habitat: "Coral reefs, Coastal waters",
      threats: "Poaching, Habitat loss, Plastic pollution",
      population: "20,000 nesting females",
      icon: seaTurtle,
      color: "orange",
      width: 400,
      height: 300, // Custom dimensions
      details: {
        length: "Up to 1 meter",
        weight: "45-90 kg",
        diet: "Sponges, jellyfish, sea anemones",
        lifespan: "30-50 years",
        funFacts: [
          "Shell changes color slightly based on temperature",
          "Can dive up to 1,000 feet deep",
          "Named for their hawk-like beak",
        ],
        conservation: [
          "CITES trade ban",
          "Nesting beach protection",
          "Community-based conservation programs",
        ],
      },
    },
    {
      name: "Vaquita",
      scientificName: "Phocoena sinus",
      status: "Critically Endangered",
      habitat: "Gulf of California",
      threats: "Illegal fishing nets, Small population",
      population: "Less than 20",
      icon: vaquita,
      color: "gray",
      width: 600,
      height: 300,
      details: {
        length: "1.4-1.5 meters",
        weight: "30-55 kg",
        diet: "Small fish, squid, crustaceans",
        lifespan: "20 years",
        funFacts: [
          "World's most endangered marine mammal",
          "Only found in a small area of Mexico",
          "Discovered in 1958",
        ],
        conservation: [
          "Gillnet ban in habitat",
          "International conservation efforts",
          "Protected area enforcement",
        ],
      },
    },
  ];

  useEffect(() => {
    let timer;
    if (isRotating) {
      timer = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % speciesData.length);
      }, 5000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRotating, speciesData.length]);

  const currentSpecies = speciesData[currentIndex];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0
    })
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const iconVariants = {
    hover: { scale: 1.05, rotate: [0, 2, -2, 0] }
  };

  const handleNext = () => {
    setIsRotating(false);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % speciesData.length);
  };
  
  const handlePrevious = () => {
    setIsRotating(false);
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + speciesData.length) % speciesData.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100 sm:p-8 p-4 rounded-xl shadow-2xl"
    >
      <div className="relative h-32">
        <div className="flex justify-between items-center">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="text-blue-900 size-24 z-10"
          >
           <ArrowLeftCircle />
          </motion.button>
          
          <div className="absolute w-full left-0 flex justify-center items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.3,
                  type: "tween"
                }}
                className="text-center"
              >
                <h1 className="text-4xl font-bold text-blue-800 mb-2">
                  {currentSpecies.name}
                </h1>
                <p className="italic text-gray-600 text-xl">
                  {currentSpecies.scientificName}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="text-blue-900 z-10"
          >
            <ArrowRightCircle />
          </motion.button>
        </div>
      </div>

      <div className="space-y-8">
        <motion.div 
          className="flex justify-center"
          whileHover="hover"
          variants={iconVariants}
        >
          <img
            src={currentSpecies.icon}
            alt={`${currentSpecies.name} icon`}
            style={{
              width: `${currentSpecies.width}px`,
              height: `${currentSpecies.height}px`,
            }}
            className="drop-shadow-xl"
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: Shield, title: "Conservation Status", value: currentSpecies.status, color: "red" },
            { icon: Globe2, title: "Habitat", value: currentSpecies.habitat, color: "blue" },
            { icon: AlertTriangle, title: "Primary Threats", value: currentSpecies.threats, color: "yellow" },
            { icon: Binary, title: "Population", value: currentSpecies.population, color: "green" }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <item.icon className={`text-${item.color}-500 h-8 w-8`} />
                <div>
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className={`${item.title === "Conservation Status" ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                    {item.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mt-8"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex space-x-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTab('facts')}
              className={`px-4 py-2 rounded-full ${selectedTab === 'facts' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              Fun Facts
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTab('conservation')}
              className={`px-4 py-2 rounded-full ${selectedTab === 'conservation' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              Conservation
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {selectedTab === 'facts' ? (
                <ul className="space-y-3">
                  {currentSpecies.details.funFacts.map((fact, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      <span className="text-blue-500">•</span>
                      <span>{fact}</span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-3">
                  {currentSpecies.details.conservation.map((effort, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      <span className="text-green-500">•</span>
                      <span>{effort}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div 
        className="flex justify-center mt-8"
        whileHover={{ scale: 1.05 }}
      >
        <button 
          onClick={() => {
            setIsRotating(!isRotating);
            if (!isRotating) {
              setDirection(1);
            }
          }}
          className="px-8 py-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
          {isRotating ? "Pause Rotation" : "Resume Rotation"}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default MarineSpeciesShowcase;