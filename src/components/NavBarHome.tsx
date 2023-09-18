import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';

import './css/NavBarHome.css'
import '../routes/css/media-layout.css'

import api from '../services/api';

import { ThemeContext } from '../contexts/teste';

import logo from '../assets/logo-white.svg'
import defaultProfile from '../assets/profile.svg'

import { validateUserSession } from '../utils/validateSession.utils';

export const NavBarHome = () => {
    const [userImg, setUserImg] = useState(defaultProfile)
    const [username, setUsername] = useState('');
    const { isLoggedIn, setIsLoggedIn } = useContext(ThemeContext);

    const navigate = useNavigate()

    useEffect(() => {
        setUserImg(defaultProfile)
        setUsername('')
        validateUserSession(navigate, setIsLoggedIn)
        if (isLoggedIn) {
            getUser()
        }
    }, [isLoggedIn])

    const getUser = async () => {
        try {
            let userId = localStorage.getItem('user_id');
            const { data } = await api.get(`user/${userId}`, { headers: {
                Authorization: 'Bearer ' + localStorage.getItem('bearer_token')
            }})
            setUserImg(data.profilePictureURL)
            setUsername(data.username)
        } catch (err) {
            console.log(err)
            return navigate('/login');
        }
    }
    const logOut = () => {
        setIsLoggedIn(false)
        localStorage.removeItem('user_id');
        localStorage.removeItem('bearer_token');
        return navigate('/login')
    }
    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Link className='navbar-brand' to="/">
                    <img width={250} className='logo' src={logo} alt="" />
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
                {
                    !isLoggedIn ? <div className='register'>
                        <Link className='register-button' to="/login">
                            <img className='profile-picture' src={defaultProfile} alt="" />
                            <button>Entre ou cadastre-se</button>
                        </Link>
                    </div>
                    : <div className='options'>
                        <img className='profile-picture' src={userImg} alt="" />
                        <NavDropdown title={username} id="basic-nav-dropdown" style={{fontSize: '12px'}}>
                            <NavDropdown.Item href="/account/user">Meu usuário</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logOut}>Sair</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                }
            </div>
        </div>
    )
}
