import React from 'react';

import './styles/search.css';

export const Search = () => {
    return (
        <div className="container-main">
            <div className="search-container">
                <div className="input-container">
                    <img src={process.env.PUBLIC_URL + '/pillpedia.png'} alt="pillpedia" />
                    <input type="text" placeholder="Search for medicines.." spellCheck="false" className="search-input"/>
                    <button className="search-btn button">Get-Info</button>
                </div>
            </div>
        </div>
    );
}