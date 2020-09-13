import React from 'react';

const Persons = ({ persons, searchKey, delPerson }) => {
    return (
        <div>
            {persons.map(p => {
                if (p.name.toLowerCase().indexOf(searchKey) !== -1) {
                    return (
                        <div key={p.name}>{p.name} {p.number}
                            <button onClick={() => delPerson(p)}>delete</button>
                        </div>
                    )
                } else return null
            })}
        </div>
    );
};

export default Persons;