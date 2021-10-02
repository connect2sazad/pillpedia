import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles/admin.css';

import { HeaderSubPage } from './header.component';

export const Dashboard = () => {

    const history = useHistory();
    const [token, setToken] = useState('');
    const [allPills, setAllPills] = useState('');

    useEffect(() => {
        if (!sessionStorage.getItem('admin-user')) {
            history.push('/');
        } else {
            var extract_token = JSON.parse(sessionStorage.getItem('admin-user'));
            setToken(extract_token['token']);
            if (token !== null || token !== '') {
                console.log("hello")
                var get_all_pills = getAllPills();
                // sessionStorage.setItem('pill-dump', JSON.stringify(get_all_pills));
                // setAllPills(get_all_pills);
            }
        }
    }, []);

    async function getAllPills() {

        let data = { 'remember_token': token }

        let result = await fetch("http://127.0.0.1:8000/api/get-all-pills?remember_token"+token, {
            method: "GET",
            // body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            }
        });

        result = await result.json();


        sessionStorage.setItem('pill-dump', JSON.stringify(result));
        setAllPills(result);

    }

    return (
        <div>
            <HeaderSubPage />

            <div className="results">
                <div className="container-main admin-container-main">
                    {/* admin dashboard: {token} */}
                    <div className="admin-menu-bar">
                        <button>Show All Pills</button>
                        <button>Add a New Pill</button>
                        <button>Go To Settings</button>
                    </div>
                    <div class="all-pills-display">
                        <table>
                            <tr>
                                <th>Id</th>
                                <th>Pill Name</th>
                                <th>Type</th>
                                <th>Updated By</th>
                                <th>Edit</th>
                            </tr>
                            {/* <tr>
                                <td>1001</td>
                                <td>Paracetamol</td>
                                <td>Pill</td>
                                <td>connect2sazad</td>
                                <td>Edit</td>
                            </tr>
                            <tr>
                                <td>1002</td>
                                <td>Paracetamol 250mg</td>
                                <td>Pill</td>
                                <td>connect2sazad</td>
                                <td>Edit</td>
                            </tr> */}
                            {
                                sessionStorage.getItem('pill-dump') ?
                                    JSON.parse(sessionStorage.getItem('pill-dump')).map((index, i) => {
                                        return (
                                            <tr>
                                                <td>{JSON.parse(sessionStorage.getItem('pill-dump'))[i]['med_id']}</td>
                                                <td>{JSON.parse(sessionStorage.getItem('pill-dump'))[i]['name']}</td>
                                                <td>{JSON.parse(sessionStorage.getItem('pill-dump'))[i]['type']}</td>
                                                <td>{JSON.parse(sessionStorage.getItem('pill-dump'))[i]['updated_by']}</td>
                                                <td>Edit</td>
                                            </tr>
                                        );
                                    })
                                    :
                                    getAllPills()
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}