import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from '../services/api'

import './css/Login.css'
import './css/media-layout.css'
import 'react-toastify/dist/ReactToastify.css';

import reCaptchaLogo from '../assets/reCaptchaLogo.svg'
import logo from '../assets/logo-white.svg'
import { ThemeContext } from '../contexts/teste'

export const Login = () => {
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const { setIsLoggedIn } = useContext(ThemeContext);
    
    const navigate = useNavigate()
    const { search } = useLocation()

    const cpfMask = (value: string) => {
        return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (search.includes('sessionExpired')) {
                clearInterval(interval)
                setIsLoggedIn(false)
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
            } else if (search.includes('loginRequired')) {
                clearInterval(interval)
                if (search.includes('createManifest')) {
                    toast.warn('Crie uma conta ou faça login para criar uma manifestação.', {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        toastId: 'create-manifest-required',
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else if (search.includes('myUser')) {
                    toast.warn('Crie uma conta ou faça login acessar os seus dados.', {
                        position: "top-right",
                        autoClose: false,
                        toastId: 'myuser-login-required',
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else if (search.includes('seeManifests')) {
                    toast.warn('Crie uma conta ou faça login acessar suas manifestações.', {
                        toastId: 'manifest-login-required',
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                window.history.pushState({}, document.title, window.location.pathname);
            }
        }, 100)
    }, [])   


    const login = (event: any) => {
        event.preventDefault();
        const id = toast.loading("Fazendo login...")

        const makeLogin = async () => {
            try {
                const { data } = await api.post('/login?role=2', { document: cpf, password })
                toast.update(id, { render: "Login realizado com sucesso", type: "success", isLoading: false, autoClose: 1000 });
                api.defaults.headers.Authorization = `Bearer ${data.token}`;
                localStorage.setItem('user_id', data.user.id)
                localStorage.setItem('bearer_token', data.token)
                setIsLoggedIn(true)
                setTimeout(() => navigate('/'), 500)
            } catch (err: any) {
                console.log(err)
                if (err?.name === 'AxiosError') {
                    toast.update(id, { render: err.response.data.message, type: "error", isLoading: false, autoClose: 5000 });
                } else {
                    toast.update(id, {render: "Ocorreu um problema ao realizar o login", type: "error", isLoading: false, autoClose: 5000 });
                }
                throw err
            }
        }
        makeLogin()
        /* toast.promise(
            makeLogin,
            {
                pending: 'Fazendo login...',
                success: {
                    render() {
                        setIsLoggedIn(true)
                        setTimeout(() => navigate('/'), 500)
                        return 'Login realizado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao realizar o login'
            }, {
                autoClose: 1000
            }
        ) */
    }
    return (
        <div className='login-container'>
            <div className='login-header'>
                <div className="logo-container flex justify-center">
                    <Link to="/">
                        <img className='logo' src={logo} alt="" />
                    </Link>
                </div>
                <hr />
                <div className='login-container-form'>
                    <form onSubmit={login} className='login-content'>
                        <p className='title'>Para continuar, faça o login</p>
                        <div id="form-login" className='form-login'>
                            <p className='title'>LOGIN OUVIDORIA DA ABRAPHEM</p>
                            <div className='form-field cpf'>
                                <label htmlFor="cpf">CPF</label>
                                <input required id="cpf" type="text" value={cpf} onChange={event => setCpf(cpfMask(event.target.value))}/>
                            </div>
                            <div className='form-field password'>
                                <label htmlFor="password">Senha</label>
                                <input required id="password" type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                            </div>
                        </div>
                        <div className='register-account'>
                            <div className='register-redirect'>
                                <span>Não possui usuário? <b><Link to="/signin">Criar conta</Link></b></span>
                            </div>
                            <div className="forget-password">
                                <Link to="/recovery-password">Esqueci a senha</Link>
                            </div>
                        </div>
                        <div className="captcha">
                            <div className="captcha-content">
                                <div className="captcha-input">
                                    <input required type="checkbox" name="" className="captcha-value-input" id="captcha-value-input" />
                                    <label htmlFor="captcha-value-input">Não sou um robô</label>
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
        </div>
    )
}
