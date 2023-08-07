import { NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

import './css/NavBarScreens.css'
import '../routes/css/media-layout.css'

import logo from '../assets/logo-white.svg'
/* import defaultProfileImg from '../assets/profile.svg' */
import { FaUserCircle } from 'react-icons/fa'

export const NavBarScreen = () => {
    const navigate = useNavigate()
    const logOut = () => {
        navigate('/login')
    }

    useEffect(() => {
        /* let profilePictureListener = setInterval(() => {
            if (localStorage.getItem('profile-picture-url') != null) {
                setProfileImg(JSON.stringify(localStorage.getItem('profile-picture-url')))
                clearInterval(profilePictureListener)
            }
        }, 1000)  */       
    }, [])

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
                    <Link to="/manifest/new">Nova manifestação</Link>
                </div>
                <div className="request-redirect">
                    <Link to="/manifests">Minhas manifestações</Link>
                </div>
            </div>
            <div className='options'>
                <FaUserCircle size={40} />
                <NavDropdown title="Nome do usuário" id="basic-nav-dropdown" style={{fontSize: '12px'}}>
                    <NavDropdown.Item href="/account/user">Meu usuário</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logOut}>Sair</NavDropdown.Item>
                </NavDropdown>
            </div>
        </div>
    )
}
