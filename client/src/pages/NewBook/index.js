import React, { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import './styles.css'

import logo from '../../assets/logo.svg'

export default function NewBook() {
        const [id, setId] = useState('');
        const [author, setAuthor] = useState('');
        const [launchDate, setLaunchDate] = useState('');
        const [price, setPrice] = useState('');
        const [title, setTitle] = useState('');

        const userName = localStorage.getItem('username');
        const accessToken = localStorage.getItem('accessToken');
    
        const navigate = useNavigate();
    
        async function createNewBook(e) {
            e.preventDefault();

            const data = {
                title,
                author,
                launchDate,
                price
            }

            try {
                await api.post('api/book/v1', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                navigate('/book')
            } catch(err) {
                alert('Error while recording Book! Try again')
            }
        }

    return (
        <div className="new-book-container">
            <div className="content">
                <section className="form">
                <img src={logo} alt="Logo" />
                <h1>Add New Book</h1>
                <p>Enter the book information and click on 'Add'!</p>
                <Link className="back-link" to="/book">
                    <FiArrowLeft size={16} color="#251fc5"/>
                    Home
                </Link>
                </section>

                <form onSubmit={createNewBook}>
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Title" />
                    <input value={author} onChange={e => setAuthor(e.target.value)} type="text" placeholder="Author" />
                    <input value={launchDate} onChange={e => setLaunchDate(e.target.value)} type="date" />
                    <input value={price} onChange={e => setPrice(e.target.value)} type="text" placeholder="Price" />

                    <button className="button" type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}