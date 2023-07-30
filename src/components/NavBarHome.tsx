import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';

import './css/NavBarHome.css'
import '../routes/css/media-layout.css'

import logo from '../assets/logo-white.svg'

export const NavBarHome = () => {
    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Link className='navbar-brand' to="/">
                <img width={300} className='logo' src={logo} alt="" />
                </Link>
            </div>
            <div className='search-content'>
                <input className='search-field' type="text" placeholder='O que você procura?' />
                <AiOutlineSearch className="search-icon" size={20} />
            </div>
            <div className="action-buttons">
                <div className="download-primer-platform">
                    <button className="download-primer-platform-btn">Baixar cartilha da plataforma</button>
                </div>
                <div className='register'>
                    <Link className='register-button' to="/login">
                        <FaUserCircle size={40} />
                        <button>Entre ou cadastre-se</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
