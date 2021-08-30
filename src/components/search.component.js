import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles/search.css';

import { Header } from './header.component';

export const Search = () => {

    const history = useHistory();
    const [findValue, setFindValue] = useState('');

    const handleFindValue = (event) => {
        setFindValue(event.target.value);
    }

    const handleKey = (event) => {
        if (event.key === 'Enter')
            find();
    }

    async function find() {
        localStorage.setItem('find-pill', findValue);

        let data = { find: findValue }

        let result = await fetch("http://127.0.0.1:8000/api/search-for", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            }
        });

        result = await result.json();

        localStorage.setItem('find-results', JSON.stringify(result));
        
        if(result.length===0)
            localStorage.setItem('find-status', 'not_found');
        else
            localStorage.setItem('find-status', 'found')

        history.push('/find/' + findValue);
    }

    return (
        <div>
        <Header/>
        <div className="container-main">
            <div className="search-container">
                <div className="input-container">
                    <img src={process.env.PUBLIC_URL + '/pillpedia.png'} alt="pillpedia" />
                    <input type="text" placeholder="Search for medicines.." value={findValue} onChange={handleFindValue} onKeyDown={handleKey} spellCheck="false" className="search-input" />
                    <button className="search-btn button" onClick={find}>Get-Info</button>
                </div>
            </div>
        </div>
        </div>
    );
}