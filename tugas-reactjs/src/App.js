import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/tugas12/navbar";

import Tugas6 from './components/tugas6/tugas6';
import Tugas7 from './components/tugas7/tugas7';
import Tugas8 from './components/tugas8/tugas8';
import Tugas9 from './components/tugas9/tugas9';
import Tugas10 from './components/tugas10/tugas10';
import Tugas11 from './components/tugas11/tugas11';



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tugas6 />} />
        <Route path="/tugas7" element={<Tugas7 name="Angga Adhya Pratama" batch="69" email="angga147a@gmail.com"/>} />
        <Route path="/tugas8" element={<Tugas8 />} />
        <Route path="/tugas9" element={<Tugas9 />} />
        <Route path="/tugas10" element={<Tugas10 />} />
        <Route path="/tugas11" element={<Tugas11 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;