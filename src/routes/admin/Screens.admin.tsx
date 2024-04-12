import { NavBar } from '../../components/admin/NavBar.admin'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import '../css/admin/Screens.admin.css'

import logo from '../../assets/logo-white.svg'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

export const AdminScreens = () => {
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem('adm_user_id');
        localStorage.removeItem('adm_bearer_token');
        localStorage.removeItem('adm_user');
        return navigate('/administrador/login')
    }

    const activeNavigation = (className: string) => {
        let allToggledElements = document.querySelectorAll('.active')
        allToggledElements.forEach(element => {
            element.classList.remove('active')
        })
        let activeNavigationElement = document.querySelector(`.option.${className}`)
        activeNavigationElement?.classList.toggle('active')
        localStorage.setItem('lastNavigation', className)
    }

    useEffect(() => {
        let navigation = localStorage.getItem('lastNavigation')
        if (navigation) activeNavigation(navigation)
    }, [])

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
                        {/* <div className="option export-data" onClick={() => {activeNavigation('export-data'); navigate('/administrador/export-data')}}>
                            <Link to='#' >Exportar dados</Link>
                        </div> */}
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
            <ToastContainer />
        </div>
    )
}