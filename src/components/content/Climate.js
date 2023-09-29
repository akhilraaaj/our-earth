import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import styled from 'styled-components';
import './Climate.css';

const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(`/vulnerability.csv`).then((data) => {
      setData(data);
    });
  }, []);

  const Container = styled.div`
  margin: 0;
  max-width: 100%;
  background-color: #D80032;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  height: 100vh;
`;

const MapContainer = styled.div`
  width: 100vh;
  border: 2px solid #00704A;
  border-radius: 8px; 
  background-color: #ffffff;
  @media screen and (max-width: 960px) {
    width: 54vh;
    height: 60vh;
    justify-content: center;
    align-items: center;
  }
`;

const Heading = styled.div`
font-size: 40px;
font-weight: bold;
margin-bottom: 20px;
text-align: center;
color: #F9D949;
word-wrap: break-word;
@media screen and (max-width: 960px) { 
    font-size: 35px;
    justify-content: center;
    text-align: center;
  }
`;

const Paragraph = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
  justify-content: center;
  text-align: center;
  @media screen and (max-width: 960px) {
    justify-content: center;
    text-align: center;
    font-size: 15px;
}
`;

const defaultProjectionConfig = {
  rotate: [-10, 0, 0],
  scale: 250
};

const mobileProjectionConfig = {
  rotate: [-10, 0, 0],
  scale: 90
};



  return (
    // <ScrollableContainer>    
    <Container>
         <div className='climate-heading'>
    <Heading><Heading>CLIMATE CHANGE IS HERE NOW!!</Heading></Heading>
    <Paragraph>We can limit further warming and the dangers it poses —if we act now. Every fraction of a degree matters.</Paragraph>
    </div>
    <hr style={{ background: 'lime', border: 'none', height: '3px', margin: '0' }} />
    <MapContainer>
    {/* <MapContent> */}
    <ComposableMap
  projectionConfig={window.innerWidth < 960 ? mobileProjectionConfig : defaultProjectionConfig}
  width={window.innerWidth}
  height={window.innerHeight}
>
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s.ISO3 === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
      {/* </MapContent> */}
      </MapContainer>
      <h2 className="map-label">The map above shows the C02 emissions per country</h2>
    <h1 className="infer">From the map, we can infer that the amount of C02 consumptions has increased drastically over the years</h1>
    <h2 className="infer2">Therefore, it is high time we take a step forward to tackle, reduce or store C02 emissions to save our planet!!</h2>
    
  
    </Container>
    // </ScrollableContainer>

  );
};

export default MapChart;
