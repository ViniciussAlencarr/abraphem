
import { useState } from 'react';
import { Button, Card, Collapse } from 'react-bootstrap';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/minimal-logo.svg'

import './css/MenuOptions.css'
import '../routes/css/media-layout.css'

export const MenuOptions = (params: { open: boolean }) => {
    const [userTabOpen, setUserTabOpen] = useState(false);
    const [helpTabOpen, setHelpTabOpen] = useState(false);

    const navigate = useNavigate()

    const activeToggle = (parentClassName: string) => {
        let element: any = document.querySelector(`.${parentClassName} .button-context`)
        element.classList.toggle('active')
    }
    const logOut = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('bearer_token');
        navigate('/login')
    }

    return (
        <div className='option-menu'>
            <Collapse in={params.open} dimension="width">
                <div>
                    <Card body style={{ width: '400px' }}>
                        <div className="header-card">
                            <img className='logo' src={logo} alt="" />
                            <div className="title">
                                Selecione uma opção
                            </div>
                        </div>
                        <div className="content-menu">
                            <div className="tab-content user-tab-content">
                                <div className="button-context" onClick={() => {setUserTabOpen(!userTabOpen); activeToggle('user-tab-content')}}>
                                    <Button
                                        className='open-tab-btn user-tab-btn'
                                        onClick={() => setUserTabOpen(!userTabOpen)}
                                        aria-expanded={userTabOpen}
                                    >
                                        Meu usuário
                                    </Button>
                                    <IoIosArrowDown className='arrow-down-icon' size={20}/>
                                </div>
                                <Collapse in={userTabOpen}>
                                    <div className='redirect-links'>
                                        <div className='links-btns'>
                                            <Link className='link' to="/">Início</Link>
                                            <Link className='link' to="/manifest/new">Nova manifestação</Link>
                                            <Link className='link' to="/manifests">Minhas manifestações</Link>
                                            <Link className='link' to="" onClick={logOut}>Sair</Link>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="tab-content help-tab-content">
                                <div className="button-context" onClick={() => {setHelpTabOpen(!helpTabOpen); activeToggle('help-tab-content')}}>
                                    <Button
                                        className='open-tab-btn'
                                        onClick={() => setHelpTabOpen(!helpTabOpen)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={helpTabOpen}
                                    >
                                        Ajuda
                                    </Button>
                                    <IoIosArrowDown className='arrow-down-icon' size={20}/>
                                </div>
                                <Collapse in={helpTabOpen}>
                                    <div className='redirect-links'>
                                        <div className='links-btns'>
                                            <Link className='link' to="/faq">Perguntas frequentes</Link>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </Card>
                </div>
            </Collapse>
        </div>
    )
}