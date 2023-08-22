import { IoIosArrowForward } from 'react-icons/io';
import { BsMic } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { VscThreeBars } from 'react-icons/vsc';
import { useState } from 'react';
import { RiArrowDownSFill } from 'react-icons/ri';
import { MenuOptions } from '../../components/MenuOptions';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import api from '../../services/api';

import './../css/CreateManifest.css';
import './../css/media-layout.css';

import arrowUpIcon from '../../assets/arrow-up.svg'

export const CreateManifest = () => {
    let date = new Date();
    const [open, setOpen] = useState(false);
    const [acceptTermsAndServices, setAcceptTermsAndServices] = useState(false);
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
        manifestStatus: 'Em aberto',
        lastUpdate: date.toLocaleDateString(),
        userId: localStorage.getItem('user_id') ? localStorage.getItem('user_id') : '', 
        protocol: {
            value: 1234567,
            period: date.toLocaleDateString()
        },
        response: {
            title: 'SOLICITAÇÃO EM ANÁLISE PELO SETOR RESPONSAVEL',
            period: date.toLocaleDateString(),
            state: 'AGUARDANDO ANÁLISE',
            value: '',
            answeredAt: date.toLocaleDateString(),
            answeredBy: ''
        }
    });
    
    const navigate = useNavigate();

    const setDivToTop = () => {
        window.scrollTo(0, 0);
    }
    
    const sendManifest = async () => {
        try {
            return await api.post('manifest/create', request, { headers: {
                Authorization: 'Bearer ' + localStorage.getItem('bearer_token'),
                'Content-Type': 'application/json'
            }})
        } catch (err) {
            console.log(err)
            throw err
        }
    }
    
    const nextStep = () => {
        if (!acceptTermsAndServices) throw toast.error('Você deve aceitar os termos.')
        /* verifyRequiredFields() */
        toast.promise(
            sendManifest,
            {
                pending: 'Fazendo login...',
                success: {
                    render() {
                        setTimeout(() => navigate('/'), 1000)
                        return 'Login realizado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao realizar o login'
            }
        )
        navigate('/manifest/status/success')
    }

    const setInputValues = (event: any, typeOfValue: string) => {
        setRequest({ ...request, [typeOfValue]: event.target.value })
    }

    const setSelectValues = (event: any, typeOfValue: string) => {
        setRequest({ ...request, [typeOfValue]: event.target.options[event.target.selectedIndex].text })
    }

    return (
        <div className='request-screen-container'>
            <hr />
            <div className='header-info'>
                <button className="options-btn" onClick={() => setOpen(!open)}>
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
                <MenuOptions open={open} />
                <div className="info-advice">OS CAMPOS SINALIZADOS COM ASTERÍSCO (*) SÃO DE PREENCHIMENTO OBRIGATÓRIO</div>
                <div className="title">Identificação</div>
                <div className="form-context">
                    <div className="type-manifestation_who-opening-manifest_input-channel">
                        <div className="select-context">
                            <label className='label-value' htmlFor="type-manifestation-label">Tipo de manifestação*</label>
                            <div className='select-input'>
                                <select onChange={event => setSelectValues(event, 'manifestType')} className='select-element type-manifestation-value' id='type-manifestation-value'>
                                    <option selected style={{display: 'none'}}>Selecione</option>
                                    <option value="">RECLAMAÇÃO</option>
                                    <option value="">SOLICITAÇÃO</option>
                                    <option value="">INFORMAÇÃO</option>
                                    <option value="">ELOGIO</option>
                                    <option value="">SUGESTÃO</option>
                                    <option value="">DENUNCIA</option>
                                </select>
                                <RiArrowDownSFill size={25} />
                            </div>
                        </div>
                        <div className="select-context">
                            <label className='label-value' htmlFor="who-opening-manifest-label">QUEM ESTÁ ABRINDO A MANIFESTAÇÃO?*</label>
                            <div className='select-input'>
                                <select onChange={event => setSelectValues(event, 'whoIsOpenManifest')} className='select-element who-opening-manifest-value' id='who-opening-manifest-value'>
                                    <option selected style={{display: 'none'}}>Selecione</option>
                                    <option value="">PACIENTE</option>
                                    <option value="">FAMILIAR / CUIDADOR</option>
                                    <option value="">PROFISSIONAL DA SAÚDE / ACADÊMICOS</option>
                                    <option value="">OUTROS</option>
                                </select>
                                <RiArrowDownSFill size={25} />
                            </div>
                        </div>
                        <div className="input-context input-channel">
                            <label className='label-value' htmlFor="input-channel-label">CANAL DE ENTRADA</label>
                            <input value={request.entryChannel} onChange={event => setInputValues(event, 'entryChannel')}  type="text" className="input-text input-channel-value" id="input-channel-value" placeholder="INTERNET" />
                        </div>
                    </div>
                    <div className="name_cpf_date-birth_state_city">
                        <div className="input-context full-name">
                            <label className='label-value' htmlFor="full-name-label">NOME COMPLETO PACIENTE / SOLICITANTE*</label>
                            <input value={request.patientFullName} onChange={event => setInputValues(event, 'patientFullName')} type="text" className="input-text full-name-value" id="full-name-value" placeholder="Digite aqui" />
                        </div>
                        <div className="cpf_date-birth_state_city">
                            <div className="cpf_date-birth">
                                <div className="input-context cpf">
                                    <label className='label-value' htmlFor="cpf-label">CPF*</label>
                                    <input value={request.cpf} onChange={event => setInputValues(event, 'cpf')} type="text" className="input-text cpf-value" id="cpf-value" placeholder="Digite aqui" />
                                </div>
                                <div className="input-context date-birth">
                                    <label className='label-value' htmlFor="date-birth-label">DATA DE NASCIMENTO*</label>
                                    <input type="date" value={request.dateBirth} onChange={event => setInputValues(event, 'dateBirth')} className="input-text date-birth-value" id="date-birth-value" placeholder="Digite aqui" />
                                </div>
                            </div>
                            <div className="state_city">
                                <div className="select-context">
                                    <label className='label-value' htmlFor="state-label">Estado*</label>
                                    <div className='select-input'>
                                        <select onChange={event => setSelectValues(event, 'state')} className='select-element state-value' id='state-value'>
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="">ALAGOAS</option>
                                            <option value="">AMAPÁ</option>
                                            <option value="">AMAZONAS</option>
                                            <option value="">BAHIA</option>
                                            <option value="">CEARÁ</option>
                                            <option value="">ESPIRITO SANTO</option>
                                            <option value="">GOIÁS</option>
                                            <option value="">MARANHÃO</option>
                                            <option value="">MATO GROSSO</option>
                                            <option value="">MATO GROSSO DO SUL</option>
                                            <option value="">MINAS GERAIS</option>
                                            <option value="">PARÁ</option>
                                            <option value="">PARAÍBA</option>
                                            <option value="">PARANÁ</option>
                                            <option value="">PERNAMBUCO</option>
                                            <option value="">PIAUÍ</option>
                                            <option value="">RIO DE JANEIRO</option>
                                            <option value="">RIO GRANDE DO NORTE</option>
                                            <option value="">RIO GRANDE DO SUL</option>
                                            <option value="">RONDÔNIA</option>
                                            <option value="">RORAIMA</option>
                                            <option value="">SANTA CATARINA</option>
                                            <option value="">SÃO PAULO</option>
                                            <option value="">SERGIPE</option>
                                            <option value="">TOCANTINS</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                                <div className="select-context">
                                    <label className='label-value' htmlFor="city-label">Cidade*</label>
                                    <div className='select-input'>
                                        <select onChange={event => setSelectValues(event, 'city')} className='select-element city-value' id='city-value'>
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="">SÃO PAULO</option>
                                            <option value="">RIO DE JANEIRO</option>
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
                                    <select onChange={event => setSelectValues(event, 'gender')} className='select-element gender-value' id='gender-value'>
                                        <option selected style={{display: 'none'}}>Selecione</option>
                                        <option value="">FEMININO</option>
                                        <option value="">MASCULINO</option>
                                        <option value="">NÃO ME IDENTIFICO</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                            <div className="select-context">
                                <label className='label-value' htmlFor="race-label">Raça*</label>
                                <div className='select-input'>
                                    <select onChange={event => setSelectValues(event, 'race')} className='select-element race-value' id='race-value'>
                                        <option selected style={{display: 'none'}}>Selecione</option>
                                        <option value="">BRANCA</option>
                                        <option value="">PARDA</option>
                                        <option value="">PRETA</option>
                                        <option value="">AMARELA</option>
                                        <option value="">INDÍGENA</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                        </div>
                        <div className="email-context">
                            <div className="input-context email">
                                <label className='label-value' htmlFor="email-label">Email*</label>
                                <input value={request.email} onChange={event => setInputValues(event, 'email')} type="email" className="input-text email-value" id="email-value" placeholder="Digite aqui" />
                            </div>
                        </div>
                    </div>
                    <div className="type-phone_phone_owner-name">
                        <div className="select-context">
                            <label className='label-value' htmlFor="type-phone-label">Tipo de telefone*</label>
                            <div className='select-input'>
                                <select onChange={event => setSelectValues(event, 'phoneType')} className='select-element type-phone-value' id='type-phone-value'>
                                    <option selected style={{display: 'none'}}>Selecione</option>
                                    <option value="">FIXO</option>
                                    <option value="">CELULAR</option>
                                    <option value="">COMERCIAL</option>
                                </select>
                                <RiArrowDownSFill size={25} />
                            </div>
                        </div>
                        <div className="input-context phone">
                            <label className='label-value' htmlFor="phone-label">Telefone*</label>
                            <input value={request.phoneNumber} onChange={event => setInputValues(event, 'phoneNumber')} type="email" className="input-text phone-value" id="phone-value" placeholder="Digite aqui (DDD+ NÚMERO)" />
                        </div>
                        <div className="input-context owner-name">
                            <label className='label-value' htmlFor="label-value owner-name-label">Nome do responsável*</label>
                            <input value={request.ownerName} onChange={event => setInputValues(event, 'ownerName')} type="email" className="input-text owner-name-value" id="owner-name-value" placeholder="Digite aqui" />
                        </div>
                    </div>
                    <hr />
                    <div className="title second">Sobre o paciente</div>
                    <div className="type-coagulopathy_severity-coagulopathy_location-treatment-center">
                        <div className="select-context">
                            <label className='label-value' htmlFor="type-coagulopathy-value">Tipo de coagulopatia</label>
                            <div className='select-input'>
                                <select onChange={event => setSelectValues(event, 'typeCoagulopathy')} className='select-element type-coagulopathy-value' id='type-coagulopathy-value'>
                                    <option selected style={{display: 'none'}}>Selecione</option>
                                    <option value="">HEMOFILIA A</option>
                                    <option value="">HEMOFILIA B</option>
                                    <option value="">DOENÇA DE VON WILLEBRAND</option>
                                    <option value="">OUTRAS COAGULOPATIAS</option>
                                </select>
                                <RiArrowDownSFill size={25} />
                            </div>
                        </div>
                        <div className="select-context">
                            <label className='label-value' htmlFor="severity-coagulopathy-value">Gravidade da coagulopatia</label>
                            <div className='select-input'>
                                <select onChange={event => setSelectValues(event, 'severityCoagulopathy')} className='select-element severity-coagulopathy-value' id='severity-coagulopathy-value'>
                                    <option selected style={{display: 'none'}}>Selecione</option>
                                    <option value="">LEVE</option>
                                    <option value="">MODERADO</option>
                                    <option value="">GRAVE</option>
                                    <option value="">NÃO DIAGNOSTICADO</option>
                                </select>
                                <RiArrowDownSFill size={25} />
                            </div>
                        </div>
                        <div className="input-context location-treatment-center">
                            <label className='label-value' htmlFor="location-treatment-center-value">Localização do Centro de Tratamento </label>
                            <input value={request.locationTreatment} onChange={event => setInputValues(event, 'locationTreatment')} type="text" className="input-text location-treatment-center-value" id="location-treatment-center-value" placeholder="Centro de Tratamento 123" />
                        </div>
                    </div>
                    <div className="disabled-person_which-person_accept-use-my-data">
                        <div className="disabled-person_which-person">
                            <div className="select-context">
                                <label className='label-value' htmlFor="disabled-person-value">PESSOA COM DEFICIENCIA (PCD)?</label>
                                <div className='select-input'>
                                    <select onChange={event => setSelectValues(event, 'disabledPerson')} className='select-element disabled-person-value' id='disabled-person-value'>
                                        <option selected style={{display: 'none'}}>Selecione</option>
                                        <option value="">SIM</option>
                                        <option value="">NÃO</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                            <div className="select-context">
                                <label className='label-value' htmlFor="which-person-value">SE SIM, QUAL?</label>
                                <div className='select-input'>
                                    <select onChange={event => setSelectValues(event, 'typeOfDisability')} className='select-element which-person-value' id='which-person-value'>
                                        <option selected style={{display: 'none'}}>Selecione</option>
                                        <option value="">PESSOA SEM DEFICIÊNCIA</option>
                                        <option value="">PESSOA COM DEFICIÊNCIA</option>
                                        {/* <option value="">ARTROPATIA HEMOFÍLICA MEMBRO SUPERIOR E MEMBRO INFERIOR</option> */}
                                        <option value="">DEFICIENCIA MENTAL</option>
                                        <option value="">TRANSTORNO DO ESPECTRO AUTISMO/TDH</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                        </div>
                        <div className="accept-use-data">
                            <div className="input-context accept-use-my-data">
                                <input onChange={event => setAcceptTermsAndServices(event.target.checked)} type="checkbox" id="accept-use-my-data-value" className="accept-use-my-data-value" />
                                <label htmlFor="accept-use-my-data-value">ACEITO O USO DOS MEUS DADOS</label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="title second">REGISTRE AQUI SUA MANIFESTAÇÃO</div>
                    <div className="manifest-value">
                        <label htmlFor="manifest-text-value" className="manifest-label">DESCREVA O CONTEÚDO DA SUA MANIFESTAÇÃO, <b>DE FORMA CLARA E OBJETIVA.</b></label>
                        <textarea value={request.manifestValue} onChange={event => setInputValues(event, 'manifestValue')} placeholder='Digite aqui' name="" id="manifest-text-value" className="manifest-text-value"/>
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
                        <button className="btn-action forward" onClick={nextStep}>Avançar</button>
                    </div>
                </div>
            </div>
            <div onClick={setDivToTop} className='back-to-top'>
                <span>Voltar ao topo</span>
                <img className='logo' src={arrowUpIcon} />
            </div>
            <ToastContainer />
        </div>  
    ) 
}
