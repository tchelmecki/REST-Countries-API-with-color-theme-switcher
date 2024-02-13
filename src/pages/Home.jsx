import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

function Home() {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [allCountries, setAllCountries] = useState([]);

    useEffect(() => {
        const fetchDataAll = async () =>{
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/all`);
                setCountries(response.data);
                setAllCountries(response.data);
            } catch(error){
                console.error('Error w fetchingu:', error);
            }
        };

        fetchDataAll(); 
    
    }, [])

    useEffect(() => {
        filterCountries(); 
    }, [searchTerm, selectedRegion])

    const filterCountries = () => {
        let filteredCountries = allCountries; 

        if (selectedRegion !== '') {
            filteredCountries = filteredCountries.filter(country => country.region === selectedRegion);
        }

        if (searchTerm !== '') {
            filteredCountries = filteredCountries.filter(country => {
                const commonName = country.name.common.toLowerCase();
                return commonName.includes(searchTerm.toLowerCase());
            });
        }

        setCountries(filteredCountries); 
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSelectRegion = (event) => {
        const region = event.target.value;
        setSelectedRegion(region);
    }

    return (
        <div className="container">
            <Navbar />
            <main>
                <div className="sort">
                    <FaSearch className='search-icon' />
                    <input type="text"
                        placeholder='Search for a country...'
                        value={searchTerm}
                        onChange={handleSearchChange} />
                    <select name="" id="" onChange={handleSelectRegion}>
                      <option value="" disabled selected>Filter by region</option>
                      <option value="">All</option>
                      <option value="Europe">Europe</option>
                      <option value="Asia">Asia</option>
                      <option value="Africa">Africa</option>
                      <option value="Americas">Americas</option>
                      <option value="Oceania">Oceania</option>
                    </select>
                </div>

                {countries.length > 0 ? ( 
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
                ) : (
                    <Loader/>
                )}
            </main>
        </div>
    )
}

export default Home;
