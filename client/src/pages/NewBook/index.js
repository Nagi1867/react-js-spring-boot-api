import React, { useState, useEffect } from "react";
import { data, Link, useNavigate, useParams } from "react-router-dom";
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

        const {bookId} = useParams();

        const userName = localStorage.getItem('username');
        const accessToken = localStorage.getItem('accessToken');
    
        const navigate = useNavigate();

        async function loadBook() {
            try {
                const response = await api.get(`api/book/v1/${bookId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                let adjustedDate = response.data.launchDate.split('T', 10)[0];

                setId(response.data.id) 
                setTitle(response.data.title)
                setAuthor(response.data.author)
                setPrice(response.data.price)
                setLaunchDate(adjustedDate)
            } catch(error) {
                alert('Error recovering book! Try again');
                navigate('/books')
            }
        }

        useEffect(() => {
            if(bookId === '0') return;
            else loadBook();
        }, [bookId])
    
        async function saveOrUpdate(e) {
            e.preventDefault();

            const data = {
                title,
                author,
                launchDate,
                price
            }

            try {
                if (bookId === '0') {
                    await api.post('api/book/v1', data, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                } else {
                    data.id = id;
                    await api.post('api/book/v1', data, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                }
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
                <h1>{bookId === '0' ? 'Add New' : 'Update'} Book</h1>
                <p>Enter the book information and click on '{bookId === '0' ? "'Add'" : "'Update'"}'! ###{bookId}</p>
                <Link className="back-link" to="/book">
                    <FiArrowLeft size={16} color="#251fc5"/>
                    Home
                </Link>
                </section>

                <form onSubmit={saveOrUpdate}>
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Title" />
                    <input value={author} onChange={e => setAuthor(e.target.value)} type="text" placeholder="Author" />
                    <input value={launchDate} onChange={e => setLaunchDate(e.target.value)} type="date" />
                    <input value={price} onChange={e => setPrice(e.target.value)} type="text" placeholder="Price" />

                    <button className="button" type="submit">{bookId === '0' ? 'Add' : 'Update'}</button>
                </form>
            </div>
        </div>
    );
}