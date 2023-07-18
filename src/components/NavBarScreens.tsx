import { NavDropdown } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import './NavBarScreens.css'
import '../routes/css/media-layout.css'

import logo from '../assets/logo-white.svg'
import { AiOutlineSearch } from 'react-icons/ai'

export const NavBarScreen = () => {
    return (
        <div className='nav-screens-container'>
            <div className="logo-redirect">
                <Link className='navbar-brand' to="/">
                    <img width={300} className='logo' src={logo} alt="" />
                </Link>
            </div>
            <div className='search-content'>
                <input className='search-field' type="text" placeholder='O que você procura?' />
                <AiOutlineSearch className="search-icon" size={20} />
            </div>
            <div className="redirect-links">
                <div className="new-request-redirect">
                    <Link to="/request/new">Nova manifestação</Link>
                </div>
                <div className="request-redirect">
                    <Link to="/requests">Minhas manifestações</Link>
                </div>
            </div>
            <div className='options'>
                <FaUserCircle size={40} />
                <NavDropdown title="Nome do usuário" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                        <Link to="/login">Sair</Link>
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
        </div>
    )
}
