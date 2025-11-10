import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';

import api from "../../services/api";

import './styles.css';
import logo from '../../assets/logo.svg'

export default function Books() {
    const [books, setBooks] = useState([])
    const [page, setPage] = useState(1)

    const userName = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');
    
    const navigate = useNavigate();

    async function logout() {
        localStorage.clear();
        navigate('/')
    }

    async function editBook(id) {
        navigate(`new/${id}`)
    }

    async function deleteBook(id) {
        try {
            await api.delete(`api/book/v1/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })

            setBooks(prev => prev.filter(book => book.id !== id))
        } catch {
            alert('Delete failed! Try again.')
        }
    }

    async function fetchMoreBooks() {
        try {
            const response = await api.get('api/book/v1', {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: { page, limit: 4, direction: 'asc' }
            });

            const newBooks = response.data?._embedded?.bookVoes ?? [];

            if (newBooks.length === 0) {
                alert("Não há mais livros para carregar.");
                return;
            }

            setBooks(prev => [...prev, ...newBooks]);
            setPage(prev => prev + 1);

        } catch (err) {
            console.error("Erro ao buscar livros:", err);
        }
    }

    useEffect(() => {
        fetchMoreBooks();
    }, []);

    return (
        <div className="book-container">
            <header>
                <img src={logo} alt="Logo" />
                <span>Welcome, <strong>{userName ? userName.toUpperCase() : 'Guest'}</strong></span>
                <Link className="button" to="new/0">Add New Book</Link>
                <button onClick={logout} type="button">
                    <FiPower size={18} color="#251fc5" />
                </button>
            </header>

            <h1>Registered Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>Title:</strong>
                        <p>{book.title}</p>
                        <strong>Author:</strong>
                        <p>{book.author}</p>
                        <strong>Price:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>
                        <strong>Release Date:</strong>
                        <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p> 

                        <button onClick={() => editBook(book.id)}>
                            <FiEdit size={20} color="#251fc5"/>
                        </button>

                        <button onClick={() => deleteBook(book.id)}>
                            <FiTrash2 size={20} color="#251fc5"/>
                        </button>
                    </li>
                ))}
            </ul>

            <button className="button" onClick={fetchMoreBooks}>Load More</button>
        </div>
    );
}
