import React, { useState, useMemo } from 'react';
import { 
  Car, Home, Plane, ShoppingBag, Leaf, Info,
  Utensils, Train, Bus, Lightbulb, Droplets,
  ThermometerSun, Shirt, Package
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CarbonFootprint from '../../assets/carbon-footprint.png'

export const Slider = ({ min = 0, max = 100, step = 1, value = [0], onValueChange, className = '' }) => {
    const handleChange = (e) => {
      onValueChange([Number(e.target.value)]);
    };
  
    return (
      <div className={`w-full ${className}`}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#186F65]"
        />
      </div>
    );
  };
  
  export const Tabs = ({ defaultValue, children }) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue);
  
    return (
      <div className="w-full">
        {React.Children.map(children, child => {
          if (!child) return null;
          return React.cloneElement(child, { activeTab, setActiveTab });
        })}
      </div>
    );
  };
  
  export const TabsList = ({ children, activeTab, setActiveTab }) => {
    return (
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
        {React.Children.map(children, child => {
          if (!child) return null;
          return React.cloneElement(child, { activeTab, setActiveTab });
        })}
      </div>
    );
  };
  
  export const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => {
    return (
      <button
        className={`px-4 py-2 text-base font-bold rounded-md flex-1 transition-colors
          ${activeTab === value 
            ? 'bg-[#186F65] text-white shadow-sm' 
            : 'text-gray-600 hover:bg-gray-200'
          }`}
        onClick={() => setActiveTab(value)}
      >
        {children}
      </button>
    );
  };
  
  export const TabsContent = ({ value, children, activeTab }) => {
    if (value !== activeTab) return null;
  
    return (
      <div className="relative mt-2 px-4 py-4 rounded-3xl bg-[rgba(47,133,90,0.9)] shadow-2xl overflow-hidden">
        {/* SVG Background Pattern */}

        <svg className="absolute inset-0 w-full h-full opacity-50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="dotsPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="2.5" fill="rgba(255,255,255,0.2)" />
        <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.1)" />
        <circle cx="20" cy="20" r="1.5" fill="rgba(255,255,255,0.1)" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dotsPattern)" />
    </svg>
  
        {/* Children Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  };
  

const DetailedCarbonCalculator = () => {
  const [values, setValues] = useState({
    // Transportation
    carMiles: 0,
    carEfficiency: 25, // mpg
    publicTransitMiles: 0,
    flightShortHaul: 0,
    flightLongHaul: 0,
    
    // Home
    electricity: 0,
    naturalGas: 0,
    waterUsage: 0,
    heating: 0,
    cooling: 0,
    
    // Lifestyle
    meatMeals: 0,
    vegMeals: 0,
    clothing: 0,
    onlineShopping: 0
  });

  const calculations = useMemo(() => {
    // Transportation emissions
    const carEmissions = (values.carMiles * 0.404) * (25 / values.carEfficiency);
    const transitEmissions = values.publicTransitMiles * 0.14;
    const shortHaulEmissions = values.flightShortHaul * 150;
    const longHaulEmissions = values.flightLongHaul * 200;
    
    // Home emissions
    const electricityEmissions = values.electricity * 0.92;
    const gasEmissions = values.naturalGas * 5.3;
    const waterEmissions = values.waterUsage * 0.18;
    const heatingEmissions = values.heating * 0.23;
    const coolingEmissions = values.cooling * 0.28;
    
    // Lifestyle emissions
    const meatEmissions = values.meatMeals * 3.3;
    const vegEmissions = values.vegMeals * 1.1;
    const clothingEmissions = values.clothing * 0.5;
    const shoppingEmissions = values.onlineShopping * 0.1;

    const categories = {
      transport: carEmissions + transitEmissions + shortHaulEmissions + longHaulEmissions,
      home: electricityEmissions + gasEmissions + waterEmissions + heatingEmissions + coolingEmissions,
      lifestyle: meatEmissions + vegEmissions + clothingEmissions + shoppingEmissions
    };

    const total = categories.transport + categories.home + categories.lifestyle;

    return {
      categories,
      total,
      detailed: {
        car: carEmissions,
        transit: transitEmissions,
        shortHaul: shortHaulEmissions,
        longHaul: longHaulEmissions,
        electricity: electricityEmissions,
        gas: gasEmissions,
        water: waterEmissions,
        heating: heatingEmissions,
        cooling: coolingEmissions,
        meat: meatEmissions,
        veg: vegEmissions,
        clothing: clothingEmissions,
        shopping: shoppingEmissions
      }
    };
  }, [values]);

  const getRecommendations = () => {
    const recs = [];
    if (calculations.detailed.car > 1000) {
      recs.push("Consider carpooling or switching to an electric vehicle");
    }
    if (calculations.detailed.electricity > 500) {
      recs.push("Switch to LED bulbs and energy-efficient appliances");
    }
    if (calculations.detailed.meat > 300) {
      recs.push("Try incorporating more plant-based meals");
    }
    if (calculations.detailed.cooling > 200) {
      recs.push("Improve home insulation to reduce cooling needs");
    }
    return recs;
  };

  const renderSlider = (icon, label, field, max, step, unit, description) => (
    <div className="mb-6">
      <div className="flex items-center text-white font-bold gap-2 mb-2">
        {icon}
        <div className='text-start'>
          <span className="font-bold text-lg">{label}</span>
          <p className="text-sm font-medium text-gray-100">{description}</p>
        </div>
      </div>
      <div className="space-y-2">
        <Slider
          max={max}
          step={step}
          value={[values[field]]}
          onValueChange={(value) => setValues({ ...values, [field]: value[0] })}
          className="w-full"
        />
        <div className="text-sm text-white font-bold">
          {values[field]} {unit}
        </div>
      </div>
    </div>
  );

  const pieChartData = [
    { name: 'Transport', value: calculations.categories.transport },
    { name: 'Home', value: calculations.categories.home },
    { name: 'Lifestyle', value: calculations.categories.lifestyle }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const barChartData = Object.entries(calculations.detailed).map(([key, value]) => ({
    name: key,
    emissions: value
  }));

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <div>
      <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex flex-col items-center justify-center mb-4 mt-24">
            <div className="inline-block px-3 py-2 text-sm font-semibold text-white rounded-lg text-cn bg-blue-900 hover:cursor-pointer hover:bg-opacity-90">
              Emissions Check
            </div>
            <motion.h1
              className="text-5xl font-bold text-center mt-4 mb-8 text-green-800"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Carbon Footprint Calculator
            </motion.h1>
            <motion.p
              className="text-2xl text-center text-green-700 font-semibold"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Use our calculator to find your carbon footprint and ways to reduce it.
            </motion.p>
          </div>
        </motion.div>
        <div className='flex items-center justify-center mb-16'>
          <div className='flex flex-col text-start'>
            <h4 className='md:text-4xl text-3xl font-extrabold text-green-900 mb-8'>What is a carbon footprint?</h4>
            <p className='text-[#2b881c] md:text-lg text-base md:font-semibold font-medium'>A carbon footprint is the total amount of greenhouse gases (including carbon dioxide and methane) that are generated by our actions.</p>
            <p className='text-[#2b881c] md:text-lg text-base md:font-semibold font-medium'>Calculate your carbon footprint below:</p>
          </div>
          <div className='sm:block hidden'>
            <img src={CarbonFootprint} alt='' className='w-full h-[300px]' />
          </div>
        </div>
        <div>
          <Tabs defaultValue="transport">
            <TabsList className="grid grid-cols-3 gap-4 mb-4">
              <TabsTrigger value="transport">Transportation</TabsTrigger>
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            </TabsList>

            <TabsContent value="transport">
              {renderSlider(
                <Car className="w-5 h-5" />,
                "Car Travel",
                "carMiles",
                1000,
                10,
                "miles/month",
                "Regular car travel distance"
              )}
              {renderSlider(
                <Info className="w-5 h-5" />,
                "Car Efficiency",
                "carEfficiency",
                50,
                1,
                "mpg",
                "Your car's miles per gallon"
              )}
              {renderSlider(
                <Bus className="w-5 h-5" />,
                "Public Transit",
                "publicTransitMiles",
                500,
                10,
                "miles/month",
                "Bus and train travel"
              )}
              {renderSlider(
                <Plane className="w-5 h-5" />,
                "Short Flights",
                "flightShortHaul",
                50,
                1,
                "hours/year",
                "Flights under 4 hours"
              )}
              {renderSlider(
                <Plane className="w-5 h-5" />,
                "Long Flights",
                "flightLongHaul",
                50,
                1,
                "hours/year",
                "Flights over 4 hours"
              )}
            </TabsContent>

            <TabsContent value="home">
              {renderSlider(
                <Lightbulb className="w-5 h-5" />,
                "Electricity",
                "electricity",
                2000,
                50,
                "kWh/month",
                "Monthly electricity consumption"
              )}
              {renderSlider(
                <Home className="w-5 h-5" />,
                "Natural Gas",
                "naturalGas",
                100,
                1,
                "therms/month",
                "Monthly natural gas usage"
              )}
              {renderSlider(
                <Droplets className="w-5 h-5" />,
                "Water Usage",
                "waterUsage",
                5000,
                100,
                "gallons/month",
                "Monthly water consumption"
              )}
              {renderSlider(
                <ThermometerSun className="w-5 h-5" />,
                "Heating",
                "heating",
                1000,
                10,
                "hours/year",
                "Annual heating usage"
              )}
              {renderSlider(
                <ThermometerSun className="w-5 h-5" />,
                "Cooling",
                "cooling",
                1000,
                10,
                "hours/year",
                "Annual AC usage"
              )}
            </TabsContent>

            <TabsContent value="lifestyle">
              {renderSlider(
                <Utensils className="w-5 h-5" />,
                "Meat Meals",
                "meatMeals",
                100,
                1,
                "meals/month",
                "Meals containing meat"
              )}
              {renderSlider(
                <Leaf className="w-5 h-5" />,
                "Vegetarian Meals",
                "vegMeals",
                100,
                1,
                "meals/month",
                "Plant-based meals"
              )}
              {renderSlider(
                <Shirt className="w-5 h-5" />,
                "Clothing",
                "clothing",
                1000,
                10,
                "$/month",
                "Monthly clothing purchases"
              )}
              {renderSlider(
                <Package className="w-5 h-5" />,
                "Online Shopping",
                "onlineShopping",
                1000,
                10,
                "$/month",
                "Monthly online purchases"
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div>
        <div className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-4">Emissions Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value.toFixed(1)}kg`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Detailed Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis label={{ value: 'CO₂e (kg)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="emissions" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[rgba(44,122,123,0.9)] text-white rounded-lg">
            <div className="text-center mb-4">
              <div className="text-lg font-medium mb-2">
                Total Annual Carbon Footprint
              </div>
              <div className="text-3xl font-bold">
                {calculations.total.toFixed(1)} kg CO₂e/year
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Recommendations:</h4>
              {getRecommendations().map((rec, index) => (
                <div key={index} className='flex items-center justify-center gap-4 bg-gray-200 p-2 rounded-xl font-bold text-[rgba(44,122,123,0.9)]'>
                  <Leaf className="h-4 w-4" />
                  <div>{rec}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCarbonCalculator;