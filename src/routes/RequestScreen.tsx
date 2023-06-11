import React from 'react'
import { Table } from 'react-bootstrap';

import './css/RequestScreen.css';
import { BsInfoCircle, BsFillMicFill } from 'react-icons/bs';
import { IoIosHome, IoIosArrowForward } from 'react-icons/io';
import { ImAttachment } from 'react-icons/im';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { TbCircleArrowUp } from 'react-icons/tb';

export const RequestScreen = () => {
    const progressLabels = [
        {
            id: 'first',
            label: 'HOME',
            isEnd: true,
        },
        {
            id: 'second',
            label: 'TIPO',
            isEnd: false,
        },
        {
            id: 'third',
            label: 'DESCRIÇÃO',
            isEnd: false,
        },
        {
            id: 'fourth',
            label: 'REVISÃO',
            isEnd: false,
        },
        {
            id: 'fifth',
            label: 'CONCLUSÃO',
            isEnd: true,
        }
    ]
    const setDivToTop = () => {
        window.scrollTo(0, 0);
    }
    const backNavigation = () => {
        const activeProgressLabel: any = document.querySelector('.progress-label.active')
        let labelProgressIndex = progressLabels.findIndex(label => label.id == activeProgressLabel.id)
        console.log(progressLabels[labelProgressIndex])
        if (!progressLabels[labelProgressIndex].isEnd || progressLabels[labelProgressIndex].id != 'first') {
            let a: any = document.querySelector(`#${progressLabels[labelProgressIndex - 1].id}`)
            activeProgressLabel.classList.remove('active')
            a.classList.add('active')
        }
        setDivToTop()
    }
    const forwardNavigation = () => {
        const activeProgressLabel: any = document.querySelector('.progress-label.active')
        let labelProgressIndex = progressLabels.findIndex(label => label.id == activeProgressLabel.id)
        if (!progressLabels[labelProgressIndex].isEnd || progressLabels[labelProgressIndex].id != 'fifth') {
            let a: any = document.querySelector(`#${progressLabels[labelProgressIndex + 1].id}`)
            activeProgressLabel.classList.remove('active')
            a.classList.add('active')
        }
        setDivToTop()
    }
    return (
        <div>
            <hr />
            <div className='header-info'>
                <span className='header-info-title'>FAÇA SUA SOLICITAÇÃO</span>
                <div className='help-info screens request-screen'>
                    <span>AJUDA</span>
                    <BsInfoCircle size={20}/>
                </div>
            </div>
            <hr />
            <div className='header-icons'>
                <div className='home-icon'>
                    <IoIosHome style={{ color: '#555555'}} />
                    <span id="first" className='progress-label'>HOME</span>
                    <IoIosArrowForward style={{ opacity: '.2'}} />
                </div>
                <div>
                    <span id="second" className='progress-label'>TIPO</span>
                    <IoIosArrowForward style={{ opacity: '.2'}} />
                </div>
                <div>
                    <span id="third" className='progress-label active'>DESCRIÇÃO</span>
                    <IoIosArrowForward style={{ opacity: '.2'}} />
                </div>
                <div>
                    <span id="fourth" className='progress-label'>REVISÃO</span>
                    <IoIosArrowForward  style={{ opacity: '.2'}}/>
                </div>
                <div>
                    <span id="fifth" className='progress-label'>CONCLUSÃO</span>
                </div>
            </div>
            <hr />
            <div>
                <IoIosHome style={{ opacity: 0}}/>
            </div>
            <hr />
            <div className='request-container'>
                <p className='form-warning'>OS CAMPOS SINALISADOS COM ASTERÍSCO * SÃO DE PREENCHIMENTO OBRIGATÓRIO</p>
                <div className="request-form">
                    <div className='request-form-header'>
                        <p className='title'>Identificação</p>
                    </div>
                    <form className='form-request'>
                        <div className='form-request-left-side'>
                            <div className='name'>
                                <label htmlFor="name">NOME *</label>
                                <input id="name" type="text" />
                            </div>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} className="document">
                                <div className="type">
                                    <label htmlFor="type-document">DOCUMENTO</label>
                                    <select>
                                        <option value="1">CPF</option>
                                        <option value="2">RG</option>
                                        <option value="3">CNH</option>
                                    </select>
                                </div>
                                <div className="number-value">
                                    <label htmlFor="document-value">NÚMERO</label>
                                    <input id="document-value" type="text" placeholder='123456789XX'/>
                                </div>
                            </div>
                            <div className="contacting">
                                <label htmlFor="contacting-value">CONTATANTE</label>
                                <select>
                                        <option hidden selected>SELECIONE</option>
                                        <option value="1">---</option>
                                        <option value="2">---</option>
                                        <option value="3">---</option>
                                </select>
                            </div>
                        </div>
                        <div className='form-request-right-side'>
                            <div className="email">
                                <label htmlFor="email-value">EMAIL</label>
                                <input type="email" id="email-value" />
                            </div>
                            <div className="response-mode">
                                <label htmlFor="">MODO DE RESPOSTA *</label>
                                <select>
                                        <option hidden selected>PELO SISTEMA (COM AVISOS POR EMAIL)</option>
                                        <option value="1">---</option>
                                        <option value="2">---</option>
                                        <option value="3">---</option>
                                </select>
                            </div>
                            <div className="type-hemophilia">
                                <label htmlFor="">TIPO DE HEMOFILIA</label>
                                <select>
                                        <option hidden selected>SELECIONE</option>
                                        <option value="1">---</option>
                                        <option value="2">---</option>
                                        <option value="3">---</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className='addressee'>
                        <div className="addressee-header">
                            <p className='title'>Destinatário</p>
                        </div>
                        <div className='send-request'>
                            <label htmlFor="type-document">PARA QUAL SETOR QUER ENVIAR SUA SOLICITAÇÃO? *</label>
                            <select>
                                <option hidden selected>SELECIONAR SETOR</option>
                                <option value="1">---</option>
                                <option value="2">---</option>
                                <option value="3">---</option>
                            </select>
                        </div>
                    </div>
                    <div className="description">
                        <div className="description-header">
                            <p className='title'>Descrição</p>
                        </div>
                        <div className="talk-content">
                            <label htmlFor="talk-message">FALE AQUI *</label>
                            <span className='warning-msg'>DESCREVA O CONTEÚDO DA SUA SOLICITAÇÃO, DE FORMA CLARA E OBJETIVA.</span>
                            <textarea className='talk-message' name="" id="talk-message" placeholder='ESCREVA AQUI'></textarea>
                            <div className='action-buttons'>
                                <div className="transcribe-text">
                                    <BsFillMicFill size={20} />
                                    <span>TRANSCREVER TEXTO</span>
                                </div>
                                <div className="attach-files">
                                    <ImAttachment size={20} />
                                    <span>ANEXAR ARQUIVOS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="entry-channel">
                        <label htmlFor="entry-channel-value">CANAL DE ENTRADADE *</label>
                        <input className='entry-channel-value' type="text" id="entry-channel-value" placeholder='INTERNET'/>
                    </div>
                    <div className="request-form-footer">
                        <div className="uf">
                            <label htmlFor="">UF</label>
                            <select>
                                <option hidden selected>SELECIONE</option>
                                <option value="1">---</option>
                                <option value="2">---</option>
                                <option value="3">---</option>
                            </select>
                        </div>
                        <div className="city">
                            <label htmlFor="">CIDADE</label>
                            <select>
                                <option hidden selected>SELECIONE</option>
                                <option value="1">---</option>
                                <option value="2">---</option>
                                <option value="3">---</option>
                            </select>
                        </div>
                        <div className="location">
                            <label htmlFor="location-value">LOCAL</label>
                            <input type="text" id="location-value" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='navigation-form'>
                <div onClick={() => backNavigation()} className='back'>
                    <MdOutlineKeyboardDoubleArrowLeft size={30} />
                    <button>Voltar</button>
                </div>
                <div onClick={() => forwardNavigation()} className='advance'>
                    <MdOutlineKeyboardDoubleArrowRight size={30} />
                    <button>Avançar</button>
                </div>
            </div>
            <div onClick={setDivToTop} className='back-to-top'>
                <span>VOLTAR AO TOPO</span>
                <TbCircleArrowUp size={20} />
            </div>
        </div>  
    ) 
}
