import { useEffect, useState } from "react"
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { toast } from 'react-toastify'

import api from "../../services/api"

import { ManifestRequest } from '../../types/Manifest'
import { User } from '../../types/User'

import '../css/admin/AnalizeOpenManifest.admin.css'

import { GetUserName } from './GetUserName.admin'

import arrowIcon from '../../assets/fa-solid_check.svg'
import { SeeDetailsOfUser } from "./SeeDetailsOfUser.admin"

import { getFormatDate } from "../../utils/formatDateNow.utils"

export const AnalizeOpenManifestComponent = (params: {
    manifest: ManifestRequest,
    getOpenManifests: (interval:any) => any,
    open: boolean,
    setOpen: any
}) => {
    let date = new Date();
    const [response, setResponse] = useState(params.manifest.response.value)
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState<User>({
        id: "",
        document: "",
        typeDocument: "",
        username: "",
        fullName: "",
        dateOfBirth: "",
        stateName: "",
        city: "",
        gender: "",
        race: "",
        cep: '',
        category: "",
        typeOfPhone: "",
        phoneNumber: "",
        ownerName: "",
        typeOfCoagulopathy: "",
        severityOfCoagulopathy: "",
        callCenterLocation: "",
        password: "",
        pcd: false,
        typeOfDisability: "",
        email: "",
        roleUser: "",
        profilePictureURL: ""
    })
    
    useEffect(() => {
    }, [])

    const getSvg = (color: string) => {
        return (
            <svg width="30" height="30" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle id="Step" cx="32.7627" cy="32.5269" r="32.5269" fill={color}/>
            </svg>
        )
    }
    
    const openUserInfo = async () => {
        try {
            const { data } = await api.get(`user/${params.manifest.userId}`)
            setUser(data)
            setOpen(true)
        } catch (err: any) {
            if (err.message === 'Request failed with status code 404') {
                toast.error(err.response.data.message, { toastId: 'not-found-user' })
            } else toast.error('Ocorreu um problema ao encontrar o usuário')

        }
    }
    const sendResponse = () => {
        try {
            const send = async () => {
                return await api.put(`manifest/${params.manifest.id}`, {
                    response: {
                            title: "SOLICITAÇÃO EM ANÁLISE PELO SETOR RESPONSAVEL",
                            period: date.toLocaleDateString(),
                            state: "AGUARDANDO ANÁLISE",
                            value: response,
                            answeredAt: date.toLocaleDateString(),
                            answeredBy: localStorage.getItem('adm_user_id')
                        },
                    manifestStatus: "Em andamento",
                    lastUpdate: getFormatDate(),
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('adm_bearer_token')
                    }
                })
            }
            toast.promise(
                send,
                {
                    pending: 'Enviando resposta...',
                    success: {
                        render() {
                            params.setOpen(!params.open)
                            params.getOpenManifests(undefined)
                            return 'Resposta enviada com sucesso!'
                        }
                    },
                    error: 'Ocorreu um problema ao realizar o resposta'
                }
            )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="analize-open-manifests">
            {
                params.open ? <>
                    {
                        !open ? <>
                            <div className="analize-open-manifests-header">
                                <div className="back-btn-context" onClick={() => params.setOpen(!params.open)}>
                                    <MdOutlineKeyboardBackspace size={25} />
                                    <button className='back-btn' onClick={() => params.setOpen(!params.open)}>Voltar</button>
                                </div>
                                <div className="manifest-type">
                                    <div className="manifest-type-context">
                                        <div className="icon-imgs">
                                            {getSvg('#FFD600')}
                                            <img className="img-icon arrow-icon" src={arrowIcon} />
                                        </div>
                                        <span className="type-label active">Em aberto</span>
                                    </div>
                                    <div className="line-marker" style={{ background: '#969696' }}></div>
                                    <div className="manifest-type-context">
                                        <div className="icon-imgs">
                                            {getSvg('#969696')}
                                            <img className="img-icon arrow-icon" src={arrowIcon} />
                                        </div>
                                        <span className="type-label">Em andamento</span>
                                    </div>
                                    <div className="line-marker" style={{ background: '#969696' }}></div>
                                    <div className="manifest-type-context">
                                        <div className="icon-imgs">
                                            {getSvg('#969696')}
                                            <img className="img-icon arrow-icon" src={arrowIcon} />
                                        </div>
                                        <span className="type-label">Concluido</span>
                                    </div>
                                </div>
                            </div>
                            <div className="manifest-content">
                                <div className="requester-name">
                                    <span className="name">Solicitante: <GetUserName userId={params.manifest.userId} /></span>
                                </div>
                                <div className="more-info-about-user">
                                    <button className="more-info-btn" onClick={() => openUserInfo()}>Mais informações do usuário</button>
                                </div>
                                <div className="protocol_manifest">
                                    <div className="protocol">
                                        <span className="protocol-number">{params.manifest.protocol.value}</span>
                                        <span className="protocol-period">{params.manifest.protocol.period}</span>
                                    </div>
                                    <div className="manifest">
                                        <span className="manifest-title">{params.manifest.title}</span>
                                        <span className="manifest-description">{params.manifest.manifestValue}</span>
                                    </div>
                                </div>
                                <div className="answer-manifest">
                                    <div className="answer-manifest-header">
                                        <div className="wait-analize">
                                            <div className="wait-analize-title">{params.manifest.response.state}</div>
                                            <div className="wait-analize-period">{params.manifest.response.period}</div>
                                        </div>
                                        <div className="wait-analize-message">
                                            {params.manifest.response.title}
                                        </div>
                                    </div>
                                    <div className="answer-context">
                                        <div className="answer-context-title">Resposta</div>
                                        <div className="answer-value-textarea">
                                            <textarea onChange={event => setResponse(event.target.value)} className="answer-value" placeholder="Digite a resposta" value={response}/>
                                        </div>
                                    </div>
                                    <div className="send-response">
                                        <button className="send-response-btn" onClick={sendResponse}>Enviar resposta</button>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <SeeDetailsOfUser user={user} setOpen={setOpen} open={open} />
                    }
                </>
                : <></>
            }
        </div>
    )
}