import { CardItem } from './CardItem';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import { Link } from 'react-router-dom';

const CustomButton = () => {
  return (
    <button
  class="relative btn btn-wide btn-xl flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
>
  <span
    class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
  >
    <span
      class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-gray-300"
    ></span>
  </span>
  <span
    class="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
  >
    <span
      class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-gray-300"
    ></span>
  </span>
  <span
    class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
  ></span>
  <span
    class="relative w-full text-center font-bold text-base text-white transition-colors duration-200 ease-in-out group-hover:text-white"
    >Learn More</span>
</button>

  );
};

export { CustomButton };


const Cards = () =>{
  return (
    <div className='flex flex-col items-center justify-center bg-white px-12' name="card">
    <div className='mx-auto text-center flex flex-col items-center justify-center sm:justify-normal md:justify-center px-6 md:px-0 md:max-w-[1300px] xl:w-[1300px] 2xl:w-[1300px] max-w-[1300px]'>
      <div className='flex flex-col justify-center items-center mx-auto text-center py-4 mt-20'>
        <motion.div 
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
        >
          <h1 className="text-[#00704A] font-extrabold mb-8 md:text-5xl text-3xl">The Power of Collective Action</h1>
          <p className="md:text-xl text-lg font-bold text-[#12486B] mb-12">Now, more than ever, we must step up our efforts to combat climate change, protect biodiversity, and preserve our ecosystems. Join us today and fight for a sustainable and thriving future.</p>
        </motion.div>
      </div>
      <div className="grid xl:grid-cols-3 min-[1160px]:grid-cols-2 gap-10 items-center justify-center px-4">
      <motion.div 
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
        >
        {/* <CardItem
          imgSrc="https://cff2.earth.com/uploads/2021/02/08003340/shutterstock_17229105492-960x640.jpg"
          imgAlt="Card Image 1"
          title="CLIMATE CHANGE"
          description="Warmer temperatures over time are changing weather patterns and disrupting the usual balance of nature."
          buttonText="Learn More"
          link="Climate"
        /> */}
        <div className="card bg-base-100 w-96 shadow-xl" style={{ boxShadow: '0px 10px 8px #999' }}>
          <figure>
            <img
              src="https://cff2.earth.com/uploads/2021/02/08003340/shutterstock_17229105492-960x640.jpg"
              alt="Climate Change" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-xl text-[#12486B] font-extrabold mb-4">CLIMATE CHANGE</h2>
            <p className='text-[#00704A] text-start text-lg font-bold'>Warmer temperatures over time are changing weather patterns and disrupting the usual balance of nature.</p>
            <div className="card-actions justify-end">
              <Link to='/home/climate' className='flex w-full items-center justify-center'><CustomButton /></Link>
            </div>
          </div>
        </div>
        </motion.div>
        <motion.div 
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
        >
        {/* <CardItem
          imgSrc="https://c1.wallpaperflare.com/preview/766/1023/725/tree-forest-nature-air-oxygen-landscape.jpg"
          imgAlt="Card Image 1"
          title="PLANT TREES"
          description="Trees play a vital role in our lives as well as the biodiversity. Let us plant trees and put an end to deforestation."
          buttonText="Learn More"
          link="Deforestation"
        /> */}
        <div className="card bg-base-100 w-96 shadow-xl" style={{ boxShadow: '0px 10px 8px #999' }}>
          <figure>
            <img
              src="https://c1.wallpaperflare.com/preview/766/1023/725/tree-forest-nature-air-oxygen-landscape.jpg"
              alt="Plant Trees" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-xl text-[#12486B] font-extrabold mb-4">PLANT TREES</h2>
            <p className='text-[#00704A] text-start text-lg font-bold'>Trees play a vital role in our lives as well as the biodiversity. Let us plant trees and put an end to deforestation.</p>
            <div className="card-actions justify-end">
              <Link to='home/deforestation' className='flex w-full items-center justify-center'><CustomButton /></Link> 
            </div>
          </div>
        </div>
        </motion.div>
        <motion.div 
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
        >
        {/* <CardItem
          imgSrc="https://www.surfertoday.com/images/jamp/page/ocean-breaking-wave.jpg"
          imgAlt="Card Image 1"
          title="SAVE THE OCEAN"
          description="A healthy ocean regulates climate and reduce climate change impacts. We must protect oceans for our survival."
          buttonText="Learn More"
          link="Ocean"
        /> */}
        <div className="card bg-base-100 w-96 shadow-xl" style={{ boxShadow: '0px 10px 8px #999' }}>
          <figure>
            <img
              src="https://www.surfertoday.com/images/jamp/page/ocean-breaking-wave.jpg"
              alt="Save the Ocean" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-xl text-[#12486B] font-extrabold mb-4">SAVE THE OCEAN</h2>
            <p className='text-[#00704A] text-start text-lg font-bold'>A healthy ocean regulates climate and reduce climate change impacts. We must protect oceans for our survival.</p>
            <div className="card-actions justify-end">
              <Link to='/home/ocean' className='flex w-full items-center justify-center'><CustomButton /></Link>
            </div>
          </div>
        </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
}

export default Cards;
