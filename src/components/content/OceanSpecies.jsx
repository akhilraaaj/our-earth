import React, { useState, useEffect } from 'react';
import { Fish, Shield, Globe2, Waves, Binary, Weight, Heart, AlertTriangle } from 'lucide-react';

const MarineSpeciesShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const speciesData = [
    {
      name: "Blue Whale",
      scientificName: "Balaenoptera musculus",
      status: "Endangered",
      habitat: "Open Ocean, All major oceans",
      threats: "Ship strikes, Entanglement, Climate change",
      population: "10,000-25,000",
      icon: Fish,
      color: "blue",
      details: {
        length: "Up to 30 meters",
        weight: "Up to 200 tons",
        diet: "Krill, small fish",
        lifespan: "80-90 years",
        funFacts: [
          "Largest animal to ever exist",
          "Heart weighs as much as a car",
          "Can communicate over hundreds of miles"
        ],
        conservation: [
          "Protected by International Whaling Commission",
          "Marine protected areas established",
          "Ship speed restrictions in key areas"
        ]
      }
    },
    {
      name: "Hawksbill Sea Turtle",
      scientificName: "Eretmochelys imbricata",
      status: "Critically Endangered",
      habitat: "Coral reefs, Coastal waters",
      threats: "Poaching, Habitat loss, Plastic pollution",
      population: "20,000 nesting females",
      icon: Fish,
      color: "orange",
      details: {
        length: "Up to 1 meter",
        weight: "45-90 kg",
        diet: "Sponges, jellyfish, sea anemones",
        lifespan: "30-50 years",
        funFacts: [
          "Shell changes color slightly based on temperature",
          "Can dive up to 1,000 feet deep",
          "Named for their hawk-like beak"
        ],
        conservation: [
          "CITES trade ban",
          "Nesting beach protection",
          "Community-based conservation programs"
        ]
      }
    },
    {
      name: "Vaquita",
      scientificName: "Phocoena sinus",
      status: "Critically Endangered",
      habitat: "Gulf of California",
      threats: "Illegal fishing nets, Small population",
      population: "Less than 20",
      icon: Fish,
      color: "gray",
      details: {
        length: "1.4-1.5 meters",
        weight: "30-55 kg",
        diet: "Small fish, squid, crustaceans",
        lifespan: "20 years",
        funFacts: [
          "World's most endangered marine mammal",
          "Only found in a small area of Mexico",
          "Discovered in 1958"
        ],
        conservation: [
          "Gillnet ban in habitat",
          "International conservation efforts",
          "Protected area enforcement"
        ]
      }
    }
  ];

  useEffect(() => {
    if (isRotating) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % speciesData.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isRotating]);

  const currentSpecies = speciesData[currentIndex];
  const Icon = currentSpecies.icon;

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg transition-all duration-500 ease-in-out">
      <div className="text-center mb-8">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setCurrentIndex((prev) => (prev - 1 + speciesData.length) % speciesData.length)}
            className="p-3 hover:bg-blue-100 rounded-full transition-colors duration-300"
          >
            <span className="text-2xl">←</span>
          </button>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-blue-800 transition-all duration-300 hover:scale-105">
              {currentSpecies.name}
            </h1>
            <p className="italic text-gray-600 text-lg">
              {currentSpecies.scientificName}
            </p>
          </div>
          <button 
            onClick={() => setCurrentIndex((prev) => (prev + 1) % speciesData.length)}
            className="p-3 hover:bg-blue-100 rounded-full transition-colors duration-300"
          >
            <span className="text-2xl">→</span>
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex justify-center my-8">
          <div className={`transform transition-all duration-500 ${isExpanded ? 'scale-110' : 'scale-100'}`}
               onMouseEnter={() => setIsExpanded(true)}
               onMouseLeave={() => setIsExpanded(false)}>
            <Icon 
              size={150} 
              color={currentSpecies.color} 
              className={`${isRotating ? 'animate-bounce' : ''} transition-all duration-300`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-4 p-6">
              <Shield className="text-red-500 h-8 w-8" />
              <div>
                <p className="font-semibold text-lg">Conservation Status</p>
                <p className="text-red-600 font-bold">{currentSpecies.status}</p>
              </div>
            </div>
          </div>

          <div className="transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-4 p-6">
              <Globe2 className="text-blue-500 h-8 w-8" />
              <div>
                <p className="font-semibold text-lg">Habitat</p>
                <p className="text-gray-600">{currentSpecies.habitat}</p>
              </div>
            </div>
          </div>

          <div className="transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-4 p-6">
              <AlertTriangle className="text-yellow-500 h-8 w-8" />
              <div>
                <p className="font-semibold text-lg">Primary Threats</p>
                <p className="text-gray-600">{currentSpecies.threats}</p>
              </div>
            </div>
          </div>

          <div className="transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-4 p-6">
              <Binary className="text-green-500 h-8 w-8" />
              <div>
                <p className="font-semibold text-lg">Population</p>
                <p className="text-gray-600">{currentSpecies.population}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 mt-8">
          <div className="transform transition-all duration-300 hover:shadow-xl">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-800">Detailed Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Weight className="text-purple-500" />
                  <div>
                    <p className="font-semibold">Size</p>
                    <p className="text-gray-600">{currentSpecies.details.length}</p>
                    <p className="text-gray-600">{currentSpecies.details.weight}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="text-red-500" />
                  <div>
                    <p className="font-semibold">Lifespan</p>
                    <p className="text-gray-600">{currentSpecies.details.lifespan}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="transform transition-all duration-300 hover:shadow-xl">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-800">Fun Facts</h2>
              <ul className="list-disc list-inside space-y-2">
                {currentSpecies.details.funFacts.map((fact, index) => (
                  <li key={index} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="transform transition-all duration-300 hover:shadow-xl">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-800">Conservation Efforts</h2>
              <ul className="list-disc list-inside space-y-2">
                {currentSpecies.details.conservation.map((effort, index) => (
                  <li key={index} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    {effort}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button 
          onClick={() => setIsRotating(!isRotating)}
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
        >
          {isRotating ? "Pause Rotation" : "Resume Rotation"}
        </button>
      </div>
    </div>
  );
};

export default MarineSpeciesShowcase;