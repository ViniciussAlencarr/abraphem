import { useState } from "react"
import { toast } from "react-toastify"

import api from "../services/api"

import './css/RecoveryPassword.css'
import './css/media-layout.css'

export const RecoveryPassword = () => {
    const [email, setEmail] = useState('')

    const onSubmit = (event: any) => {
        event.preventDefault()
        const sendEmail = async () => {
            const { data } = await api.post('/sendEmail', {
                from: 'Acme <onboarding@resend.dev>',
                to: [email],
                subject: 'Hello World',
                html: '<strong>It works!</strong>'
            })
            console.log(data)
        }
        toast.promise(
            sendEmail,
            {
                pending: 'Enviando e-mail...',
                success: {
                    render() {
                        return 'E-mail enviado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao enviar o e-mail'
            }
        )
    }

    return (
        <div className="recovery-password-container">
            <form onSubmit={onSubmit}>
                <div className="input-context date-birth">
                    <label htmlFor="email-value">Email</label>
                    <input
                        required
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    type="email" className="input-text email-value" id="email-value" placeholder="Digite aqui" />
                </div>
                <button type="submit">Enviar e-mail</button>
            </form>
        </div>
    )
}