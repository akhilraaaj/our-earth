import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const DonateEarthCTA = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full flex items-center justify-center border-green-600 border-4 shadow-2xl shadow-blue-900 rounded-3xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-950 rounded-lg shadow-xl p-8 w-full flex md:flex-row flex-col gap-8 md:gap-0"
      >
        <div className='flex flex-col items-center justify-center'>
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <Leaf className="text-green-500" size={48} />
        </motion.div>
        <div className='w-3/4'>
          <h2 className="text-3xl font-extrabold text-center text-white mb-4">Save Our Earth</h2>
          <p className="text-center text-gray-200 font-medium text-lg leading-8 mb-6">
            Your contribution can make a difference. Help us protect our planet for future generations.
          </p>
          <div className='flex items-center justify-center gap-4 w-full'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Donate Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Donate Now
          </motion.button>
          </div>
        </div>
        </div>
        <div className="mockup-phone -mb-32">
          <div className="camera"></div>
          <div className="display ">
            <div className="artboard relative artboard-demo phone-1 bg-[url('https://goodwillsp.org/wp-content/uploads/2015/04/ThinkstockPhotos-479711637.jpg')] bg-cover bg-center bg-no-repeat">
              <h4 className='text-slate-900 absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-extrabold text-lg'>We only have one planet, DONATE!!</h4>
            </div>
        </div>
</div>
      </motion.div>
    </div>
  );
};

export default DonateEarthCTA;