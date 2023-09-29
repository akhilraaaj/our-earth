import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import Donate from "./Donate";

const TopSectionContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(23, 86, 221, 0.15); /* 0.2 represents 20% opacity */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 13%;
  z-index: 99;
  @media screen and (max-width: 960px) {
    height: 1000px;
  }
`;

const Logo = styled.h1`
  margin: 0;
  color: #fff;
  font-weight: 800;
  font-size: 80px;
  @media screen and (max-width: 960px) {
    font-size: 50px;
    margin-top: 90px;
  }
`;

const Slogan = styled.h4`
  margin: 0;
  color: #fff;
  font-weight: 700;
  font-size: 30px;
  margin-top: 10px;
  @media screen and (max-width: 960px) {
    font-size: 25px;
  }
`;

const Paragraph = styled.p`
  margin: 0;
  margin-top: 3em;
  color: #fff;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  width: 30%;
  text-align: center;
  @media screen and (max-width: 960px) {
    margin-top: 30px;
    font-size: 14px;
    width: 80%;
  }
`;

const LandingButton = styled.button`
  outline: none;
  border: none;
  background-color: #27b927;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 2em;
  margin-top: 3em;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 350ms ease-in-out;
  @media screen and (max-width: 960px) {
    margin-top: 30px;
    font-size: 12px;
  }

  &:hover {
    background-color: transparent;
    border: 2px solid #27b927;
  }
`;


 function TopSection() {

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <TopSectionContainer>

        <Logo>OUR EARTH</Logo>
        <Slogan>Let’s save our Planet together.</Slogan>
        <Paragraph>
          You can help us save our world and have it go back to it's best
          state ever by spreading awareness and donating to help fix our only world and our beloved EARTH!
          Go Green and Save Green. Let the ice burgs to live. Globe is
          warming and will set to fire. Stop polluting, it will cost extra.
        </Paragraph>
        <Link to="/Landing">
          <LandingButton>JOIN US</LandingButton>
        </Link>
    </TopSectionContainer>
    </motion.div>
  );
 }
  
 export default TopSection;  
  



