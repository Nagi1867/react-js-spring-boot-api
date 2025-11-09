import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import './styles.css';

import api from "../../services/api";

import logo from '../../assets/logo.svg'
import padlock from '../../assets/padlock.png'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();

        const data = {
            username,
            password,
        };

        try {
            const response = await api.post('auth/signin', data);

            localStorage.setItem('username', username);
            localStorage.setItem('accessToken', response.data.token);

            navigate('/book');
        } catch(err) {
            alert('Login failed! Try again');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="Logo" />

                <form onSubmit={login}>
                    <h1>Access your Account</h1>
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="button" type="submit">Login</button>
                </form>
            </section>
            <img src={padlock} alt="Login" />
        </div>
    )
}