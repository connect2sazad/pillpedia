import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles/admin.css';

import { HeaderSubPage } from './header.component';

export const Dashboard = () => {

    const history = useHistory();
    const [token, setToken] = useState('');

    useEffect(() => {
        if (!sessionStorage.getItem('admin-user')) {
            history.push('/');
        } else {
            var extract_token = JSON.parse(sessionStorage.getItem('admin-user'));
            setToken(extract_token['token']);;
        }
    }, []);

    return (
        <div>
            <HeaderSubPage />

            <div className="results">
                <div className="container-main admin-container-main">
                    {/* admin dashboard: {token} */}
                    <div className="admin-menu-bar">
                        <button>Add a New Pill</button>
                        <button>Edit an Old Pill</button>
                        <button>Go To Settings</button>
                    </div>
                    <div class="all-pills-display">
                        <table>
                            <tr>
                                <th>Id</th>
                                <th>Pill Name</th>
                                <th>Type</th>
                                <th>Country</th>
                            </tr>
                            <tr>
                                <td>1001</td>
                                <td>Paracetamol</td>
                                <td>Pill</td>
                            </tr>
                            <tr>
                                <td>1002</td>
                                <td>Paracetamol 250mg</td>
                                <td>Pill</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}