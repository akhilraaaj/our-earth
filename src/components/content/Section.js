import React from 'react'
import styled from 'styled-components'
import './Section.css';
import { Link } from 'react-router-dom';

const Container = styled.div`
    background-color: #ffffff;
    padding-top: 20px;
    padding: 20px;
`;

const Heading = styled.div`
  font-size: 50px;
  font-weight: bolder;
  margin-bottom: 15px;
  color: #ffffff;
  @media screen and (max-width: 960px) {
    width: 100%;
    justify-content: center;
    text-align: center;
    margin-left: 15px;
  }
`;

const Paragraph = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #F9F3CC;
  @media screen and (max-width: 960px) {
    width: 100%;
    justify-content: center;
    text-align: center;
    margin-left: 15px;
  }
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  background-color: #27b927;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 20%;

  &:hover {
    background-color: #1f8f1f;
  }
  @media screen and (max-width: 960px) {
    width: 50%;
    justify-content: center;
    text-align: center;
    margin-left: 80px;
  }
`;

const Section = () => {
  return (
    <Container>
     <div className='section'>
        <div className='inner-section'>
            <div className='section-text'>
                <Heading>WHAT IS EARTH DAY?</Heading>
                <Heading>Celebrate Earth Day Everyday!!</Heading>
                <Paragraph>Our planet is an amazing place, but it needs our help to thrive! That’s why each year on April 22, more than a billion people celebrate Earth Day to protect the planet from things like pollution and deforestation. By taking part in activities like picking up litter and planting trees, we’re making our world a happier, healthier place to live.</Paragraph>
                <ActionButton><Link to='/' smooth={true} duration={500}>Join Us</Link></ActionButton>
            </div>
            <div className='section-image'>
                <img src="/images/globe.png" alt="" />
            </div>
        </div>
    </div>
    </Container>
  )
}

export default Section;