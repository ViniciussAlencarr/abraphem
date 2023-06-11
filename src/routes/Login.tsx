import React from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc';
import { Col, Container, Row, Table } from 'react-bootstrap'

import './css/Login.css'

export const Login = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <div className='login-container'>
                        <div className="logo">
                            <Link to="/">Logo</Link>
                        </div>
                        <hr />
                        <div className='login-content'>
                            <p className='title'>Para continuar, faça o login</p>
                            <form id="form-login" className='form-login'>
                                <p className='title'>Login Abraphem</p>
                                <div className='form-field email'>
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="email"/>
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
                            <button className='login-button'>Entrar</button>
                            <hr />
                            <span>OU</span>
                            <div className='google-login-info'>
                                <FcGoogle size={30} />
                                <span>Continue com o google</span>
                            </div>
                        </div>
                    </div>
                    <div className='footer-bottom'>
                    <Table className="table table-borderless">
                        <thead>
                            <tr>
                            <th scope="col">Titulo</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Titulo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Informação</td>
                            <td>Informação</td>
                            <td>Informação</td>
                            <td>Informação</td>
                            </tr>
                            <tr>
                            <td>Informação</td>
                            <td>Informação</td>
                            <td>Informação</td>
                            <td>Informação</td>
                            </tr>
                            <tr>
                            <td>Informação</td>
                            <td>Informação</td>
                            <td>Informação</td>
                            <td>Informação</td>
                            </tr>
                            <tr>
                            <td>Informação</td>
                            <td>Informação</td>
                            <td>Informação</td>
                            <td>Informação</td>
                            </tr>
                            <tr>
                            <td>Informação</td>
                            <td>Informação</td>
                            <td>Informação</td>
                            <td>Informação</td>
                            </tr>
                            <tr>
                            <td>Informação</td>
                            <td>Informação</td>
                            <td>Informação</td>
                            <td>Informação</td>
                            </tr>
                        </tbody>
                    </Table>
                    <p className='copyright-info'>© 2023 ABRAPHEM. TODOS OS DIREITOS RESERVADOS| Desenvolvido por XXXXXXXXXXX</p>
                </div>
                </Col>
            </Row>
        </Container>
    )
}
