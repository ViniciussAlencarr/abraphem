import { useEffect, useState, useContext } from "react"
import { RiArrowDownSFill } from "react-icons/ri"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import { ThemeContext } from '../contexts/teste'

import listOfBloodCenters from '../utils/getListOfBloodCenters'

import { User } from "types/User"

import api from '../services/api'

import axios from "axios"

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

export const SiginResponsibelContext = (params: {
    category: string,
    setPatientType: any,
    setCategory: any,
}) => {
    const navigate = useNavigate();
    const [_, enableDeclarationConsent] = useState(false)
    const [numberPatients, setNumberPatients] = useState(0)
    const { setIsLoggedIn } = useContext(ThemeContext);
    const [user, setUser] = useState<User>({
        document: "",
        typeDocument: "cpf",
        username: "Perfil",
        fullName: "",
        dateOfBirth: "",
        state: "",
        city: "",
        gender: "",
        race: "",
        category: params.category.toLowerCase(),
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
        roleUser: "2",
        profilePictureURL: ""
    })

    const [patients, setPatients] = useState<User[]>([{
        document: "",
        typeDocument: "cpf",
        username: "Perfil",
        fullName: "",
        dateOfBirth: "",
        state: "",
        city: "",
        gender: "",
        race: "",
        category: "paciente",
        typeOfPhone: "",
        phoneNumber: "",
        ownerName: user.username,
        typeOfCoagulopathy: "",
        severityOfCoagulopathy: "",
        callCenterLocation: "",
        password: "",
        pcd: false,
        typeOfDisability: "",
        email: "-",
        roleUser: "2",
        profilePictureURL: ""
    }])

    useEffect(() => {
    }, [])

    // responsible
    const setValuesOfInputFile = (event: any, typeFile: string) => {
        setUser({ ...user, [typeFile]: typeFile == 'document' ?
        cpfMask(event.target.value)
    : typeFile == 'phoneNumber' ?
    user.typeOfPhone == 'celular' ? phoneMask(event.target.value) : phoneMaskPhoneLandline(event.target.value) : event.target.value })
    }

    const setValuesOfSelectElement = (event: any, typeFile: string) => {
        let value = event.target.options[event.target.selectedIndex].text
        if (value == 'PACIENTE') params.setPatientType(true)
        setUser({ ...user, [typeFile]: value.toLowerCase()})
    }

    // patient
    const setValuesOfInputFilePatient = (event: any, typeFile: string, index: number) => {
        let a: any = [...patients]
        a[index][typeFile] = typeFile == 'document' ?
        cpfMask(event.target.value)
    : typeFile == 'phoneNumber' ?
    user.typeOfPhone == 'celular' ? phoneMask(event.target.value) : phoneMaskPhoneLandline(event.target.value) : event.target.value
        setPatients(a)
    }

    const setValuesOfSelectElementPatient = (event: any, typeFile: string, index: number) => {
        let a: any = [...patients]
        let value = event.target.options[event.target.selectedIndex].text
        a[index][typeFile] = typeFile == 'pcd' ? value == 'SIM' ? true : false : value
        setPatients(a)
    }

    const addPatient = (currentPatientSize: number) => {
        let allPatients = []
        for (let i = 0; i < currentPatientSize; i++) {
            allPatients.push({
                document: "",
                typeDocument: "cpf",
                username: "",
                fullName: "",
                dateOfBirth: "",
                state: "",
                city: "",
                gender: "",
                race: "",
                category: "paciente",
                typeOfPhone: "",
                phoneNumber: "",
                ownerName: user.username,
                typeOfCoagulopathy: "",
                severityOfCoagulopathy: "",
                callCenterLocation: "",
                password: "123456",
                pcd: false,
                typeOfDisability: "",
                email: "-",
                roleUser: "2",
                profilePictureURL: ""
            })
        }
        setPatients(allPatients)
    }
    const validatePhoneNumber = () => {
        if (user.phoneNumber.length != 15) {
            document.getElementById('phone-value')?.focus()
            throw toast.error('Verifique se o número de telefone tem todos os números')
        }
    }

    const validateCpfValue = () => {
        if (user.document.length != 14) {
            document.getElementById('cpf-value')?.focus()
            throw toast.error('Verifique se o CPF contém todos os números')
        }
        let patientIndex = patients.findIndex(patient => patient.document.length != 14)
        if (patientIndex != -1) {
            document.getElementById(`patient-cpf-value-${patientIndex}`)?.focus()
            throw toast.error('Verifique se o CPF contém todos os números')
        }
    }
    const onSubmit = async (event: any) => {
        event.preventDefault()
        validatePhoneNumber()
        validateCpfValue()
        const sendSignin = async () => {
            const signIn = async () => {
                await api.post('signup?type=responsible', { user, patients })
            }
            const login = async () => {
                const { data } = await api.post('/login?role=2', { document: user.document, password: user.password })
                api.defaults.headers.Authorization = `Bearer ${data.token}`;
                localStorage.setItem('user_id', data.user.id)
                localStorage.setItem('bearer_token', data.token)
            }
            await signIn()
            await login()
        }
        toast.promise(
            sendSignin,
            {
                pending: 'Criando usuário...',
                success: {
                    render() {
                        setIsLoggedIn(true)
                        setTimeout(() => navigate('/welcome'), 500)
                        return 'Usuário criado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao criar o usuário'
            }
        )
    }

    const searchCepToResponsibleUser = async (event: any) => {
        const { data } = await axios.get(`https://viacep.com.br/ws/${event.target.value}/json/`)
        setUser({...user, city: data?.localidade, state: data?.uf })
    }

    const downloadThermsAndServicesPdf = () => {
        var link = document.createElement('a');
        link.href = acceptUsePdfData;
        link.download = 'TERMO DE USO';
        link.dispatchEvent(new MouseEvent('click'));
    }

    const calculateAge = (event: any) => {
        let currentDate = new Date(event.target.value)
        var diff_ms = Date.now() - currentDate.getTime();
        var age_dt = new Date(diff_ms); 
    
        let result = Math.abs(age_dt.getUTCFullYear() - 1970)
        enableDeclarationConsent(result < 18 ? true: false)
    }

    return (
        <div className='not-patient-context'>
            <form onSubmit={onSubmit}>
                <div className="responsible-context">
                    <div className="category_number-of-patients_city_state">
                        <div className="category_number-of-patients">
                            <div className="select-context category">
                                <label htmlFor="category-value">Em que categoria você se encaixa?*</label>
                                <div className='select-input'>
                                    <select
                                        required
                                        value={user.category}
                                        onChange={event => {setValuesOfSelectElement(event, 'category'); }}
                                        className='category-value' name="" id="category-value">
                                        <option value="paciente">PACIENTE</option>
                                        <option value="cuidador / responsável">CUIDADOR / RESPONSÁVEL</option>
                                        <option value="profissional da saúde / acadêmicos">PROFISSIONAL DA SAÚDE / ACADÊMICOS</option>
                                        <option value="outros">OUTROS</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                            <div className="input-context number-of-patients">
                                <label htmlFor="number-of-patients-value">RESPONSÁVEL POR QUANTOS PACIENTES?*</label>
                                <input
                                    required
                                    autoComplete="off"
                                    className="input-text number-of-patients-value" id="number-of-patients-value"
                                    value={numberPatients}
                                    onChange={event => {addPatient(parseInt(event.target.value)); console.log(patients); console.log(event.target.value); setNumberPatients(parseInt(event.target.value))}} type="number" min={1} max={10} name="" />
                            </div>
                        </div>
                        <div className="location-context">
                            <div className="city_state">
                                <div className="input-context cep">
                                    <label htmlFor="cep">CEP*</label>
                                    <input
                                        autoComplete="off"
                                        required    
                                        className="input-text cep" id="cep"
                                        placeholder="Digite aqui"
                                        onChange={searchCepToResponsibleUser} type="text" name="" />
                                </div>
                                
                                <div className="select-context state">
                                    <label htmlFor="state-value">Estado*</label>
                                    <div className='select-input'>
                                        <select
                                            required
                                            aria-readonly
                                            value={user.state == '' ? undefined : user.state}
                                            onChange={event => setValuesOfSelectElement(event, 'state')}
                                            className='state-value' name="" id="state-value">
                                            <option selected style={{display: 'none'}}>--</option>
                                            <option value={user.state}>{user.state}</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                                <div className="select-context city">
                                    <label htmlFor="city-value">Cidade*</label>
                                    <div className='select-input'>
                                        <select
                                            required
                                            value={user.city == '' ? undefined : user.city}
                                            onChange={event => setValuesOfSelectElement(event, 'city')}
                                            className='city-value' name="" id="city-value">
                                            <option selected style={{display: 'none'}}>--</option>
                                            <option value={user.city}>{user.city}</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="name_email">
                        <div className="input-context username">
                            <label htmlFor="username-value">Nome de usuário</label>
                            <input
                                required
                                autoComplete="off"
                                onChange={event => setValuesOfInputFile(event, 'username')}
                                type="text" className="input-text username-value" id="username-value" placeholder="Digite aqui" />
                        </div>
                        <div className="input-context name">
                            <label htmlFor="name-value">Nome do responsável</label>
                            <input
                                required
                                autoComplete="off"
                                onChange={event => setValuesOfInputFile(event, 'ownerName')}
                                type="text" className="input-text name-value" id="name-value" placeholder="Digite aqui" />
                        </div>
                        <div className="input-context email">
                            <label htmlFor="email-value">Email*</label>
                            <input
                                required
                                autoComplete="off"
                                onChange={event => setValuesOfInputFile(event, 'email')}
                                type="email" className="input-text email-value" id="email-value" placeholder="Digite aqui" />
                        </div>
                        <div className="input-context password">
                            <label htmlFor="password-value">Senha do Responsável*</label>
                            <input
                                required
                                autoComplete="off"
                                onChange={event => setValuesOfInputFile(event, 'password')}
                                type="password" className="input-text password-value" id="password-value" placeholder="Digite aqui" />
                        </div>
                    </div>
                    <div className="phone-type_phone-number_cpf_date-birth">
                        <div className="phone-type_phone-number">
                            <div className="select-context phone-type">
                                <label htmlFor="phone-type-value">Tipo de telefone</label>
                                <div className='select-input'>
                                    <select
                                        required
                                        onChange={event => setValuesOfSelectElement(event, 'typeOfPhone')}
                                        className='phone-type-value' name="" id="phone-type-value">
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
                                    autoComplete="off"
                                    required
                                    value={user.phoneNumber}
                                    onChange={event => setValuesOfInputFile(event, 'phoneNumber')}
                                    type="text" className="input-text phone-value" id="phone-value" placeholder="Digite aqui" />
                            </div>
                        </div>
                        <div className="cpf_date-birth">
                            <div className="input-context cpf">
                                <label htmlFor="cpf-value">Cpf do Responsável*</label>
                                <input
                                    required
                                    autoComplete="off"
                                    value={user.document}
                                    onChange={event => setValuesOfInputFile(event, 'document')}
                                    type="text" className="input-text cpf-value" id="cpf-value" placeholder="Digite aqui" />
                            </div>
                            <div className="input-context date-birth">
                                <label htmlFor="date-birth-value">Data de nascimento*</label>
                                <input
                                    required
                                    autoComplete="off"
                                    type="date"
                                    onChange={event => setValuesOfInputFile(event, 'dateOfBirth')}
                                    className="input-text date-birth-value" id="date-birth-value" placeholder="Digite aqui" />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                {
                    patients.map((patient, index) => {
                        return <div className="form-context-patient-information">
                            <div className="title">INFORMAÇÕES SOBRE O PACIENTE {index + 1}</div>
                            <div className="patient-fullname_patient-gender_patient-race_patient-cpf">
                                <div className="input-context patient-fullname">
                                    <label htmlFor="patient-fullname-value">Nome completo do paciente*</label>
                                    <input
                                        autoComplete="off"
                                        required
                                        value={patient.fullName}
                                        onChange={event => setValuesOfInputFilePatient(event, 'fullName', index)}
                                        type="text" className="input-text patient-fullname-value" id="patient-fullname-value" placeholder="Digite aqui" />
                                </div>
                                <div className="select-context patient-gender">
                                    <label htmlFor="patient-gender-value">Sexo*</label>
                                    <div className='select-input'>
                                        <select
                                            required
                                            value={patient.gender.toLowerCase()}
                                            onChange={event => setValuesOfSelectElementPatient(event, 'gender', index)}
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
                                            value={patient.race.toLowerCase()}
                                            onChange={event => setValuesOfSelectElementPatient(event, 'race', index)}
                                            className='patient-race' name="" id="patient-race">
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
                                <div className="input-context patient-cpf">
                                    <label htmlFor={`patient-cpf-value-${index}`}>Cpf*</label>
                                    <input
                                        required
                                        autoComplete="off"
                                        value={patient.document}
                                        onChange={event => setValuesOfInputFilePatient(event, 'document', index)}
                                        type="text" className="input-text patient-cpf-value" id={`patient-cpf-value-${index}`} placeholder="Digite aqui" />
                                </div>
                            </div>
                            <div className="type-coagulopathy_severity-coagulopathy_location-treatment-center">
                                <div className="select-context type-coagulopathy">
                                    <label htmlFor="type-coagulopathy-value">Tipo de coagulopatia</label>
                                    <div className='select-input'>
                                        <select
                                            required
                                            value={patient.typeOfCoagulopathy.toLowerCase()}
                                            onChange={event => setValuesOfSelectElementPatient(event, 'typeOfCoagulopathy', index)}
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
                                            value={patient.severityOfCoagulopathy.toLowerCase()}
                                            onChange={event => setValuesOfSelectElementPatient(event, 'severityOfCoagulopathy', index)}
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
                                            value={patient.callCenterLocation.toLowerCase()}
                                            onChange={event => setValuesOfSelectElementPatient(event, 'callCenterLocation', index)}
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
                                                required
                                                value={patient.pcd ? 'sim' : 'não'}
                                                onChange={event => setValuesOfSelectElementPatient(event, 'pcd', index)}
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
                                        <div className='select-input'>
                                            <select
                                                required
                                                value={patient.typeOfDisability.toLowerCase()}
                                                onChange={event => setValuesOfSelectElementPatient(event, 'typeOfDisability', index)}
                                                className='which-value' name="" id="which-value">
                                                    <option selected style={{display: 'none'}}>Selecione</option>
                                                    {
                                                        patient.pcd ? <>
                                                        <option value='artropatia de membros superiores'>Artropatia de membros superiores</option>
                                                        <option value='artropatia de membros inferiores'>Artropatia de membros inferiores</option>
                                                        <option value='artropatia de membros inferiores e superiores'>Artropatia de membros inferiores e superiores</option>
                                                        <option value='deficiência intelectual'>Deficiência intelectual</option>
                                                        <option value='transtorno de espectro autista -tea'>Transtorno de Espectro Autista -TEA</option>
                                                        <option value='transtorno de déficit de atenção e hiperatividade - tdah'>Transtorno de Déficit de Atenção e Hiperatividade - TDAH</option>
                                                        </>
                                                        : <option>PESSOA SEM DEFICIÊNCIA</option>
                                                    }
                                            </select>
                                            <RiArrowDownSFill size={25} />
                                        </div>
                                    </div>
                                    <div className="input-context date-birth">
                                        <label htmlFor="date-birth-value">Data de nascimento</label>
                                        <input
                                            type="date"
                                            required
                                            autoComplete="off"
                                            value={patient.dateOfBirth.toLowerCase()}
                                            onChange={event => {setValuesOfInputFilePatient(event, 'dateOfBirth', index); calculateAge(event)}}
                                            className="input-text date-birth-value" id="date-birth-value" placeholder="Digite aqui" />
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    })
                }
                <div className="accept-use-data">
                    <div className="input-context accept-use-my-data">
                        <input
                            required                            
                            type="checkbox" id="accept-use-my-data-value"
                            className="accept-use-my-data-value" />
                        <label className="accept-use-my-data-value-label" htmlFor="accept-use-my-data-value" onClick={downloadThermsAndServicesPdf}>ACEITO O USO DOS MEUS DADOS*</label>
                    </div>
                </div>
                <div className="save-changes">
                    <button type="submit" className="save-changes-btn">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}