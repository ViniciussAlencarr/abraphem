import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { Table } from 'react-bootstrap';
import api from '../../services/api'
import { useEffect, useState } from 'react';

import logo from '../../assets/logo-white.svg'
import reCaptchaLogo from '../../assets/reCaptchaLogo.svg'
import partner1 from '../../assets/patrocinador1.png'
import partner2 from '../../assets/patrocinador02.png'

import 'react-toastify/dist/ReactToastify.css';
import '../css/admin/media-layout.css'
import '../css/admin/Login.admin.css'

export const LoginAdmin = () => {
    const [email, setEmail] = useState('')
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

    const login = (event: any) => {
        event.preventDefault();
        const makeLogin = async () => {
            try {
                const { data } = await api.post('/loginAdm?role=1', { email, password })
                api.defaults.headers.Authorization = `Bearer ${data.token}`;
                localStorage.setItem('adm_user_id', data.user.id)
                localStorage.setItem('adm_bearer_token', data.token)
            } catch (err) {
                console.log(err)
                throw err
            }
        }
        toast.promise(
            makeLogin,
            {
                pending: 'Fazendo login...',
                success: {
                    render() {
                        setTimeout(() => navigate('/administrador/welcome'), 500)
                        return 'Login realizado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao realizar o login'
            }
        )
    }
    return (
        <div style={{ height: '100%' }}>
            <div className="login-admin">
                <div className='login-header'>
                    <div className="logo-container flex justify-center">
                            <Link to="">
                                <img className='logo' src={logo} alt="" />
                            </Link>
                    </div>
                    <div className='login-container-form'>
                        <form onSubmit={login} className='login-content'>
                            <p className='title'>Para continuar, faça o login</p>
                            <div id="form-login" className='form-login'>
                                <p className='title'>PAINEL ADMINISTRATIVO</p>
                                <div className='form-field login-credentials'>
                                    <label htmlFor="login-credentials">lOGIN</label>
                                    <input required id="login-credentials" type="text" value={email} onChange={event => setEmail(event.target.value)}/>
                                </div>
                                <div className='form-field password'>
                                    <label htmlFor="password">Senha</label>
                                    <input required id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} />
                                </div>
                            </div>
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
                                        <input required type="checkbox" name="" className="captcha-value-input" id="captcha-value-input" />
                                        <label htmlFor="captcha-value-input">I am not  a robot</label>
                                    </div>
                                    <div className="captcha-logo">
                                        <img className='logo' src={reCaptchaLogo} alt="" />
                                    </div>
                                </div>
                            </div>
                            <button className='login-button' type='submit'>Entrar</button>
                        </form>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <div className='tables'>
                        <Table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/REGIMENTO+INTERNO.pdf' target='_blank' download='REGIMENTO INTERNO.pdf'>Regimento interno</a></td>
                                </tr>
                                <tr>
                                    <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/TERMO+DE+USO.docx.pdf' target='_blank' download='TERMO DE USO.docx.pdf'>Termo de Uso e Política de Privacidade</a></td>
                                </tr>
                                <tr>
                                    <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/PERGUNTAS+E+RESPOSTA+DO+TERMO+LGPD.docx.pdf' target='_blank' download='PERGUNTAS E RESPOSTAS.docx.pdf'>Perguntas e Respostas</a></td>
                                </tr>
                                <tr>
                                    <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/DECLARA%C3%87%C3%83O+DE+CONSENTIMENTO.docx.pdf' target='_blank' download='DECLARACAO DE CONSENTIMENTO.docx.pdf'>Termo de consentimento</a></td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Patrocinadores</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='flex justify-center'><img className='w-[70%]' src={partner1} alt="" /></td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Patrocinadores</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className='flex justify-center'><img className='w-[60%]' src={partner2} alt="" /></td>
                            </tr>
                            </tbody>
                        </Table>
                        <Table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/REGIMENTO+INTERNO.pdf' target='_blank' download='REGIMENTO INTERNO.pdf'>Regimento interno</a></td>
                                </tr>
                                <tr>
                                    <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/TERMO+DE+USO.docx.pdf' target='_blank' download='TERMO DE USO.docx.pdf'>Termo de Uso e Política de Privacidade</a></td>
                                </tr>
                                <tr>
                                    <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/PERGUNTAS+E+RESPOSTA+DO+TERMO+LGPD.docx.pdf' target='_blank' download='PERGUNTAS E RESPOSTAS.docx.pdf'>Perguntas e Respostas</a></td>
                                </tr>
                                <tr>
                                    <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/DECLARA%C3%87%C3%83O+DE+CONSENTIMENTO.docx.pdf' target='_blank' download='DECLARACAO DE CONSENTIMENTO.docx.pdf'>Termo de consentimento</a></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <p className='copyright-info'>© 2023 ABRAPHEM. TODOS OS DIREITOS RESERVADOS | Desenvolvido por XXXXXXXXXXX</p>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}