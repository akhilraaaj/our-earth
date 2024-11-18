import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import { Link } from 'react-router-dom';

const CustomButton = () => {
  return (
    <button className="group relative w-full inline-flex text-lg gap-2 h-12 items-center justify-center rounded-md bg-[#00704A] px-6 text-white font-bold"><span>See More</span><div className="ml-1 -rotate-45 transition-all duration-200 group-hover:rotate-0"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 font-bold"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></div></button>
  );
};

export { CustomButton };


const Cards = () =>{
  return (
    <div  className='flex flex-col items-center justify-center bg-white px-12' name="card">
    <div className=' text-center flex flex-col items-center justify-center sm:justify-normal md:justify-center px-6 md:px-0 md:max-w-[1300px] xl:w-[1300px] 2xl:w-[1300px] max-w-[1300px]'>
      <div className='flex flex-col justify-center items-center  text-center py-4 mt-20'>
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
              <Link to='/home/deforestation' className='flex w-full items-center justify-center'><CustomButton /></Link> 
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
              src="https://images.unsplash.com/photo-1461503312594-019be44dd599?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2NlYW4lMjB3YXZlfGVufDB8fDB8fHww"
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
