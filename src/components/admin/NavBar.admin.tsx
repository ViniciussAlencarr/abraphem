import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'

import emailIcon from '../../assets/email-icon.svg'
import ringtoneIcon from '../../assets/ringtone-icon.svg'
import defaultProfile from '../../assets/profile.svg'
import '../css/admin/Navbar.admin.css'
import '../../routes/css/admin/media-layout.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { MdArrowDropDown } from 'react-icons/md'

export const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [openOptions, setOpenOptions] = useState(false)
    const [username, setUsername] = useState('');
    
    const navigate = useNavigate()

    const getUser = async () => {
        try {
            const userId = localStorage.getItem('adm_user_id');
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
                <div className="actions relative">
                    <div className="action-icons">
                        <button className='action-btn action-email-btn'>
                            <img className='icon' src={emailIcon}/>
                        </button>
                        <button className='action-btn action-ringtone-btn'>
                            <img className='icon' src={ringtoneIcon}/>
                        </button>
                    </div>
                    <div className='options-container relative flex justify-center'>
                        <div onClick={() => setOpenOptions(!openOptions)} className='bg-[#FF0000] w-fit flex items-center gap-2 p-2 rounded-lg cursor-pointer'>
                            <div><img className='w-[40px] h-[40px] rounded-full' src={defaultProfile} alt="" /></div>
                            <div className='flex gap-1 items-center'>
                            <div className='uppercase text-white text-[12px] sm:text-[14px] lg:text-[14px]'>{username}</div>
                            <div><MdArrowDropDown className='text-white text-[25px] sm:text-[30px] lg:text-[30px]' /></div>
                            </div>
                        </div>
                        {openOptions && <div className='absolute top-[51px] grid gap-1 border-[2px] w-full rounded-b-md bg-white z-30  border-[red]'>
                                <Link onClick={() => setOpenOptions(!openOptions)} to={'/administrador/account/user'} className='px-3 py-2 border-b-[2px] border-b-[red] no-underline text-black hover:underline cursor-pointer'>Alterar meus dados</Link>
                                <button onClick={logOut} className=' text-left no-underline px-3 py-2 text-black hover:underline cursor-pointer'>Sair</button>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
