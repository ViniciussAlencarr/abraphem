import { VscThreeBars } from 'react-icons/vsc'
import { useEffect, useState } from 'react';

import './css/Signin.css'
import './css/media-layout.css'

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
            <MenuOptions open={open} />
            <hr />
            <div className='header-info'>
                <button className="options-btn" onClick={() => setOpen(!open)}>
                    <VscThreeBars size={30} />
                </button>
                <span className='header-info-title'>Cadastro usuário</span>
            </div>
            <hr />
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
        </div>
    )
}