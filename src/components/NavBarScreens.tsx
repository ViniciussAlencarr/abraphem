import { NavDropdown } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import './NavBarScreens.css'
import '../routes/css/media-layout.css'

import logo from '../assets/logo.png'

export const NavBarScreen = () => {
    return (
        <div className='nav-screens-container'>
            <div className="logo-redirect">
                <Link className='navbar-brand' to="/">
                    <img width={200} className='logo' src={logo} alt="" />
                </Link>
            </div>
            <div>
                
            </div>
            <div className="redirect-links">
                <div className="home-redirect">
                    <Link to="/">Inicio</Link>
                </div>
                <div className="new-request-redirect">
                    <Link to="/request/new">Nova solicitação</Link>
                </div>
                <div className="request-redirect">
                    <Link to="/requests">Minhas solicitações</Link>
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
