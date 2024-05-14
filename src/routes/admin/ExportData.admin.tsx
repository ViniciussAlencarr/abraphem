import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
/* import { toast } from 'react-toastify' */

import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import '../css/admin/ExportData.admin.css'



import { validateAdmSession } from '../../utils/validateSession.utils'

import api from '../../services/api'
import { AiOutlineClose } from 'react-icons/ai';

interface Row {
    key: string;
    value: string
}
interface Columns {
    header: string;
    key: string;
}

export const ExportData = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [manifests, setManifests] = useState([])
    const [userFileName, setUserFileName] = useState('')
    const [manifestFileName, setManifestFileName] = useState('')
    const [usersFileType, setUsersFileType] = useState('xlsx')
    const [manifestsFileType, setManifestsFileType] = useState('xlsx')
    const [manifestStatus, setManifestStatus] = useState('')
    const [usersColumns, setUsersColumns] = useState<Columns[]>([])
    const [manifestColumns, setManifestColumns] = useState<Columns[]>([])

    const manifestContext: Row[] = [
        { value: 'ID', key: 'id'},
        { value: 'Título', key: 'title'},
        { value: 'Descrição', key: 'description'},
        { value: 'Tipo', key: 'manifestType'},
        { value: 'Quem abriu a manifestação', key: 'whoIsOpenManifest'},
        { value: 'Canal de entrada', key: 'entryChannel'},
        { value: 'Nome completo paciente', key: 'patientFullName'},
        { value: 'CPF', key: 'cpf'},
        { value: 'Data de nascimento', key: 'dateBirth'},
        { value: 'Estado', key: 'state'},
        { value: 'Cidade', key: 'city'},
        { value: 'Gênero', key: 'gender'},
        { value: 'Raça', key: 'race'},
        { value: 'Email', key: 'email'},
        { value: 'Tipo de telefone', key: 'phoneType'},
        { value: 'Número de telefone', key: 'phoneNumber'},
        { value: 'Nome do responsável', key: 'ownerName'},
        { value: 'Tipo de coagulopatia', key: 'typeCoagulopathy'},
        { value: 'Gravidade da coagulopatia', key: 'severityCoagulopathy'},
        { value: 'Local de tratamento', key: 'locationTreatment'},
        { value: 'Deficiência', key: 'disabledPerson'},
        { value: 'Tipo de deficiências', key: 'typeOfDisability'},
        { value: 'Manifestação', key: 'manifestValue'},
        { value: 'Status', key: 'manifestStatus'},
        { value: 'Ultima atualização', key: 'lastUpdate'},
        { value: 'ID do usuário', key: 'userId'},
        { value: 'Protocolo', key: 'protocol'}
    ]

    const userContext: Row[] = [
        { value: 'ID', key: 'id'},
        { value: 'Documento', key: 'document'},
        { value: 'Tipo documento', key: 'typeDocument'},
        { value: 'Nome de usuário', key: 'username'},
        { value: 'Nome completo', key: 'fullName'},
        { value: 'Data de aniversario', key: 'dateOfBirth'},
        { value: 'CEP', key: 'cep'},
        { value: 'Estado', key: 'stateName'},
        { value: 'Cidade', key: 'city'},
        { value: 'Gênero', key: 'gender'},
        { value: 'Raça', key: 'race'},
        { value: 'Email', key: 'email'},
        { value: 'Tipo de telefone', key: 'typeOfPhone'},
        { value: 'Número de telefone', key: 'phoneNumber'},
        { value: 'Nome do responsável', key: 'ownerName'},
        { value: 'Tipo de coagulopatia', key: 'typeOfCoagulopathy'},
        { value: 'Gravidade da coagulopatia', key: 'severityOfCoagulopathy'},
        { value: 'Local de tratamento', key: 'callCenterLocation'},
        { value: 'Deficiência', key: 'pcd'},
        { value: 'Tipo de deficiências', key: 'typeOfDisability'},
        { value: 'URL da foto de perfil', key: 'profilePictureURL'}
    ]

    useEffect(() => {
        validateAdmSession(navigate)
        getAllUsers()
        getManifests()
    }, [])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const getAllUsers = async () => {
        try {
            const { data } = await api.get('users')
            setUsers(data)
            return data
        } catch (err) {
            console.log(err)
        }
    }

    const getManifests = async (status?: string) => {
        try {
            const url = status ? `manifests?status=${status}` : 'manifests'
            const { data } = await api.get(url)
            setManifests(data)
            return data
        } catch (err) {
            console.log(err)
        }
    }

    const exportManifests = async (event: any) => {
        event.preventDefault()
        try {
            const manifests = await getManifests(manifestStatus)
            if (!manifests || manifests.length == 0) return
            const columns = manifestColumns.length != 0 ? manifestColumns : manifestContext.map(({ key, value }) => {
                return {
                    header: value,
                    key
                }
            })
            const { data } = await api.post('generateFile/xlsx ', {
                workSheetName: manifestFileName,
                columns,
                rows: manifests,
                writeFile: false
            })
            const a = document.createElement("a"); 
            a.download = manifestFileName
            a.href = data.base64
            a.click(); 
            setManifestFileName('')
            setManifestStatus('')
            setManifestColumns([])
            await getManifests()
        } catch (err) {
            console.log(err)
        }
    }

    const exportUsers = async (event: any) => {
        event.preventDefault()
        try {  
            const users = await getAllUsers()
            if (!users || users.length == 0) return

            const columns = usersColumns.length != 0 ? usersColumns : userContext.map(({ key, value }) => {
                return {
                    header: value,
                    key
                }
            })
            const { data } = await api.post('generateFile/xlsx ', {
                workSheetName: userFileName,
                columns,
                rows: users,
                writeFile: false
            })
            const a = document.createElement("a"); 
            a.download = userFileName
            a.href = data.base64
            a.click(); 
            setUserFileName('')
            setUsersColumns([])
        } catch (err) {
            console.log(err)
        }
    }

    const addManifestColumn = ({ key, value }: Row) => {
        setManifestColumns(columns => columns.findIndex(column => column.key == key) == -1 ? columns.concat({ header: value, key }) : columns)
    }

    const addUserColumn = ({ key, value }: Row) => {
        setUsersColumns(columns => columns.findIndex(column => column.key == key) == -1 ? columns.concat({ header: value, key }) : columns)
    }

    const removeManifestColumn = (index: number) => {
        const data = [...manifestColumns]
        const deletedColumn = data[index]
        setManifestColumns(data.filter(column => column.key !== deletedColumn.key))
    }
    
    const removeUserColumn = (index: number) => {
        const data = [...usersColumns]
        const deletedColumn = data[index]
        setUsersColumns(data.filter(column => column.key !== deletedColumn.key))
    }

    const setTypeOfExport = (event: any, type: string) => 
        type == 'user' ?
            setUsersFileType(event.target.options[event.target.selectedIndex].value)
            :
            setManifestsFileType(event.target.options[event.target.selectedIndex].value)

    return (
        <div className="py-[32px] px-[35px] grid gap-4">
            <div className='grid gap-0 text-[grey] font-semibold text-[14px]'>
                <div><b>Obs:</b> Caso nenhum campo seja adicionado, todos serão selecionados.</div>
                <div><b>Obs:</b> Se nenhum status da manifestação for selecionado, será gerado usando todas as manifestações.</div>
            </div>
            <div className='grid lg:flex gap-5'>
                <div className='grid gap-3'>
                    <div className='text-[14px] md:text-[16px]lg:text-[16px] uppercase font-semibold text-[red]'>Exportar manifestações</div>
                    <form onSubmit={exportManifests} className='grid gap-5 w-fit'>
                        <div className='sm:grid md:flex lg:flex gap-5'>
                            <div className='mb-3 md:m-0 lg:m-0 text-[12px] md:text-[14px] lg:text-[14px]'>Total de manifestações <b>{manifests.length}</b></div>
                            <div className='grid gap-4'>
                                <div className='w-max border-[1px] border-[#C00405] py-[6px] px-[12px] rounded'>
                                    <input required className='outline-none border-none text-[12px] md:text-[14px] lg:text-[14px]' type="text" placeholder={`Nome do arquivo`} value={manifestFileName} onChange={event => setManifestFileName(event.target.value)}/>
                                    <span className='text-[12px] md:text-[14px] lg:text-[14px]'>.{manifestsFileType}</span>
                                </div>
                                <div className='w-full'>
                                    <select
                                        value={manifestStatus}
                                        onChange={event => setManifestStatus(event.target.options[event.target.selectedIndex].value)}
                                        required className='text-[12px] md:text-[14px] lg:text-[14px] w-full border-[1px] border-[#C00405] py-[6px] px-[12px] outline-none rounded bg-white'>
                                        <option className='hidden' defaultValue={''}>Selecione o status da manifestação</option>
                                        <option className='text-[12px] md:text-[14px] lg:text-[14px]' value="open">Em aberto</option>
                                        <option className='text-[12px] md:text-[14px] lg:text-[14px]' value="inProgress">Em andamento</option>
                                        <option className='text-[12px] md:text-[14px] lg:text-[14px]' value="concluded">Concluído</option>
                                    </select>
                                </div>
                                
                                <div className='w-full'>
                                    <select required value={manifestsFileType} onChange={event => setTypeOfExport(event, 'manifest')}  className='w-full border-[1px] border-[#C00405] py-[6px] text-[12px] md:text-[14px] lg:text-[14px] px-[12px] outline-none rounded bg-white'>
                                        <option className='hidden' defaultValue={''}>Selecione o tipo da exportação</option>
                                        <option value="xlsx">Excel</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button type='submit' className="bg-[#D93C3C] text-white py-[12px] px-[24px] text-[12px] md:text-[14px] lg:text-[14px] font-semibold uppercase rounded-md hover:opacity-70 transition-all">Exportar</button>
                        </div>
                    </form>
                </div>
                <div className='lg:border-l border-l-[red] lg:px-[35px] grid gap-3 lg:block lg:gap-0'>
                    <div className='cursor-pointer uppercase text-[red] text-[14px] md:text-[16px]lg:text-[16px]'>Selecione os campos que serão adicionados ao arquivo de manifestações</div>
                    <div className='lg:relative h-full'>
                        <div className='grid overflow-auto lg:absolute top-3 h-[200px] border rounded w-full'>
                            <Grid container spacing={1} className='w-auto px-3 py-2 border-b m-0'>
                                {manifestColumns.length != 0 ? manifestColumns.map(({ header }, index) => <Grid key={index} spacing={1} item xs="auto" className='w-min'>
                                    <Item key={index} className='text-[#575C63] w-max !p-1 bg-[transparent] shadow-none flex items-center rounded-md border border-[red] gap-1'>
                                        <span className='text-[#575C63] text-[12px] md:text-[14px] lg:text-[14px]'>{header}</span>
                                        <button onClick={() => removeManifestColumn(index)}><AiOutlineClose color='red' size={13} /></button>
                                    </Item>
                                </Grid>)
                                : <span className='text-[#575C63] text-[12px] md:text-[14px] lg:text-[14px]'>Adicione os campos</span>}
                            </Grid>
                            <div>
                                {manifestContext.filter(context => manifestColumns.findIndex(column => column.key === context.key) == -1).map((column, index) => <div
                                    onClick={() => addManifestColumn(column)}
                                    className='cursor-pointer hover:bg-[#c3c3c34d] px-3 py-2 min-w-[200px] text-[12px] md:text-[14px] lg:text-[14px]' key={index}>{column.value}</div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='text-[red]'/>
            <div className='grid lg:flex gap-5'>
                <div className='grid gap-3'>
                    <div className='uppercase font-semibold text-[red]'>Exportar usuários cadastrados</div>
                    <form onSubmit={exportUsers} className='grid gap-5 w-fit'>
                        <div className='text-[14px] md:text-[16px]lg:text-[16px] uppercase font-semibold text-[red]'>
                            <div className='text-[12px] md:text-[14px] lg:text-[14px] mb-3 md:m-0 lg:m-0'>Quantidade de usuários <b>{users.length}</b></div>
                            <div className='grid gap-3'>
                                <div className='w-max border-[1px] border-[#C00405] py-[6px] px-[12px] rounded'>
                                    <input required className='text-[12px] md:text-[14px] lg:text-[14px] outline-none border-none' type="text" placeholder={`Nome do arquivo`} value={userFileName} onChange={event => setUserFileName(event.target.value)}/>
                                    <span className='text-[12px] md:text-[14px] lg:text-[14px]'>.{usersFileType}</span>
                                </div>
                                <div className='w-full'>
                                    <select required onChange={event => setTypeOfExport(event, 'user')} value={usersFileType} className='text-[12px] md:text-[14px] lg:text-[14px] w-full border-[1px] border-[#C00405] py-[6px] px-[12px] outline-none rounded bg-white'>
                                        <option selected className='hidden'>Selecione o tipo da exportação</option>
                                        <option value="xlsx">Excel</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button type='submit' className="bg-[#D93C3C] text-[12px] md:text-[14px] lg:text-[14px] text-white py-[12px] px-[24px] font-semibold uppercase rounded-md hover:opacity-70 transition-all">Exportar</button>
                        </div>
                    </form>
                </div>
                <div className='lg:border-l border-l-[red] lg:px-[35px] grid gap-3 lg:block lg:gap-0'>
                    <div className='cursor-pointer uppercase text-[red] text-[14px] md:text-[16px]lg:text-[16px]'>Selecione os campos que serão adicionados ao arquivo de usuários</div>
                    <div className='lg:relative h-full'>
                        <div className='grid overflow-auto lg:absolute top-3 h-[200px] border rounded w-full'>
                            <Grid container spacing={1} className='w-auto px-3 py-2 border-b m-0'>
                                {usersColumns.length != 0 ? usersColumns.map(({ header }, index) => <Grid key={index} spacing={1} item xs="auto" className='w-min'>
                                    <Item key={index} className='text-[#575C63] w-max !p-1 bg-[transparent] shadow-none flex items-center rounded-md border border-[red] gap-1'>
                                        <span className='text-[#575C63] text-[12px] md:text-[14px] lg:text-[14px]'>{header}</span>
                                        <button onClick={() => removeUserColumn(index)}><AiOutlineClose color='red' size={13} /></button>
                                    </Item>
                                </Grid>)
                                : <span className='text-[#575C63] text-[12px] md:text-[14px] lg:text-[14px]'>Adicione os campos</span>}
                            </Grid>
                            <div>
                                {userContext.filter(context => usersColumns.findIndex(column => column.key === context.key) == -1).map((column, index) => <div
                                    onClick={() => addUserColumn(column)}
                                    className='cursor-pointer hover:bg-[#c3c3c34d] px-3 py-2 min-w-[200px] text-[12px] md:text-[14px] lg:text-[14px]' key={index}>{column.value}</div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}