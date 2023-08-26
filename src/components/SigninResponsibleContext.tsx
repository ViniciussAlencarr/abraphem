import { useState } from "react"
import { RiArrowDownSFill } from "react-icons/ri"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import { User } from "types/User"

import api from '../services/api'

export const SiginResponsibelContext = (params: {
    setPatientType: any,
}) => {
    const navigate = useNavigate();
    const [numberPatients, setNumberPatients] = useState(1)
    const [user, setUser] = useState<User>({
        document: "",
        typeDocument: "cpf",
        username: "",
        fullName: "",
        dateOfBirth: "",
        state: "",
        city: "",
        gender: "",
        race: "",
        category: "cuidador / responsável",
        typeOfPhone: "",
        phoneNumber: "",
        ownerName: "",
        typeOfCoagulopathy: "",
        severityOfCoagulopathy: "",
        callCenterLocation: "",
        password: "123456",
        pcd: false,
        typeOfDisability: "",
        email: "",
        roleUser: "2",
        profilePictureURL: ""
    })

    const [patients, setPatients] = useState<User[]>([{
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
    }])

    // responsible
    const setValuesOfInputFile = (event: any, typeFile: string) => {
        setUser({ ...user, [typeFile]: event.target.value })
    }

    const setValuesOfSelectElement = (event: any, typeFile: string) => {
        setUser({ ...user, [typeFile]: event.target.options[event.target.selectedIndex].text })
    }

    // patient
    const setValuesOfInputFilePatient = (event: any, typeFile: string, index: number) => {
        let a: any = [...patients]
        a[index][typeFile] = event.target.value
        setPatients(a)
    }

    const setValuesOfSelectElementPatient = (event: any, typeFile: string, index: number) => {
        let a: any = [...patients]
        let value = event.target.options[event.target.selectedIndex].text
        a[index][typeFile] = typeFile == 'pcd' ? value == 'SIM' ? true : false : value
        setPatients(a)
    }

    const addPatient = (currentPatientSize: number) => {
        let currentSize = patients.length
        if (currentSize < currentPatientSize) {
            setPatients(patients => patients.concat({
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
            }))
        } else {
            patients.pop()
            setPatients(patients)
        }
    }
    const onSubmit = (event: any) => {
        event.preventDefault()
        const sendSignin = async () => {
            await api.post('signup?type=responsible', { user, patients })
        }
        toast.promise(
            sendSignin,
            {
                pending: 'Criando usuário...',
                success: {
                    render() {
                        const login = async () => {
                            const { data } = await api.post('/login?role=2', { document: user.document, password: user.password })
                            api.defaults.headers.Authorization = `Bearer ${data.token}`;
                            localStorage.setItem('user_id', data.user.id)
                            localStorage.setItem('bearer_token', data.token)
                        }
                        login()
                        setTimeout(() => navigate('/welcome'), 500)
                        return 'Usuário criado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao criar o usuário'
            }
        )
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
                                        onChange={event => {setValuesOfSelectElement(event, 'category'); params.setPatientType(true)}}
                                        className='category-value' name="" id="category-value">
                                        <option value="paciente">PACIENTE</option>
                                        <option value="cuidador / responsável" selected>CUIDADOR / RESPONSÁVEL</option>
                                        <option value="profissional da saúde / acadêmicos">PROFISSIONAL DA SAÚDE / ACADÊMICOS</option>
                                        <option value="outros">OUTROS</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                            <div className="input-context number-of-patients">
                                <label htmlFor="number-of-patients-value">RESPONSÁVEL POR QUANTOS PACIENTES?*</label>
                                <input
                                    className="input-text number-of-patients-value" id="number-of-patients-value"
                                    value={numberPatients}
                                    onChange={event => {addPatient(parseInt(event.target.value)); setNumberPatients(parseInt(event.target.value))}} type="number" min={1} max={10} name="" />
                            </div>
                        </div>
                        <div className="city_state">
                            <div className="select-context city">
                                <label htmlFor="city-value">Cidade*</label>
                                <div className='select-input'>
                                    <select
                                        onChange={event => setValuesOfSelectElement(event, 'city')}
                                        className='city-value' name="" id="city-value">
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
                            <div className="select-context state">
                                <label htmlFor="state-value">Estado*</label>
                                <div className='select-input'>
                                    <select
                                        onChange={event => setValuesOfSelectElement(event, 'state')}
                                        className='state-value' name="" id="state-value">
                                        <option selected style={{display: 'none'}}>Selecione</option>
                                        <option value="são paulo">São Paulo</option>
                                        <option value="rio de janeiro">Rio de Janeiro</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="name_email">
                        <div className="input-context name">
                            <label htmlFor="name-value">Nome do responsável</label>
                            <input
                                required
                                onChange={event => setValuesOfInputFile(event, 'username')}
                                type="text" className="input-text name-value" id="name-value" placeholder="Digite aqui" />
                        </div>
                        <div className="input-context email">
                            <label htmlFor="email-value">Email*</label>
                            <input
                                required
                                onChange={event => setValuesOfInputFile(event, 'email')}
                                type="email" className="input-text email-value" id="email-value" placeholder="Digite aqui" />
                        </div>
                    </div>
                    <div className="phone-type_phone-number_cpf_date-birth">
                        <div className="phone-type_phone-number">
                            <div className="select-context phone-type">
                                <label htmlFor="phone-type-value">Tipo de telefone</label>
                                <div className='select-input'>
                                    <select
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
                                    onChange={event => setValuesOfInputFile(event, 'phoneNumber')}
                                    type="text" className="input-text phone-value" id="phone-value" placeholder="Digite aqui" />
                            </div>
                        </div>
                        <div className="cpf_date-birth">
                            <div className="input-context cpf">
                                <label htmlFor="cpf-value">Cpf do Responsável*</label>
                                <input
                                    required
                                    onChange={event => setValuesOfInputFile(event, 'document')}
                                    type="text" className="input-text cpf-value" id="cpf-value" placeholder="Digite aqui" />
                            </div>
                            <div className="input-context date-birth">
                                <label htmlFor="date-birth-value">Data de nascimento*</label>
                                <input
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
                                    <label htmlFor="patient-fullname-value">Nome completo do paciente</label>
                                    <input
                                        required
                                        value={patient.fullName}
                                        onChange={event => setValuesOfInputFilePatient(event, 'fullName', index)}
                                        type="text" className="input-text patient-fullname-value" id="patient-fullname-value" placeholder="Digite aqui" />
                                </div>
                                <div className="select-context patient-gender">
                                    <label htmlFor="patient-gender-value">Sexo*</label>
                                    <div className='select-input'>
                                        <select
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
                                    <label htmlFor="patient-cpf-value">Cpf*</label>
                                    <input
                                        required
                                        value={patient.document}
                                        onChange={event => setValuesOfInputFilePatient(event, 'document', index)}
                                        type="text" className="input-text patient-cpf-value" id="patient-cpf-value" placeholder="Digite aqui" />
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
                                            <option value="não diagnosticado">NÃO DIAGNOSTICADO</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                                <div className="input-context location-treatment-center">
                                    <label htmlFor="location-treatment-center-value">Localização do Centro de Tratamento</label>
                                    <input
                                        required
                                        value={patient.callCenterLocation}
                                        onChange={event => setValuesOfInputFilePatient(event, 'callCenterLocation', index)}
                                        type="text" className="input-text location-treatment-center-value" id="location-treatment-center-value" placeholder="Digite aqui" />
                                </div>
                            </div>
                            <div className="pcd_which_accept-use-my-data">
                                <div className="pcd_whick">
                                    <div className="select-context pcd">
                                        <label htmlFor="pcd-value">PESSOA COM DEFICIENCIA (PCD)?</label>
                                        <div className='select-input'>
                                            <select
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
                                                value={patient.typeOfDisability.toLowerCase()}
                                                onChange={event => setValuesOfSelectElementPatient(event, 'typeOfDisability', index)}
                                                className='which-value' name="" id="which-value">
                                                <option selected style={{display: 'none'}}>Selecione</option>
                                                <option value="pessoa sem deficiência">PESSOA SEM DEFICIÊNCIA</option>
                                                <option value="pessoa com deficiência">PESSOA COM DEFICIÊNCIA</option>
                                                //<option value="3">ARTROPATIA HEMOFÍLICA MEMBRO SUPERIOR E MEMBRO INFERIOR</option>
                                                <option value="deficiencia mental">DEFICIENCIA MENTAL</option>
                                                <option value="transtorno do espectro autismo/tdh">TRANSTORNO DO ESPECTRO AUTISMO/TDH</option>
                                            </select>
                                            <RiArrowDownSFill size={25} />
                                        </div>
                                    </div>
                                    <div className="input-context date-birth">
                                        <label htmlFor="date-birth-value">Data de nascimento*</label>
                                        <input
                                            required
                                            type="date"
                                            value={patient.dateOfBirth.toLowerCase()}
                                            onChange={event => setValuesOfInputFilePatient(event, 'dateOfBirth', index)}
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
                            type="checkbox" id="accept-use-my-data-value"
                            required
                            className="accept-use-my-data-value" />
                        <label htmlFor="accept-use-my-data-value">ACEITO O USO DOS MEUS DADOS</label>
                    </div>
                </div>
                <div className="save-changes">
                    <button type="submit" className="save-changes-btn">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}