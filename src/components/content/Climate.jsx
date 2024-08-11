import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import Footer from './Footer';
import { ComposableMap, Geographies, Geography, Sphere, Graticule } from "react-simple-maps";

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

  return (
    <div className="h-screen overflow-y-auto w-full bg-red-50">
     <section class="pt-24">
      <div class="px-12 mx-auto max-w-7xl">
        <div class="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 class="mb-8 mt-8 text-4xl font-extrabold leading-none tracking-normal text-gray-800 md:text-6xl md:tracking-tight">
            <span>Save the planet, </span> <span class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-red-500 to-yellow-500 lg:inline">one degree </span><span> at a time.</span>
          </h1>
          <p class="text-xl font-bold text-gray-600">
            The effects of human-caused global warming are happening now, are irreversible for people alive today, and will worsen as long as humans add greenhouse gases to the atmosphere.
          </p>
          {/* <div class="mb-4 space-x-0 md:space-x-2 md:mb-8">
                <a href="#_" class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0">
                    Get Started
                    <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
                <a href="#_" class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0">
                    Learn More
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                </a>
            </div> */}
        </div>
        <div class="w-full mx-auto mt-20 text-center md:w-10/12">
          <div class="relative z-0 w-full mt-8">
            <div class="relative overflow-hidden shadow-2xl">
              <div class="flex items-center flex-none px-4 bg-gray-200 border rounded-b-none h-11 rounded-xl">
                <div class="flex space-x-1.5">
                  <div class="w-4 h-4  bg-red-500 rounded-full"></div>
                  <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className='w-full h-full'>
	              <div className="relative overflow-hidden max-w-full w-full md:mt-0 mt-6" style={{paddingBottom: '56.25%'}}>
		              <iframe title='abc' src="https://www.youtube.com/embed/jAa58N4Jlos?si=pqdGmP-qZ28J4egi" frameBorder="0" allowFullScreen className="absolute top-0 left-0 w-full h-full"></iframe>
                </div> 
              </div>
            </div>
            <span className="font-bold text-lg">Source: DJI Captures via youtube</span>
          </div>
        </div>
      </div>
     </section>
      {/* <hr style={{ background: 'lime', border: 'none', height: '3px', margin: '0' }} /> */}
      <div className="flex md:px-8 px-2 py-24">
        <div className='flex md:flex-row flex-col items-center justify-between bg-[#12486B] rounded-2xl shadow-2xl md:px-12 px-2 py-12 md:text-left text-center'>
          <div className="flex flex-col w-3/4">
            <h1 className='md:text-4xl text-3xl font-extrabold text-white mb-8'>Every increase in global warming matters !!</h1>
            <h2 className='md:text-2xl text-2xl font-bold text-white'>From the map, we can infer that the amount of C02 consumptions has increased drastically over the years</h2>
            <p className='text-[#F9F3CC] md:text-lg text-base md:font-semibold font-medium'>Climate change can affect our health, ability to grow food, housing, safety and work. Some of us are already more vulnerable to climate impacts, such as people living in small island nations and other developing countries. In the future, the number of people displaced by weather-related events is expected to rise. Therefore, it is high time we take a step forward to tackle, reduce or store C02 emissions to save our planet!!</p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center w-full md:h-full h-96 py-2 md:px-12 px-2 bg-white border border-[#00704A] rounded-lg">
              <ComposableMap scale={200}>
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
                    })}
                  </Geographies>
                )}
              </ComposableMap>
            </div>
            <span className="text-lg text-center mt-2 font-bold text-white">The map above shows the C02 emissions per country</span>
          </div>
        </div>
      </div>
      <div className="bg-[#E72929]">
      <Footer bgColor="#E72929" />
      </div>
    </div>
    
  );
};

export default MapChart;
