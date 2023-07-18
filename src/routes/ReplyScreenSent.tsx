import { VscThreeBars } from 'react-icons/vsc';
import { BsInfoCircle } from 'react-icons/bs';
import { TbCircleArrowUp } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import './css/ReplyScreenSent.css'
import './css/media-layout.css';

export const ReplyScreenSent = () => {
    const navigate = useNavigate();

    const setDivToTop = () => {
        window.scrollTo(0, 0);
    }
    return (
        <div className='request-screen-container'>
            <hr />
            <div className='header-info'>
                <button className="options-btn">
                    <VscThreeBars size={30} />
                </button>
                <span className='header-info-title'>SOLICITAÇÃO ENVIADA COM SUCESSO</span>
                <button className='help-info screens request-screen' onClick={() => navigate('/faq')}>
                    <span>AJUDA</span>
                    <BsInfoCircle size={20}/>
                </button>
            </div>
            <hr />
            <div className="reply-response">
                <div className="title">
                    <p>RESPONDEREMOS SUA SOLICITAÇÃO EM BREVE</p>
                </div>
                <div className="advice-message">
                    <p>Por favor, saiba que estamos sempre aqui para você. Se houver algo mais em que possamos ajudar, não hesite em nos contatar. Estamos comprometidos em oferecer um serviço excepcional e continuar a superar suas expectativas.</p>
                </div>
            </div>
            <div className="action-buttons">
                <button className="new-request" onClick={() => navigate('/request/new')}>
                    Fazer nova solicitação
                </button>
                <button className="requests" onClick={() => navigate('/requests')}>
                    Ver minhas solicitações
                </button>
            </div>
            <div onClick={setDivToTop} className='back-to-top'>
                <span>VOLTAR AO TOPO</span>
                <TbCircleArrowUp size={15} />
            </div>
        </div>  
    ) 
}
