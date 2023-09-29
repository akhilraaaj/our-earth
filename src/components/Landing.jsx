import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Home from './content/Home';
import Card from './content/Cards';
import Navbar from './content/Navbar';
import Footer from './content/Footer';
import Section  from './content/Section';
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto; 
  @media screen and (max-width: 960px) {  
    overflow-x: hidden;
  }
`;

const Landing = () => {
  return (
    <Wrapper>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Navbar />
        <Home />
        <Card />
        <Section />
        <Footer />
      </motion.div>
     </Wrapper>
  );
};

export default Landing;
