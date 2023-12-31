import { NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

import { validateUserSession } from '../utils/validateSession.utils'

import api from '../services/api'

import './css/NavBarScreens.css'
import '../routes/css/media-layout.css'

import { ThemeContext } from '../contexts/teste'

import logo from '../assets/logo-white.svg'
import defaultProfile from '../assets/profile.svg'

export const NavBarScreen = () => {
    const [username, setUsername] = useState('');
    const [userImg, setUserImg] = useState(defaultProfile)
    const navigate = useNavigate()
    const { isLoggedIn, setIsLoggedIn } = useContext(ThemeContext);
    
    const logOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('user_id');
        localStorage.removeItem('bearer_token');
        return navigate('/login')
    }

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
            logOut()
        }
    }

    useEffect(() => {
        setUsername('')
        setUserImg(defaultProfile)
        validateUserSession(navigate, setIsLoggedIn)
        let userId = localStorage.getItem('user_id');
        if (isLoggedIn && userId) {
            getUser()
        }
    }, [isLoggedIn])

    return (
        <div className='nav-screens-container'>
            <div className="logo-redirect">
                <Link className='navbar-brand' to="/">
                    <img width={250} className='logo' src={logo} alt="" />
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
            {
                !isLoggedIn ? <div className='register'>
                    <Link className='register-button' to="/login">
                        <img className='profile-picture' src={defaultProfile} alt="" />
                        <button>Entre ou cadastre-se</button>
                    </Link>
                </div>
                :  <div className='options-container'>
                    <div className='options'>
                        <img className='profile-picture' src={userImg} alt="" />
                        <NavDropdown title={username} id="basic-nav-dropdown" style={{fontSize: '12px'}}>
                            <NavDropdown.Item href="/account/user">Meu usuário</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logOut}>Sair</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
            }
        </div>
    )
}
