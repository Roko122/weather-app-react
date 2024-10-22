import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CustomNavbar from './components/CustomNavbar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import RainMap from './components/RainMap'
import { useState } from 'react';

function App() {
  const [location, setLocation] = useState("Joensuu, Finland")

  return (
    <>
      <Router>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<CurrentWeather location={location} />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/rainmap" element={<RainMap />} />
        </Routes>
      </Router>
    </>

  )
}

export default App
