import React from 'react';
import Detail from './Detail'

const Country = ({countries, searchKey}) => {
    const res = countries.filter(country => 
        country.name.toLowerCase().indexOf(searchKey) !== -1)

    return (
        <div>
            {res.length > 10 
                ? <div>Too many matches, specify another filter</div>
                : res.length === 1 
                    ? <Detail country={res[0]} />
                    : res.map(c => <div key={c.name}>{c.name}</div>) }
        </div>
    );
};

export default Country;