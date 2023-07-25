import { Link } from 'react-router-dom';
import { Carousel, Table } from 'react-bootstrap';

import "./css/Home.css"
import './css/media-layout.css'

import arrowUpIcon from '../assets/arrow-up.svg'

import infoCard from '../assets/CARDS_HOME_informação 1.svg'
import reportCard from '../assets/CARDS_HOME_denuncia 1.svg'
import praiseCard from '../assets/CARDS_HOME_elogio 1.svg'
import complaintCard from '../assets/CARDS_HOME_reclamação 1.svg'
import requestCard from '../assets/CARDS_HOME_solicitação 1.svg'
import suggestionCard from '../assets/CARDS_HOME_sugestão 1.svg'

export const Home = () => {
    return (
        <div className='home-container'>
            <div className='content content-home'>
                <div className='header-icon'>
                    <Carousel data-bs-theme="dark">
                        <Carousel.Item>Tela 1</Carousel.Item>
                        <Carousel.Item>Tela 2</Carousel.Item>
                        <Carousel.Item>Tela 3</Carousel.Item>
                        <Carousel.Item>Tela 4</Carousel.Item>
                    </Carousel>
                    
                </div>
                <div className='content-info'>
                    <div className='title'>
                        <div>O QUE VOCÊ QUER FAZER?</div>
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
                    <Link className='consult-request' to="/firstScreen">CONSULTE SUA MANIFESTAÇÃO</Link>
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
