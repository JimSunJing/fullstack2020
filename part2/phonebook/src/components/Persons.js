import React from 'react';

const Persons = ({persons,searchKey}) => {
    return (
        <div>
            {persons.map(p => {
                if (p.name.toLowerCase().indexOf(searchKey) !== -1){
                    return (<div key={p.name}>{p.name} {p.number} </div>)
                } else return 
            })}
        </div>
    );
};

export default Persons;