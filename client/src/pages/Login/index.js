import React from "react";
import './styles.css';
import logo from '../../assets/logo.svg'
import padlock from '../../assets/padlock.png'

export default function Login() {
    return (
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="Logo" />

                <form action="">
                    <h1>Access your Account</h1>
                    <input type="text" placeholder="Username" name="" id="" />
                    <input type="password" placeholder="Password" name="" id="" />
                    <button className="button" type="submit">Login</button>
                </form>
            </section>
            <img src={padlock} alt="Login" />
        </div>
    )
}