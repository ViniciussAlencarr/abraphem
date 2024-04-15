import { useEffect, useState } from "react"
import { MdOutlineKeyboardBackspace } from 'react-icons/md'

import { ManifestRequest } from '../../types/Manifest'
import { User } from '../../types/User'
import { ServiceEvaluation } from '../../types/Service'
import { toast } from "react-toastify"

import api from '../../services/api'

import { getFormatDate } from '../../utils/formatDateNow.utils'

import '../css/admin/SeeCompletedManifest.admin.css'

import arrowIcon from '../../assets/fa-solid_check.svg'
import { GetUserName } from "./GetUserName.admin"
import { SeeDetailsOfUser } from "./SeeDetailsOfUser.admin"


export const SeeCompletedManifest = (params: {
    manifest: ManifestRequest,
    open: boolean,
    setOpen: any,
    getConcludedManifests: () => any
}) => {
    let date = new Date();
    const [enableServiceEvaluation, setEnableServiceEvaluation] = useState(false)
    const [response, setResponse] = useState(params.manifest.response.value)
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState<User>({
        id: "",
        document: "",
        typeDocument: "",
        username: "",
        fullName: "",
        dateOfBirth: "",
        cep: '',
        stateName: "",
        city: "",
        gender: "",
        race: "",
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
        validateServiceEvaluation()
    }, [enableServiceEvaluation])


    const updateResponse = () => {
        try {
            const update = async () => {
                const answeredAt = await getManifestById()
                return await api.put(`manifest/${params.manifest.id}`, {
                    response: {
                        answeredAt,
                        title: "SOLICITAÇÃO ANÁLISADA PELO SETOR RESPONSAVEL",
                        state: "ANÁLISE REALIZADA",
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
                            params.getConcludedManifests()
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

    const validateServiceEvaluation = async () => {
        try {
            const { data } = await api.get(`service-evaluation/by-manifest/${params.manifest.id}`, { headers: {
                Authorization: 'Bearer ' + localStorage.getItem('adm_bearer_token')
            }})
            if (data.length != 0) {
                setEnableServiceEvaluation(true)
                if (enableServiceEvaluation) setExistentServiceEvaluation(data[0])
            }
        } catch (err) {
            console.log(err)
        }
    }

    const setExistentServiceEvaluation = (serviceEvaluation: ServiceEvaluation) => {
        document.querySelectorAll('.form-check-input').forEach((element: any) => element.disabled = true)
        let firstQuestionElement: any = document.querySelector(`input[name="firstQuestion"][value="${serviceEvaluation.firstQuestion}"]`)
        let secondQuestionElement: any = document.querySelector(`input[name="secondQuestion"][value="${serviceEvaluation.secondQuestion}"]`)
        let thirdQuestionElement: any = document.querySelector(`input[name="thirdQuestion"][value="${serviceEvaluation.thirdQuestion}"]`)
        firstQuestionElement.checked = true
        secondQuestionElement.checked = true
        thirdQuestionElement.checked = true
    }
    
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

    return (
        <div className="see-completed-manifest">
            {
                params.open ? <>
                    {
                        !open ? <>
                        <div className="see-completed-manifests-header">
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
                                        {getSvg('#C00405')}
                                        <img className="img-icon arrow-icon" src={arrowIcon} />
                                    </div>
                                    <span className="type-label passed">Em andamento</span>
                                </div>
                                <div className="line-marker" style={{ background: '#C00405' }}></div>
                                <div className="manifest-type-context">
                                    <div className="icon-imgs">
                                        {getSvg('#6EC501')}
                                        <img className="img-icon arrow-icon" src={arrowIcon} />
                                    </div>
                                    <span className="type-label active-label">Concluido</span>
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
                                    <div className="answer-context-info">
                                        <div className="answer-context-title">Resposta</div>
                                        <div className="answer-context-answer-at">{params.manifest.response.answeredAt}</div>
                                    </div>

                                    <div className="answer-value-textarea">
                                        <textarea
                                            onChange={event => setResponse(event.target.value)}
                                            className="answer-value"
                                            placeholder="Digite a resposta"
                                            value={response} />
                                    </div>
                                </div>
                            </div>
                            <div className="edit-response">
                                <button className="edit-response-btn" onClick={updateResponse}>Editar resposta</button>
                            </div>
                            {
                                enableServiceEvaluation ? 
                                <div className="service-evaluation">
                                    <div className="service-evaluation-title">AVALIAÇÃO DO ATENDIMENTO</div>
                                    <div className="service-evaluation-context">
                                        <div className="questions">
                                            <div className="question first-question">A sua manifestação foi atendida?</div>
                                            <div className="question second-question">A resposta fornecida foi fácil de compreender?</div>
                                            <div className="question third-question">Você está satisfeito(a) com o atendimento prestado?</div>
                                        </div>
                                        <div className="responses">
                                            <div className="response">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="firstQuestion" id="yes-response" value='Sim'/>
                                                    <label className="form-check-label" htmlFor="yes-response" >
                                                        Sim 
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="firstQuestion" id="no-response" value='Não' />
                                                    <label className="form-check-label" htmlFor="no-response" >
                                                        Não 
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="firstQuestion" id="partially" value='Parcialmente' />
                                                    <label className="form-check-label" htmlFor="partially" >
                                                        Parcialmente 
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="response">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="secondQuestion" id="very-easy" value='Muito fácil' />
                                                    <label className="form-check-label" htmlFor="very-easy" >
                                                        Muito fácil 
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="secondQuestion" id="easy" value='Fácil' />
                                                    <label className="form-check-label" htmlFor="easy" >
                                                        Fácil
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="secondQuestion" id="regular-2" value='Regular' />
                                                    <label className="form-check-label" htmlFor="regular-2" >
                                                        Regular 
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="secondQuestion" id="difficult" value='Difícil' />
                                                    <label className="form-check-label" htmlFor="difficult" >
                                                        Difícil 
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="secondQuestion" id="very-difficult" value='Muito Difícil' />
                                                    <label className="form-check-label" htmlFor="very-difficult" >
                                                        Muito Difícil  
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="response">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="thirdQuestion" id="very-unsatisfied" value='Muito insatisfeito' />
                                                    <label className="form-check-label" htmlFor="very-unsatisfied" >
                                                        Muito insatisfeito 
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="thirdQuestion" id="dissatisfied" value='Insatisfeito' />
                                                    <label className="form-check-label" htmlFor="dissatisfied" >
                                                        Insatisfeito
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="thirdQuestion" id="regular" value='Regular' />
                                                    <label className="form-check-label" htmlFor="regular" >
                                                        Regular 
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="thirdQuestion" id="satisfied" value='Satisfeito' />
                                                    <label className="form-check-label" htmlFor="satisfied" >
                                                        Satisfeito 
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="thirdQuestion" id="very-satisfied" value='Muito Satisfeito' />
                                                    <label className="form-check-label" htmlFor="very-satisfied" >
                                                        Muito Satisfeito 
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="send-service-evaluation">
                                            <button className="send-service-evaluation-btn">Avaliação recebida</button>
                                        </div>
                                    </div>
                                </div>
                                : <></>
                            }
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