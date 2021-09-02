import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
// import $ from 'jquery';       

import './styles/header.css';

export const Header = () => {

    const history = useHistory();

    function logout() {
        sessionStorage.removeItem('admin-user');
        window.location.reload();
    }

    function goToDashboard() {
        history.push('/admin');
    }

    return (
        <div className="header-main" id="append-to-header">
            <div className="auth-control">
                {
                    sessionStorage.getItem('admin-user')
                        ?
                        <>
                            <div className="auth-control">
                                <p> <span onClick={goToDashboard}>@connect2sazad</span> <Link to="#" onClick={logout}>Logout</Link></p>
                            </div>
                        </>
                        :
                        <></>
                }
            </div>
        </div>
    );
}

export const HeaderSubPage = () => {

    const { find } = useParams();
    const [findValue, setFindValue] = useState(find);
    const history = useHistory();

    // useEffect(() => {
    //     // window.location.reload();
    //     var status = localStorage.getItem('find-status');
    //     var res = localStorage.getItem('find-results');

    //     if(status && res!==null){
    //         console.log("hii")
    //         if(status==='not_found' && find===localStorage.getItem('find-pill')){
    //               console.log('med not found') 
    //               $('#results-block').html('<div class="no-results">No such pills like "'+find+'" found!</div>')
    //         } else {
    //             findPill(find);
    //         }
    //     }
    //     else{
    //         console.log("hii")
    //         findPill(find);
    //     }
    // }, []);

    const handleFindValue = (event) => {
        setFindValue(event.target.value);
    }

    const handleKey = (event) => {
        if (event.key === 'Enter')
            findPill();
    }

    async function findPill() {
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

        if (result.length === 0)
            localStorage.setItem('find-status', 'not_found');
        else
            localStorage.setItem('find-status', 'found')

        history.push('/find/' + findValue);
    }

    function goToDashboard() {
        history.push('/admin');
    }

    function logout() {
        sessionStorage.removeItem('admin-user');
        window.location.reload();
    }

    return (
        <div className="header-main" id="append-to-header">
            <div className="headersubpage-main-container">
                <div className="pillpedia-logo">
                    <Link to="/"><img src={process.env.PUBLIC_URL + '/pillpedia.png'} alt="pillpedia" /></Link>
                </div>
                <div className="search-input-headersub">
                    <input type="text" value={findValue} onChange={handleFindValue} onKeyDown={handleKey} spellCheck="false" className="textinpute-header-sub" />
                </div>
                <div className="get-info-headersub-btn">
                    <button className="button headersub-btn" onClick={findPill}>Get-Info</button>
                </div>
            </div>
            {
                sessionStorage.getItem('admin-user')
                    ?
                    <>
                        <div className="auth-control">
                            <p> <span onClick={goToDashboard}>@connect2sazad</span> <Link to="#" onClick={logout}>Logout</Link></p>
                        </div>
                    </>
                    :
                    <></>
            }
        </div>
    );
}