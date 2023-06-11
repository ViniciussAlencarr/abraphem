import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Navbar, Form } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';


import './NavBarHome.css'
export const NavBarHome = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Collapse id="navbarScroll">
                    <Link className='navbar-brand' to="/">Logo</Link>
                    <form className='search-form'>
                        <div className='search-content'>
                            <input className='search-field' type="text" placeholder='Pesquisar' />
                            <AiOutlineSearch className="search-icon" />
                        </div>
                    </form>
                    <Link className='register-button' to="/login">
                            <FaUserCircle size={40} />
                            <button>Entre ou cadastre-se</button>
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
