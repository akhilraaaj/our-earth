import React from "react";
import { motion } from "framer-motion";
import { Leaf, Globe, ArrowRight, Droplet, TreePine } from "lucide-react";

const EarthConservationCTA = ({
  mainBg = "bg-[#12372A]",
  bgCurve1 = "bg-[#16423C]",
  bgCurve2 = "bg-[#145046]",
}) => {
  return (
    <div className="relative flex flex-col w-full items-center justify-center text-center mt-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col w-full py-12 justify-center text-center items-center relative ${mainBg} rounded-3xl overflow-hidden shadow-xl`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-green-900/10 to-black/5" />

        {/* Floating Icons with Motion */}
        <motion.div
          animate={{
            y: [0, -10, 10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute top-10 left-10 z-10 text-green-300/50"
        >
          <Leaf size={40} />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, -15, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute top-20 right-20 z-10 text-green-200/50"
        >
          <Globe size={48} />
        </motion.div>

        {/* Additional Decorative Icons */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute bottom-10 left-10 z-10 text-green-200/50"
        >
          <Droplet size={32} />
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute bottom-20 right-10 z-10 text-green-200/50"
        >
          <TreePine size={36} />
        </motion.div>

        {/* Pulsing Globe */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="p-3 my-4 bg-green-800/20 rounded-full z-50 relative"
        >
          <Globe className="w-10 h-10 text-green-300" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 px-6">
          <h4 className="mt-2 mb-2 sm:mb-6 text-green-300 font-bold text-xl tracking-wider">
            PROTECT OUR PLANET
          </h4>

          <h2 className="md:text-5xl text-2xl font-extrabold text-white text-transparent mt-4 mb-4">
            ACT NOW FOR TOMORROW
          </h2>

          <p className="mb-0 mt-12 max-w-3xl mx-auto text-green-100 font-semibold text-lg leading-relaxed">
            Your contribution today helps protect our planet's future. Every
            dollar donated goes towards{" "}
            <span className="font-bold text-green-300">
              {" "}
              vital conservation projects{" "}
            </span>
            that preserve Earth's biodiversity and combat climate change.
          </p>

          <div className="flex md:flex-row mt-12 mb-20 flex-col items-center justify-center sm:gap-12 gap-8">
            <div className="text-center flex items-center justify-center sm:flex-row flex-col gap-4 w-full max-w-2xl">
              <motion.a
                href="https://protect.worldwildlife.org/page/52716/action/1?en_og_source=Web_Donation&ea.tracking.id=Web_Homepage&supporter.appealCode=AWE2402OQ20233A06079RX&_gl=1*1m2fz5p*_gcl_au*ODgwODM0MzQzLjE3MzE1MjkyODI.*_ga*MzQyODAzNTk2LjE3MzE1MjkyODM.*_ga_FK6M9RK84Z*MTczMjM2MTUwMi40LjEuMTczMjM2MTUzNy4wLjAuNTkzMDMzMzc3"
                className="inline-block w-full group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
              >
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 px-6 w-full h-[46px] bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-700/25"
                >
                  <span className="font-semibold">Donate Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.a>
            </div>
            <div className="text-center flex items-center justify-center sm:flex-row flex-col gap-4 w-full max-w-2xl">
              <motion.a
                href="/home/blog"
                className="inline-block w-full group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 px-6 w-full h-[46px] bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-700/25"
                >
                  <span className="font-semibold">Learn More</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Decorative Curves */}
        <div
          className={`w-[1400px] h-[900px] ${bgCurve1} rounded-full rounded-bl-[80%] rounded-br-[80%] absolute -bottom-[75%]`}
        />
        <div
          className={`w-[1000px] h-[880px] ${bgCurve2} rounded-full rounded-bl-[80%] rounded-br-[80%] absolute -bottom-[100%]`}
        />
      </motion.div>
    </div>
  );
};

export default EarthConservationCTA;
