import React from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";
import CoralReef3D from "./OceanSpecies";
import OceanViewer from "./MarineSuccessStories";
import EarthConservationCTA from "./Donate";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Ocean = () => {
  const scrollToCards = () => {
    const element = document.getElementById("oceans");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className=" bg-blue-50 overflow-x-hidden w-full">
      <section className="relative flex flex-col items-center justify-center w-full">
        <div
          className="absolute left-0 transform  top-0 pointer-events-none"
          aria-hidden="true"
        >
          <motion.svg
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            width="1360"
            height="578"
            viewBox="0 0 1360 578"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="illustration-01"
              >
                <stop stopColor="#C6E7FF" offset="0%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
          </motion.svg>
        </div>

        <div className="container px-4 sm:px-6 lg:px-0 max-w-7xl">
          <div className="flex flex-col items-center justify-center pt-20 lg:pt-32 pb-12 lg:pb-20">
            <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
              <motion.h1
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold mt-16 mb-6 lg:mb-8"
              >
                Protect the{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 animate-gradient">
                  Oceans
                </span>
              </motion.h1>

              <motion.p
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl text-blue-900 font-bold mb-8 lg:mb-12 leading-relaxed max-w-3xl mx-auto"
              >
                For centuries, people have assumed that our vast ocean was
                limitless and immune to human impacts. It's only recently that
                scientists have come to understand the devastating effects we've
                already had on the seas.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <button
                  onClick={scrollToCards}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                >
                  Learn More
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-16 lg:mt-24 max-w-3xl rounded-3xl"
            >
              <img
                src="https://wallpapers.com/images/hd/exquisite-4k-underwater-marine-life-gba33q70g1917hns.jpg"
                alt=""
                className="rounded-3xl"
              />
            </motion.div>
            <div id="oceans">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mt-24"
              >
                <div className="flex flex-col items-center justify-center mb-4">
                  <div className="inline-block px-3 py-2 text-sm font-semibold text-white rounded-lg text-cn bg-blue-900 hover:cursor-pointer hover:bg-opacity-90">
                    Endangered Oceans
                  </div>
                  <motion.h1
                    className="text-5xl font-bold text-center mt-4 mb-8 text-green-800"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    Marine Life in Crisis
                  </motion.h1>
                  <motion.p
                    className="text-2xl text-center text-green-700 font-semibold"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    A Look at Species on the Brink of Extinction
                  </motion.p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-16 lg:mt-24 w-full"
            >
              <CoralReef3D />
            </motion.div>
          </div>
          <div className="flex items-center justify-center md:px-8 px-2 py-24">
            <div className="flex md:flex-row max-w-7xl flex-col items-center justify-between gap-5 bg-[#12486B] rounded-2xl shadow-2xl md:px-12 px-2 py-12 md:text-left text-center">
              <div className="flex flex-col w-3/4">
                <h1 className="md:text-4xl text-3xl font-extrabold text-white mb-8">
                  By 2050, there will be more plastic than fish in the ocean
                </h1>
                <p className="text-[#F9F3CC] md:text-lg text-base md:font-semibold font-medium mt-2">
                  Plastic waste makes up 80% of all marine pollution and around
                  8 to 10 million metric tons of plastic end up in the ocean
                  each year and they pose a huge threat not only to the ocean
                  life but also the whole world. Therefore, it is high time we
                  take steps to tackle the issue and make our planet
                  sustainable.
                </p>
              </div>
              <div className="flex flex-col">
                <img
                  src="/images/ocean-earth.png"
                  className="w-[500px] h-[450px]"
                  alt=""
                />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-20"
          >
            <OceanViewer />
          </motion.div>
          <div className="mb-28 w-full">
            <EarthConservationCTA
              mainBg="bg-[rgba(28,50,91,1)] border border-blue-900"
              bgCurve1="bg-[#0A3981]"
              bgCurve2="bg-[#1F509A]"
            />
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="bg-[#4793AF] w-full"
      >
        <Footer bgColor="#4793AF" />
      </motion.div>
    </div>
  );
};

export default Ocean;
