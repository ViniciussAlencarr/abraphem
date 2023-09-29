import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"

import api from "../services/api"

import './css/RecoveryPassword.css'
import './css/media-layout.css'

export const RecoveryPassword = () => {
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [tokenState, setTokenState] = useState(false)
    const [enableRecoveryPassword, setEnableRecoveryPassword] = useState(false)
    const [userId, setUserId] = useState('')

    const navigate = useNavigate()

    const searchUserByEmail = async () => {
        try {
            const { data } = await api.get(`/user-by-email/${email}`)
            setUserId(data[0].id)
        } catch (err) {
            toast.error(`O usuário com o email '${email}' não existe.`)
            throw err
        }
    }
    const onSubmit = (event: any) => {
        event.preventDefault()
        const sendEmail = async () => {
            await searchUserByEmail()
            await api.post('/sendEmail', {
                from: 'Acme <onboarding@resend.dev>',
                to: [email],
                subject: 'Hello World',
                html: '<strong>It works!</strong>'
            })
        }
        toast.promise(
            sendEmail,
            {
                pending: 'Enviando e-mail...',
                success: {
                    render() {
                        setTokenState(true)
                        return 'E-mail enviado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao enviar o e-mail'
            }
        )
    }
    const validateToken = (event: any) => {
        event.preventDefault()
        const validate = async () => {
            await api.post('/health', { token })
        }
        toast.promise(
            validate,
            {
                pending: 'Validando o token...',
                success: {
                    render() {
                        setEnableRecoveryPassword(true)
                        return 'O seu token é valido!'
                    }
                },
                error: 'O token expirou ou não é válido, tente novamente.'
            }
        )
    }

    const comparePassword = () => {
        if (newPassword != repeatNewPassword) throw toast.error('As senhas não coincidem.')
    }
    const updatePassword = (event: any) => {
        event.preventDefault()
        comparePassword()
        const update = async () => {
            await api.put(`/user/${userId}`, { password: newPassword })
        }
        toast.promise(
            update,
            {
                pending: 'Atualizando senha...',
                success: {
                    render() {
                        setTimeout(() => navigate('/login'), 500)
                        return 'Senha atualizada com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao alterar a senha.'
            }
        )
    }
    return (
        <div className="recovery-password-container">
            <div className="title">Recuperação de senha</div>
            <div className="recovery-password-context">
                {
                    !enableRecoveryPassword ? <>
                        {
                            tokenState ? <form className="form-data" onSubmit={validateToken}>
                                <div className="input-context token-value">
                                    <label htmlFor="token-value">Token</label>
                                    <input
                                        required
                                        value={token}
                                        onChange={event => setToken(event.target.value)}
                                    type="text" className="input-text email-value" id="token-value" placeholder="Insira o token aqui" />

                                </div>
                                <button type="submit" className="submit-button">Validar</button>
                            </form>
                            : <form className="form-data" onSubmit={onSubmit}>
                                <div className="message-info">
                                    Para recuperar a sua senha, informe seu endereço de e-mail cadastrado que nós enviaremos um token que será ultilizado para realizar a alteração da sua senha.
                                </div>
                                <div className="input-context date-birth">
                                    <label htmlFor="email-value">Email</label>
                                    <input
                                        required
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                        type="email" className="input-text email-value" id="email-value" placeholder="Digite aqui" />
                                </div>
                                <button type="submit" className="submit-button">Enviar e-mail</button>
                            </form>
                        }
                    </>: 
                    <form className="form-data" onSubmit={updatePassword}>
                        <div className="input-context new-password">
                            <label htmlFor="new-password-value">Nova senha*</label>
                            <input
                                required
                                value={newPassword}
                                onChange={event => setNewPassword(event.target.value)}
                                type="password" className="input-text email-value" id="new-password-value" />
                        </div>
                        <div className="input-context repeat-new-password">
                            <label htmlFor="repeat-new-password">Confime a nova senha*</label>
                            <input
                                required
                                value={repeatNewPassword}
                                onChange={event => setRepeatNewPassword(event.target.value)}
                                type="password" className="input-text email-value" id="repeat-new-password" />
                        </div>
                        <button type="submit" className="submit-button">Alterar</button>
                    </form>
                    
                }
            </div>
        </div>
    )
}