import React from 'react';
import styled from 'styled-components';
import './Ocean.css';

const Container = styled.div`
  margin: 0;
  max-width: 100%;
  background-color: #9EDDFF;
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
  color: #12486B; 
  @media screen and (max-width: 960px) { 
    font-size: 38px;
  }
`;

const HeadingT = styled.div`
  font-size: 60px;
  font-weight: bolder;
  margin-bottom: 20px;
  color: #ffffff; 
  @media screen and (max-width: 960px) { 
    font-size: 40px;
    margin-top: -120px;
  }
`;

const Paragraph = styled.p`
  font-size: 20px;
  font-weight: bolder;
  margin-bottom: 60px;
  color: #00704A;
  width: 70%;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
  @media screen and (max-width: 960px) { 
    font-size: 20px;
  }
`;

const ParagraphT = styled.p`
  font-size: 20px;
  font-weight: bolder;
  margin-bottom: 60px;
  color: #F0DE36;
  width: 70%;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
  @media screen and (max-width: 960px) { 
    font-size: 20px;
    width: 100%;

  }
`;

const Ocean = () => {
  return (
    <Container>
      <div className="ocean-container">
        <div className="ocean-text1">
          <Heading><Heading>PROTECT THE OCEANS</Heading></Heading>
          <Paragraph>For centuries, people have assumed that our vast ocean was limitless and immune to human impacts. It’s only recently that scientists have come to understand the devastating effects we’ve already had on the seas.</Paragraph>
        </div>
        <div className="image">
          <img src="https://p4.wallpaperbetter.com/wallpaper/55/738/503/sea-fish-the-ocean-turtle-under-water-hd-wallpaper-preview.jpg" className='ocean-image1' alt="Sample" />
        </div>
      </div>
      <hr className="hr1" />
      <div className='ocean-heading'>
      <Heading><Heading>THE CONSEQUENCES ARE ALREADY BECOMING CLEAR.</Heading></Heading>
      <Paragraph>If we don’t protect marine life from destructive human activities now, the oceans face a ‘sixth mass extinction’; an extinction caused by humans.</Paragraph>
      </div>
      <div className="ocean-circular-cards-container">
        <div className="ocean-circular-card">
          <h2 className='card-h2'>96%</h2>
          <p className='card-p'>of our oceans are unprotected</p>
        </div>
        <div className="ocean-circular-card">
        <h2 className='card-h2'>90%</h2>
          <p className='card-p'>of large predator fish has been killed</p>
        </div>
        <div className="ocean-circular-card">
        <h2 className='card-h2'>88%</h2>
          <p className='card-p'>of the sea's surface is polluted by plastic waste</p>
        </div>
        <div className="ocean-circular-card">
        <h2 className='card-h2'>50%</h2>
          <p className='card-p'>reduction in marine life</p>
        </div>
        <div className="ocean-circular-card">
        <h2 className='card-h2'>25%</h2>
          <p className='card-p'>of coral reefs have been destroyed</p>
        </div>
      </div>
      <hr style={{ width: '50%', borderTop: "10px dotted #12486B", marginBottom: "50px", marginTop: "80px "}} />
      <div className='ocean-why'>
      <HeadingT><HeadingT>Combat the Ocean’s Biggest Threat</HeadingT></HeadingT>
      <ParagraphT><ParagraphT>Climate change is the single biggest challenge the ocean faces. Fortunately, climate change is a problem with a known solution: significantly reducing greenhouse gas emissions. We need you to urge our leaders to pass policies to combat climate change before it’s too late.</ParagraphT></ParagraphT>
      </div>
      <div className='ocean-section'>
        <div className='ocean-inner-section'>
            <div className='ocean-section-text'>
                <Heading><Heading>By 2050, there will be more plastic than fish in the ocean</Heading></Heading>
                <div className='ocean-why-p'>Plastic waste makes up 80% of all marine pollution and around 8 to 10 million metric tons of plastic end up in the ocean each year and they pose a huge threat not only to the ocean life but also the whole world. Therefore, it is high time we take steps to tackle the issue and make our planet sustainable.</div>
            </div>
            <div className='ocean-section-image'>
                <img src="/images/ocean-earth.png" className='ocean-section-image1' alt="" />
            </div>
        </div>
    </div>
    <div className='ocean-footer'>
    <div className='ocean-plant-heading'>
    <h1><h1>About 70% of the Earth’s surface is covered with water and so our planet is also referred to as the Blue Planet</h1></h1>
    <p className='footer-p'>Therefore, it is our responsibility as stewards of this planet to conserve water, protect oceans and put an end to marine pollution</p>
    <p className='footer-p2'>SAVE OCEAN, SAVE EARTH!!</p>
    </div>
</div>

    </Container>
  );
};

export default Ocean;
