import { useState } from "react"
import { toast } from "react-toastify"

import api from "../services/api"

import './css/RecoveryPassword.css'
import './css/media-layout.css'

export const SendMailToRecoveryPassword = () => {
    const [email, setEmail] = useState('')
    const [emailSended, setEmailSended] = useState(false)

    const onSubmit = (event: any) => {
        event.preventDefault()
        const sendEmail = async () => {
            await api.post('/recoveryPassword', {
                userId: '',
                from: 'Abraphem <noreply@ouvidoria.abraphem.org.br>',
                to: [email],
                subject: 'Recuperação de senha',
                html: '<strong>It works!</strong>'
            })
        }
        toast.promise(
            sendEmail,
            {
                pending: 'Enviando e-mail...',
                success: {
                    render() {
                        setEmailSended(true)
                        return 'E-mail enviado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao enviar o e-mail'
            }
        )
    }

    return (
        <div className="border-t-[2px] grid justify-center py-10 gap-7 ">
            <div className="text-[16px] lg:text-[20px] font-medium uppercase text-center">Alterar senha</div>
            {!emailSended && <div>
                <div className="flex justify-center">
                    <div className="text-center w-[80%] sm:w-[50%] lg:w-[50%] text-[14px] lg:text-[16px]">
                        Para recuperar a sua senha, informe seu endereço de e-mail cadastrado que nós enviaremos um link onde você poderá alterar a sua senha.
                    </div>
                </div>
                <div className="grid justify-center">
                    <form onSubmit={onSubmit} className="grid gap-4">
                        <div className="grid gap-1">
                            <label className="uppercase font-semibold" htmlFor="email-value">Email</label>
                            <input
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            required type="email" name="" id="" placeholder="Digite aqui" className="text-[14px] placeholder:uppercase placeholder:text-black py-[6px] px-[16px] text-black border-[1px] border-[red] rounded" />
                        </div>
                        <div className="flex justify-center"><button className="bg-[#C00405] uppercase font-medium text-white p-1 px-4 rounded-lg text-[14px] lg:text-[16px] hover:opacity-70" type="submit">Enviar e-mail</button></div>
                    </form>
                </div>
            </div>}
            {emailSended && <div className="">
                <div className="font-bold uppercase">O link foi enviado para o email com sucesso!</div>
                <div className="text-[red] text-center">Você pode fechar essa janela  agora</div>
            </div>}
        </div>
    )
}