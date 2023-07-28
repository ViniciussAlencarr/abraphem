import { IoIosArrowForward } from 'react-icons/io';
import { BsMic } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { VscThreeBars } from 'react-icons/vsc';

import './css/RequestScreen.css';
import './css/media-layout.css';

import arrowUpIcon from '../assets/arrow-up.svg'
import { RiArrowDownSFill } from 'react-icons/ri';

export const RequestScreen = () => {
    const setDivToTop = () => {
        window.scrollTo(0, 0);
    }
    return (
        <div className='request-screen-container'>
            <hr />
            <div className='header-info'>
                <button className="options-btn">
                    <VscThreeBars size={30} />
                </button>
                <span className='header-info-title'>FAÇA SUA MANIFESTAÇÃO</span>
            </div>
            <hr />
            <div className='navigation-context'>
                <div className='navitation-start'>
                    <span>Ínicio</span>
                    <IoIosArrowForward style={{ opacity: '.2'}} />
                </div>
                <div className='current'>
                    <span>Descrição</span>
                </div>
            </div>
            <div className="new-request-container">
                <div className="info-advice">OS CAMPOS SINALIZADOS COM ASTERÍSCO (*) SÃO DE PREENCHIMENTO OBRIGATÓRIO</div>
                <div className="title">Identificação</div>
                <div className="form-context">
                    <div className="type-manifestation_who-opening-manifest_input-channel">
                        <div className="select-context">
                            <label className='label-value' htmlFor="type-manifestation-label">Tipo de manifestação*</label>
                            <div className='select-input'>
                                <select className='select-element type-manifestation-value' id='type-manifestation-value'>
                                    <option selected style={{display: 'none'}}>Selecione</option>
                                    <option value="">----</option>
                                    <option value="">----</option>
                                </select>
                                <RiArrowDownSFill size={25} />
                            </div>
                        </div>
                        <div className="select-context">
                            <label className='label-value' htmlFor="who-opening-manifest-label">QUEM ESTÁ ABRINDO A MANIFESTAÇÃO?*</label>
                            <div className='select-input'>
                                <select className='select-element who-opening-manifest-value' id='who-opening-manifest-value'>
                                    <option selected style={{display: 'none'}}>Selecione</option>
                                    <option value="">----</option>
                                    <option value="">----</option>
                                </select>
                                <RiArrowDownSFill size={25} />
                            </div>
                        </div>
                        <div className="input-context input-channel">
                            <label className='label-value' htmlFor="input-channel-label">CANAL DE ENTRADA</label>
                            <input type="text" className="input-text input-channel-value" id="input-channel-value" placeholder="INTERNET" />
                        </div>
                    </div>
                    <div className="name_cpf_date-birth_state_city">
                        <div className="input-context full-name">
                            <label className='label-value' htmlFor="full-name-label">NOME COMPLETO PACIENTE / SOLICITANTE*</label>
                            <input type="text" className="input-text full-name-value" id="full-name-value" placeholder="Digite aqui" />
                        </div>
                        <div className="cpf_date-birth_state_city">
                            <div className="cpf_date-birth">
                                <div className="input-context cpf">
                                    <label className='label-value' htmlFor="cpf-label">CPF*</label>
                                    <input type="text" className="input-text cpf-value" id="cpf-value" placeholder="Digite aqui" />
                                </div>
                                <div className="input-context date-birth">
                                    <label className='label-value' htmlFor="date-birth-label">DATA DE NASCIMENTO*</label>
                                    <input type="date" className="input-text date-birth-value" id="date-birth-value" placeholder="Digite aqui" />
                                </div>
                            </div>
                            <div className="state_city">
                                <div className="select-context">
                                    <label className='label-value' htmlFor="state-label">Estado*</label>
                                    <div className='select-input'>
                                        <select className='select-element state-value' id='state-value'>
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="">----</option>
                                            <option value="">----</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                                <div className="select-context">
                                    <label className='label-value' htmlFor="city-label">Cidade*</label>
                                    <div className='select-input'>
                                        <select className='select-element city-value' id='city-value'>
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="">----</option>
                                            <option value="">----</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gender_race_email">
                        <div className="gender_race">
                            <div className="select-context">
                                <label className='label-value' htmlFor="gender-label">Sexo*</label>
                                <div className='select-input'>
                                    <select className='select-element gender-value' id='gender-value'>
                                        <option selected style={{display: 'none'}}>Selecione</option>
                                        <option value="">----</option>
                                        <option value="">----</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                            <div className="select-context">
                                <label className='label-value' htmlFor="race-label">Raça*</label>
                                <div className='select-input'>
                                    <select className='select-element race-value' id='race-value'>
                                        <option selected style={{display: 'none'}}>Selecione</option>
                                        <option value="">----</option>
                                        <option value="">----</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                        </div>
                        <div className="email-context">
                            <div className="input-context email">
                                <label className='label-value' htmlFor="email-label">Email*</label>
                                <input type="email" className="input-text email-value" id="email-value" placeholder="Digite aqui" />
                            </div>
                        </div>
                    </div>
                    <div className="type-phone_phone_owner-name">
                        <div className="select-context">
                            <label className='label-value' htmlFor="type-phone-label">Tipo de telefone*</label>
                            <div className='select-input'>
                                <select className='select-element type-phone-value' id='type-phone-value'>
                                    <option selected style={{display: 'none'}}>Selecione</option>
                                    <option value="">----</option>
                                    <option value="">----</option>
                                </select>
                                <RiArrowDownSFill size={25} />
                            </div>
                        </div>
                        <div className="input-context phone">
                            <label className='label-value' htmlFor="phone-label">Telefone*</label>
                            <input type="email" className="input-text phone-value" id="phone-value" placeholder="Digite aqui (DDD+ NÚMERO)" />
                        </div>
                        <div className="input-context owner-name">
                            <label className='label-value' htmlFor="label-value owner-name-label">Nome do responsável*</label>
                            <input type="email" className="input-text owner-name-value" id="owner-name-value" placeholder="Digite aqui" />
                        </div>
                    </div>
                    <hr />
                    <div className="title second">Sobre o paciente</div>
                    <div className="type-coagulopathy_severity-coagulopathy_location-treatment-center">
                        <div className="input-context type-coagulopathy">
                            <label className='label-value' htmlFor="type-coagulopathy-value">Tipo de coagulopatia</label>
                            <input type="text" className="input-text type-coagulopathy-value" id="type-coagulopathy-value" placeholder="Outras Coagulopatias" />
                        </div>
                        <div className="input-context severity-coagulopathy">
                            <label className='label-value' htmlFor="severity-coagulopathy-value">Gravidade da coagulopatia</label>
                            <input type="text" className="input-text severity-coagulopathy-value" id="severity-coagulopathy-value" placeholder="Leve" />
                        </div>
                        <div className="input-context location-treatment-center">
                            <label className='label-value' htmlFor="location-treatment-center-value">Localização do Centro de Tratamento </label>
                            <input type="text" className="input-text location-treatment-center-value" id="location-treatment-center-value" placeholder="Centro de Tratamento 123" />
                        </div>
                    </div>
                    <div className="disabled-person_which-person_accept-use-my-data">
                        <div className="disabled-person_which-person">
                            <div className="select-context">
                                <label className='label-value' htmlFor="disabled-person-value">PESSOA COM DEFICIENCIA (PCD)?</label>
                                <div className='select-input'>
                                    <select className='select-element disabled-person-value' id='disabled-person-value'>
                                        <option selected style={{display: 'none'}}>Selecione</option>
                                        <option value="">----</option>
                                        <option value="">----</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                            <div className="select-context">
                                <label className='label-value' htmlFor="which-person-value">SE SIM, QUAL?</label>
                                <div className='select-input'>
                                    <select className='select-element which-person-value' id='which-person-value'>
                                        <option selected style={{display: 'none'}}>Selecione</option>
                                        <option value="">----</option>
                                        <option value="">----</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                        </div>
                        <div className="accept-use-data">
                            <div className="input-context accept-use-my-data">
                                <input type="checkbox" id="accept-use-my-data-value" className="accept-use-my-data-value" />
                                <label htmlFor="accept-use-my-data-value">ACEITO O USO DOS MEUS DADOS</label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="title second">REGISTRE AQUI SUA MANIFESTAÇÃO</div>
                    <div className="manifest-value">
                        <label htmlFor="manifest-text-value" className="manifest-label">DESCREVA O CONTEÚDO DA SUA MANIFESTAÇÃO, <b>DE FORMA CLARA E OBJETIVA.</b></label>
                        <textarea placeholder='Digite aqui' name="" id="manifest-text-value" className="manifest-text-value"/>
                    </div>
                    <div className="actions">
                        <div className="action-button-context">
                            <button className="action-btn transcribe-text-btn">
                                <BsMic className="icon" size={15} />
                            </button>
                            <label htmlFor="" className='action-label'>Transcrever texto</label>
                        </div>
                        <div className="action-button-context">
                            <button className="action-btn attach-file-btn">
                                <ImAttachment className="icon" size={15}/>
                            </button>
                            <label htmlFor="" className='action-label'>Anexar arquivos</label>
                        </div>
                    </div>
                    <div className="forward-back-btns">
                        <button className="btn-action back">Voltar</button>
                        <button className="btn-action forward">Avançar</button>
                    </div>
                </div>
            </div>
            <div onClick={setDivToTop} className='back-to-top'>
                <span>Voltar ao topo</span>
                <img className='logo' src={arrowUpIcon} />
            </div>
        </div>  
    ) 
}
