import React from 'react';
import Weather from './Weather'

const Detail = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>

            <div>capital {country.capital}</div>
            <div>population {country.population} </div>

            <h2>languages</h2>
            <ul>
                {country.languages.map(lang => 
                    <li key={lang.name}>{lang.name}</li> )}
            </ul>

            <img src={country.flag} 
                alt={`${country.name} flag` } />

            <Weather city={country.capital} />
        </div>
    );
};

export default Detail;