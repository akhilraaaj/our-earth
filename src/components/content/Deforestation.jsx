import React from "react";
import Footer from "./Footer";
import NasaWildfireMap from "../Wildfire";
import { motion } from "framer-motion";
import greenMap from "../../assets/green-map.png";
import DetailedCarbonCalculator from "./CarbonFootprint";
import DonateEarthCTA from "./Donate";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Deforestation = () => {
  const downloadPDF = () => {
    const pdfUrl = "/trees.pdf";

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute("download", "trees.pdf");
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-screen overflow-y-auto bg-green-50">
      <div className="py-4 container mx-auto text-center flex flex-col items-center justify-center sm:justify-normal md:justify-center px-6 md:px-0 md:max-w-[1300px] md:w-11/12 xl:w-[1300px] 2xl:w-[1300px] max-w-[1300px] relative">
        <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-transparent to-transparent pb-12 pt-20 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
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
                <stop stopColor="#9EDF9C" offset="0%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
          </motion.svg>
        </div>
          <div className="relative">
            <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
              <svg
                className="h-[60rem] w-[100rem] flex-none stroke-green-600 opacity-20"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                    width="200"
                    height="200"
                    x="50%"
                    y="50%"
                    patternUnits="userSpaceOnUse"
                    patternTransform="translate(-100 0)"
                  >
                    <path d="M.5 200V.5H200" fill="none"></path>
                  </pattern>
                </defs>
                <svg x="50%" y="50%" className="overflow-visible fill-green-50">
                  <path
                    d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                    strokeWidth="0"
                  ></path>
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth="0"
                  fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
                ></rect>
              </svg>
            </div>
          </div>
          <div className="relative px-6 flex flex-col items-center justify-center lg:px-8">
            <div className=" max-w-2xl text-center">
              <motion.h1
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="text-6xl font-bold text-gray-900 leading-[65px]"
              >
                Go Green:
                <span className="text-green-600 ml-2">
                  Green Environment for Life
                </span>
              </motion.h1>
              <motion.p
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="mt-8 text-xl font-semibold leading-8 text-gray-600"
              >
                Let us raise our voice to put an end to deforestation and save
                trees!!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="indicator mt-10"
              >
                <span className="indicator-item badge badge-primary">
                  cc: Earthdaynetwork
                </span>
                <button
                  onClick={downloadPDF}
                  className="flex btn btn-success text-white font-bold"
                >
                  Download PDF
                  <i className="fa fa-download" aria-hidden="true"></i>
                </button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative  mt-10 max-w-3xl max-h-xl"
            >
              <img
                className="w-full rounded-2xl border border-green-200 shadow-2xl"
                src="https://c4.wallpaperflare.com/wallpaper/428/376/851/forest-4k-desktop-background-hd-wallpaper-preview.jpg"
                alt=""
              />
            </motion.div>
          </div>
          <div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mt-24"
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="inline-block px-3 py-2 text-sm font-semibold text-white rounded-lg text-cn bg-blue-900 hover:cursor-pointer hover:bg-opacity-90">
                  Why Trees?
                </div>
                <motion.h1
                  className="text-5xl font-bold text-center mt-4 mb-8 text-green-800"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  The Power of Planting Trees
                </motion.h1>
                <motion.p
                  className="text-2xl text-center text-green-700 font-semibold"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Discover how trees combat climate change and support a
                  healthier planet.
                </motion.p>
              </div>
            </motion.div>
            <div className="flex md:flex-row flex-col items-center justify-between md:px-8 px-4 pt-4 pb-12 md:text-left text-center">
              <motion.div 
              variants={fadeIn("right", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="flex flex-col justify-center w-full">
                <h1 className="md:text-5xl text-3xl font-extrabold text-green-900 mb-8">
                  Why Plant Trees?
                </h1>
                {/* <h2 className='md:text-4xl text-2xl font-bold text-white'>Celebrate Earth Day Everyday!!</h2> */}
                <p className="text-[#2b881c] md:text-lg text-base md:font-semibold font-medium">
                  Trees provide so many benefits to our everyday lives. They
                  filter clean air, provide fresh drinking water, help curb
                  climate change, and create homes for thousands of species of
                  plants and animals.{" "}
                  <span className="bg-yellow-200">
                    Trees help clean the air we breathe, filter the water we
                    drink, and provide habitat to over 80% of the world's
                    terrestrial biodiversity.
                  </span>
                  Forests provide jobs to over 1.6 billion people, absorb
                  harmful carbon from the atmosphere, and are key ingredients in
                  25% of all medicines. Have you ever taken an Aspirin? It comes
                  from the bark of a tree!
                </p>
              </motion.div>
              <img src={greenMap} className="w-full" alt="" />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="md:w-[70%] w-fit">
              <NasaWildfireMap />
            </div>
          </div>
        </section>

        <div className="py-24">
          <div className="flex md:flex-row flex-col items-center justify-between bg-[#186F65] rounded-2xl shadow-2xl md:px-8 px-4 py-12 md:text-left gap-8 text-center">
            <div className="flex flex-col justify-center w-full">
              <h1 className="md:text-4xl text-3xl font-extrabold text-white mb-8">
                The best time to plant a tree was twenty years ago. The second
                best time is now.
              </h1>
              {/* <h2 className='md:text-4xl text-2xl font-bold text-white'>Celebrate Earth Day Everyday!!</h2> */}
              <p className="text-[#F9F3CC] md:text-lg text-base md:font-semibold font-medium">
                Planting a billion trees can help us curb the effects of climate
                change. It's a big number, but we know we can do it with your
                help. Planting a billion trees can help save the Earth from
                climate change and biodiversity loss. When we restore and
                conserve critical forests, we remove carbon and support
                biodiversity. A billion is a big number, but we know we can do
                it together. Help plant trees today!.
              </p>
            </div>
            <div className="w-full h-full">
              <div
                className="relative overflow-hidden max-w-full w-full md:mt-0 mt-6"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  title="abc"
                  src="https://www.youtube.com/embed/3hxE7Af98AI?si=mnV02SRgrgmS56Dd"
                  frameBorder="0"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                ></iframe>
              </div>
            </div>
          </div>
          <DetailedCarbonCalculator />
        </div>
        <div className="mb-24 w-full">
          <DonateEarthCTA />
        </div>
      </div>

      <Footer bgColor="#00704A" />
    </div>
  );
};

export default Deforestation;
