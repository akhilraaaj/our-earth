import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { Info } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import BeforeAfterSlider from "./ImageSlider";
import EarthConservationCTA from "./Donate";

const geoUrl = "/features.json";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(`/vulnerability.csv`).then((data) => {
      setData(data);
    });
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="w-full bg-red-50">
      <section className="pt-24 py-4 container mx-auto text-center flex flex-col items-center justify-center sm:justify-normal md:justify-center px-6 md:px-0 md:max-w-[1300px] md:w-11/12 xl:w-[1300px] 2xl:w-[1300px] max-w-[1300px] relative">
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
                <stop stopColor="#FFC0CB" offset="0%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
          </motion.svg>
        </div>
        <div className="px-12">
          <div className="w-full text-left md:text-center">
            <motion.h1
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="mb-8 max-w-4xl mt-20 text-4xl font-extrabold leading-none tracking-normal text-gray-800 md:text-6xl md:tracking-tight"
            >
              <span>Save the planet, </span>{" "}
              <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-red-500 to-yellow-500 lg:inline">
                one degree{" "}
              </span>
              <span> at a time.</span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-xl max-w-4xl font-bold text-gray-600"
            >
              The effects of human-caused global warming are happening now, are
              irreversible for people alive today, and will worsen as long as
              humans add greenhouse gases to the atmosphere.
            </motion.p>
          </div>
          <div className="w-full mt-12 text-center flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative z-0 w-full max-w-5xl mt-8"
            >
              <div className="relative overflow-hidden shadow-2xl mb-3">
                <div className="flex items-center flex-none px-4 bg-gray-200 border rounded-b-none h-11 rounded-xl">
                  <div className="flex space-x-1.5">
                    <div className="w-4 h-4  bg-red-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center justify-center">
                    <ComposableMap scale={200}>
                      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
                      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                      {data.length > 0 && (
                        <Geographies geography={geoUrl}>
                          {({ geographies }) =>
                            geographies.map((geo) => {
                              const d = data.find((s) => s.ISO3 === geo.id);
                              return (
                                <Geography
                                  key={geo.rsmKey}
                                  geography={geo}
                                  fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                                />
                              );
                            })
                          }
                        </Geographies>
                      )}
                    </ComposableMap>
                  </div>
                </div>
              </div>
              <span className="text-sm text-center font-medium text-red-400">
                From the map above, we can infer that the amount of C02
                consumptions has increased drastically over the years
              </span>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col max-w-7xl items-center justify-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mt-24"
          >
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="inline-block px-3 py-2 text-sm font-semibold text-white rounded-lg text-cn bg-blue-900 hover:cursor-pointer hover:bg-opacity-90">
                Take Action Today
              </div>
              <motion.h1
                className="text-5xl font-bold text-center mt-4 mb-8 text-green-800"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                The Impacts of Climate Change
              </motion.h1>
              <motion.p
                className="text-xl text-center text-green-700 font-semibold"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Climate change affects us all. Together, we can reduce its
                effects and create a sustainable future.
              </motion.p>
            </div>
          </motion.div>
          <div className="max-w-7xl mx-auto p-8 grid gap-8">
            {/* Natural Causes Card */}
            <motion.div
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8">
                  <motion.h4
                    className="text-3xl font-bold mt-4 mb-8 text-red-600 flex items-center gap-2"
                    {...fadeInUp}
                  >
                    <Info className="w-6 h-6" />
                    Natural Causes
                  </motion.h4>
                  <motion.ul
                    className="list-disc text-start list-inside text-gray-600 space-y-4"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.2,
                        },
                      },
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.li className="text-lg" variants={fadeInUp}>
                      <span className="text-xl text-red-800 font-bold">
                        Volcanic Eruptions:{" "}
                      </span>
                      Release gases and particulates that temporarily affect the
                      atmosphere.
                    </motion.li>
                    <motion.li className="text-lg" variants={fadeInUp}>
                      <span className="text-xl text-red-800 font-bold">
                        Solar Radiation Variability:{" "}
                      </span>
                      Changes in the sun's energy output can influence global
                      temperatures.
                    </motion.li>
                    <motion.li className="text-lg" variants={fadeInUp}>
                      <span className="text-xl text-red-800 font-bold">
                        Ocean Currents and Cycles:{" "}
                      </span>
                      Natural ocean cycles, like El Niño and La Niña,
                      temporarily shift global weather patterns, affecting
                      temperatures, rainfall, and regional climates.
                    </motion.li>
                  </motion.ul>
                </div>
                <motion.div
                  className="w-full relative overflow-hidden"
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="https://www.ifrc.org/sites/default/files/styles/article_press_release_featured_image/public/2021-08/p-IDN1088_jpg%201280x853.jpg?itok=TEoXltaR"
                    alt="Natural causes"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Human-Induced Causes Card */}
            <motion.div
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <motion.div
                  className="relative w-full order-2 lg:order-1"
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="https://static.wixstatic.com/media/ac4f57_5adf54ed0a6e4a7082e186c659b649a8~mv2.jpg/v1/fill/w_568,h_370,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ac4f57_5adf54ed0a6e4a7082e186c659b649a8~mv2.jpg"
                    alt="Human-induced causes"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="p-8 order-1 lg:order-2">
                  <motion.h4
                    className="text-3xl font-bold mt-4 mb-8 text-red-600 flex items-center gap-2"
                    {...fadeInUp}
                  >
                    <Info className="w-6 h-6" />
                    Human-Induced Causes
                  </motion.h4>
                  <motion.ul
                    className="list-disc list-inside text-start text-gray-600 space-y-4"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.2,
                        },
                      },
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.li className="text-lg" variants={fadeInUp}>
                      <span className="text-xl text-red-800 font-bold">
                        Greenhouse Gas Emissions:{" "}
                      </span>
                      Emissions from industries, agriculture, and transportation
                      increase concentrations of gases like CO₂, methane, and
                      nitrous oxide.
                    </motion.li>
                    <motion.li className="text-lg" variants={fadeInUp}>
                      <span className="text-xl text-red-800 font-bold">
                        Deforestation:{" "}
                      </span>
                      Reduces carbon storage capacity of forests, increasing CO₂
                      in the atmosphere.
                    </motion.li>
                    <motion.li className="text-lg" variants={fadeInUp}>
                      <span className="text-xl text-red-800 font-bold">
                        Industrialization:{" "}
                      </span>
                      Use of fossil fuels and chemicals in production processes
                      contributes to atmospheric pollution.
                    </motion.li>
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="flex items-center justify-center md:px-8 px-2 py-24">
          <div className="flex md:flex-row max-w-7xl flex-col items-center justify-between gap-5 bg-[#12486B] rounded-2xl shadow-2xl md:px-12 px-2 py-12 md:text-left text-center">
            <div className="flex flex-col w-3/4">
              <h1 className="md:text-4xl text-3xl font-extrabold text-white mb-8">
                Every increase in global warming matters !!
              </h1>
              <p className="text-[#F9F3CC] md:text-lg text-base md:font-semibold font-medium mt-2">
                Climate change can affect our health, ability to grow food,
                housing, safety and work. Some of us are already more vulnerable
                to climate impacts, such as people living in small island
                nations and other developing countries. In the future, the
                number of people displaced by weather-related events is expected
                to rise. Therefore, it is high time we take a step forward to
                tackle, reduce or store C02 emissions to save our planet!!
              </p>
            </div>
            <div className="flex flex-col">
              <div
                className="relative overflow-hidden max-w-full w-full md:mt-0 mt-6"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  title="abc"
                  src="https://www.youtube.com/embed/jAa58N4Jlos?si=pqdGmP-qZ28J4egi"
                  frameBorder="0"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
              <span className="text-base text-center mt-2 font-bold text-white">
                A short film regarding climate change and its drastic effects
                (cc: DJI captures)
              </span>
            </div>
          </div>
        </div>
        <BeforeAfterSlider />
        <div className="w-full py-20">
          <EarthConservationCTA
            mainBg="bg-[#821131]"
            bgCurve1="bg-[#A02334]"
            bgCurve2="bg-[#C7253E]"
          />
        </div>
      </section>

      <div className="bg-[#E72929]">
        <Footer bgColor="#E72929" />
      </div>
    </div>
  );
};

export default MapChart;
