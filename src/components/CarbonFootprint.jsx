import React, { useState, useMemo } from 'react';
import { 
  Car, Home, Plane, ShoppingBag, Leaf, Info,
  Utensils, Train, Bus, Lightbulb, Droplets,
  ThermometerSun, Shirt, Package
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
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
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
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
        className={`px-4 py-2 text-sm font-medium rounded-md flex-1 transition-colors
          ${activeTab === value 
            ? 'bg-white text-blue-600 shadow-sm' 
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
    return <div className="mt-2">{children}</div>;
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
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <div>
          <span className="font-medium">{label}</span>
          <p className="text-sm text-gray-500">{description}</p>
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
        <div className="text-sm text-gray-500">
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
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div>
        <div>
          <div className="text-2xl font-bold text-center">
            Detailed Carbon Footprint Calculator
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
              <h3 className="text-lg font-semibold mb-4">Emissions Breakdown</h3>
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
              <h3 className="text-lg font-semibold mb-4">Detailed Analysis</h3>
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

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
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
                <div key={index}>
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