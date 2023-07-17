import { TbCircleArrowUp } from 'react-icons/tb';
import themeImg from '../../public/theme-img.svg'
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';

import "./css/Home.css"
import './css/media-layout.css'

export const Home = () => {
    const setDivToTop = () => {
        let div: any = document.querySelector('.content-home')
        div.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <div className='home-container'>
            <div className='content content-home'>
                <div className='header-icon'></div>
                <div className='content-info'>
                    <div className='title'>
                        <div>O QUE VOCÊ QUER FAZER?</div>
                        <div className='help-info'>
                            <span>AJUDA</span>
                            <BsInfoCircle size={20}/>
                        </div>
                    </div>
                    <div className="themes"> 
                        <Table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='theme'>
                                            <div className='theme-img'>
                                                <img className='img' src={themeImg} alt="" />
                                            </div>
                                            <div className='theme-info'>
                                                <span className='theme-name'>Tema 1</span>
                                                <span className='theme-description'>DESCRIÇÃO</span>
                                            </div>
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
                    <Link className='consult-request' to="/firstScreen">CONSULTE SUA SOLICITAÇÃO</Link>
                    <Link className='common-questions' to="/">PERGUNTAS FREQUENTES</Link>
                </div>
                <div onClick={setDivToTop} className='back-to-top'>
                    <span>VOLTAR AO TOPO</span>
                    <TbCircleArrowUp size={20} />
                </div>
            </div>
        </div>
    )
}
