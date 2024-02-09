import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MdOutlineDarkMode } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/countrypage/:countryName" element={<CountryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
