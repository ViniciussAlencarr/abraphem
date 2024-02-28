
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/minimal-logo.svg'

import './css/MenuOptions.css'
import '../routes/css/media-layout.css'

export const MenuOptions = (params: { open: boolean }) => {
    const [myUserTab, setMyUserTab] = useState(true);
    const [helpTab, setHelpTab] = useState(true);

    const navigate = useNavigate()

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
}