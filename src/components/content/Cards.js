// import "./App.css";
import { CardItem } from './CardItem';
import styled from 'styled-components';

const Container = styled.div`
  height: 40vh;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  position: relative;
`;

const Col = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: center;
  gap: 100px;
  margin-top: 20px;
  @media screen and (max-width: 960px) {
    text-align: center;
    ${'' /* justify-content: center; */}
    display: block;
    font-size: 15px;
    width: 100%;
    gap: 15px;
  }
`;

// const Heading = styled.div`
// font-size: 40px;
// font-weight: bold;
// text-align: center;
// color: #F9D949;
// `;

const Heading = styled.div`
  font-size: 50px;
  font-weight: bolder;
  margin-bottom: 20px;
  color: #00704A;
  @media screen and (max-width: 960px) {
    text-align: center;
    justify-content: center;
    font-size: 35px;
  }
`;

const Paragraph = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 60px;
  color: #12486B;
  width: 70%;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
  @media screen and (max-width: 960px) {
    text-align: center;
    justify-content: center;
    font-size: 20px;
    width: 95%;
  }
`;

const Cards = () =>{
  return (
    <Container name="card">
    <div className='cards-heading'>
    <Heading><Heading>The Power of Collective Action</Heading></Heading>
    <Paragraph><Paragraph>Now, more than ever, we must step up our efforts to combat climate change, protect biodiversity, and preserve our ecosystems. Join us today and fight for a sustainable and thriving future.</Paragraph></Paragraph>
    </div> 
      <Col>
        <CardItem
          imgSrc="https://cff2.earth.com/uploads/2021/02/08003340/shutterstock_17229105492-960x640.jpg"
          imgAlt="Card Image 1"
          title="CLIMATE CHANGE"
          description="Warmer temperatures over time are changing weather patterns and disrupting the usual balance of nature."
          buttonText="Learn More"
          link="Climate"
        />
        <CardItem
          imgSrc="https://c1.wallpaperflare.com/preview/766/1023/725/tree-forest-nature-air-oxygen-landscape.jpg"
          imgAlt="Card Image 1"
          title="PLANT TREES"
          description="Trees play a vital role in our lives as well as the biodiversity. Let us plant trees and put an end to deforestation."
          buttonText="Learn More"
          link="Deforestation"
        />
        <CardItem
          imgSrc="https://www.surfertoday.com/images/jamp/page/ocean-breaking-wave.jpg"
          imgAlt="Card Image 1"
          title="SAVE THE OCEAN"
          description="A healthy ocean regulates climate and reduce climate change impacts. We must protect oceans for our survival."
          buttonText="Learn More"
          link="Ocean"
        />
      </Col>
    </Container>
  );
}

export default Cards;
