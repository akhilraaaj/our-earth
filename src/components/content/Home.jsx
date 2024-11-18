import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

const Home = () => {
  const scrollToCards = () => {
    const element = document.getElementById("cards-section");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center shadow-inset">
      <div className="flex flex-col justify-center items-center">
        <video
          className="object-cover w-full min-h-screen fixed z-[-1]"
          src="/videos/video4.mp4"
          autoPlay
          loop
          muted
        />
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="text-center"
        >
          <h1 className="text-7xl text-center font-extrabold text-white mb-6 mt-40 px-4">
            EARTH DAY EVERYDAY
          </h1>
          <h2 className="md:text-2xl text-lg font-bold mt-4 mb-12 text-white">
            Let us together contribute to the cause
          </h2>
          <button
            onClick={scrollToCards}
            className="overflow-hidden relative w-60 p-2 h-12 bg-transparent text-green-100 border border-green-100 rounded-md text-xl font-bold cursor-pointer relative z-10 group"
          >
            SAVE EARTH!
            <span className="absolute w-64 h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
            <span className="absolute w-64 h-32 -top-8 -left-2 bg-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
            <span className="absolute w-64 h-32 -top-8 -left-2 bg-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
            <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-8 z-10">
              SAVE OURSELVES!
            </span>
          </button>
          {/* <button className='text-[#F9F3CC] rounded-md btn-lg font-extrabold p-4 hover:bg-green-300 hover:text-black'>SAVE EARTH, SAVE OURSELVES</button> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
