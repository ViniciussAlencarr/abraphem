import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import api from "../services/api"

import './css/RecoveryPassword.css'
import './css/media-layout.css'

export const RecoveryPassword = () => {
    const { search } = useLocation()
    const [hidePassword, setHidePassword] = useState(true)
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
    
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [userId, setUserId] = useState('')

    const navigate = useNavigate()


    const decodeQueryParameters = async () => {
        try {
            const { data } = await api.post('decodeUrlString', { url: search.slice(1) })
            let user_id = data.url.split('userId')[1]?.slice(1)
            const token = data.url.split('token')[1]?.slice(1)
            if (token) await validateToken(token)
            user_id = user_id ? user_id.split('email')[0] : undefined
            if (user_id) setUserId(user_id.substring(0, user_id.length - 1))
        } catch (err) {
            console.log(err)
            
        }
    }

    useEffect(() => {
        if (search || search != '') decodeQueryParameters()
    }, [])

    const validateToken = async (token: string) => {
        try {
            await api.post('/health', { token })
        } catch (err: any) {
            toast.error('Ocorreu um problema com o link ou o link expirou. Tente novamente', {
                toastId: 'token-validation-id',
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/recovery-password')
        }
    }

    const comparePassword = () => {
        if (newPassword != repeatNewPassword) throw toast.error('As senhas não conferem.')
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
        <div className="border-t-[2px] grid justify-center py-10 gap-7 ">
            <div className="text-[16px] lg:text-[20px] font-medium uppercase text-center">Alterar senha</div>
            <div className="grid gap-3 m-3">
                <div className="font-bold text-[16px] sm:!text-[18px] lg:!text-[20px]">Crie uma senha forte</div>
                <div className="text-[14px] sm:!text-[16px] lg:!text-[16px]">Crie uma senha forte que você não use em outros sites</div>
                <form className="grid gap-3" onSubmit={updatePassword}>
                    <div className="grid gap-1">
                        <label className="uppercase font-semibold  text-[14px] sm:!text-[16px] lg:!text-[16px]" htmlFor="new-password-value">Nova senha*</label>
                        <div className="flex gap-1 justify-between items-center border-[1px] py-[6px] px-[16px] border-[#C00405] rounded">
                            <input
                                required
                                value={newPassword}
                                onChange={event => setNewPassword(event.target.value)}
                                type={hidePassword ? `password` : 'text'} className="border-none w-full outline-none text-[14px] sm:!text-[16px] lg:!text-[16px] placeholder:text-black" id="new-password-value" placeholder="Nova senha" />
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <label className="uppercase font-semibold text-[14px] sm:!text-[16px] lg:!text-[16px]" htmlFor="repeat-new-password">Confirmar Nova senha*</label>
                        <div className="flex gap-1 justify-between items-center border-[1px] py-[6px] px-[16px] border-[#C00405] rounded">
                            <input
                                required
                                value={repeatNewPassword}
                                onChange={event => setRepeatNewPassword(event.target.value)}
                                type={hideConfirmPassword ? `password` : 'text'} className="border-none w-full outline-none placeholder:text-black text-[14px] sm:!text-[16px] lg:!text-[16px]" id="repeat-new-password" placeholder="Confirmar nova senha"  />
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div><input type="checkbox" id="show-password" onChange={() => { setHideConfirmPassword(!hideConfirmPassword);setHidePassword(!hidePassword) }} /></div>
                        <label htmlFor="show-password" className="text-[14px] sm:!text-[16px] lg:!text-[16px]">Mostrar senha</label>
                    </div>
                    <button type="submit" className="bg-[#C00405] uppercase font-medium text-white p-1 px-4 rounded-lg text-[14px] lg:text-[16px] hover:opacity-70">Alterar senha</button>
                </form>
            </div>
        </div>
    )
}