import React, { useState} from 'react';
import Footer from './Footer';

const Deforestation = () => {
  const downloadPDF = () => {
    const pdfUrl = '/trees.pdf';
    
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', 'trees.pdf');
    document.body.appendChild(link);
    
    link.click();
    
    document.body.removeChild(link);
  };

  const TreePlantingCalculator = () => {
    // State variables to store user input and calculation results
    const [numberOfTrees, setNumberOfTrees] = useState(0);
    const [carbonSequestration, setCarbonSequestration] = useState(0);
    const [oxygenProduction, setOxygenProduction] = useState(0);
  
    // Function to handle input change for number of trees
    const handleNumberOfTreesChange = (event) => {
      const trees = parseInt(event.target.value);
      setNumberOfTrees(trees);
    };
  
    // Function to calculate environmental impact
    const calculateImpact = () => {
      // Carbon sequestration rates in kg CO2 per year for different tree species
      const carbonSequestrationRates = {
        oak: 22,
        pine: 11,
        maple: 15,
        cherry: 18
      };
  
      // Oxygen production rates in kg O2 per year for different tree species
      const oxygenProductionRates = {
        oak: 38,
        pine: 19,
        maple: 26,
        cherry: 32
      };
  
      // Assuming the user selects a specific tree species
      const selectedTreeSpecies = 'oak'; // Change this based on user selection
  
      // Calculate total carbon sequestration and oxygen production
      const totalCarbonSequestration = numberOfTrees * carbonSequestrationRates[selectedTreeSpecies];
      const totalOxygenProduction = numberOfTrees * oxygenProductionRates[selectedTreeSpecies];
  
      // Update state variables with the calculated values
      setCarbonSequestration(totalCarbonSequestration);
      setOxygenProduction(totalOxygenProduction);
    };
  
    return (
      <div>
        <h2>Tree Planting Calculator</h2>
        <div>
          <label htmlFor="numberOfTrees">Number of Trees:</label>
          <input
            type="number"
            id="numberOfTrees"
            value={numberOfTrees}
            onChange={handleNumberOfTreesChange}
          />
        </div>
        <button onClick={calculateImpact}>Calculate Impact</button>
        <div>
          <h3>Environmental Impact:</h3>
          <p>Total Carbon Sequestration: {carbonSequestration} kg CO2 per year</p>
          <p>Total Oxygen Production: {oxygenProduction} kg O2 per year</p>
        </div>
      </div>
    );
  };
  
    
  return (
    <div className="w-full h-screen overflow-y-auto bg-green-50">
      <div className=' text-center flex flex-col px-6 md:px-0 py-4 container mx-auto text-center flex flex-col items-center justify-center sm:justify-normal md:justify-center px-6 md:px-0 md:max-w-[1300px] md:w-11/12 xl:w-[1300px] 2xl:w-[1300px] max-w-[1300px] relative'>
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-transparent to-transparent pb-12 pt-20 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
        <div className="relative z-10">
          <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
            <svg className="h-[60rem] w-[100rem] flex-none stroke-green-600 opacity-20" aria-hidden="true">
              <defs>
                <pattern id="e9033f3e-f665-41a6-84ef-756f6778e6fe" width="200" height="200" x="50%" y="50%" patternUnits="userSpaceOnUse" patternTransform="translate(-100 0)">
                  <path d="M.5 200V.5H200" fill="none"></path>
                </pattern>
              </defs>
              <svg x="50%" y="50%" className="overflow-visible fill-green-50">
                <path d="M-300 0h201v201h-201Z M300 200h201v201h-201Z" strokeWidth="0"></path>
              </svg>
              <rect width="100%" height="100%" strokeWidth="0" fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"></rect>
            </svg>
          </div>
        </div>
        <div className="relative z-20  max-w-7xl px-6 lg:px-8">
          <div className=" max-w-2xl text-center">
            <h1 className="text-6xl font-bold tracking-tight text-gray-900">
              Go Green:
              <span className="text-green-600 ml-2">Green Environment for Life</span>
            </h1>
            <h2 className="mt-6 text-lg leading-8 text-gray-600">Let us raise our voice to put an end to deforestation and save trees!!</h2>
            <div className="indicator mt-10">
              <span className="indicator-item badge badge-primary">cc: Earthdaynetwork</span> 
              <button onClick={downloadPDF} className="flex btn btn-success text-white font-bold">Download PDF
                <i className="fa fa-download" aria-hidden="true"></i>
              </button> 
            </div>
          </div>
          <div className="relative  mt-10 max-w-3xl max-h-xl">
           <img className="w-full rounded-2xl border border-green-200 shadow-2xl" src="https://c4.wallpaperflare.com/wallpaper/428/376/851/forest-4k-desktop-background-hd-wallpaper-preview.jpg" alt="" />
          </div>
        </div>
      </section>
      </div>
      <div className='md:px-6 px-4 py-24'>
      <div className='flex md:flex-row flex-col items-center justify-between bg-[#186F65] rounded-2xl shadow-2xl md:px-8 px-4 py-12 md:text-left text-center'>
        <div className='flex flex-col justify-center w-full'>
          <h1 className='md:text-5xl text-3xl font-extrabold text-white mb-8'>The best time to plant a tree was twenty years ago. The second best time is now.</h1>
          {/* <h2 className='md:text-4xl text-2xl font-bold text-white'>Celebrate Earth Day Everyday!!</h2> */}
          <p className='text-[#F9F3CC] md:text-lg text-base md:font-semibold font-medium'>Planting a billion trees can help us curb the effects of climate change. It's a big number, but we know we can do it with your help. Planting a billion trees can help save the Earth from climate change and biodiversity loss. When we restore and conserve critical forests, we remove carbon and support biodiversity. A billion is a big number, but we know we can do it together. Help plant trees today!.</p>
        </div>
        <div className='w-full h-full'>
	        <div className="relative overflow-hidden max-w-full w-full md:mt-0 mt-6" style={{paddingBottom: '56.25%'}}>
		        <iframe title='abc' src="https://www.youtube.com/embed/3hxE7Af98AI?si=mnV02SRgrgmS56Dd" frameBorder="0" allowFullScreen className="absolute top-0 left-0 w-full h-full rounded-xl"></iframe>
          </div>
        </div>
      </div>
    </div>
    <button onClick={downloadPDF} className="btn btn-success">Download</button>
    <TreePlantingCalculator />

    <Footer bgColor="#00704A" />
    </div>
  );
};

export default Deforestation;