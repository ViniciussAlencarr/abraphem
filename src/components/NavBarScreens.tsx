import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import { validateUserSession } from '../utils/validateSession.utils'

import api from '../services/api'

import './css/NavBarScreens.css'
import '../routes/css/media-layout.css'

import { ThemeContext } from '../contexts/teste'

import logo from '../assets/logo-white.svg'
import defaultProfile from '../assets/profile.svg'
import { MdOutlineKeyboardArrowDown, MdArrowDropDown } from 'react-icons/md'

export const NavBarScreen = () => {
    const [username, setUsername] = useState('');
    const [userImg, setUserImg] = useState(defaultProfile)
    const [searchForOpen, setSearchForOpen] = useState(false);

    const [openOptions, setOpenOptions] = useState(false)
    
    const navigate = useNavigate()
    const { isLoggedIn, setIsLoggedIn } = useContext(ThemeContext);
    
    const logOut = () => {
        setOpenOptions(!openOptions)
        setIsLoggedIn(false);
        localStorage.removeItem('user_id');
        localStorage.removeItem('bearer_token');
        navigate('/login')
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
            <div className='search-content relative' onMouseEnter={() => setSearchForOpen(true)}>
                <input className='search-field' type="text" readOnly placeholder='O que você procura?' />
                <MdOutlineKeyboardArrowDown className="search-icon" size={20} />
                <div>
                {searchForOpen && <div onMouseLeave={() => setSearchForOpen(false)} className='bg-white border-[2px] border-[red] flex z-50 justify-center w-full left-0 absolute top-[40px] sm:top-40 md:top-12 lg:top-10 xl:top-10'>
                        <div className='grid sm:flex lg:grid xl:flex p-3  lg:!gap-5 xl:!gap-5 w-max'>
                            <div className='grid gap-1'>
                                <div className=''>
                                    <div className='uppercase text-[red] text-[12px] lg:text-[16px]'>Usuário</div>
                                    <ul className='w-full'>
                                        <li className='cursor-pointer'>- <span className='hover:underline text-[12px] lg:text-[16px]' onClick={() => navigate('/signin')}>Criar usuário</span></li>
                                        <li className='cursor-pointer'>- <span className='hover:underline text-[12px] lg:text-[16px]' onClick={() => navigate('/account/user')}>Alterar seus dados</span></li>
                                        <li className='cursor-pointer'>- <span className='hover:underline text-[12px] lg:text-[16px]' onClick={() => navigate('/login')}>Fazer login</span></li>
                                    </ul>
                                </div>
                                <div>
                                    <div className='uppercase text-[red] text-[12px] lg:text-[16px]'>Manifestações</div>
                                    <ul className='w-full'>
                                        <li className='cursor-pointer'>- <span className='hover:underline text-[12px] lg:text-[16px]' onClick={() => navigate('/manifest/new')}>Criar manifestação</span></li>
                                        <li className='cursor-pointer'>- <span className='hover:underline text-[12px] lg:text-[16px]' onClick={() => navigate('/manifests')}>Ver manifestações</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='grid gap-1'>
                                <div>
                                    <div className='uppercase text-[red] text-[12px] lg:text-[16px]'>Sobre a plataforma</div>
                                    <ul className='w-full'>
                                        <li className='cursor-pointer'>- <span className='hover:underline text-[12px] lg:text-[16px]'>Sobre nós</span></li>
                                    </ul>
                                </div>
                                <div>
                                    <div className='uppercase text-[red] text-[12px] lg:text-[16px]'>Fale conosco</div>
                                    <ul className='w-full'>
                                        <li className='cursor-pointer'>- <span className='hover:underline text-[12px] lg:text-[16px]' onClick={() => navigate('/faq')}>Perguntas frequentes</span></li>
                                    </ul>
                                </div>
                                <div>
                                    <div className='uppercase text-[red] text-[12px] lg:text-[16px]'>Documentos relevantes</div>
                                    <ul className='w-full'>
                                        <li className='cursor-pointer'>- <a href='https://abraphem-pdfs.s3.amazonaws.com/REGIMENTO+INTERNO.pdf' target='_blank'  className='text-[12px] lg:text-[16px] hover:underline no-underline text-black'>PDF Regimento Interno</a></li>
                                        <li className='cursor-pointer'>- <a href='https://abraphem-pdfs.s3.amazonaws.com/TERMO+DE+USO.docx.pdf' target='_blank'  className='text-[12px] lg:text-[16px] hover:underline no-underline text-black'>PDF Termo de Uso</a></li>
                                        <li className='cursor-pointer'>- <a href='https://abraphem-pdfs.s3.amazonaws.com/PERGUNTAS+E+RESPOSTA+DO+TERMO+LGPD.docx.pdf' target='_blank'  className='text-[12px] lg:text-[16px] hover:underline no-underline text-black'>PDF Pergutas e Respostas</a></li>
                                        <li className='cursor-pointer'>- <a href='https://abraphem-pdfs.s3.amazonaws.com/DECLARA%C3%87%C3%83O+DE+CONSENTIMENTO.docx.pdf' target='_blank'  className='text-[12px] lg:text-[16px] hover:underline no-underline text-black'>PDF Termo de consentimento</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
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
                :  <div className='options-container relative flex justify-center'>
                    <div onClick={() => setOpenOptions(!openOptions)} className='bg-[#FF0000] w-fit flex items-center gap-2 p-2 rounded-lg cursor-pointer'>
                        <div><img className='w-[40px] h-[40px] rounded-full' src={userImg} alt="" /></div>
                        <div className='flex gap-1 items-center'>
                        <div className='uppercase text-white text-[12px] sm:text-[14px] lg:text-[14px]'>{username}</div>
                        <div><MdArrowDropDown className='text-white text-[25px] sm:text-[30px] lg:text-[30px]' /></div>
                        </div>
                    </div>
                    {openOptions && <div className='absolute top-[51px] grid gap-1 border-[2px] w-full rounded-b-md bg-white z-30  border-[red]'>
                            <Link onClick={() => setOpenOptions(!openOptions)} to={'/account/user'} className='px-3 py-2 border-b-[2px] border-b-[red] no-underline text-black hover:underline cursor-pointer'>Alterar meus dados</Link>
                            <button onClick={logOut} className=' text-left no-underline px-3 py-2 text-black hover:underline cursor-pointer'>Sair</button>
                        </div>}
                </div>
            }
        </div>
    )
}
