import Countdown from './Countdown';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import Quiz from './quiz/Quiz';

const Section = () => {
  return (
    <div className='bg-white md:px-8 px-4 py-24'>
      <div className='flex items-center justify-between bg-[#12486B] rounded-2xl shadow-2xl md:px-14 px-4 py-12 md:text-left text-center'>
        <div className='flex flex-col justify-center w-full'>
        <motion.div 
        variants={fadeIn("right", 0.1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        >
          <h1 className='md:text-5xl text-3xl font-extrabold text-white mb-8'>WHAT IS EARTH DAY?</h1>
          <h2 className='md:text-4xl text-2xl font-bold text-white mb-8'>Celebrate Earth Day Everyday!!</h2>
          <p className='text-[#F9F3CC] md:text-lg text-base md:font-semibold font-medium'>Our planet is an amazing place, but it needs our help to thrive! That’s why each year on April 22, more than a billion people celebrate Earth Day to protect the planet from things like pollution and deforestation. By taking part in activities like picking up litter and planting trees, we’re making our world a happier, healthier place to live.</p>
          <label htmlFor="my_modal_7" className="btn btn-success bg-[#27b927] text-white text-lg md:w-64 px-4 py-0 mt-8">Show Countdown</label>
          <input type="checkbox" id="my_modal_7" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box bg-blue-100">
              <Countdown />
              <img src='https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D' className='rounded-xl mt-4'  alt='' />
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
          </div>
        </motion.div>
        </div>
        <div className='md:block hidden'>
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
      <div className='px-64 py-12'>
      <div className="bg-gray-200 px-12 py-12 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Earth Conservation Quiz</h1>
        <Quiz />
      </div>
      </div>
    </div>
  )
}

export default Section;
