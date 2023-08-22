import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import api from '../services/api'

import './css/Login.css'
import './css/media-layout.css'
import 'react-toastify/dist/ReactToastify.css';

import reCaptchaLogo from '../assets/reCaptchaLogo.svg'
import logo from '../assets/logo-white.svg'

export const Login = () => {
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate()
    const { search } = useLocation()

    useEffect(() => {
        let interval = setInterval(() => {
            if (search.includes('sessionExpired')) {
                clearInterval(interval)
                toast.warn('Sua sessão expirou, faça login novamente.', {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                window.history.pushState({}, document.title, window.location.pathname);
            }
        }, 100)
    }, [])    

    const login = () => {
        let errorMsg = cpf == '' && password == '' ? 'Os campos são obrigatorios' : 
            cpf == '' ? 'Insira um valor para o CPF' : 'Digite a senha'
        const makeLogin = async () => {
            try {
                const { data } = await api.post('/login?role=2', { document: cpf, password })
                api.defaults.headers.Authorization = `Bearer ${data.token}`;
                localStorage.setItem('user_id', data.user.id)
                localStorage.setItem('bearer_token', data.token)
            } catch (err) {
                console.log(err)
                throw err
            }
        }
        if (cpf == '' || password == '') return toast.error(errorMsg)
        toast.promise(
            makeLogin,
            {
                pending: 'Fazendo login...',
                success: {
                    render() {
                        setTimeout(() => navigate('/'), 500)
                        return 'Login realizado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao realizar o login'
            }
        )
    }
    return (
        <div className='login-container'>
            <div className='login-header'>
                <div className="logo-container">
                    <Link to="">
                        <img className='logo' src={logo} alt="" />
                    </Link>
                </div>
                <hr />
                <div className='login-container-form'>
                    <div className='login-content'>
                        <p className='title'>Para continuar, faça o login</p>
                        <form id="form-login" className='form-login'>
                            <p className='title'>LOGIN OUVIDORIA DA ABRAPHEM</p>
                            <div className='form-field cpf'>
                                <label htmlFor="cpf">CPF</label>
                                <input id="cpf" type="text" value={cpf} onChange={event => setCpf(event.target.value)}/>
                            </div>
                            <div className='form-field password'>
                                <label htmlFor="password">Senha</label>
                                <input id="password" type="password" value={password} onChange={event => setPassword(event.target.value)}/>
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
                        <button className='login-button' onClick={login}>Entrar</button>
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
            <ToastContainer />
        </div>
    )
}
