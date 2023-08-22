import { NavBar } from '../../components/admin/NavBar.admin'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import '../css/admin/Screens.admin.css'

import logo from '../../assets/logo-white.svg'
import api from '../../services/api'

import {  validateAdmSession } from '../../utils/validateSession.utils'

export const AdminScreens = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        validateAdmSession(navigate)
        let interval = setInterval(() => {
            let route = window.location.href.split('/')[window.location.href.split('/').length - 1]
            if (route.includes('login')) return clearInterval(interval)
            switch (route) {
                case 'welcome':
                    activeNavigation('home')
                    break;
                case 'clients':
                    activeNavigation('users')
                    break;
                default:
                    activeNavigation(route)
                    break;
            }
        }, 100)
        getUser()
    }, [isLoggedIn])

    const getUser = async () => {
        try {
            let userId = localStorage.getItem('adm_user_id');
            await api.get(`user/${userId}`, { headers: {
                Authorization: 'Bearer ' + localStorage.getItem('adm_bearer_token')
            }})
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

    const activeNavigation = (className: string) => {
        let allToggledElements = document.querySelectorAll('.active')
        allToggledElements.forEach(element => {
            element.classList.remove('active')
        })
        let activeNavigationElement = document.querySelector(`.option.${className}`)
        activeNavigationElement?.classList.toggle('active')
    }

    return (
        <div className='admin-screens-container'>
            <div className='menu-context'>
                <div className="icon">
                    <img className='logo-icon' src={logo} alt="" />
                </div>
                <div className="options">
                    <div className="title">Dashboard</div>
                    <div className="options-redirect">
                        <div className="option home" onClick={() => {activeNavigation('home'); navigate('/administrador/welcome')}}>
                            <Link to='/administrador/welcome' >Início</Link>
                        </div>
                        <div className="option open" onClick={() => {activeNavigation('open'); navigate('/administrador/manifests/open')}}>
                            <Link to='/administrador/manifests/open' >Manifestações em aberto</Link>
                        </div>
                        <div className="option in-progress" onClick={() => {activeNavigation('in-progress'); navigate('/administrador/manifests/in-progress')}}>
                            <Link to='/administrador/manifests/in-progress' >Manifestações em andamento</Link>
                        </div>
                        <div className="option complete" onClick={() => {activeNavigation('complete'); navigate('/administrador/manifests/complete')}}>
                            <Link to='/administrador/manifests/complete' >Manifestações concluídas</Link>
                        </div>
                        <div className="option users" onClick={() => {activeNavigation('users'); navigate('/administrador/clients')}}>
                            <Link to='/administrador/clients' >Usuários cadastrados</Link>
                        </div>
                        <div className="option export-data" onClick={() => {activeNavigation('export-data'); navigate('/administrador/export-data')}}>
                            <Link to='#' >Exportar dados</Link>
                        </div>
                        <div className="option">
                            <Link to='#'  onClick={logOut}>Sair</Link>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className='screens-context'>
                <NavBar />
                <Outlet />
                <div className='footer'>
                    © 2023 ABRAPHEM. TODOS OS DIREITOS RESERVADOS | Desenvolvido por XXXXXXXXXXX
                </div>
            </div>
        </div>
    )
}