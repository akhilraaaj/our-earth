import { CardItem } from './CardItem';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Cards = () =>{
  return (
    <div className='flex flex-col items-center justify-center bg-white' name="card">
      <div className='flex flex-col justify-center items-center mx-auto text-center md:px-16 px-6 py-4 md:w-3/4 mt-20'>
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
      <div className="grid xl:grid-cols-3 min-[1160px]:grid-cols-2  gap-10 items-center justify-center px-4">
      <motion.div 
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
        >
        <CardItem
          imgSrc="https://cff2.earth.com/uploads/2021/02/08003340/shutterstock_17229105492-960x640.jpg"
          imgAlt="Card Image 1"
          title="CLIMATE CHANGE"
          description="Warmer temperatures over time are changing weather patterns and disrupting the usual balance of nature."
          buttonText="Learn More"
          link="Climate"
        />
        </motion.div>
        <motion.div 
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
        >
        <CardItem
          imgSrc="https://c1.wallpaperflare.com/preview/766/1023/725/tree-forest-nature-air-oxygen-landscape.jpg"
          imgAlt="Card Image 1"
          title="PLANT TREES"
          description="Trees play a vital role in our lives as well as the biodiversity. Let us plant trees and put an end to deforestation."
          buttonText="Learn More"
          link="Deforestation"
        />
        </motion.div>
        <motion.div 
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
        >
        <CardItem
          imgSrc="https://www.surfertoday.com/images/jamp/page/ocean-breaking-wave.jpg"
          imgAlt="Card Image 1"
          title="SAVE THE OCEAN"
          description="A healthy ocean regulates climate and reduce climate change impacts. We must protect oceans for our survival."
          buttonText="Learn More"
          link="Ocean"
        />
        </motion.div>
      </div>
    </div>
  );
}

export default Cards;
