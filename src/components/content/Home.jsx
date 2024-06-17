import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center shadow-inset">
     <div className="flex flex-col justify-center items-center">
      <video className='object-cover w-full min-h-screen fixed z-[-1]' src='/videos/video4.mp4' autoPlay loop muted />
      <motion.div 
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="text-center">
      <h1 className='text-7xl text-center font-extrabold text-white mb-6 mt-40 px-4'>EARTH DAY EVERYDAY</h1> 
      <h2 className='md:text-2xl text-lg font-bold mt-4 mb-12 text-white'>Let us together contribute to the cause</h2>
      <button className='text-[#F9F3CC] rounded-md btn-lg font-extrabold p-4 hover:bg-green-300 hover:text-black'>SAVE EARTH, SAVE OURSELVES</button>
      </motion.div>
     </div>
    </div>
  );
}

export default Home;