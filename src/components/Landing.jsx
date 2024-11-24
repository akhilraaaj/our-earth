import React from 'react';
import { motion } from 'framer-motion';
import Home from './content/Hero';
import Card from './content/Cards';
import Footer from './Footer';
import Section  from './content/Section';

const Landing = () => {
  return (
    <div className='w-full h-screen'>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Home />
        <div id="cards-section">
          <Card />
        </div>
        <Section />
        <Footer bgColor="#00704A" />
      </motion.div>
     </div>
  );
};

export default Landing;
