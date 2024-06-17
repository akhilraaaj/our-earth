import React from 'react';
import { motion } from 'framer-motion';
import Home from './content/Home';
import Card from './content/Cards';
import Footer from './content/Footer';
import Section  from './content/Section';
import Donate from './content/Donate';

const Landing = () => {
  return (
    <div className='w-full h-screen' style={{ overflowY: 'auto'}}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Home />
        <Card />
        <Section />
        {/* <Donate /> */}
        <Footer bgColor="#00704A" />
      </motion.div>
     </div>
  );
};

export default Landing;
