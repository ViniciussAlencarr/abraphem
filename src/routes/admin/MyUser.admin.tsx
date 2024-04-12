import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import api from "../../services/api"

import { AdmUser } from "types/Adm"

export const AdmMyUser = () => {
    const [user, setUser] = useState<AdmUser>()

    useEffect(() => localStorage.removeItem('lastNavigation'), [])

    useEffect(() => {
        const userData = localStorage.getItem('adm_user')
        if (userData) setUser(JSON.parse(userData))
    }, [])

    const updateAdmUser = (event: any) => {
        event.preventDefault()
        const updateUser = async () => {
            try {
                const { data } = await api.put(`user/${user?.id}`, user)
                localStorage.setItem('adm_user', JSON.stringify(data))
            } catch (err) {
                throw err
            }
        }
        toast.promise(
            updateUser,
            {
                pending: 'Atualizando informações...',
                success: {
                    render() {
                        setInterval(() => window.location.reload(), 500)
                        return 'Atualizado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao atualizar as informações'
            }
        )
    }

    return (
        <div className="my-[20px] mx-[35px]">
            {user && <form onSubmit={updateAdmUser} className="grid gap-[10px]">
                <div className="flex gap-[10px]">
                    <div className="grid gap-[5px] w-fit">
                        <label className="uppercase font-semibold text-[14px]" htmlFor="username">Nome de usuário</label>
                        <input
                            required
                            value={user.username}
                            onChange={event => setUser({ ...user, username: event.target.value })}
                            type="text"
                            id="username"
                            className="text-[12px] py-[8px] px-[12px] border-[1px] border-[#C00405] rounded-md outline-none" />
                    </div>
                    <div className="grid gap-[5px] w-fit">
                        <label className="uppercase font-semibold text-[14px]" htmlFor="email">E-mail</label>
                        <input
                            required
                            value={user.email}
                            onChange={event => setUser({ ...user, email: event.target.value })}
                            type="email"
                            id="email"
                            className="text-[12px] py-[8px] px-[12px] border-[1px] border-[#C00405] rounded-md outline-none" />
                    </div>
                    <div className="grid gap-[5px] w-fit">
                        <label className="uppercase font-semibold text-[14px]" htmlFor="document">Documento</label>
                        <input
                            required
                            value={user.document}
                            onChange={event => setUser({ ...user, document: event.target.value })}
                            type="text"
                            id="document"
                            className="text-[12px] py-[8px] px-[12px] border-[1px] border-[#C00405] rounded-md outline-none" />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-[#D93C3C] py-[12px] px-[24px] rounded-md font-medium uppercase text-[#fff] border-none transition-all hover:opacity-70"
                        type="submit">Salvar</button>
                </div>
            </form>}
        </div>
    )
}