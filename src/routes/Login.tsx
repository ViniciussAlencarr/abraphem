import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc';
import { Col, Container, Row, Table } from 'react-bootstrap'

import './css/Login.css'
import './css/media-layout.css'

import logo from '../assets/logo.png'
import reCaptchaLogo from '../assets/reCaptchaLogo.svg'

export const Login = () => {
    return (
        <div className='login-container'>
            <div className='login-header'>
                <div className="logo-container">
                    <Link to="/">
                        <img className='logo' src={logo} alt="" />
                    </Link>
                </div>
                <div className='login-content'>
                    <p className='title'>Para continuar, faça o login</p>
                    <form id="form-login" className='form-login'>
                        <p className='title'>Login Abraphem</p>
                        <div className='form-field cpf'>
                            <label htmlFor="cpf">CPF</label>
                            <input id="cpf" type="text"/>
                        </div>
                        <div className='form-field password'>
                            <label htmlFor="password">Senha</label>
                            <input id="password" type="password"/>
                        </div>
                    </form>
                    <div className='register-account'>
                        <div className='register-redirect'>
                            <span>Não possui usuário? <b><Link to="">Criar conta</Link></b></span>
                        </div>
                        <div className="forget-password">
                            <Link to="">Esqueci a senha</Link>
                        </div>
                    </div>
                    <div className="captcha">
                        <div className="captcha-content">
                            <div className="captcha-input">
                                <input type="checkbox" name="" className="captcha-value-input" id="captcha-value-input" />
                                <label htmlFor="captcha-value-input">I am not  a robot</label>
                            </div>
                            <div className="captcha-logo">
                                <img className='logo' src={reCaptchaLogo} alt="" />
                            </div>
                        </div>
                    </div>
                    <button className='login-button'>Entrar</button>
                    <hr />
                    <span className='separator-span'>OU</span>
                    <div className='google-login-info'>
                        <FcGoogle size={30} />
                        <span>Continue com o google</span>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='tables'>
                    <Table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Titulo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Titulo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Titulo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Titulo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <p className='copyright-info'>© 2023 ABRAPHEM. TODOS OS DIREITOS RESERVADOS| Desenvolvido por XXXXXXXXXXX</p>
            </div>
        </div>
    )
}
