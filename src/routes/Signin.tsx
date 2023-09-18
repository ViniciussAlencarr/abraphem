import { IoIosArrowForward } from 'react-icons/io'
import { VscThreeBars } from 'react-icons/vsc'
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import './css/Signin.css'

import { SigninPatientContext } from '../components/SigninPatientContext'
import { SiginResponsibelContext } from '../components/SigninResponsibleContext'
import { MenuOptions } from '../components/MenuOptions';

export const Signin = () => {
    const [open, setOpen] = useState(false);
    const [patient, setPatientType] = useState(true)
    const [category, setCategory] = useState('')

    useEffect(() => {
    }, [])

    return (
        <div className='signin-container'>
            <hr />
            <div className='header-info'>
                <button className="options-btn" onClick={() => setOpen(!open)}>
                    <VscThreeBars size={30} />
                </button>
                <span className='header-info-title'>Cadastro usuário</span>
            </div>
            <hr />
            <div className='navigation-context'>
                <div className='navigation-start'>
                    <span>Ínicio</span>
                    <IoIosArrowForward style={{ opacity: '.2'}} />
                </div>
                <div className='navigation-start'>
                    <span className='current'>Cadastro usuário</span>
                </div>
            </div>
            <MenuOptions open={open} />
            <div className="signin-content">
                <div className='mandatory-info'>
                    OS CAMPOS SINALIZADOS COM ASTERÍSCO (*) SÃO DE PREENCHIMENTO OBRIGATÓRIO
                </div>
                <div className="title">
                    Dados cadastrais
                </div>
                {
                    !patient ?
                    <SiginResponsibelContext
                        category={category}
                        setCategory={setCategory}
                        setPatientType={setPatientType}
                    /> :
                    <SigninPatientContext
                        category={category}
                        setCategory={setCategory}
                        setPatientType={setPatientType}
                    />
                }
            </div>
            <ToastContainer />
        </div>
    )
}