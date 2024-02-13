import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const CountryPage = () => {
    const { countryName } = useParams();
    const [countryInfo, setCountryInfo] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
            setCountryInfo(response.data[0]); //only one country
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [countryName]);

  return (
    <>
    <Navbar/>
    <main>
        
        <div className="sort">
            <Link to="/" className='country-link'><button><IoArrowBack /> <span>Back</span></button></Link>
        </div>
        

        {countryInfo ? (
            <div className="country-info">
            <img src={countryInfo.flags.png} alt={`Flag of ${countryInfo.name.common}`} />

            <div className="country-details">

                <div className="details">
                    <div className="left-details">
                        <span>
                        <p>{countryInfo.name.common}</p>

                        {countryInfo.languages && Object.keys(countryInfo.languages).length > 0 && (
                        <p><b>Native language:</b> {Object.values(countryInfo.languages)[0]}</p>
                        )}<p><b>Population:</b> {countryInfo.population}</p>
                        <p><b>Region: </b>{countryInfo.region}</p>
                        <p><b>Capital: </b>{countryInfo.capital ? countryInfo.capital : "none"}</p>
                        <p><b>Subregion: </b>{countryInfo.subregion ? countryInfo.subregion : "none"}</p>
                        </span>
                    </div>
                    
                    <div className="right-details">
                        <span>
                        <p><b>Top Level Domain: </b>{countryInfo.tld}</p>
                        <p><b>Currencies:</b> {countryInfo.currencies ? Object.values(countryInfo.currencies).map(currency => (
                        <span key={currency.code}>{currency.name}</span>
                        )): "none"}</p>
                        <p><b>Languages:</b> {countryInfo.languages ? Object.values(countryInfo.languages).join(', ') : "none"}</p>
                        </span>
                        </div>
                        
                    </div>

                    <div className="border-countries">
                        <p><b>Border countries: </b>    {countryInfo.borders ? countryInfo.borders.join(', ') : 'none'}</p>
                    </div>
                </div>

                
            
            </div>
        ) : (
            <Loader/>
        )}

    </main>
    </>
  )
}

export default CountryPage;