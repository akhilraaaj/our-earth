import React from 'react';
import styled from 'styled-components';
import './Deforestation.css';

const Container = styled.div`
  margin: 0;
  max-width: 100%;
  background-color: #D0E7D2;
  overflow-y: auto; 
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  max-height: 100vh;
  @media screen and (max-width: 960px) {  
    overflow-x: hidden;
  }
`;

const Heading = styled.div`
  font-size: 50px;
  font-weight: bolder;
  margin-bottom: 20px;
  color: #00704A;
  @media screen and (max-width: 960px) {
    font-size: 35px; 
    margin-top: 10px; 
    justify-content: center;
    text-align: center;
  }
`;

const Paragraph = styled.p`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #12486B;
  @media screen and (max-width: 960px) {
    font-size: 20px; 
  }
`;

const Deforestation = () => {
  return (
    <Container>
      <div className="deforestation-container">
      <div className="image">
          <img src="https://img.freepik.com/premium-photo/green-world-day-hd-8k-wallpaper-stock-photographic-image_915071-32386.jpg" className='image1' alt="Sample" />
        </div>
        <div className="text1">
          <Heading><Heading>GREEN ENVIRONMENT FOR LIFE</Heading></Heading>
          <Paragraph>Let us raise our voice to put an end to deforestation and save trees!!</Paragraph>
        </div>
      </div>
      <hr className="hr1" />
      <div className='forest-section'>
        <div className='forest-inner-section'>
            <div className='forest-section-text'>
                <Heading><Heading>Together We Can Plant More Trees</Heading></Heading>
                <div className='plant-p'>Planting a billion trees can help us curb the effects of climate change. It's a big number, but we know we can do it with your help. Planting a billion trees can help save the Earth from climate change and biodiversity loss. When we restore and conserve critical forests, we remove carbon and support biodiversity. A billion is a big number, but we know we can do it together. Help plant trees today!</div>
            </div>
            <div className='forest-section-image'>
                <img src="/images/green-image.png" className='forest-image' alt="" />
            </div>
        </div>
    </div>
      <div className='why'>
      <Heading><Heading>WHY ARE WE PLANTING A BILLION TREES?</Heading></Heading>
      <p className='why-p'>Trees provide so many benefits to our everyday lives. They filter clean air, provide fresh drinking water, help curb climate change, and create homes for thousands of species of plants and animals.
Planting a billion trees can help save the Earth from climate change and biodiversity loss. When we restore and conserve critical forests, we remove carbon and support biodiversity. A billion is a big number, but we know we can do it together. Help plant trees today!</p>
      </div>
      <Heading><Heading>OUR MISSION</Heading></Heading>
      <div className="circular-cards-container">
        <div className="circular-card">
          <p>Once upon a time, there was</p>
          <h2>6 Trillion Trees</h2>
        </div>
        <div className="circular-card">
          <p>Now only</p>
          <h2>3 Trillion Trees are left</h2>
        </div>
        <div className="circular-card">
          <p>But we can restore upto</p>
          <h2>1 Trillion Trees</h2>
        </div>
      </div>
      <div class="flex-container">
  <img src='https://www.trilliontreecampaign.org/tenants/planet/images/leaderboard/Trees.svg' alt='' />
  <div class="text-container">
    <h1 className='mission-heading'>What's to be done to achieve our target??</h1>
    <div className='plant-heading'>
    <Heading>Stop Talking!! <Heading>Start Planting!!</Heading></Heading>
    </div>
  </div>
  <img src='https://www.trilliontreecampaign.org/tenants/planet/images/leaderboard/Person.svg' alt='' />
</div>
<div className='footer'>
  <h1 className='footer-heading'>Plant Trees, Save The Earth!!!</h1>
</div>
    </Container>
  );
};

export default Deforestation;
