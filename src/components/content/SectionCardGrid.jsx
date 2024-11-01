import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Recycle, Bird, Car, Sun } from 'lucide-react';

const BentoCard = ({ icon: Icon, title, description, color, className }) => {
  return (
    <motion.div
      className={`p-6 rounded-xl h-full flex flex-col ${className}`}
      style={{ backgroundColor: color }}
      whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.div
  className="w-10 h-10 mb-4 flex items-center justify-center"
  animate={{ rotate: 0 }}
  whileHover={{ rotate: 360 }}
  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
>
  <Icon className="w-full h-full text-white" />
</motion.div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white text-opacity-80 flex-grow mb-8">{description}</p>
    </motion.div>
  );
};

const SectionCardGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-8 text-green-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Nurturing Our Planet
      </motion.h1>
      <motion.p
        className="text-xl text-center mb-12 text-green-600"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Sustainable Actions for a Thriving Earth
      </motion.p>
      <motion.div
        className="flex flex-col gap-6 mb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-7/12">
            <BentoCard
              icon={Recycle}
              title="Circular Economy"
              description="Embrace the cycle of sustainability: Reduce consumption, Reuse creatively, and Recycle responsibly. Transform waste into resources and minimize our ecological footprint."
              color="#2F855A"
            />
          </div>
          <div className="w-full lg:w-5/12">
            <BentoCard
              icon={Droplets}
              title="Water Wisdom"
              description="Cherish every drop: Implement water-saving techniques, harvest rainwater, and protect our precious aquatic ecosystems."
              color="#3182CE"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-5/12">
            <BentoCard
              icon={Bird}
              title="Biodiversity Guardians"
              description="Safeguard nature's delicate balance: Support wildlife conservation, create habitat corridors, and champion sustainable practices that protect our planet's rich biodiversity."
              color="#7B341E"
            />
          </div>
          <div className="w-full lg:w-7/12">
            <BentoCard
              icon={Car}
              title="Green Mobility Revolution"
              description="Redefine your journey: Embrace eco-friendly transportation, from electric vehicles to active commuting. Every sustainable mile contributes to cleaner air and a healthier planet."
              color="#B7791F"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-7/12">
            <BentoCard
              icon={Sun}
              title="Clean Energy Future"
              description="Harness nature's power: Advocate for and adopt renewable energy sources. Be part of the global shift towards a sustainable, clean energy landscape that nurtures our planet."
              color="#2C7A7B"
            />
          </div>
          <div className="w-full lg:w-5/12">
            <BentoCard
              icon={Leaf}
              title="Eco-Conscious Living"
              description="Cultivate a green lifestyle: From sustainable shopping to community gardens, infuse every aspect of life with eco-friendly choices that ripple out to create positive environmental change."
              color="#4C51BF"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionCardGrid;