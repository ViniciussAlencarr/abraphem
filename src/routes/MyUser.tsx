import { useEffect, useState } from "react"
import axios from "axios"
import { VscThreeBars } from "react-icons/vsc"
import { RiArrowDownSFill } from "react-icons/ri"
import { ProfilePicture } from '../contexts/ProfilePicture'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import InputMask from "react-input-mask";

import { MenuOptions } from "../components/MenuOptions"
import { SelectDeficiencies, SelectDeficienciesToMultiUser } from "../components/SelectDeficiencies"


import api from "../services/api"

import './css/MyUser.css'
import './css/media-layout.css'

import arrowUpIcon from '../assets/arrow-up.svg'
import defaultProfile from './../assets/profile.svg'

import { User } from '../types/User'
import { Patient } from "../types/Patient"

import listOfBloodCenters from '../utils/getListOfBloodCenters'
import { allDeficiencies } from "../utils/getAllDeficiencies"

import acceptUsePdfData from '../../public/TERMO DE USO.docx.pdf'

const cpfMask = (value: string) => {
    return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}
const phoneMask = (phone: string) => {
    return phone.replace(/\D/g, '')
    .replace(/^(\d)/, '($1')
    .replace(/^(\(\d{2})(\d)/, '$1) $2')
    .replace(/(\d{4})(\d{1,5})/, '$1-$2')
    .replace(/(-\d{5})\d+?$/, '$1');
}

const phoneMaskPhoneLandline = (phone: string) => {
    return phone.replace(/\D/g, '')
    .replace(/^(\d)/, '($1')
    .replace(/^(\(\d{2})(\d)/, '$1) $2')
    .replace(/(\d{4})(\d{1,5})/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}

const userInitialObject = {
    document: "",
    typeDocument: "",
    username: "",
    fullName: "",
    dateOfBirth: "",
    stateName: "",
    city: "",
    gender: "",
    cep: '',
    race: "",
    category: "paciente",
    typeOfPhone: "",
    phoneNumber: "",
    ownerName: "",
    typeOfCoagulopathy: "",
    severityOfCoagulopathy: "",
    callCenterLocation: "",
    password: "",
    pcd: false,
    typeOfDisability: "",
    email: "-",
    roleUser: "2",
    profilePictureURL: ""
}


export const MyUser = () => {
    const navigate = useNavigate()
    const [userImg, setUserImg] = useState(defaultProfile)
    const [open, setOpen] = useState(false);
    const [acceptUseOfPersonalData, setAcceptUseOfPersonalData] = useState(false);
    const [isMobile, setIsMobile] = useState(false)
    const [patients, setPatients] = useState<Patient[]>([])
    const [user, setUser] = useState<User>(userInitialObject)
    const [newPatient, setNewPatient] = useState<Patient>({ ...userInitialObject, responsibleId: user.id })
    const [deficiencies, setDeficiencies] = useState(allDeficiencies)

    useEffect(() => {
        if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
        if (!localStorage.getItem('bearer_token')) {
            navigate('/login?loginRequired=true&action=myUser')
        }
        getUserById()
        getAllPatients()
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

    const searchCepToResponsibleUser = async (event: any) => {
        const { data } = await axios.get(`https://viacep.com.br/ws/${event.target.value}/json/`)
        setUser({...user, city: data?.localidade, stateName: data?.uf, cep: event.target.value })
    }

    const getUserById = async () => {
        try  {
            const { data } = await api.get(`user/${localStorage.getItem('user_id')}`)
            setUserImg(data.profilePictureURL)
            setUser({
                ...data,
                race: data.race == 'pardo' ? 'parda' : data.race
            })
        } catch (err) {
            console.log(err)
        }
    }

    const getAllPatients = async () => {
        try  {
            const { data } = await api.get(`users/get-patients/${localStorage.getItem('user_id')}`)
            setPatients(data)
        } catch (err) {
            console.log(err)
        }
    }

    const updateUser = () => {
        if (!acceptUseOfPersonalData) return toast.error('Você deve aceitar o uso dos dados')
        user.username = user.fullName
        user.typeOfDisability = deficiencies.filter(deficiency => deficiency.checked).map(deficiency => deficiency.text).toString()
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
        setUser({ ...user, [typeFile]: typeFile == 'document' ? 
            cpfMask(event.target.value) :
        typeFile == 'phoneNumber' ?
        user.typeOfPhone.toLowerCase() == 'celular' ? phoneMask(event.target.value) : phoneMaskPhoneLandline(event.target.value) : event.target.value })
    }

    const setValuesOfPatientInputFile = (event: any, index: number, typeFile: string) => {
        let existentPatients = [...patients]
        existentPatients[index] = {
            ...existentPatients[index],
            [typeFile]:
                typeFile == 'document' ? 
                    cpfMask(event.target.value) :
                typeFile == 'phoneNumber' ?
                    phoneMask(event.target.value) :
                event.target.value
        }
        setPatients(existentPatients)
    }

    const setValuesOfNewPatientInputFile = (event: any, typeFile: string) => {
        setNewPatient({ ...newPatient, [typeFile]: typeFile == 'document' ? 
            cpfMask(event.target.value) :
            typeFile == 'phoneNumber' ?
            user.typeOfPhone.toLowerCase() == 'celular' ? phoneMask(event.target.value) : phoneMaskPhoneLandline(event.target.value) : event.target.value })
        }

    const setValuesOfSelectElement = (event: any, typeFile: string) => {
        if (typeFile == 'pcd') {
            let selectedOptionText = event.target.options[event.target.selectedIndex].text.toLowerCase()
            setUser({ ...user, [typeFile]: selectedOptionText == 'sim' ? true : false })
        } else {
            setUser({ ...user, [typeFile]: event.target.options[event.target.selectedIndex].text })
        }
    }

    const setValuesOfPatientSelectElement = (event: any, index: number, typeFile: string) => {
        let existentPatients = [...patients]
        let selectedOptionText = event.target.options[event.target.selectedIndex].text
        existentPatients[index] = {
            ...existentPatients[index],
            [typeFile]:
                typeFile == 'pcd' ? 
                    selectedOptionText.toLowerCase() == 'sim' ? true : false :
                selectedOptionText
        }
        setPatients(existentPatients)
    }

    const setValuesOfNewPatientSelectElement = (event: any, typeFile: string) => {
        let selectedOptionText = event.target.options[event.target.selectedIndex].text.toLowerCase()
        if (typeFile == 'pcd') {
            setNewPatient({ ...newPatient, [typeFile]: selectedOptionText == 'sim' ? true : false })
        } else {
            setNewPatient({ ...newPatient, [typeFile]: selectedOptionText })
        }
    }

    const openThermsAndServicesPdf = () => {
        var link = document.createElement('a');
        link.href = acceptUsePdfData;
        link.target = '_blank';
        link.dispatchEvent(new MouseEvent('click'));
    }

    const formatMobileExistentDate = (value: any) => {
        const [year, month, day] = value.split('-')
        return day + month + year
    }

    const updatePatient = (event: any) => {
        event.preventDefault()
        const patientIndex = event.target.getAttribute('data-patient-index')
        const patient = patients[patientIndex]

        patient.username = patient.fullName

        const update = async () => {
            await api.put(`user/${patient.id}`, patient)
        }
        toast.promise(
            update,
            {
                pending: 'Atualizando paciente...',
                success: {
                    render() {
                        setInterval(() => window.location.reload(), 500)
                        return 'Atualizado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao atualizar as informações do paciente'
            }
        )
    }

    const updatePersonalInformation = (event: any) => {
        event.preventDefault()
        user.username = user.fullName
        const update = async () => {
            await api.put(`user/${user.id}`, user)
        }
        toast.promise(
            update,
            {
                pending: 'Atualizando informações...',
                success: {
                    render() {
                        setInterval(() => window.location.reload(), 500)
                        return 'Atualizado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao atualizar as informações'
            }
        )
    }

    const addNewPatient = (event: any) => {
        event.preventDefault()
        newPatient.username = user.fullName
        newPatient.responsibleId = user.id
        newPatient.ownerName = user.fullName
        const createPatient = async () => {
            const create = async () => {
                const { data } = await api.post('signup', newPatient)
                if (data.error) {
                    toast.error(data.message)
                    throw data.error
                }
            }
            await create()
        }
        toast.promise(
            createPatient,
            {
                pending: 'Criando paciente...',
                success: {
                    render() {
                        setTimeout(() => window.location.reload(), 500)
                        return 'Paciente criado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao criar o paciente'
            }
        )
    }

    return (
        <div className="my-user-container">
            <MenuOptions open={open} />
            <hr />
            <div className='header-info'>
                <button className="options-btn" onClick={() => setOpen(!open)}>
                    <VscThreeBars size={30} />
                </button>
                <span className='header-info-title'>MEU USUÁRIO</span>
            </div>
            <hr />
            
            <div className="edit-user-info">
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
                    <form onSubmit={updatePersonalInformation}  className="form-context-personal-information">
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
                                    {isMobile ? 
                                    <div className="input-context date-birth">
                                        <label htmlFor="date-birth-value">Data de nascimento*</label>
                                        <InputMask
                                            mask="99/99/9999" 
                                            onChange={event => setValuesOfInputFile(event, 'dateOfBirth')}
                                            value={formatMobileExistentDate(user.dateOfBirth)} type="text" className="input-text date-birth-value" id="date-birth-value" placeholder="Digite aqui" />
                                    </div>
                                    :
                                    <div className="input-context date-birth">
                                        <label htmlFor="date-birth-value">Data de nascimento*</label>
                                        <input
                                            onChange={event => setValuesOfInputFile(event, 'dateOfBirth')}
                                            value={user.dateOfBirth} type="date" className="input-text date-birth-value" id="date-birth-value" placeholder="Digite aqui" />
                                    </div>}
                                </div>
                                <div className="state_city">
                                    {user.category.toLowerCase() != 'outros' && <div className="input-context cep">
                                        <label htmlFor="cep">CEP*</label>
                                        <input
                                            autoComplete="off"
                                            value={user.cep}
                                            className="input-text cep" id="cep"
                                            placeholder="Digite aqui"
                                            onChange={event => {setValuesOfInputFile(event, 'cep'); searchCepToResponsibleUser(event)}} type="text" name="" />
                                    </div>}
                                    <div className="select-context state">
                                        <label htmlFor="state-value">Estado*</label>
                                        <div className='select-input'>
                                            <select
                                                onChange={event => setValuesOfSelectElement(event, 'stateName')}
                                                value={user.stateName == '' ? undefined : user.stateName} className='state-value' name="" id="state-value">
                                                <option selected style={{display: 'none'}}>Selecione</option>
                                                <option value={user.stateName}>{user.stateName}</option>
                                            </select>
                                            <RiArrowDownSFill size={25} />
                                        </div>
                                    </div>
                                    <div className="select-context city">
                                        <label htmlFor="city-value">Cidade*</label>
                                        <div className='select-input'>
                                            <select
                                                onChange={event => setValuesOfSelectElement(event, 'city')}
                                                value={user.city == '' ? undefined : user.city} className='city-value' name="" id="city-value">
                                                <option selected style={{display: 'none'}}>Selecione</option>
                                                <option value={user.city}>{user.city}</option>
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
                                {user.category.toLowerCase() == 'paciente' && <div className="select-context race">
                                    <label htmlFor="race-value">Raça*</label>
                                    <div className='select-input'>
                                        <select
                                            onChange={event => setValuesOfSelectElement(event, 'race')}
                                            value={user.race.toLowerCase()} className='race-value' name="" id="race-value">
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="branca">BRANCA</option>
                                            <option value="parda">PARDA</option>
                                            <option value="preta">PRETA</option>
                                            <option value="amarela">AMARELA</option>
                                            <option value="indígena">INDÍGENA</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>}
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
                                            <option value="cuidador / responsável">CUIDADOR / RESPONSÁVEL</option>
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
                            {user.category != 'cuidador / responsável' &&  <div className="owner">
                                <div className="input-context owner-name">
                                    <label htmlFor="owner-name-value">Nome do responsável*</label>
                                    <input
                                        onChange={event => setValuesOfInputFile(event, 'ownerName')}
                                        value={user.ownerName} type="text" className="input-text owner-name-value" id="phone-value" placeholder="Digite aqui" />
                                </div>
                            </div>}
                        </div>
                        {user.category == 'cuidador / responsável' && <div className="flex justify-end">
                            <button type="submit" className="bg-[#D93C3C] text-white py-[12px] px-[24px] font-semibold uppercase rounded-md hover:opacity-70 transition-all">Salvar</button>
                        </div>}
                        <hr />
                    </form>
                    {user.category == 'cuidador / responsável' ? <div>
                        {patients.map((patient, index) => <form data-patient-index={index} onSubmit={updatePatient}>
                            <div className="form-context-patient-information">
                                <div className="title">INFORMAÇÕES SOBRE O PACIENTE {index + 1}</div>
                                <div className="grid sm:!grid lg:!flex gap-2">
                                    <div className="input-context patient-fullname">
                                        <label htmlFor="patient-fullname-value">Nome completo*</label>
                                        <input
                                            onChange={event => setValuesOfPatientInputFile(event, index, 'fullName')}
                                            autoComplete="off"
                                            required
                                            value={patient.fullName}
                                            type="text" className="input-text patient-fullname-value" id="patient-fullname-value" placeholder="Digite aqui" />
                                    </div>
                                    <div className="select-context patient-gender">
                                        <label htmlFor="patient-gender-value">Sexo*</label>
                                        <div className='select-input'>
                                            <select
                                                onChange={event => setValuesOfPatientSelectElement(event, index, 'gender')}
                                                value={patient.gender.toLowerCase()}
                                                required
                                                className='patient-gender-value' name="" id="patient-gender-value">
                                                <option selected style={{display: 'none'}}>Selecione</option>
                                                <option value="feminino">FEMININO</option>
                                                <option value="masculino">MASCULINO</option>
                                                <option value="não me identifico">NÃO ME IDENTIFICO</option>
                                            </select>
                                            <RiArrowDownSFill size={25} />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full">
                                        <div className="select-context patient-race">
                                            <label htmlFor="patient-race">Raça*</label>
                                            <div className='select-input'>
                                                <select
                                                    value={patient.race.toLowerCase()}
                                                    onChange={event => setValuesOfPatientSelectElement(event, index, 'race')}
                                                    required
                                                    className='patient-race' name="" id="patient-race">
                                                    <option selected style={{display: 'none'}}>Selecione</option>
                                                    <option value="branca">BRANCA</option>
                                                    <option value="parda">PARDA</option>
                                                    <option value="preta">PRETA</option>
                                                    <option value="amarela">AMARELA</option>
                                                    <option value="indígena">INDÍGENA</option>
                                                </select>
                                                <RiArrowDownSFill size={25} />
                                            </div>
                                        </div>
                                        <div className="input-context patient-cpf">
                                            <label htmlFor={`patient-cpf-value-`}>Cpf*</label>
                                            <input
                                                required
                                                onChange={event => setValuesOfPatientInputFile(event, index, 'document')}
                                                value={patient.document}
                                                autoComplete="off"
                                                type="text" className="input-text patient-cpf-value" id={`patient-cpf-value`} placeholder="Digite aqui" />
                                        </div>
                                    </div>
                                </div>
                                <div className="type-coagulopathy_severity-coagulopathy_location-treatment-center">
                                    <div className="select-context type-coagulopathy">
                                        <label htmlFor="type-coagulopathy-value">Tipo de coagulopatia</label>
                                        <div className='select-input'>
                                            <select
                                                onChange={event => setValuesOfPatientSelectElement(event, index, 'typeOfCoagulopathy')}
                                                required
                                                value={patient.typeOfCoagulopathy.toLowerCase()}
                                                className='type-coagulopathy-value' name="" id="type-coagulopathy-value">
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
                                                onChange={event => setValuesOfPatientSelectElement(event, index, 'severityOfCoagulopathy')}
                                                required
                                                value={patient.severityOfCoagulopathy.toLowerCase()}
                                                className='severity-coagulopathy-value' name="" id="severity-coagulopathy-value">
                                                <option selected style={{display: 'none'}}>Selecione</option>
                                                <option value="leve">LEVE</option>
                                                <option value="moderado">MODERADO</option>
                                                <option value="grave">GRAVE</option>
                                                <option value="dvw tipo 1">DVW TIPO 1</option>
                                                <option value="dvw tipo 2">DVW TIPO 2</option>
                                                <option value="dvw tipo 3">DVW TIPO 3</option>
                                                <option value="não diagnosticado">NÃO DIAGNOSTICADO</option>
                                                
                                            </select>
                                            <RiArrowDownSFill size={25} />
                                        </div>
                                    </div>
                                    <div className="input-context location-treatment-center">
                                        <label htmlFor="location-treatment-center-value">Centro de Tratamento</label>
                                        <div className='select-input'>
                                            <select
                                                required
                                                onChange={event => setValuesOfPatientSelectElement(event, index, 'callCenterLocation')}
                                                value={patient.callCenterLocation.toLowerCase()}
                                                className='location-treatment-center-value' name="" id="location-treatment-center-value">
                                                <option selected style={{display: 'none'}}>Selecione</option>
                                                {
                                                    listOfBloodCenters.map((location, index) => <option key={index} value={location.toLowerCase()}>
                                                        {location}
                                                    </option>)
                                                }
                                            </select>
                                            <RiArrowDownSFill size={25} />
                                        </div>
                                    </div>
                                </div>
                                <div className="pcd_which_accept-use-my-data">
                                    <div className="pcd_whick">
                                        <div className="select-context pcd">
                                            <label htmlFor="pcd-value">PESSOA COM DEFICIENCIA (PCD)?</label>
                                            <div className='select-input'>
                                                <select
                                                    onChange={event => setValuesOfPatientSelectElement(event, index, 'pcd')}
                                                    value={patient.pcd ? 'sim' : 'não'}
                                                    required
                                                    className='pcd-value' name="" id="pcd-value">
                                                    <option selected style={{display: 'none'}}>Selecione</option>
                                                    <option value="sim">SIM</option>
                                                    <option value="não">NÃO</option>
                                                </select>
                                                <RiArrowDownSFill size={25} />
                                            </div>
                                        </div>
                                        <div className="select-context which">
                                            <label htmlFor="which-value">SE SIM, QUAL?</label>
                                            <SelectDeficienciesToMultiUser
                                                existentData={patient.typeOfDisability}
                                                patient={patient}
                                                index={index}
                                                pcd={patient.pcd} />
                                        </div>
                                        <div className="input-context date-birth">
                                            <label htmlFor="date-birth-value">Data de nascimento</label>
                                            <input
                                                onChange={event => setValuesOfPatientInputFile(event, index, 'dateOfBirth')}
                                                value={patient.dateOfBirth}
                                                type="date"
                                                required
                                                autoComplete="off"
                                                className="input-text date-birth-value" id="date-birth-value" placeholder="Digite aqui" />
                                        </div>
                                    </div>
                                </div>
                                <div className="input-context accept-use-my-data">
                                    <input required type="checkbox" id="accept-use-my-data-value" className="accept-use-my-data-value" />
                                    <label className="accept-use-my-data-value-label" htmlFor="accept-use-my-data-value" onClick={openThermsAndServicesPdf}>ACEITO O USO DOS MEUS DADOS*</label>
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="bg-[#D93C3C] text-white py-[12px] px-[24px] font-semibold uppercase rounded-md hover:opacity-70 transition-all">Salvar</button>
                                </div>
                                <hr />
                            </div>
                        </form>)}
                    </div>
                    : 
                    <>
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
                                            <option value="dvw tipo 1">DVW TIPO 1</option>
                                            <option value="dvw tipo 2">DVW TIPO 2</option>
                                            <option value="dvw tipo 3">DVW TIPO 3</option>
                                            <option value="não diagnosticado">NÃO DIAGNOSTICADO</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                                <div className="input-context location-treatment-center">
                                    <label htmlFor="location-treatment-center-value">Centro de Tratamento</label>
                                    <div className='select-input'>
                                        <select
                                            onChange={event => setValuesOfSelectElement(event, 'callCenterLocation')}
                                            value={user.callCenterLocation.toLowerCase()} className='location-treatment-center-value' name="" id="location-treatment-center-value">
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            {
                                                listOfBloodCenters.map((location, index) => <option key={index} value={location.toLowerCase()}>
                                                    {location}
                                                </option>)
                                            }
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
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
                                        {user.typeOfDisability ? <SelectDeficiencies
                                            existentData={user.typeOfDisability}
                                            deficiencies={deficiencies}
                                            setDeficiencies={setDeficiencies}
                                            pcd={user.pcd} />
                                        : <div style={{  display: 'flex', justifyContent: 'space-between', padding: 8, borderRadius: 6, border: '1px solid #C00405' }}>
                                            <div>Selecione</div>
                                            <div style={{ display: 'flex', gap: 5}}>
                                                <div>Selecionada(s)</div>
                                                <div style={{ fontWeight: 600}}>{0}</div>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                                <div className="accept-use-data">
                                    <div className="input-context accept-use-my-data">
                                        <input type="checkbox" id="accept-use-my-data-value" className="accept-use-my-data-value"
                                            onChange={event => setAcceptUseOfPersonalData(event.target.checked)}/>
                                        <label className="accept-use-my-data-value-label" htmlFor="accept-use-my-data-value" onClick={openThermsAndServicesPdf}>ACEITO O USO DOS MEUS DADOS*</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="save-changes">
                            <button className="save-changes-btn" onClick={updateUser}>Salvar alterações</button>
                        </div>
                    </>}
                    {user.category == 'cuidador / responsável' && <div>
                        <form onSubmit={addNewPatient}>
                            <div className="form-context-patient-information">
                                <div className="title">INFORMAÇÕES SOBRE O NOVO PACIENTE <span className="text-[grey] uppercase text-[14px]">* opicional *</span></div>
                                <div className="patient-fullname_patient-gender_patient-race_patient-cpf grid gap-2">
                                    <div className="input-context patient-fullname">
                                        <label htmlFor="patient-fullname-value">Nome completo do paciente*</label>
                                        <input
                                            value={newPatient.fullName}
                                            onChange={event => setValuesOfNewPatientInputFile(event, 'fullName')}
                                            autoComplete="off"
                                            required
                                            type="text" className="input-text patient-fullname-value" id="patient-fullname-value" placeholder="Digite aqui" />
                                    </div>
                                    <div className="select-context patient-gender">
                                        <label htmlFor="patient-gender-value">Sexo*</label>
                                        <div className='select-input'>
                                            <select
                                                value={newPatient.gender}
                                                onChange={event => setValuesOfNewPatientSelectElement(event, 'gender')}
                                                required
                                                className='patient-gender-value' name="" id="patient-gender-value">
                                                <option selected style={{display: 'none'}}>Selecione</option>
                                                <option value="feminino">FEMININO</option>
                                                <option value="masculino">MASCULINO</option>
                                                <option value="não me identifico">NÃO ME IDENTIFICO</option>
                                            </select>
                                            <RiArrowDownSFill size={25} />
                                        </div>
                                    </div>
                                    <div className="select-context patient-race">
                                        <label htmlFor="patient-race">Raça*</label>
                                        <div className='select-input'>
                                            <select
                                                required
                                                value={newPatient.race}
                                                onChange={event => setValuesOfNewPatientSelectElement(event, 'race')}
                                                className='patient-race' name="" id="patient-race">
                                                <option selected style={{display: 'none'}}>Selecione</option>
                                                <option value="branca">BRANCA</option>
                                                <option value="parda">PARDA</option>
                                                <option value="preta">PRETA</option>
                                                <option value="amarela">AMARELA</option>
                                                <option value="indígena">INDÍGENA</option>
                                            </select>
                                            <RiArrowDownSFill size={25} />
                                        </div>
                                    </div>
                                    <div className="input-context patient-cpf">
                                        <label htmlFor={`patient-cpf-value-`}>Cpf do paciente*</label>
                                        <input
                                            value={newPatient.document}
                                            onChange={event => setValuesOfNewPatientInputFile(event, 'document')}
                                            required
                                            autoComplete="off"
                                            type="text" className="input-text patient-cpf-value" id={`patient-cpf-value`} placeholder="Digite aqui" />
                                    </div>
                                </div>
                                <div className="type-coagulopathy_severity-coagulopathy_location-treatment-center">
                                    <div className="select-context type-coagulopathy">
                                        <label htmlFor="type-coagulopathy-value">Tipo de coagulopatia</label>
                                        <div className='select-input'>
                                            <select
                                                required
                                                value={newPatient.typeOfCoagulopathy}
                                                onChange={event => setValuesOfNewPatientSelectElement(event, 'typeOfCoagulopathy')}
                                                className='type-coagulopathy-value' name="" id="type-coagulopathy-value">
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
                                                required
                                                value={newPatient.severityOfCoagulopathy}
                                                onChange={event => setValuesOfNewPatientSelectElement(event, 'severityOfCoagulopathy')}
                                                className='severity-coagulopathy-value' name="" id="severity-coagulopathy-value">
                                                <option selected style={{display: 'none'}}>Selecione</option>
                                                <option value="leve">LEVE</option>
                                                <option value="moderado">MODERADO</option>
                                                <option value="grave">GRAVE</option>
                                                <option value="dvw tipo 1">DVW TIPO 1</option>
                                                <option value="dvw tipo 2">DVW TIPO 2</option>
                                                <option value="dvw tipo 3">DVW TIPO 3</option>
                                                <option value="não diagnosticado">NÃO DIAGNOSTICADO</option>
                                                
                                            </select>
                                            <RiArrowDownSFill size={25} />
                                        </div>
                                    </div>
                                    <div className="input-context location-treatment-center">
                                        <label htmlFor="location-treatment-center-value">Centro de Tratamento</label>
                                        <div className='select-input'>
                                            <select
                                                value={newPatient.callCenterLocation}
                                                onChange={event => setValuesOfNewPatientSelectElement(event, 'callCenterLocation')}
                                                required
                                                className='location-treatment-center-value' name="" id="location-treatment-center-value">
                                                <option selected style={{display: 'none'}}>Selecione</option>
                                                {
                                                    listOfBloodCenters.map((location, index) => <option key={index} value={location.toLowerCase()}>
                                                        {location}
                                                    </option>)
                                                }
                                            </select>
                                            <RiArrowDownSFill size={25} />
                                        </div>
                                    </div>
                                </div>
                                <div className="pcd_which_accept-use-my-data">
                                    <div className="pcd_whick">
                                        <div className="select-context pcd">
                                            <label htmlFor="pcd-value">PESSOA COM DEFICIENCIA (PCD)?</label>
                                            <div className='select-input'>
                                                <select
                                                    onChange={event => setValuesOfNewPatientSelectElement(event, 'pcd')}
                                                    value={newPatient.pcd ? 'sim' : 'não'}
                                                    required
                                                    className='pcd-value' name="" id="pcd-value">
                                                    <option selected style={{display: 'none'}}>Selecione</option>
                                                    <option value="sim">SIM</option>
                                                    <option value="não">NÃO</option>
                                                </select>
                                                <RiArrowDownSFill size={25} />
                                            </div>
                                        </div>
                                        <div className="select-context which">
                                            <label htmlFor="which-value">SE SIM, QUAL?</label>
                                            <SelectDeficienciesToMultiUser
                                                existentData={newPatient.typeOfDisability}
                                                patient={newPatient}
                                                index={null}
                                                pcd={newPatient.pcd} />
                                        </div>
                                        <div className="input-context date-birth">
                                            <label htmlFor="date-birth-value">Data de nascimento</label>
                                            <input
                                                value={newPatient.dateOfBirth}
                                                onChange={event => setValuesOfNewPatientInputFile(event, 'dateOfBirth')}
                                                type="date"
                                                required
                                                autoComplete="off"
                                                className="input-text date-birth-value" id="date-birth-value" placeholder="Digite aqui" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-4 justify-end flex">
                                <button type="submit" className="bg-[#D93C3C] text-white py-[12px] px-[24px] font-semibold uppercase rounded-md hover:opacity-70 transition-all">Adicionar paciente</button>
                            </div>
                            <hr />
                        </form>
                    </div>}
                    <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='cursor-pointer back-to-top'>
                        <span>Voltar ao topo</span>
                        <img className='logo' src={arrowUpIcon} />
                    </div>
                </div>
            </div>
        </div>
    )
}