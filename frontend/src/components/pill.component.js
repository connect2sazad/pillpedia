import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import './styles/pill.css';

import { HeaderSubPage } from './header.component';

export const Pill = () => {

    const { pillinfo } = useParams();
    const history = useHistory();

    useEffect(() => {
        getPillDetails();
    }, []);

    async function getPillDetails() {

        let data = { med_id: pillinfo }

        let result = await fetch("http://127.0.0.1:8000/api/get-med-details", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            }
        });

        result = await result.json();

        // <localStorage className="removeItem"></localStorage>('find-particular');
        localStorage.setItem('find-particular', JSON.stringify(result));

        history.push('/pill/' + pillinfo);
    }

    return (
        <div>
            <HeaderSubPage />
            <div className="results">
                <div className="container-main">
                    <div className="results-conatiner">
                        <div className="med-name">
                            {
                                JSON.parse(localStorage.getItem('find-particular'))['name']
                            }
                        </div>
                        <hr />
                        <table className="full-table">
                            <tr>
                                <td>Pill Id:</td>
                                <td><p>{JSON.parse(localStorage.getItem('find-particular'))['med_id']}</p></td>
                            </tr>
                            <tr>
                                <td>Pill Link:</td>
                                <td><p>https://www.pillpedia.com/pill/{JSON.parse(localStorage.getItem('find-particular'))['med_id']}/</p></td>
                            </tr>
                            <tr>
                                <td>Type:</td>
                                <td><p>{JSON.parse(localStorage.getItem('find-particular'))['type']}</p></td>
                            </tr>
                            <tr>
                                <td>Usage:</td>
                                <td><p>{JSON.parse(localStorage.getItem('find-particular'))['short_description']}</p></td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td><p>Rs.{JSON.parse(localStorage.getItem('find-particular'))['rate']}/pill</p></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}