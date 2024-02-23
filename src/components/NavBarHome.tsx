import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';

import './css/NavBarHome.css'
import '../routes/css/media-layout.css'

import api from '../services/api';

import { ThemeContext } from '../contexts/teste';

import logo from '../assets/logo-white.svg'
import defaultProfile from '../assets/profile.svg'

import { validateUserSession } from '../utils/validateSession.utils';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

export const NavBarHome = () => {
    const [userImg, setUserImg] = useState(defaultProfile)
    const [username, setUsername] = useState('');
    const [searchForOpen, setSearchForOpen] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(ThemeContext);

    const [userTab, setUserTab] = useState(false)
    const [faqTab, setFaqTab] = useState(false)
    const [manifestsTab, setManifestsTab] = useState(false)
    const [aboutUs, setAboutUs] = useState(false)
    const [docsTab, setDocsTab] = useState(false)

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
        <div className='nav-container relative'>
            <div className='logo-container'>
                <Link className='navbar-brand' to="/">
                    <img width={250} className='logo' src={logo} alt="" />
                </Link>
            </div>
            <div className='search-content relative' onMouseEnter={() => setSearchForOpen(true)}>
                <input className='search-field' type="text" readOnly placeholder='O que você procura?' />
                <MdOutlineKeyboardArrowDown className="search-icon" size={20} /> 
                {searchForOpen && <div onMouseLeave={() => setSearchForOpen(false)} className='bg-white border-[2px] border-[red] flex z-50 justify-center w-full left-0 absolute top-10'>
                    <div className='min-w-[400px] flex justify-around p-3 gap-3'>
                        <div className='grid gap-2'>
                            <div className='relative grid gap-2 items-center cursor-pointer '>
                                <div onClick={() => setUserTab(!userTab)}  className='flex gap-2 items-center hover:opacity-75'>
                                    <div>Usuário</div>
                                    <div><IoIosArrowDown  /></div>
                                </div>
                                {userTab && <div onMouseLeave={() => setUserTab(!userTab)} className='absolute top-[30px] bg-white z-50 border border-black p-2 grid gap-2'>
                                    <div onClick={() => navigate('/signin')} className='hover:opacity-75 hover:underline'>Criar usuário</div>
                                    <div onClick={() => navigate('/account/user')}  className='hover:opacity-75 hover:underline'>Alterar seus dados</div>
                                    <div onClick={() => navigate('/login')} className='hover:opacity-75 hover:underline'>Fazer login</div>
                                </div>}
                            </div>
                            <div className='relative grid gap-2 items-center cursor-pointer '>
                                <div onClick={() => setManifestsTab(!manifestsTab)}  className='flex gap-2 items-center hover:opacity-75'>
                                    <div>Manifestações</div>
                                    <div><IoIosArrowDown  /></div>
                                </div>
                                {manifestsTab && <div onMouseLeave={() => setManifestsTab(!manifestsTab)} className='absolute top-[30px] bg-white z-50 border border-black p-2 grid gap-2'>
                                    <div onClick={() => navigate('/manifest/new')} className='hover:opacity-75 hover:underline'>Criar manifestação</div>
                                    <div onClick={() => navigate('/manifests')} className='hover:opacity-75 hover:underline'>Ver manifestações</div>
                                </div>}
                            </div>
                            <div className='relative grid gap-2 items-center cursor-pointer '>
                                <div onClick={() => setAboutUs(!aboutUs)}  className='flex gap-2 items-center hover:opacity-75'>
                                    <div>Sobre a plataforma</div>
                                    <div><IoIosArrowDown  /></div>
                                </div>
                                {aboutUs && <div onMouseLeave={() => setAboutUs(!aboutUs)} className='absolute top-[30px] bg-white z-50 border border-black p-2 grid gap-2'>
                                    <div className='hover:opacity-75 hover:underline'>Sobre nós</div>
                                </div>}
                            </div>
                        </div>
                        <div className='grid gap-2'>
                            <div className='relative grid gap-2 items-center cursor-pointer '>
                                <div onClick={() => setFaqTab(!faqTab)}  className='flex gap-2 items-center hover:opacity-75'>
                                    <div>Fale conosco</div>
                                    <div><IoIosArrowDown  /></div>
                                </div>
                                {faqTab && <div onMouseLeave={() => setFaqTab(!faqTab)} className='absolute top-[30px] bg-white z-50 border border-black p-2 grid gap-2'>
                                    <div onClick={() => navigate('/faq')} className='hover:opacity-75 hover:underline'>Perguntas frequentes</div>
                                </div>}
                            </div>
                            <div className='relative grid gap-2 items-center cursor-pointer '>
                                <div onClick={() => setDocsTab(!docsTab)}  className='flex gap-2 items-center hover:opacity-75'>
                                    <div>Documentos relevantes</div>
                                    <div><IoIosArrowDown  /></div>
                                </div>
                                {docsTab && <div onMouseLeave={() => setDocsTab(!docsTab)} className='absolute top-[30px] bg-white z-50 border border-black p-2 grid gap-2'>
                                    <a href='https://abraphem-pdfs.s3.amazonaws.com/REGIMENTO+INTERNO.pdf' target='_blank'  className='hover:opacity-75 hover:underline no-underline text-black'>PDF Regimento Interno</a>
                                    <a href='https://abraphem-pdfs.s3.amazonaws.com/TERMO+DE+USO.docx.pdf' target='_blank'  className='hover:opacity-75 hover:underline no-underline text-black'>PDF Termo de Uso</a>
                                    <a href='https://abraphem-pdfs.s3.amazonaws.com/PERGUNTAS+E+RESPOSTA+DO+TERMO+LGPD.docx.pdf' target='_blank'  className='hover:opacity-75 hover:underline no-underline text-black'>PDF Pergutas e Respostas</a>
                                    <a href='https://abraphem-pdfs.s3.amazonaws.com/DECLARA%C3%87%C3%83O+DE+CONSENTIMENTO.docx.pdf' target='_blank'  className='hover:opacity-75 hover:underline no-underline text-black'>PDF Termo de consentimento</a>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
            <div className="action-buttons">
                <div className="download-primer-platform">
                    <a target='_blank' href='https://abraphem-pdfs.s3.amazonaws.com/CARTILHA+OUVIDORIA.pdf' className="download-primer-platform-btn no-underline cursor-pointer">Baixar cartilha da plataforma</a>
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
