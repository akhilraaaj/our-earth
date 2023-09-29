import React from 'react';
import './Home.css';
import styled from "styled-components";

const Home = () => {

  const Logo = styled.h1`
   margin: 20px 0 0; /* Added margin-top */
  color: #fff;
  font-weight: 600;
  font-size: 80px;
  font-style: Helvetica, Sans-serif;
  font-weight: bolder;
  justify-content: center;
  @media (max-width: 768px) {
    font-size: 50px;
  }
`;

const Heading = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffffff;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Action = styled.div`
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  color: #F9F3CC;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  @media (max-width: 768px) {
    font-size: 15px;
  }

  &:hover {
    background-color: #1f8f1f;
  }
`;

  return (
    <div className='hero-container'>
      <video src='/videos/video4.mp4' autoPlay loop muted />
      <Logo><Logo>EARTH DAY EVERYDAY</Logo></Logo>
      <Heading><Heading>Let us together contribute to the cause</Heading></Heading>
          <Action>SAVE EARTH, SAVE OURSELVES</Action>
    </div>
  );
}

export default Home;