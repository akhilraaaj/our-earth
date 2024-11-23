import Countdown from "./Countdown";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import Quiz from "./quiz/Quiz";
import Testimonials from './Testimonials';
import SectionCardGrid from "./SectionCardGrid";
import { Biome } from "./Biome";
import DonateEarthCTA from "./DonateCTA";


const Section = () => {
  return (
    <div className="flex items-center justify-center bg-white w-full ">
      <div className="py-32 container mx-auto text-center flex flex-col items-center justify-center sm:justify-normal md:justify-center px-6 md:px-0 md:max-w-[1300px] md:w-11/12 xl:w-[1300px] 2xl:w-[1300px] max-w-[1300px] relative">
        <div className="flex items-center justify-between bg-[#12486B] rounded-2xl shadow-2xl p-12 md:text-left text-center">
          <div className="flex flex-col justify-center w-full px-8">
            <motion.div
              variants={fadeIn("right", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <h1 className="md:text-5xl text-3xl font-extrabold text-white mb-8">
                WHAT IS EARTH DAY?
              </h1>
              <h2 className="md:text-4xl text-2xl font-bold text-white mb-8">
                Celebrate Earth Day Everyday!!
              </h2>
              <p className="text-[#F9F3CC] md:text-lg text-base md:font-semibold font-medium w-[90%]">
                Our planet is an amazing place, but it needs our help to thrive!
                That’s why each year on April 22, more than a billion people
                celebrate Earth Day to protect the planet from things like
                pollution and deforestation. By taking part in activities like
                picking up litter and planting trees, we’re making our world a
                happier, healthier place to live.
              </p>
              <label
                htmlFor="my_modal_7"
                className="btn btn-success bg-[#27b927] text-white text-lg md:w-64 px-4 py-0 mt-8"
              >
                Show Countdown
              </label>
              <input type="checkbox" id="my_modal_7" className="modal-toggle" />
              <div className="modal" role="dialog">
                <div className="modal-box bg-blue-100">
                  <Countdown />
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D"
                    className="rounded-xl mt-4"
                    alt=""
                  />
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">
                  Close
                </label>
              </div>
            </motion.div>
          </div>
          <div className="md:block hidden">
            <motion.div
              variants={fadeIn("left", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <img src="/images/globe.png" alt="" />
            </motion.div>
          </div>
        </div>
        <Quiz />
      <SectionCardGrid />
        <Biome />
    <Testimonials />
    <DonateEarthCTA />
      </div>
    </div>
  );
};

export default Section;