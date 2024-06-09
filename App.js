import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Subscription from './components/Subscription';
import Footer from './components/Footer';
import WhatsappButton from './components/WhatsappButton';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Subscription />
      <Footer />
      <WhatsappButton />
    </div>
  );
};

export default App;
