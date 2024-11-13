import React, { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  return (
    <div className="w-full max-w-5xl mx-auto">
    <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex flex-col items-center justify-center my-4">
            <div className="inline-block px-3 py-2 text-sm font-semibold text-white rounded-lg text-cn bg-blue-900 hover:cursor-pointer hover:bg-opacity-90">
              Climate Impact: Drought Crisis
            </div>
            <motion.h1
              className="text-5xl font-bold text-center mt-5 mb-8 text-green-800"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Droughts Driven by Climate Change
            </motion.h1>
            <motion.p
              className="text-2xl text-center text-green-700 font-semibold"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Exploring how rising temperatures are intensifying water scarcity.
            </motion.p>
          </div>
          
        </motion.div>
      <div
        ref={containerRef}
        className="relative h-[550px] overflow-hidden cursor-col-resize select-none touch-none rounded-3xl"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <img
          src="https://assets3.cbsnewsstatic.com/hub/i/r/2022/10/03/80a982fa-99f8-4e74-906c-927dd8ac0961/thumbnail/620x415/d6226f3d14d4facaccf6ba92b86a1242/06-stevens-creek-reservoir-california-26may2021.jpg?v=c1d30b1df13c40bf65c6c1e6d9ac4ad7"
          alt="After"
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
          draggable="false"
        />

        <img
          src="https://assets3.cbsnewsstatic.com/hub/i/r/2022/10/03/6fbbc28c-8546-4514-a833-050f2c1f2efa/thumbnail/620x414/f9a4a96b61efbf919f24d5626f1160b2/05-stevens-creek-reservoir-california-30june2020.jpg?v=c1d30b1df13c40bf65c6c1e6d9ac4ad7"
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
          }}
          draggable="false"
        />

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize select-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center select-none">
            <div className="flex space-x-0.5">
              <div className="w-0.5 h-4 bg-gray-400"></div>
              <div className="w-0.5 h-4 bg-gray-400"></div>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded select-none">
          Before
        </div>
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded select-none">
          After
        </div>
        
      </div>
      <p className='text-base mt-4 text-center font-bold text-gray-800'>The "before" photo on the left shows Stevens Creek Reservoir in Cupertino, California, as it appeared on June 30, 2020. This artificial lake is located in the foothills of the Santa Cruz Mountains. The "after" photo on the right reveals the severe impact of California's drought, illustrating how climate change has worsened drought conditions across the western United States.</p>
    </div>
  );
};

export default BeforeAfterSlider;