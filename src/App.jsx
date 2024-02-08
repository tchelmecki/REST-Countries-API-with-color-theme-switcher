import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MdOutlineDarkMode } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import './App.css'
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
        console.log(response.data);
      } catch(error){
        console.error('Error w fetchingu:', error);
      }
    };

    fetchData();
  }, [])
  return (
    <div class="container">
      <nav>
          <p>Where in the world?</p>
          <span>
          <MdOutlineDarkMode className='change-theme'/> <p>Dark mode</p>
          </span>
      </nav>
      <main>
        <div className="sort">
          <FaSearch className='search-icon' />
          <input type="text" placeholder='Search for a country...' />
          <select name="" id="">
            <option value="someOption">Filter by region</option>
            <option value="otherOption">Other option</option>
          </select>
        </div>

        <div className="countries">

          {countries.map(country => (
            <div className='country' key={country.name.common}>
              <img src={country.flags.png} alt="" />
              <div className="information">
                <p>{country.name.common}</p>
                <p><b>Populations:</b> {country.population}</p>
                <p><b>Region: </b>{country.region}</p>
                <p><b>Capital: </b>{country.capital}</p>
              </div>
            </div>
          ))}

        </div>
      </main>
    </div>
  )
}

export default App
