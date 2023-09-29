import './App.css';
import React from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Earth } from './components/earth';
import TopSection from './components/TopSection';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Landing from "./components/Landing";
import Climate from './components/content/Climate';
import Deforestation from './components/content/Deforestation';
import Ocean from './components/content/Ocean';
import Home from './components/content/Home';
import Card from './components/content/Cards';
import Footer from './components/content/Footer';
import Section  from './components/content/Section';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #01040c;
`;

function App() {
  return (
    <AnimatePresence>
    <CanvasContainer>
    <Router>
     <Routes>
        <Route path="/" element={<TopSection />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/Climate" element={<Climate />} />
        <Route path="/Deforestation" element={<Deforestation />} />
        <Route path="/Ocean" element={<Ocean />} />
        <Route path="/Donate/Home" element={<Home />} />
        <Route path="/Donate/Footer" element={<Footer />} />
        <Route path="/Donate/Section" element={<Section />} />
        <Route path="/Donate/Card" element={<Card />} />
      </Routes>
    </Router>
    <Container>    
      <Canvas>
        <Suspense fallback={null}>
          <Earth id="object" />
        </Suspense>
      </Canvas>
    </Container>
    </CanvasContainer>
    </AnimatePresence>
 
  );
}


export default App;
