import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
/* import { toast } from 'react-toastify' */

import '../css/admin/ExportData.admin.css'



import { validateAdmSession } from '../../utils/validateSession.utils'

import api from '../../services/api'

export const ExportData = () => {
    const navigate = useNavigate()
    const [users, _] = useState([])
    const [fileType, setFileType] = useState('')

    useEffect(() => {
        validateAdmSession(navigate)
    }, [])

    /* const getAllUsers = async () => {
        try {
            
        } catch (err) {
            toast.error('Ocorreu um problema ao pegar os usuários')
        }
        
    } */

    const exportUsers = async () => {
        try {   
            const { data } = await api.post('exportUsers ', {})
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    
    const setTypeOfExport = (event: any) => setFileType(event.target.options[event.target.selectedIndex].value)

    return (
        <div className="py-[32px] px-[35px]">
            <div className='grid gap-3'>
                <div className='uppercase font-semibold text-[red]'>Exportar usuários cadastrados</div>
                <div className='grid gap-5 w-fit'>
                    <div className='flex gap-5'>
                        <div>Quantidade de usuários <b>{users.length}</b></div>
                        <div className='grid gap-3'>
                            <div className='w-full border-[1px] border-[#C00405] py-[6px] px-[12px] rounded'>
                                <input className='outline-none border-none' type="text" placeholder={`Nome do arquivo`} />
                                <span>.{fileType}</span>
                            </div>
                            <div className='w-full'>
                                <select onChange={setTypeOfExport}  className='w-full border-[1px] border-[#C00405] py-[6px] px-[12px] outline-none rounded bg-white'>
                                    <option className='hidden' defaultValue={''}>Selecione o tipo da exportação</option>
                                    <option value="pdf">PDF</option>
                                    <option value="xlsx">Excel</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <button onClick={() => exportUsers()} className="bg-[#D93C3C] text-white py-[12px] px-[24px] font-semibold uppercase rounded-md hover:opacity-70 transition-all">Exportar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}