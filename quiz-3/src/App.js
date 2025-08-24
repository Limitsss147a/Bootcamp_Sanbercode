import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ManageData from './pages/ManageData.js';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-data" element={<ManageData/>} />        
      </Routes>
    </BrowserRouter>
  );
};

export default App;