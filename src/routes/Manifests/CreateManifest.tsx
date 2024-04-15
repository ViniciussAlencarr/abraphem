import { BsMic } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { VscThreeBars } from 'react-icons/vsc';
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { MenuOptions } from '../../components/MenuOptions';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import api from '../../services/api';

import './../css/CreateManifest.css';
import './../css/media-layout.css';

import arrowUpIcon from '../../assets/arrow-up.svg'

import acceptUsePdfData from '../../../public/TERMO DE USO.docx.pdf'

import { getFormatDate } from '../../utils/formatDateNow.utils'

import { AttachmentFileInterface } from 'types/Manifest';
import axios from 'axios';

export const CreateManifest = () => {
    const [open, setOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<AttachmentFileInterface[]>([])
    const [user, setUser] = useState<any>()
    const [request, setRequest] = useState({
        title: 'Titulo da Manifestação',
        description: 'DESCRIÇÃO DA MANIFESTAÇÃO Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean orci orci, tristique vitae dapibus non, dapibus in erat. Fusce commodo est nec malesuada hendrerit. Etiam mauris urna, rhoncus et neque ac, venenatis convallis erat. Donec sit amet diam fringilla, tempor quam eu, vulputate mauris. Aliquam et rutrum dui. Integer et nunc sit amet erat fringilla aliquet. Sed condimentum condimentum tempor. Nunc viverra, magna ac iaculis pulvinar, nisi tortor accumsan nisl, non tempus erat ipsum nec est. Ut fringilla bibendum diam quis rutrum. Phasellus non rutrum sem, ut sagittis sapien. Quisque quis aliquam urna, id semper arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
        manifestType: '', 
        whoIsOpenManifest: '',
        entryChannel: '',
        patientFullName: '',
        cpf: '',
        dateBirth: '',
        state: '',
        city: '',
        gender: '',
        race: '',
        email: '',
        phoneType: '',
        phoneNumber: '',
        ownerName: '',
        typeCoagulopathy: '',
        severityCoagulopathy: '',
        locationTreatment: '',
        disabledPerson: '',
        typeOfDisability: '',
        manifestValue: '',
        files: '',
        manifestStatus: 'Em aberto',
        lastUpdate: getFormatDate(),
        userId: localStorage.getItem('user_id') ? localStorage.getItem('user_id') : '', 
        protocol: {
            value: Math.floor(1000000 + Math.random() * 900000),
            period: getFormatDate()
        },
        response: {
            title: 'SOLICITAÇÃO EM ANÁLISE PELO SETOR RESPONSAVEL',
            period: getFormatDate(),
            state: 'AGUARDANDO ANÁLISE',
            value: '',
            answeredAt: '',
            answeredBy: ''
        }
    });
    
    const navigate = useNavigate();
    const { search } = useLocation()
    useEffect(() => {
        if (!localStorage.getItem('bearer_token')) navigate('/login?loginRequired=true&action=createManifest')
        if (search.includes('type')) setRequest({...request, manifestType: search.split('=')[1]})
        getUser()
    }, [])

    const setDivToTop = () => {
        window.scrollTo(0, 0);
    }

    const getUser = async () => {
        try {
            const { data } = await api.get(`user/${localStorage.getItem('user_id')}`, { headers: {
                Authorization: 'Bearer ' + localStorage.getItem('bearer_token'),
                'Content-Type': 'application/json'
            }})
            setUser(data)
        } catch (err) {
            throw err
        }
    }
    
    const onSubmit = (event: any) => {
        const sendEmail = async () => {
            try {
                await api.post('sendEmail', {
                    name: user.fullName,
                    protocol: request.protocol.value,
                    to: [user.email],
                    subject: "ello World",
                    html: "<strong>It works!</strong>"
                }, { headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('bearer_token'),
                    'Content-Type': 'application/json'
                }})
            } catch (err) {
                throw err
            }
        }
        const sendManifest = async () => {
            try {
                request.files = JSON.stringify(uploadedFiles)
                return await api.post('manifest/create', request, { headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('bearer_token'),
                    'Content-Type': 'application/json'
                }})
            } catch (err) {
                console.log(err)
                throw err
            }
        }
        event.preventDefault()
        toast.promise(
            sendManifest,
            {
                pending: 'Criando manifestação...',
                success: {
                    render() {
                        setTimeout(() => navigate('/manifest/status/success'), 800)
                        return 'Manifestação realizada com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao realizar a manifestação'
            },
            {
                toastId: 'create-manifest-action-toast'
            }
        )
        setTimeout(() => sendEmail(), 200)
    }

    const setInputValues = (event: any, typeOfValue: string) => {
        setRequest({ ...request, [typeOfValue]: event.target.value })
    }

    const setSelectValues = (event: any, typeOfValue: string) => {
        let value = event.target.options[event.target.selectedIndex].text
        if (typeOfValue == 'manifestType') {
            switch(value) {
                case 'RECLAMAÇÃO':
                    setRequest({ ...request, [typeOfValue]: 'reclamacao' })
                    break
                case 'SOLICITAÇÃO':
                    setRequest({ ...request, [typeOfValue]: 'solicitacao' })
                    break
                case 'INFORMAÇÃO':
                    setRequest({ ...request, [typeOfValue]: 'informacao' })
                    break
                case 'ELOGIO':
                    setRequest({ ...request, [typeOfValue]: 'elogio' })
                    break
                case 'SUGESTÃO':
                    setRequest({ ...request, [typeOfValue]: 'sugestao' })
                    break
                case 'DENÚNCIA':
                    setRequest({ ...request, [typeOfValue]: 'denuncia' })
                    break
            }
        } else 
        setRequest({ ...request, [typeOfValue]: value })
    }

    const openThermsAndServicesPdf = () => {
        var link = document.createElement('a');
        link.href = acceptUsePdfData;
        link.target = '_blank';
        link.dispatchEvent(new MouseEvent('click'));
    }

    const getAttachmentFile = (event: any) => {
        const uploadAttachment = async () => {
            try {
                const selectedFile = event.target.files[0]
                const formData = new FormData();
                formData.append('file', selectedFile)
                const { data } = await api.post('uploadAttachment', formData, { headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('bearer_token')
                }})
                setUploadedFiles([...uploadedFiles, data])
            } catch (err) {
                throw err
            }
        }
        toast.promise(
            uploadAttachment,
            {
                pending: 'Adicionando anexo...',
                success: {
                    render() {
                        return 'Anexo adicionado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao adicionar o anexo'
            },
            {
                toastId: 'attachment-action-toast'
            }
        )
    }

    const transcribeFileToText = async (event: any) => {
        const initiateTranscribeService = (url: string) => {
            const getTranscribeFile = async () => {
                const { data } = await api.get('getTranscribeFile', { headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('bearer_token')
                }})
                switch (data.status) {
                    case 'FAILED':
                        throw 'Ocorreu um problema ao capturar o arquivo transcrito'
                    case 'COMPLETED':
                        const response = await axios.get(data.url)
                        setInputValues({ target: { value: response.data.results.transcripts[0].transcript }}, 'manifestValue')
                        break;
                    case 'IN_PROGRESS':
                        await getTranscribeFile()
                        break;
                    default:
                        throw 'Ocorreu um problema ao capturar o arquivo transcrito'
                }
                return data
            }

            const transcribeFile = async () => {
                const { data } = await api.post('transcribeFiles', { url }, { headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('bearer_token')
                }})
                await getTranscribeFile()
                return data
            }

            toast.promise(
                transcribeFile,
                {
                    pending: 'Transcrevendo o arquivo...',
                    success: 'Arquivo transcrito com sucesso!',
                    error: 'Ocorreu um problema ao transcrever o arquivo'
                },
                {
                    toastId: 'transaction-action-toast'
                }
            )
        }
        
        const uploadFile = async () => {
            const selectedFile = event.target.files[0]
            const formData = new FormData();
            formData.append('file', selectedFile)
            const { data } = await api.post('uploadTranscribeFiles', formData, { headers: {
                Authorization: 'Bearer ' + localStorage.getItem('bearer_token')
            }})
            initiateTranscribeService(data.Location)
        }
        
        toast.promise(
            uploadFile,
            {
                pending: 'Subindo arquivo...',
                success: 'O arquivo subiu com sucesso!',
                error: 'Ocorreu um problema ao subir o arquivo'
            },
            {
                toastId: 'upload-file-action-toast'
            }
        )
    }

    const getAssignedUrlAttachmentFile = async (key: string) => {
        try {
            const { data } = await api.post('getSignedUrl', { key })
            return data.url
        } catch (err) {
            throw err
        }
    }

    const openAttachmentFile = async (file: AttachmentFileInterface) => {
        try {
            const url = await getAssignedUrlAttachmentFile(file.key)
            var link = document.createElement('a');
            link.href = url;
            link.target = '_blank'
            link.dispatchEvent(new MouseEvent('click'));
        } catch (err) {
            toast.error('Ocorreu um problema ao abrir o anexo')
        }
    }

    const deleteS3File = async (file: AttachmentFileInterface) => {
        try {
            return await api.delete(`deleteAttachment/${file.key}`)
        } catch (err) {
            throw err
        }
    }

    const deleteAttachment = async (file: AttachmentFileInterface) => {
        try {
            setUploadedFiles(files => files.filter(existentFile => existentFile.ETag !== file.ETag))
            const { data } = await deleteS3File(file)
            toast.success(data.message)
        } catch (err) {
            console.log(err)
            toast.error('Ocorreu um problema ao deletar o anexo')
        }
    }

    return (
        <div className='request-screen-container'>
            <MenuOptions open={open} />
            <hr />
            <div className='header-info'>
                <button className="options-btn" onClick={() => setOpen(!open)}>
                    <VscThreeBars size={30} />
                </button>
                <span className='header-info-title'>FAÇA SUA MANIFESTAÇÃO</span>
            </div>
            <hr />
            <div className="new-request-container">
                
                <div className="info-advice">OS CAMPOS SINALIZADOS COM ASTERÍSCO (*) SÃO DE PREENCHIMENTO OBRIGATÓRIO</div>
                <div className="title">Identificação</div>
                <div className="form-context">
                    <form onSubmit={onSubmit}>
                        <div className="type-manifestation_who-opening-manifest_input-channel">
                            <div className="select-context">
                                <label className='label-value' htmlFor="type-manifestation-label">Tipo de manifestação*</label>
                                <div className='select-input'>
                                    <select
                                        required
                                        value={request.manifestType}
                                        onChange={event => setSelectValues(event, 'manifestType')} className='w-full bg-transparent p-1 outline-none type-manifestation-value ' id='type-manifestation-value'>
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="reclamacao">RECLAMAÇÃO</option>
                                            <option value="solicitacao">SOLICITAÇÃO</option>
                                            <option value="informacao">INFORMAÇÃO</option>
                                            <option value="elogio">ELOGIO</option>
                                            <option value="sugestao">SUGESTÃO</option>
                                            <option value="denuncia">DENÚNCIA</option>
                                    </select>
                                </div>
                            </div>
                            <div className="select-context">
                                <label className='label-value' htmlFor="who-opening-manifest-label">QUEM ESTÁ ABRINDO A MANIFESTAÇÃO?*</label>
                                <div className='select-input'>
                                    <select required onChange={event => setSelectValues(event, 'whoIsOpenManifest')} className='w-full bg-transparent p-1 outline-none who-opening-manifest-value' id='who-opening-manifest-value'>
                                        <option selected style={{display: 'none'}}>Selecione</option>
                                        <option value="">PACIENTE</option>
                                        <option value="">CUIDADOR / RESPONSÁVEL</option>
                                        <option value="">PROFISSIONAL DA SAÚDE / ACADÊMICOS</option>
                                        <option value="">OUTROS</option>
                                    </select>
                                </div>
                            </div>
                            {/* <div className="input-context input-channel">
                                <label className='label-value' htmlFor="input-channel-label">CANAL DE ENTRADA</label>
                                <input required value={request.entryChannel} onChange={event => setInputValues(event, 'entryChannel')}  type="text" className="input-text input-channel-value" id="input-channel-value" placeholder="INTERNET" />
                            </div> */}
                        </div>
                        <div className="title second">REGISTRE AQUI SUA MANIFESTAÇÃO</div>
                        <div className="manifest-value">
                            <label htmlFor="manifest-text-value" className="manifest-label">DESCREVA O CONTEÚDO DA SUA MANIFESTAÇÃO, <b>DE FORMA CLARA E OBJETIVA.</b></label>
                            <textarea required value={request.manifestValue} onChange={event => setInputValues(event, 'manifestValue')} placeholder='Digite aqui' name="" id="manifest-text-value" className="manifest-text-value"/>
                        </div>
                        <div className="actions">
                            <div className="action-button-context">
                                <button className="action-btn transcribe-text-btn">
                                    <BsMic className="icon" size={15} />
                                </button>
                                <input onChange={transcribeFileToText} style={{ display: 'none' }} accept="audio/mp3,audio/*;capture=microphone" type="file" name="" id="transcribe-file" />
                                <label htmlFor="transcribe-file" className='action-label'>Transcrever texto</label>
                            </div>
                            <div className="action-button-context">
                                <button className="action-btn attach-file-btn">
                                    <ImAttachment className="icon" size={15}/>
                                </button>
                                <input onChange={getAttachmentFile} style={{ display: 'none' }} type="file" name="" id="attachment-file" />
                                <label htmlFor="attachment-file" className='action-label'>Anexar arquivos</label>
                            </div>
                        </div>
                        {uploadedFiles.length != 0 && <div className='grid gap-2 justify-end my-4'>
                            <div className='uppercase text-[red] text-[14px] sm:text-[14px] lg:text-[16px]'>Arquivos adicionados</div>
                            {uploadedFiles.map(file => <div className='flex gap-2 items-center'>
                                <div onClick={() => openAttachmentFile(file)} className='cursor-pointer text-[12px] sm:text-[12px] lg:text-[14px] hover:underline'>{file.Key}</div>
                                <div><FaRegTrashAlt className='text-[#ff00009b] hover:text-[red] cursor-pointer text-[16px] sm:text-[16px] lg:text-[18px]' onClick={() => deleteAttachment(file)} /></div>
                            </div>)}
                        </div>}
                        <div className="accept-use-data">
                            <div className="input-context accept-use-my-data">
                                <input required type="checkbox" id="accept-use-my-data-value" className="accept-use-my-data-value" />
                                <label className="accept-use-my-data-value-label" htmlFor="accept-use-my-data-value" onClick={openThermsAndServicesPdf}>ACEITO O USO DOS MEUS DADOS*</label>
                            </div>
                        </div>
                        <div className="forward-back-btns">
                            <button className="btn-action back">Voltar</button>
                            <button type='submit' className="btn-action forward">Avançar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div onClick={setDivToTop} className='back-to-top'>
                <span>Voltar ao topo</span>
                <img className='logo' src={arrowUpIcon} />
            </div>
        </div>  
    ) 
}
