import { Link } from 'react-router-dom'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';

import './NavBarHome.css'
import '../routes/css/media-layout.css'

import logo from '../assets/logo.png'

export const NavBarHome = () => {
    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Link className='navbar-brand' to="/">
                <img width={200} className='logo' src={logo} alt="" />
                </Link>
            </div>
            <div className='search-content'>
                <input className='search-field' type="text" placeholder='Pesquisa' />
                <AiOutlineSearch className="search-icon" size={30} />
            </div>
            <div className='register'>
                <Link className='register-button' to="/login">
                    <FaUserCircle size={40} />
                    <button>Entre ou cadastre-se</button>
                </Link>
            </div>
        </div>
    )
}
