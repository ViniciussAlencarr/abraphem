
import { useState } from 'react';
import { Button, Card, Collapse } from 'react-bootstrap';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/minimal-logo.svg'

import './css/MenuOptions.css'
import '../routes/css/media-layout.css'

export const MenuOptions = (params: { open: boolean }) => {
    const [myUserTab, setMyUserTab] = useState(true);
    const [helpTab, setHelpTab] = useState(true);

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
    const classNames = (...classes: any[]) => classes.filter(Boolean).join(' ')

    return (
        <div className='relative'>
            {params.open && <div className='absolute top-10 border-[2px] z-50 bg-white border-[red] sm:min-w-[250px] lg:min-w-[400px] hidden sm:grid lg:block !border-l-0'>
                <div className='flex px-4 py-1 items-center gap-2'>
                    <div ><img className='w-7 h-7' src={logo} alt="" /></div>
                    <div className='uppercase font-bold text-[red]'>Selecione uma opção</div>
                </div>
                <div className='border-t-[2px] border-t-[red]'>
                    <div className='border-b-[2px] grid border-b-[red]'>
                        <div className='pl-[60px] pr-4 py-1 cursor-pointer flex justify-between items-center' onClick={() => setMyUserTab(!myUserTab)}>
                            <div className='text-[18px] uppercase font-medium'>Meu usuário</div>
                            <div><IoIosArrowDown className={classNames('arrow-down-icon transition-all', myUserTab && 'rotate-180' )} size={20}/></div>
                        </div>
                        {myUserTab && <div className='pl-[60px] pr-4 py-1  grid gap-2 bg-[#ECBEBE]'>
                            <Link to={'/'}  className='hover:underline no-underline text-[#100410]  cursor-pointer uppercase py-1'>Início</Link>
                            <Link to={'/manifest/new'}  className='hover:underline no-underline text-[#100410]  cursor-pointer uppercase pb-1'>Nova manifestação</Link>
                            <Link to={'/manifests'}  className='hover:underline no-underline text-[#100410]  cursor-pointer uppercase pb-1'>Minhas manifestações</Link>
                            <Link onClick={logOut} to={''}  className='hover:underline no-underline text-[#100410] cursor-pointer uppercase py-1'>Sair</Link>
                        </div>}
                    </div>
                    <div className='grid'>
                        <div className='cursor-pointer py-1 pl-[60px] pr-4 flex justify-between items-center' onClick={() => setHelpTab(!helpTab)}>
                            <div className='text-[18px] uppercase font-medium'>Ajuda</div>
                            <div><IoIosArrowDown className={classNames('arrow-down-icon transition-all', helpTab && 'rotate-180' )} size={20}/></div>
                        </div>
                        {helpTab && <div className='pl-[60px] pr-4 grid gap-2 bg-[#ECBEBE]'>
                            <Link to="/faq" className='hover:underline cursor-pointer uppercase py-2 no-underline text-[#100410]'>Perguntas frequentes</Link>
                        </div>}
                    </div>
                </div>
            </div>}
        </div>
    )

    /* return (
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
    ) */
}