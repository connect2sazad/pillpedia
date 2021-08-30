import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import $ from 'jquery';

import './styles/results.css';

import { HeaderSubPage } from './header.component';

export const Results = () => {

    const history = useHistory();
    const { find } = useParams();

    useEffect(() => {
        // window.location.reload();
        var status = localStorage.getItem('find-status');
        var res = localStorage.getItem('find-results');

        if(status && res!==null){
            console.log("hii")
            if(status==='not_found' && find===localStorage.getItem('find-pill')){
                  console.log('med not found') 
                  $('#results-block').html('<div class="no-results">No such pills like "'+find+'" found!</div>')
            } else {
                findPill(find);
            }
        }
        else{
            console.log("hii")
            findPill(find);
        }
    }, []);

    async function findPill(findValue) {
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
            <HeaderSubPage/>
        <div className="results">
            <div className="container-main">
                <div className="results-conatiner" id="results-block">

                    {
                        localStorage.getItem('find-results')?
                        JSON.parse(localStorage.getItem('find-results')).map((index, i) => {
                            return (
                                // <div className="a-pill">pill:  {JSON.parse(localStorage.getItem('find-results'))[i]['name']}</div>
                                <div className="a-pill">
                                    <div className="med_name">
                                        <Link to={"/pill/"+JSON.parse(localStorage.getItem('find-results'))[i]['med_id']}>{JSON.parse(localStorage.getItem('find-results'))[i]['name']}</Link>
                                    </div>
                                    <div className="med_link">
                                        https://www.pillpedia.com/pill/{JSON.parse(localStorage.getItem('find-results'))[i]['med_id']}/
                                    </div>
                                    <div className="med_description">{JSON.parse(localStorage.getItem('find-results'))[i]['short_description']}</div>
                                    <div className="med_price">Rs.{JSON.parse(localStorage.getItem('find-results'))[i]['rate']}/pill</div>
                                </div>
                            );
                        })
                        :
                        findPill(find)
                    }
                </div>
            </div>
        </div>
        </div>
    );
}