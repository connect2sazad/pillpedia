import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';

import './styles/admin-login.css';

import { HeaderSubPage } from './header.component';

export const AdminLogin = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("User ID or Password is incorrect!");

    useEffect(() => {
        if (sessionStorage.getItem('admin-user')) {
            history.push('/admin');
        }
    }, []);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    function blast(blast_msg) {
        var get_err = {
            "status": 0,
            "err_msg": blast_msg
        }
        sessionStorage.setItem("admin-err", JSON.stringify(get_err));
        setErrorMessage(get_err['err_msg']);
        $("#err_disp").show();
    }

    function validateData() {
        if (email === null || email === "" || password === null || password === "") {
            blast("Please enter UserID and Password!")
            return false;
        }
        return true;
    }

    async function login(e) {
        e.preventDefault();
        if (validateData()) {

            let data = { 'email': email, 'password': password };

            let result = await fetch('http://127.0.0.1:8000/api/admin-login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json'
                }
            });

            result = await result.json();
            result['user_type'] = 'customer';

            if (result['status']) {
                sessionStorage.removeItem('admin-err');
                sessionStorage.setItem("admin-user", JSON.stringify(result));
                history.push("/admin");

                window.location.reload(true);
            } else {
                var get_err = {
                    "status": 0,
                    "err_msg": "Email Id or Password is incorrect!"
                }
                sessionStorage.setItem("admin-err", JSON.stringify(get_err));
                setErrorMessage(get_err['err_msg']);
                $("#err_disp").show();
            }

        } else {
            return false;
        }
    }

    return (
        <div>
            <HeaderSubPage />
            <div className="results">
                <div className="container-main admin-login">
                    <div className="admin-login-box">
                        <h1>Admin Login</h1>
                        <hr />
                        <div id="err_disp">{errorMessage}</div>
                        <input type="text" value={email} onChange={handleEmail} placeholder="Admin Email" />
                        <input type="password" value={password} onChange={handlePassword} placeholder="Admin Password" />
                        <button onClick={login}>Login</button>
                        <p>In case you forgot password, contact the superadmin.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}