import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { Earth } from "../components/earth";

function Home({ user }) {
  if (user) {
    return <Navigate to="/home" />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { y: 0, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <div className="w-full h-full bg-[#01040c]">
        <Canvas>
          <Suspense fallback={null}>
            <Earth id="object" />
          </Suspense>
        </Canvas>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 flex flex-col items-center justify-center top-0 left-0 w-full"
          style={{ backgroundColor: "rgba(23, 86, 221, 0.15)", zIndex: 99 }}
        >
          <div className="flex flex-col text-center items-center justify-center">
            <motion.h1
              variants={itemVariants}
              className="font-extrabold text-transparent bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 bg-clip-text text-center flex justify-center items-center pt-8 px-2 md:text-7xl text-5xl"
            >
              OUR EARTH
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="md:text-2xl text-xl font-extrabold text-white mt-8 px-2"
            >
              Let’s save our Planet together.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-white text-base font-semibold text-center mt-6 max-w-lg px-6 leading-7"
            >
              You can help us save our world and have it go back to its best
              state ever by spreading awareness and donating to help fix our
              only world and our beloved EARTH! Go Green and Save Green. Let the
              icebergs live. The globe is warming and will set to fire. Stop
              polluting, it will cost extra.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-6 w-fit">
              <Link to="/login" className="w-full">
                <button className="bg-green-600 hover:bg-[#00704A] w-full text-white text-center flex items-center justify-center gap-2 font-extrabold rounded-xl px-16 py-2.5 group">
                  JOIN US
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Home;
