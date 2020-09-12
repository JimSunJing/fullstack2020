import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Country from './components/Country'

function App() {
    const [countries, setCountries] = useState([])
    const [searchKey, setSearchKey] = useState('')

    // use effect hook to load countries from restcountries.eu
    useEffect(() => {
        console.log('effect...');
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('axios get fulfilled');
                setCountries(response.data)
            })
    }, [])

    const searchKeyOnChange = (event) => {
        // console.log(event.target.value);
        setSearchKey(event.target.value)
    }

    return (
        <div>
            <div>find countries:
                <input value={searchKey}
                    onChange={searchKeyOnChange} />
            </div>
            <div>
                <Country countries={countries}
                    searchKey={searchKey} />
            </div>
        </div>
    );
}

export default App;
