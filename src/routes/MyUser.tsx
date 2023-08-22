import { useEffect, useState } from "react"
import { IoIosArrowForward } from "react-icons/io"
import { VscThreeBars } from "react-icons/vsc"
import { RiArrowDownSFill } from "react-icons/ri"
import { ProfilePicture } from '../contexts/ProfilePicture'
import { MenuOptions } from "../components/MenuOptions"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

import api from "../services/api"

import './css/MyUser.css'
import './css/media-layout.css'

import arrowUpIcon from '../assets/arrow-up.svg'
import defaultProfile from './../assets/profile.svg'

import { User } from '../types/User'

import { validateUserSession } from '../utils/validateSession.utils'

export const MyUser = () => {
    const navigate = useNavigate()
    const [userImg, setUserImg] = useState(defaultProfile)
    const [open, setOpen] = useState(false);
    const [acceptUseOfPersonalData, setAcceptUseOfPersonalData] = useState(false);
    const [user, setUser] = useState<User>({
        id: "",
        document: "",
        typeDocument: "",
        username: "",
        fullName: "",
        dateOfBirth: "",
        state: "",
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
        validateUserSession(navigate)
        getUserById()
    }, [])

    const uploadImg = (event: any) => {
        const upload = async () => {
            let selectedFile = event.target.files[0]
            const formData = new FormData()
            formData.append('file', selectedFile)
            const { data } = await api.post(`upload?userId=${localStorage.getItem('user_id')}`, formData)
            setUserImg(data.file.Location)
            return data
        }
        toast.promise(
            upload,
            {
                pending: 'Fazendo o upload...',
                success: {
                    render() {
                        window.location.reload()
                        return 'Upload realizado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao realizar o upload'
            }
        )
        
    }

    const getUserById = async () => {
        try  {
            const { data } = await api.get(`user/${localStorage.getItem('user_id')}`)
            setUserImg(data.profilePictureURL)
            setUser(data)
        } catch (err) {
            console.log(err)
        }
    }

    const updateUser = () => {
        if (!acceptUseOfPersonalData) return toast.error('Você deve aceitar o uso dos dados')
        const update = async () => {
            await api.put(`user/${user.id}`, user)
        }
        toast.promise(
            update,
            {
                pending: 'Atualizando informações...',
                success: {
                    render() {
                        window.location.reload()
                        return 'Atualizado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao atualizar as informações'
            }
        )
    }

    const setValuesOfInputFile = (event: any, typeFile: string) => {
        setUser({ ...user, [typeFile]: event.target.value })
    }

    const setValuesOfSelectElement = (event: any, typeFile: string) => {
        if (typeFile == 'pcd') {
            let selectedOptionText = event.target.options[event.target.selectedIndex].text.toLowerCase()
            setUser({ ...user, [typeFile]: selectedOptionText == 'sim' ? true : false })
        } else {
            setUser({ ...user, [typeFile]: event.target.options[event.target.selectedIndex].text })
        }
    }

    return (
        <div className="my-user-container">
            <hr />
            <div className='header-info'>
                <button className="options-btn" onClick={() => setOpen(!open)}>
                    <VscThreeBars size={30} />
                </button>
                <span className='header-info-title'>MEU USUÁRIO</span>
            </div>
            <hr />
            <div className='navigation-context'>
                <div className='navitation-start'>
                    <span>Ínicio</span>
                    <IoIosArrowForward style={{ opacity: '.2'}} />
                </div>
                <div className='current'>
                    <span>Meu usuário</span>
                </div>
            </div>
            <div className="edit-user-info">
                <MenuOptions open={open} />
                <div className="header">
                    <div className="preview-user-img">
                        <ProfilePicture.Provider value={{ userImg }} >
                        <img src={userImg} alt="" className="user-picture"/>

                        </ProfilePicture.Provider>
                    </div>
                    <div className="preview-user-name">{user.username}</div>
                    <div className="upload-user-img">
                        <label htmlFor="user-img-file" className="user-img-label">Alterar foto</label>
                        <input type="file" id="user-img-file" className="user-img-file" onChange={uploadImg}/>
                    </div>
                </div>
                <div className="edit-form-info">
                    <div className="info-advice">OS CAMPOS SINALIZADOS COM ASTERÍSCO (*) SÃO DE PREENCHIMENTO OBRIGATÓRIO</div>
                    <div className="title">Informações pessoais</div>
                    <div className="form-context-personal-information">
                        <div className="name_cpf_date-birth_state_city">
                            <div className="input-context name">
                                <label htmlFor="name-value">Nome completo</label>
                                <input
                                    onChange={event => setValuesOfInputFile(event, 'fullName')}
                                    value={user.fullName} type="text" className="input-text name-value" id="name-value" placeholder="Digite aqui" />
                            </div>
                            <div className="cpf_date-birth_state_city">
                                <div className="cpf_date-birth">
                                    <div className="input-context cpf">
                                        <label htmlFor="cpf-value">Cpf*</label>
                                        <input
                                            onChange={event => setValuesOfInputFile(event, 'document')}
                                            value={user.document} type="text" className="input-text cpf-value" id="cpf-value" placeholder="Digite aqui" />
                                    </div>
                                    <div className="input-context date-birth">
                                        <label htmlFor="date-birth-value">Data de nascimento*</label>
                                        <input
                                            onChange={event => setValuesOfInputFile(event, 'dateOfBirth')}
                                            value={user.dateOfBirth} type="date" className="input-text date-birth-value" id="date-birth-value" placeholder="Digite aqui" />
                                    </div>
                                </div>
                                <div className="state_city">
                                    <div className="select-context state">
                                        <label htmlFor="state-value">Estado*</label>
                                        <div className='select-input'>
                                            <select
                                                onChange={event => setValuesOfSelectElement(event, 'state')}
                                                value={user.state.toLowerCase()} className='state-value' name="" id="state-value">
                                                <option selected style={{display: 'none'}}>Selecione</option>
                                                <option value="são paulo">São Paulo</option>
                                                <option value="rio de janeiro">Rio de Janeiro</option>
                                            </select>
                                            <RiArrowDownSFill size={25} />
                                        </div>
                                    </div>
                                    <div className="select-context city">
                                        <label htmlFor="city-value">Cidade*</label>
                                        <div className='select-input'>
                                            <select
                                                onChange={event => setValuesOfSelectElement(event, 'city')}
                                                value={user.city.toLowerCase()} className='city-value' name="" id="city-value">
                                                <option selected style={{display: 'none'}}>Selecione</option>
                                                <option value="alagoas">ALAGOAS</option>
                                                <option value="amapá">AMAPÁ</option>
                                                <option value="amazonas">AMAZONAS</option>
                                                <option value="bahia">BAHIA</option>
                                                <option value="ceará">CEARÁ</option>
                                                <option value="espirito santo">ESPIRITO SANTO</option>
                                                <option value="goiás">GOIÁS</option>
                                                <option value="maranhão">MARANHÃO</option>
                                                <option value="mato grosso">MATO GROSSO</option>
                                                <option value="mato grosso do sul">MATO GROSSO DO SUL</option>
                                                <option value="minas gerais">MINAS GERAIS</option>
                                                <option value="pará">PARÁ</option>
                                                <option value="paraíba">PARAÍBA</option>
                                                <option value="paraná">PARANÁ</option>
                                                <option value="pernambuco">PERNAMBUCO</option>
                                                <option value="piauí">PIAUÍ</option>
                                                <option value="rio de janeiro">RIO DE JANEIRO</option>
                                                <option value="rio grande do norte">RIO GRANDE DO NORTE</option>
                                                <option value="rio grande do sul">RIO GRANDE DO SUL</option>
                                                <option value="rondônia">RONDÔNIA</option>
                                                <option value="roraima">RORAIMA</option>
                                                <option value="santa catarina">SANTA CATARINA</option>
                                                <option value="são paulo">SÃO PAULO</option>
                                                <option value="sergipe">SERGIPE</option>
                                                <option value="tocantins">TOCANTINS</option>
                                            </select>
                                            <RiArrowDownSFill size={25} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gender_race_category_email">
                            <div className="gender_race">
                                <div className="select-context gender">
                                    <label htmlFor="gender-value">Sexo*</label>
                                    <div className='select-input'>
                                        <select
                                            onChange={event => setValuesOfSelectElement(event, 'gender')}
                                            value={user.gender.toLowerCase()} className='gender-value' name="" id="gender-value">
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="feminino">FEMININO</option>
                                            <option value="masculino">MASCULINO</option>
                                            <option value="não me identifico">NÃO ME IDENTIFICO</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                                <div className="select-context race">
                                    <label htmlFor="race-value">Raça*</label>
                                    <div className='select-input'>
                                        <select
                                            onChange={event => setValuesOfSelectElement(event, 'race')}
                                            value={user.race.toLowerCase()} className='race-value' name="" id="race-value">
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="branca">BRANCA</option>
                                            <option value="pardo">PARDA</option>
                                            <option value="preta">PRETA</option>
                                            <option value="amarela">AMARELA</option>
                                            <option value="indígena">INDÍGENA</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                            </div>
                            <div className="category_email">
                                <div className="select-context category">
                                    <label htmlFor="category-value">Em que categoria você se encaixa?*</label>
                                    <div className='select-input'>
                                        <select
                                            onChange={event => setValuesOfSelectElement(event, 'category')}
                                            value={user.category.toLowerCase()} className='category-value' name="" id="category-value">
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="paciente">PACIENTE</option>
                                            <option value="familiar/cuidador">FAMILIAR / CUIDADOR</option>
                                            <option value="profissional da saúde / acadêmicos">PROFISSIONAL DA SAÚDE / ACADÊMICOS</option>
                                            <option value="outros">OUTROS</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                                <div className="input-context email">
                                    <label htmlFor="email-value">Email*</label>
                                    <input
                                        onChange={event => setValuesOfInputFile(event, 'email')}
                                        value={user.email} type="email" className="input-text email-value" id="email-value" placeholder="Digite aqui" />
                                </div>
                            </div>
                        </div>
                        <div className="phone-type_phone-value_owner-name">
                            <div className="phone-type_phone-value">
                                <div className="select-context phone-type">
                                    <label htmlFor="phone-type-value">Tipo de telefone</label>
                                    <div className='select-input'>
                                        <select
                                            onChange={event => setValuesOfSelectElement(event, 'typeOfPhone')}
                                            value={user.typeOfPhone.toLowerCase()} className='phone-type-value' name="" id="phone-type-value">
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="fixo">FIXO</option>
                                            <option value="celular">CELULAR</option>
                                            <option value="comercial">COMERCIAL</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                                <div className="input-context phone">
                                    <label htmlFor="phone-value">Telefone*</label>
                                    <input
                                        onChange={event => setValuesOfInputFile(event, 'phoneNumber')}
                                        value={user.phoneNumber} type="text" className="input-text phone-value" id="phone-value" placeholder="Digite aqui" />
                                </div>
                            </div>
                            <div className="owner">
                                <div className="input-context owner-name">
                                    <label htmlFor="owner-name-value">Nome do responsável*</label>
                                    <input
                                        onChange={event => setValuesOfInputFile(event, 'ownerName')}
                                        value={user.ownerName} type="text" className="input-text owner-name-value" id="phone-value" placeholder="Digite aqui" />
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="form-context-patient-information">
                        <div className="title">INFORMAÇÕES SOBRE O PACIENTE</div>
                        <div className="type-coagulopathy_severity-coagulopathy_location-treatment-center">
                            <div className="select-context type-coagulopathy">
                                <label htmlFor="type-coagulopathy-value">Tipo de coagulopatia</label>
                                <div className='select-input'>
                                    <select
                                        onChange={event => setValuesOfSelectElement(event, 'typeOfCoagulopathy')}
                                        value={user.typeOfCoagulopathy.toLowerCase()} className='type-coagulopathy-value' name="" id="type-coagulopathy-value">
                                        <option selected style={{display: 'none'}}>Selecione</option>
                                        <option value="hemofilia a">HEMOFILIA A</option>
                                        <option value="hemofilia b">HEMOFILIA B</option>
                                        <option value="doença de von willebrand">DOENÇA DE VON WILLEBRAND</option>
                                        <option value="outras coagulopatias">OUTRAS COAGULOPATIAS</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                            <div className="select-context severity-coagulopathy">
                                <label htmlFor="severity-coagulopathy-value">Gravidade da coagulopatia</label>
                                <div className='select-input'>
                                    <select
                                        onChange={event => setValuesOfSelectElement(event, 'severityOfCoagulopathy')}
                                        value={user.severityOfCoagulopathy.toLowerCase()} className='severity-coagulopathy-value' name="" id="severity-coagulopathy-value">
                                        <option selected style={{display: 'none'}}>Selecione</option>
                                        <option value="leve">LEVE</option>
                                        <option value="moderado">MODERADO</option>
                                        <option value="grave">GRAVE</option>
                                        <option value="não diagnosticado">NÃO DIAGNOSTICADO</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                            <div className="input-context location-treatment-center">
                                <label htmlFor="location-treatment-center-value">Localização do Centro de Tratamento</label>
                                <input
                                    onChange={event => setValuesOfInputFile(event, 'callCenterLocation')}
                                    value={user.callCenterLocation} type="text" className="input-text location-treatment-center-value" id="location-treatment-center-value" placeholder="Digite aqui" />
                            </div>
                        </div>
                        <div className="pcd_which_accept-use-my-data">
                            <div className="pcd_whick">
                                <div className="select-context pcd">
                                    <label htmlFor="pcd-value">PESSOA COM DEFICIENCIA (PCD)?</label>
                                    <div className='select-input'>
                                        <select
                                            onChange={event => setValuesOfSelectElement(event, 'pcd')}
                                            value={user.pcd ? 'sim' : 'não'} className='pcd-value' name="" id="pcd-value">
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="sim">SIM</option>
                                            <option value="não">NÃO</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                                <div className="select-context which">
                                    <label htmlFor="which-value">SE SIM, QUAL?</label>
                                    <div className='select-input'>
                                        <select
                                            onChange={event => setValuesOfSelectElement(event, 'typeOfDisability')}
                                            value={user.typeOfDisability.toLowerCase()} className='which-value' name="" id="which-value">
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="pessoa sem deficiência">PESSOA SEM DEFICIÊNCIA</option>
                                            <option value="pessoa com deficiência">PESSOA COM DEFICIÊNCIA</option>
                                            {/* <option value="3">ARTROPATIA HEMOFÍLICA MEMBRO SUPERIOR E MEMBRO INFERIOR</option> */}
                                            <option value="deficiencia mental">DEFICIENCIA MENTAL</option>
                                            <option value="transtorno do espectro autismo/tdh">TRANSTORNO DO ESPECTRO AUTISMO/TDH</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                            </div>
                            <div className="accept-use-data">
                                <div className="input-context accept-use-my-data">
                                    <input type="checkbox" id="accept-use-my-data-value" className="accept-use-my-data-value"
                                        onChange={event => setAcceptUseOfPersonalData(event.target.checked)}/>
                                    <label htmlFor="accept-use-my-data-value" >ACEITO O USO DOS MEUS DADOS</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="save-changes">
                        <button className="save-changes-btn" onClick={updateUser}>Salvar alterações</button>
                    </div>
                    <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='back-to-top'>
                        <span>Voltar ao topo</span>
                        <img className='logo' src={arrowUpIcon} />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}