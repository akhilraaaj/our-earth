import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Autoplay } from 'swiper/modules';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function OceanStories() {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-16 md:py-24 px-4 md:px-4"
    >
      <motion.h1 
        variants={fadeInUp}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent mb-12 md:mb-16"
      >
        Ocean Conservation Success Stories
      </motion.h1>

      <div className='container mx-auto max-w-7xl'>
        <motion.div 
          variants={staggerContainer}
          className='flex xl:flex-row flex-col items-center sm:px-12 px-4 gap-8 md:gap-12 xl:gap-20'
        >
          <motion.div 
            variants={fadeInUp}
            className='flex flex-col xl:w-1/2 w-full text-start justify-center'
          >
            <motion.h4 
              variants={fadeInUp}
              className='md:text-5xl text-3xl font-extrabold text-blue-900 mb-8 leading-tight'
            >
              A Wave of Hope
            </motion.h4>
            <motion.p 
              variants={fadeInUp}
              className='text-emerald-700 md:text-lg text-base font-medium leading-relaxed'
            >
              The ocean, a vital lifeline for our planet, faces mounting threats from climate change, 
              pollution, and overfishing. Yet, amidst these challenges, there are inspiring success 
              stories that showcase the resilience of marine ecosystems and the effectiveness of 
              conservation efforts. These achievements highlight the power of science, innovation, 
              and collective action in restoring balance to our oceans. Below, we explore some of 
              the most impactful examples of ocean conservation in action.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="mt-8 hidden xl:block"
            >
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                Learn More About Conservation
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="xl:w-5/12 w-full"
          >
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="mySwiper h-[600px] w-full max-w-[500px] mx-auto"
            >
              {[
                {
                  title: "NORWAY: Using Science to Balance Competing Ocean Uses",
                  content: `Like many countries, Norway regulates its major sectors — including petroleum, the environment, transportation, fisheries, aquaculture and minerals — individually. Reflecting the interconnectivity between the environment and human activities, the country decided to manage ecosystems holistically instead of by individual sectors and activities.
                  
                  To do this, Norwegian policymakers turned to integrated ocean management. By adopting this holistic approach, Norway brought together research institutes and agencies from various industry sectors to make ocean management plans that rely on regular, comprehensive, demanding scientific monitoring.`,
                  gradient: "from-red-500 to-red-700"
                },
                {
                  title: "UNITED STATES: Managing Ocean Resources at Multiple Scales",
                  content: `To manage multiple layers of governance, the United States used integrated ocean management at the state, regional and national level. Six coastal states — Massachusetts, Rhode Island, Washington, Oregon, New York and Connecticut — have developed ocean plans for state waters, which extend 3 nautical miles offshore.
                  
                  Multi-state regions defined mostly by ecosystems have worked towards integrated ocean management within federal waters (from 3 to 200 nautical miles offshore), in response to and consistent with a presidential executive order.`,
                  gradient: "from-blue-500 to-blue-700"
                },
                {
                  title: "The Success Of Plastic Bag Bans",
                  content: `It's well known that single use plastic packaging poses one of the biggest threats to today's marine habitats. While the problem is still growing exponentially in scale, small steps have been taken in the last few years that appear to be having a positive impact.
                  
                  The introduction of plastic bag bans and taxes across the world have lead to a huge fall in use, with some countries reporting reductions as high as 90%. Places like Bangladesh and Rwanda were among the first to impose a ban, with Kenya, China and India recently following suit.`,
                  gradient: "from-green-500 to-green-700"
                },
                {
                  title: "Saving The Sea Turtles",
                  content: `Sea turtles are another marine species which have come under serious threat in recent years. Perhaps the biggest hazard, particularly to loggerhead turtles, is getting stuck in fishing nets, which prevent them from getting to the surface, eventually drowning them.
                  
                  To tackle this issue NOAA fisheries worked together with the shrimp trawling industry to create trawl nets with small escape hatches. Prior to the roll out, it was estimated 70-80% of turtles washed up on US beaches had died due to shrimp nets, however since they were installed by US shrimpers, strandings caused by the practice are down by at least 44%.`,
                  gradient: "from-orange-500 to-orange-700"
                },
                {
                  title: "CORAL TRIANGLE: Engaging Coastal Communities",
                  content: `For most coastal communities, marine protected areas are often seen as serving environmental interests rather than human ones, a perception that alienates local communities and ends up marginalizing conservation.
                  
                  To overcome this challenge, the Coral Triangle region designed well-managed engagement processes that consider the cultural, scientific, societal, economic and political contexts to achieve strong local stakeholder involvement.
                  
                  This action has enabled a greater connection between communities and the marine environment.`,
                  gradient: "from-lime-500 to-lime-700"
                }
              ].map((slide, index) => (
                <SwiperSlide 
                  key={index} 
                  className={`bg-gradient-to-br ${slide.gradient} rounded-2xl shadow-xl overflow-y-auto 
                    transform transition-transform duration-300 hover:scale-[1.02]`}
                >
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4 border-b border-white/20 pb-4">
                      {slide.title}
                    </h3>
                    <p className="text-white/90 text-lg leading-relaxed">
                      {slide.content}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        variants={fadeInUp}
        className="mt-12 text-center xl:hidden"
      >
        <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
          Learn More About Conservation
        </button>
      </motion.div>
    </motion.div>
  );
}