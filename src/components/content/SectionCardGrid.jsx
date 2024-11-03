import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Recycle, Bird, Car, Sun } from 'lucide-react';

// Background patterns remain the same
const BackgroundPatterns = {
  circular: (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="circularPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="4" fill="rgba(255,255,255,0.1)" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#circularPattern)" />
    </svg>
  ),
  waves: (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="wavesPattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
        <path d="M0 10 Q 25 0, 50 10 T 100 10" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="1.5" />
        <path d="M0 20 Q 25 10, 50 20 T 100 20" stroke="rgba(255,255,255,0.1)" fill="none" strokeWidth="1.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#wavesPattern)" />
    </svg>
  ),
  leaves: (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="leavesPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M30 10 Q 40 0, 50 10 T 30 30" stroke="rgba(255,255,255,0.15)" fill="none" strokeWidth="1.5" />
        <path d="M10 30 Q 20 20, 30 30 T 10 50" stroke="rgba(255,255,255,0.1)" fill="none" strokeWidth="1.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#leavesPattern)" />
    </svg>
  ),
  grid: (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="gridPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" />
        <circle cx="10" cy="10" r="1.5" fill="rgba(255,255,255,0.1)" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#gridPattern)" />
    </svg>
  ),
  dots: (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="dotsPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="2.5" fill="rgba(255,255,255,0.2)" />
        <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.1)" />
        <circle cx="20" cy="20" r="1.5" fill="rgba(255,255,255,0.1)" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dotsPattern)" />
    </svg>
  ),
  hexagons: (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="hexPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M15 0 L30 7.5 L30 22.5 L15 30 L0 22.5 L0 7.5 Z" stroke="rgba(255,255,255,0.15)" fill="none" strokeWidth="1.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#hexPattern)" />
    </svg>
  )
};

const BentoCard = ({ icon: Icon, title, description, bgColor, pattern, className }) => {
  const cardVariants = {
    initial: {
      scale: 1,
      boxShadow: '0 0 0 rgba(0,0,0,0)'
    },
    hover: {
      scale: 1.03,
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    }
  };

  const iconContainerVariants = {
    initial: {
      rotate: 0,
      scale: 1
    },
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      className={`relative p-6 rounded-xl h-full flex flex-col overflow-hidden backdrop-blur-sm ${className}`}
      style={{ backgroundColor: bgColor }}
      initial="initial"
      whileHover="hover"
      variants={cardVariants}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      <div className="absolute inset-0 opacity-80">
        {pattern}
      </div>
      <div className="relative z-10">
        <motion.div
          className="w-12 h-12 mb-4 flex items-center justify-center bg-white bg-opacity-20 rounded-lg"
          variants={iconContainerVariants}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        <motion.h3 
          className="text-2xl font-bold text-white mb-3"
        >
          {title}
        </motion.h3>
        <p className="text-white text-opacity-90 text-lg leading-relaxed flex-grow mb-8 font-medium">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const SectionCardGrid = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="inline-block px-3 py-2 mb-6 text-sm font-semibold text-white rounded-lg text-cn bg-blue-900 hover:cursor-pointer hover:bg-opacity-90">
          Eco-Friendly Choices
      </div>
      <motion.h1
        className="text-5xl font-bold text-center mb-8 text-green-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Nurturing Our Planet
      </motion.h1>
      <motion.p
        className="text-2xl text-center mb-16 text-green-700 font-semibold"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Sustainable Actions for a Thriving Earth
      </motion.p>
      <motion.div
        className="grid gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-7/12 lg:h-[320px] h-fit">
            <BentoCard
              icon={Recycle}
              title="Circular Economy"
              description="Embrace the cycle of sustainability: Reduce consumption, Reuse creatively, and Recycle responsibly. Transform waste into resources and minimize our ecological footprint."
              bgColor="rgba(47, 133, 90, 0.95)"
              pattern={BackgroundPatterns.circular}
            />
          </div>
          <div className="w-full lg:w-5/12 lg:h-[320px] h-fit">
            <BentoCard
              icon={Droplets}
              title="Water Wisdom"
              description="Cherish every drop: Implement water-saving techniques, harvest rainwater, and protect our precious aquatic ecosystems."
              bgColor="rgba(49, 130, 206, 0.95)"
              pattern={BackgroundPatterns.waves}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-5/12 lg:h-[320px] h-fit">
            <BentoCard
              icon={Bird}
              title="Biodiversity Guardians"
              description="Safeguard nature's delicate balance: Support wildlife conservation, create habitat corridors, and champion sustainable practices that protect our planet's rich biodiversity."
              bgColor="rgba(123, 52, 30, 0.95)"
              pattern={BackgroundPatterns.leaves}
            />
          </div>
          <div className="w-full lg:w-7/12 lg:h-[320px] h-fit">
            <BentoCard
              icon={Car}
              title="Green Mobility Revolution"
              description="Redefine your journey: Embrace eco-friendly transportation, from electric vehicles to active commuting. Every sustainable mile contributes to cleaner air and a healthier planet."
              bgColor="#508D4E"
              pattern={BackgroundPatterns.grid}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-7/12 lg:h-[320px] h-fit">
            <BentoCard
              icon={Sun}
              title="Clean Energy Future"
              description="Harness nature's power: Advocate for and adopt renewable energy sources. Be part of the global shift towards a sustainable, clean energy landscape that nurtures our planet."
              bgColor="rgba(44, 122, 123, 0.95)"
              pattern={BackgroundPatterns.dots}
            />
          </div>
          <div className="w-full lg:w-5/12 lg:h-[320px] h-fit">
            <BentoCard
              icon={Leaf}
              title="Eco-Conscious Living"
              description="Cultivate a green lifestyle: From sustainable shopping to community gardens, infuse every aspect of life with eco-friendly choices that ripple out to create positive environmental change."
              bgColor="rgba(76, 81, 191, 0.95)"
              pattern={BackgroundPatterns.hexagons}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionCardGrid;