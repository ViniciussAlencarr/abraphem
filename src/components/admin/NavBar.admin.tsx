import { NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'

import emailIcon from '../../assets/email-icon.svg'
import ringtoneIcon from '../../assets/ringtone-icon.svg'

import '../css/admin/Navbar.admin.css'
import '../../routes/css/admin/media-layout.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'

export const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [username, setUsername] = useState('');
    
    const navigate = useNavigate()

    const getUser = async () => {
        try {
            let userId = localStorage.getItem('adm_user_id');
            const { data } = await api.get(`user/${userId}`, { headers: {
                Authorization: 'Bearer ' + localStorage.getItem('adm_bearer_token')
            }})
            setUsername(data.username)
        } catch (err) {
            console.log(err)
            logOut()
        }
    }

    const logOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('adm_user_id');
        localStorage.removeItem('adm_bearer_token');
        return navigate('/administrador/login')
    }

    useEffect(() => {
        getUser()
    }, [isLoggedIn])

    return (
        <div className='admin-nav-screens'>
            <div className="admin-nav-container">
                <div className="search-context">
                    <input className='search-value' type="text" placeholder="O que você procura" name="" id="" />
                    <AiOutlineSearch className="search-icon" size={20} />
                </div>
                <div className="actions">
                    <div className="action-icons">
                        <button className='action-btn action-email-btn'>
                            <img className='icon' src={emailIcon}/>
                        </button>
                        <button className='action-btn action-ringtone-btn'>
                            <img className='icon' src={ringtoneIcon}/>
                        </button>
                    </div>
                    <div className="my-user-btn">
                        <FaUserCircle size={40} />
                        <NavDropdown title={username} id="basic-nav-dropdown" className="dropdown-title">
                            <NavDropdown.Item href="/administrador/account/user">Meu usuário</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logOut}>Sair</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
            </div>
        </div>
    )
}
