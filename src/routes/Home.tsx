import { TbCircleArrowUp } from 'react-icons/tb';
import "./css/Home.css"
import themeImg from '../../public/theme-img.svg'
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

export const Home = () => {
    const setDivToTop = () => {
        let div: any = document.querySelector('.content')
        div.scrollTop = 0;
    }
    return (
        <div className='home-container'>
            <div className='content'>
                <div className='header-icon'></div>
                <div className='content-info'>
                    <span className='title'>O QUE VOCÊ QUER FAZER?</span>
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
