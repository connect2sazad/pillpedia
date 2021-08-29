import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const URLNotFound = () => {

    let location = useLocation();
    
    return(
        <div>
            <h1>Error 404: URL Not Found</h1>
            <h2>No such location like 'https://localhost:3000{location.pathname}' found!</h2>
            <hr />
        </div>
    );
}