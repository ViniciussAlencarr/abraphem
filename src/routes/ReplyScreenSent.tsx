import { VscThreeBars } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { MenuOptions } from '../components/MenuOptions';
import { useEffect, useState } from 'react';

import './css/ReplyScreenSent.css'
import './css/media-layout.css';

import arrowUpIcon from '../assets/arrow-up.svg'


export const ReplyScreenSent = () => {
    const [open, setOpen] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
    }, [])

    const setDivToTop = () => {
        window.scrollTo(0, 0);
    }
    return (
        <div className='request-screen-container'>
            <MenuOptions open={open} />
            <hr />
            <div className='header-info'>
                <button className="options-btn" onClick={() => setOpen(!open)}>
                    <VscThreeBars size={30} />
                </button>
                <span className='header-info-title'>MANIFESTAÇÃO ENVIADA COM SUCESSO</span>
            </div>
            <hr />
            <div id='reply-response-container' className='navigation-context'>
                <div className='navitation-start'>
                    <span>Ínicio</span>
                    <IoIosArrowForward style={{ opacity: '.2'}} />
                </div>
                <div>
                    <span>Descrição</span>
                    <IoIosArrowForward style={{ opacity: '.2'}} />
                </div>
                <div>
                    <span>Revisão</span>
                    <IoIosArrowForward style={{ opacity: '.2'}} />
                </div>
                <div className='current'>
                    <span>Manifestação enviada</span>
                </div>
            </div>
            <div className='reply-response-container'>
                <div className="reply-response">
                    <div className="title">
                        <p>RESPONDEREMOS SUA SOLICITAÇÃO EM BREVE</p>
                    </div>
                    <div className="advice-message">
                        <p>Por favor, saiba que estamos sempre aqui para você. Se houver algo mais em que possamos ajudar, não hesite em nos contatar. Estamos comprometidos em oferecer um serviço excepcional e continuar a superar suas expectativas.</p>
                        <div className='advice-info'>
                            <p>
                                Sua manifestação será respondida o mais rápido possível.
                            </p>
                            <p>
                                Horário de atendimento da Abraphem Segunda a sexta das 9h00 ás 17h30
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="action-buttons">
                <button className="new-request" onClick={() => navigate('/manifest/new')}>
                    Fazer nova manifestação
                </button>
                <button className="requests" onClick={() => navigate('/manifests')}>
                    Ver minhas manifestações
                </button>
            </div>
            <div onClick={setDivToTop} className='back-to-top'>
                <span>Voltar ao topo</span>
                <img className='logo' src={arrowUpIcon} />
            </div>
        </div>  
    ) 
}
