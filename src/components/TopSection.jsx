import React from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Earth } from "./earth";

function TopSection({ user }) {
  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <div className='w-full h-full bg-[#01040c]'>
        <Canvas>
          <Suspense fallback={null}>
            <Earth id="object" />
          </Suspense>
        </Canvas>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center top-0 left-0 w-full" style={{ backgroundColor: 'rgba(23, 86, 221, 0.15)', zIndex: 99 }}>
          <h1 className="font-extrabold text-white pt-16 lg:text-7xl text-6xl">OUR EARTH</h1>
          <p className="text-2xl font-extrabold text-white mt-8">Let’s save our Planet together.</p>
          <p className="text-white xl:text-s text-sm font-semibold text-center mt-6 lg:w-[30%] md:w-[40%] sm:w-[50%] w-[70%]">
            You can help us save our world and have it go back to its best state ever by spreading awareness and donating to help fix our only world and our beloved EARTH!
            Go Green and Save Green. Let the icebergs live. The globe is warming and will set to fire. Stop polluting, it will cost extra.
          </p>
          <Link to="/login">
            <button className="btn btn-success mt-6 bg-[#27b927] text-white font-extrabold px-6 py-1">JOIN US</button>
          </Link>
        </div>
      </motion.div>
    </>
  );
}

export default TopSection;