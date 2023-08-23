import { useEffect, useState } from "react"
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { IoIosArrowForward } from "react-icons/io"
import { VscThreeBars } from "react-icons/vsc"
import { ToastContainer, toast } from "react-toastify"

import { ManifestRequest } from '../types/Manifest'
import { ServiceEvaluation } from '../types/Service'

import api from '../services/api'

import './css/ManifestDetails.css'

import arrowIcon from '../assets/fa-solid_check.svg'

import { MenuOptions } from "./MenuOptions"

export const ManifestDetails = (params: { manifest: ManifestRequest, open: boolean, setOpen: any }) => {
    const [openOptionsModal, setOpenOptionsModal] = useState(false);
    const [enableServiceEvaluation, setEnableServiceEvaluation] = useState(true);
    const [groupStatusColor, setGroupStatusColor] = useState({ open: '', inProgress: '', concluded: '' })
    const [lineGroupStatusColor, setLineGroupStatusColor] = useState({ firstLineColor: '', secondLineColor: '' })
    const [serviceEvaluationResponses, setServiceEvaluationResponses] = useState({ firstQuestion: '', secondQuestion: '', thirdQuestion: '' })
    
    useEffect(() => {
        validateServiceEvaluation()
        setStatusColor()
    }, [])
    const validateServiceEvaluation = async () => {
        try {
            const { data } = await api.get(`service-evaluation/by-manifest/${params.manifest.id}`, { headers: {
                Authorization: 'Bearer ' + localStorage.getItem('bearer_token')
            }})
            if (data.length != 0) {
                setEnableServiceEvaluation(!enableServiceEvaluation)
                setExistentServiceEvaluation(data[0])
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

    const setStatusColor = () => {
        switch (params.manifest.manifestStatus.toLowerCase()) {
            case 'em aberto':
                setGroupStatusColor({
                    open: '#FFD600',
                    inProgress: '#969696',
                    concluded: '#969696',
                })
                setLineGroupStatusColor({
                    firstLineColor: '#969696',
                    secondLineColor: '#969696'
                })
                break;
            case 'em andamento':
                setGroupStatusColor({
                    open: '#C00405',
                    inProgress: '#F45B25',
                    concluded: '#969696',
                })
                setLineGroupStatusColor({
                    firstLineColor: '#C00405',
                    secondLineColor: '#969696'
                })
                break;
            case 'concluído':
                setGroupStatusColor({
                    open: '#C00405',
                    inProgress: '#C00405',
                    concluded: '#6EC501',
                })
                setLineGroupStatusColor({
                    firstLineColor: '#C00405',
                    secondLineColor: '#C00405'
                })
                break;
        }
    }

    const getSvg = (color: string) => {
        return (
            <svg width="30" height="30" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle id="Step" cx="32.7627" cy="32.5269" r="32.5269" fill={color}/>
            </svg>
        )
    }
    
    const checkAnswer = () => {
        return (
            <>
                {
                    params.manifest.manifestStatus.toLowerCase() == 'em andamento' ? 
                        <div className="answer-context">
                            <div className="answer-context-header">
                                <div className="answer-context-title">Resposta</div>
                            </div>
                            <div className="analize-answer-info">
                                <AiOutlineInfoCircle size={20} />
                                <div className="text-value">
                                    SUA MANIFESTAÇÃO FOI RECEBIDO e será RESPONDIDA EM NO MÁXIMO 28 DIAS.
                                </div>
                            </div>
                        </div>
                    : params.manifest.manifestStatus.toLowerCase() == 'concluído' ? <div className="answer-context">
                        <div className="answer-context-header">
                            <div className="answer-context-title">Resposta</div>
                            <div className="answer-context-answered-at">{params.manifest.response.answeredAt}</div>
                        </div>
                        <div className="answer-value-textarea">
                            <textarea readOnly className="answer-value" placeholder="Digite a resposta" value={params.manifest.response.value}/>
                        </div>
                    </div>: <></>
                }
            </>
        )
    }
    const setQuestionResposes = (nameQuestion: string) => {
        let inputRadioElement: any = document.querySelector(`input[name="${nameQuestion}"]:checked`);
        setServiceEvaluationResponses({...serviceEvaluationResponses, [nameQuestion]: inputRadioElement.value })
    }

    const sendAssessment = () => {
        const send = async () => {{
            await api.post('service-evaluation/create', {
                ...serviceEvaluationResponses,
                userId: localStorage.getItem('user_id'),
                manifestId: params.manifest.id
            }, { headers: {
                Authorization: 'Bearer ' + localStorage.getItem('bearer_token')
            }})
        }}
        if (serviceEvaluationResponses.firstQuestion == '' || 
        serviceEvaluationResponses.secondQuestion == '' ||
        serviceEvaluationResponses.thirdQuestion == '') return toast.error('Você deve responder todas as perguntas antes de enviar')
        toast.promise(
            send,
            {
                pending: 'Enviando avaliação...',
                success: {
                    render() {
                        params.setOpen(!open)
                        return 'Avaliação enviada com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao enviar a avaliação'
            }
        )
    }
    return (
        <div className="see-manifest-details">
            <hr />
            <div className='header-info'>
                <button className="options-btn" onClick={() => setOpenOptionsModal(!openOptionsModal)}>
                    <VscThreeBars size={30} />
                </button>
                <span className='header-info-title'>MINHAS MANIFESTAÇÕES</span>
            </div>
            <hr />
            <div className='navigation-context'>
                <div className='navigation-start'>
                    <span>Ínicio</span>
                    <IoIosArrowForward style={{ opacity: '.2'}} />
                </div>
                <div className='navigation-start'>
                    <span>Minhas manifestações</span>
                    <IoIosArrowForward style={{ opacity: '.2'}} />
                </div>
                <div className='current'>
                    <span>Manifestação {params.manifest.protocol.value}</span>
                </div>
            </div>
            <MenuOptions open={openOptionsModal} />
            {
                params.open ? <>
                    <div className="see-progress-manifests-header">
                        <div className="back-btn-context" onClick={() => params.setOpen(!open)}>
                            <MdOutlineKeyboardBackspace size={25} />
                            <button className='back-btn' onClick={() => params.setOpen(!open)}>Voltar</button>
                        </div>
                        <div className="manifest-type">
                            <div className="manifest-type-context">
                                <div className="icon-imgs">
                                    {getSvg(groupStatusColor.open)}
                                    <img className="img-icon arrow-icon" src={arrowIcon} />
                                </div>
                                <span className="type-label" style={{ color: groupStatusColor.open }}>Em aberto</span>
                            </div>
                            <div className="line-marker" style={{ background: lineGroupStatusColor.firstLineColor }}></div>
                            <div className="manifest-type-context">
                                <div className="icon-imgs">
                                    {getSvg(groupStatusColor.inProgress)}
                                    <img className="img-icon arrow-icon" src={arrowIcon} />
                                </div>
                                <span className="type-label" style={{ color: groupStatusColor.inProgress }}>Em andamento</span>
                            </div>
                            <div className="line-marker" style={{ background: lineGroupStatusColor.secondLineColor }}></div>
                            <div className="manifest-type-context">
                                <div className="icon-imgs">
                                    {getSvg(groupStatusColor.concluded)}
                                    <img className="img-icon arrow-icon" src={arrowIcon} />
                                </div>
                                <span className="type-label" style={{ color: groupStatusColor.concluded }}>Concluido</span>
                            </div>
                        </div>
                    </div>
                    <div className="manifest-content">
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
                            {checkAnswer()}
                        </div>
                    </div>
                    {
                        params.manifest.manifestStatus.toLowerCase() == 'concluído' ?
                            <div className="service-evaluation">
                                <div className="service-evaluation-title">AVALIAÇÃO DO ATENDIMENTO</div>
                                <div className="service-evaluation-context">
                                    <div className="questions">
                                        <div className="question first-question">A sua manifestação foi atendida?</div>
                                        <div className="question second-question">A resposta fornecida foi fácil de compreender?</div>
                                        <div className="question third-question">Você está satisfeito(a) com o atendimento prestado?</div>
                                    </div>
                                    <div className="responses">
                                        <div className="response" onChange={() => setQuestionResposes('firstQuestion')}>
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
                                        <div className="response" onChange={() => setQuestionResposes('secondQuestion')}>
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
                                        <div className="response" onChange={() => setQuestionResposes('thirdQuestion')}>
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
                                        {
                                            enableServiceEvaluation ?
                                            <button className="send-service-evaluation-btn" onClick={sendAssessment}>Enviar avaliação</button>
                                            : 
                                            <button className="sent-service-evaluation-btn">Avaliação enviada</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        : <></>
                    }
                </>
                : <></>
            }
            <ToastContainer />
        </div>
    )
}