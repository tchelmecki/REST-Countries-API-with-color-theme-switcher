import { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function Home() {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchDataAll = async () =>{
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/all`);
                setCountries(response.data);
                // console.log(response.data);
            } catch(error){
                console.error('Error w fetchingu:', error);
            }
        };
    
        const fetchData = async () =>{
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`);
                setCountries(response.data);
                    console.log(response.data);
            } catch(error){
                console.error('Error w fetchingu:', error);
            }
        };
        
        if (searchTerm === '') {
            fetchDataAll(); 
        } else{
            fetchData();
        }
    }, [searchTerm])

    const handleSearchChange = (event) =>{
        setSearchTerm(event.target.value);
    }
    
    return (
    <div class="container">
     <Navbar/>
      <main>
        <div className="sort">
          <FaSearch className='search-icon' />
          <input type="text" 
            placeholder='Search for a country...' 
            value={searchTerm}
            onChange={handleSearchChange}/>
          <select name="" id="">
            <option value="someOption">Filter by region</option>
            <option value="otherOption">Other option</option>
          </select>
        </div>

        <div className="countries">

          {countries.map(country => (
            <Link to={`/countrypage/${country.name.common}`} key={country.name.common} className="country-link">
            <div className='country' >
              <img src={country.flags.png} alt="" />
              <div className="information">
                <p>{country.name.common}</p>
                <p><b>Populations:</b> {country.population}</p>
                <p><b>Region: </b>{country.region}</p>
                <p><b>Capital: </b>{country.capital}</p>
              </div>
            </div>
            </Link>
          ))}

        </div>
      </main>
    </div>
    )
}

export default Home
