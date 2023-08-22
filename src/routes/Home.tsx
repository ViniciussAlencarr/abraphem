import { Link, useNavigate } from 'react-router-dom';
import { Carousel, Modal, Table } from 'react-bootstrap';
import { TfiHelpAlt } from "react-icons/tfi"
import { AiOutlineClose } from "react-icons/ai"

import { useEffect, useState } from 'react';

import "./css/Home.css"
import './css/media-layout.css'

import arrowUpIcon from '../assets/arrow-up.svg'
import bannerHome from '../assets/banner-home.svg'

import infoCard from '../assets/CARDS_HOME_informação 1.svg'
import reportCard from '../assets/CARDS_HOME_denuncia 1.svg'
import praiseCard from '../assets/CARDS_HOME_elogio 1.svg'
import complaintCard from '../assets/CARDS_HOME_reclamação 1.svg'
import requestCard from '../assets/CARDS_HOME_solicitação 1.svg'
import suggestionCard from '../assets/CARDS_HOME_sugestão 1.svg'

import { validateUserSession } from '../utils/validateSession.utils'

export const Home = () => {
    const navigate = useNavigate()
    const [smShow, setSmShow] = useState(false);

    useEffect(() => {
        validateUserSession(navigate)
    }, [])

    return (
        <div className='home-container'>
            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                centered
            >
                <Modal.Body>
                    <div className="content">
                        <div className="title">Ajuda</div>
                        <div className="first-info">
                            <div className="info-title">a) Para falar com a ouvidoria, você deve fazer uma manifestação.</div>
                            <div className="info-text">
                                <b>Tipos de manifestação</b>:<br/>
                                <p>
                                    <b>RECLAMAÇÃO</b>: Se você quer demonstrar a sua insatisfação com um serviço público. Você pode fazer críticas, relatar ineficiência. Também se aplica aos casos de omissão. Por exemplo, você procurou um atendimento ou serviço, e não teve resposta.
                                </p>
                                <p>
                                    <b>SOLICITAÇÃO</b>: Se você espera um atendimento ou a prestação de um serviço. Pode ser algo material, como receber um medicamento, ou a ação do órgão em uma situação específica. Por exemplo, se alimentos fora da validade estiverem à venda, você pode solicitar que um órgão público faça uma fiscalização.
                                </p>
                                <p>
                                    <b>INFORMAÇÃO</b>: Se você quer ter acesso à informação pública.
                                </p>
                                <p>
                                    <b>ELOGIO</b>: Se você foi bem atendimento e está satisfeito com o atendimento, e / ou com o serviço que foi prestado.
                                </p>
                                <p>
                                    <b>SIMPLIFIQUE</b>: Se você acha a prestação de um serviço público muito burocrática, poderá apresentar solicitação de simplificação, por meio de formulário próprio, denominado Simplifique!
                                </p>
                                <p>
                                    <b>SUGESTÃO</b>: Se você tiver uma ideia, ou proposta de melhoria dos serviços públicos.
                                </p>
                                <p>
                                    <b>DENÚNCIA</b>: Se você quer comunicar a ocorrência de um ato ilícito ou uma irregularidade praticada contra a administração pública. Também pode ser usada para denunciar uma violação aos direitos humanos. Em alguns casos, a sua manifestação não será classificada como uma denúncia e sim uma solicitação. Por exemplo, se faltam remédios em um hospital público, você poderá fazer uma solicitação para que o órgão tome uma providência. Então, não se trata de uma denúncia.
                                </p>
                            </div>
                        </div>
                        <div className="second-info">
                            <div className="info-title">
                                b) Consulte sua manifestação
                            </div>
                            <div className="info-text">
                                Se você já fez uma manifestação e guardou o número de protocolo, pode acompanhar o andamento. Para isso, clique em “Consulte sua manifestação”. Se você tem um perfil no sistema, clique em “Entrar” para fazer login, e poderá visualizar todo seu histórico de manifestações enviadas.
                            </div>
                        </div>
                    </div>
                    <div className="close-modal"onClick={() => setSmShow(false)}>
                        <button className='close-modal-btn' >Fechar</button>
                        <AiOutlineClose size={17}/>
                    </div>
                </Modal.Body>
            </Modal>
            <div className='content content-home'>
                <div className='header-icon'>
                    <Carousel data-bs-theme="dark">
                        <Carousel.Item><img className='header-banner-img' src={bannerHome} alt="" /></Carousel.Item>
                        <Carousel.Item><img className='header-banner-img' src={bannerHome} alt="" /></Carousel.Item>
                        <Carousel.Item><img className='header-banner-img' src={bannerHome} alt="" /></Carousel.Item>
                        <Carousel.Item><img className='header-banner-img' src={bannerHome} alt="" /></Carousel.Item>
                        <Carousel.Item><img className='header-banner-img' src={bannerHome} alt="" /></Carousel.Item>
                    </Carousel>
                </div>
                <div className='content-info'>
                    <div className='title'>
                        <div>O QUE VOCÊ QUER FAZER?</div>
                        <div className='help-info'onClick={() => setSmShow(true)}>
                            <label className='help-info-label'>Ajuda</label>
                            <button className='help-info-btn' >
                                <TfiHelpAlt size={12} />
                            </button>
                        </div>
                    </div>
                    <div className="themes"> 
                        <Table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={complaintCard} alt="" />
                                            </div>
                                            <div className='theme-description'>Manifeste sua insatisfação com um serviço público</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={requestCard} alt="" />
                                            </div>
                                            <div className='theme-description'>Peça um atendimento ou uma prestação de serviço</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={infoCard} alt="" />
                                            </div>
                                            <div className='theme-description'>Solicite acesso a informações</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={praiseCard} alt="" />
                                            </div>
                                            <div className='theme-description'>Expresse se você está satisfeito com um atendimento</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={suggestionCard} alt="" />
                                            </div>
                                            <div className='theme-description'>Envie uma ideia ou proposta de melhoria dos serviços</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={reportCard} alt="" />
                                            </div>
                                            <div className='theme-description'>Comunique um ato ilícito praticado</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <div className='footer'>
                <div className='redirect-buttons'>
                    <Link className='consult-request' to="/welcome">CONSULTE SUA MANIFESTAÇÃO</Link>
                    <Link className='common-questions' to="/faq">PERGUNTAS FREQUENTES</Link>
                </div>
                <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='back-to-top'>
                    <span>Voltar ao topo</span>
                    <img className='logo' src={arrowUpIcon} />
                </div>
            </div>
        </div>
    )
}
