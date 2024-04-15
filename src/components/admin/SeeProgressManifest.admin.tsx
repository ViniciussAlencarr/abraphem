import { useEffect, useState } from "react"
import { MdOutlineKeyboardBackspace } from 'react-icons/md'

import api from '../../services/api'

import { ManifestRequest } from '../../types/Manifest'
import { User } from '../../types/User'

import '../css/admin/SeeProgressManifest.admin.css'

import { getFormatDate } from '../../utils/formatDateNow.utils'

import arrowIcon from '../../assets/fa-solid_check.svg'

import { GetUserName } from '../../components/admin/GetUserName.admin'
import { toast } from "react-toastify"
import { SeeDetailsOfUser } from "./SeeDetailsOfUser.admin"

export const SeeProgressManifestComponent = (params: {
    manifest: ManifestRequest,
    getInProgressManifests: () => void,
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
        category: "",
        typeOfPhone: "",
        phoneNumber: "",
        ownerName: "",
        cep: '',
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
        } catch (err) {
            console.log(err)
        }
    }
    const updateResponse = () => {
        try {
            const update = async () => {
                const answeredAt = await getManifestById()
                return await api.put(`manifest/${params.manifest.id}`, {
                    response: {
                        answeredAt,
                        title: "SOLICITAÇÃO ANÁLISADA PELO SETOR RESPONSAVEL",
                        state: "AGUARDANDO ANÁLISE",
                        period: date.toLocaleDateString(),
                        value: response,
                        answeredBy: localStorage.getItem('adm_user_id')
                    },
                    lastUpdate: getFormatDate(),
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('adm_bearer_token')
                    }
                })
            }
            toast.promise(
                update,
                {
                    pending: 'Atualizando resposta...',
                    success: {
                        render() {
                            params.setOpen(!params.open)
                            params.getInProgressManifests()
                            return 'Resposta atualizada com sucesso!'
                        }
                    },
                    error: 'Ocorreu um problema ao atualizar a resposta'
                }
            )
        } catch (err) {
            console.log(err)
        }
    }
    const sendResponse = () => {
        try {
            const send = async () => {
                const answeredAt = await getManifestById()
                return await api.put(`manifest/${params.manifest.id}`, {
                    response: {
                            title: "SOLICITAÇÃO ANÁLISADA PELO SETOR RESPONSAVEL",
                            period: date.toLocaleDateString(),
                            state: "ANÁLISE REALIZADA",
                            value: response,
                            answeredAt,
                            answeredBy: localStorage.getItem('adm_user_id')
                        },
                    manifestStatus: "Concluído",
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
                            params.getInProgressManifests()
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

    const getManifestById = async () => {
        try {
            const { data } = await api.get(`manifest/${params.manifest.id}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('adm_bearer_token')
                }
            })
            return data.response.answeredAt
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="see-progress-manifest">
            {
                params.open ? <>
                    {
                        !open ? <>
                            <div className="see-progress-manifests-header">
                                <div className="back-btn-context" onClick={() => params.setOpen(!params.open)}>
                                    <MdOutlineKeyboardBackspace size={25} />
                                    <button className='back-btn' onClick={() => params.setOpen(!params.open)}>Voltar</button>
                                </div>
                                <div className="manifest-type">
                                    <div className="manifest-type-context">
                                        <div className="icon-imgs">
                                            {getSvg('#C00405')}
                                            <img className="img-icon arrow-icon" src={arrowIcon} />
                                        </div>
                                        <span className="type-label passed">Em aberto</span>
                                    </div>
                                    <div className="line-marker" style={{ background: '#C00405' }}></div>
                                    <div className="manifest-type-context">
                                        <div className="icon-imgs">
                                            {getSvg('#F45B25')}
                                            <img className="img-icon arrow-icon" src={arrowIcon} />
                                        </div>
                                        <span className="type-label active-label">Em andamento</span>
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
                                    <span className="name">Solicitante: <GetUserName userId={params.manifest.userId}/></span>
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
                                            <textarea className="answer-value" placeholder="Digite a resposta" value={response} onChange={event => setResponse(event.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="action-btns">
                                        <button className="send-response-btn" onClick={updateResponse}>Editar resposta</button>
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