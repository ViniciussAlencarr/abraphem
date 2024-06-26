import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from '../services/api'

import InputMask from "react-input-mask";

import { RiArrowDownSFill } from "react-icons/ri"
import { FaRegEye } from "react-icons/fa";

import { FaRegEyeSlash } from "react-icons/fa";

import 'react-phone-number-input/style.css'

import { ThemeContext } from '../contexts/teste'

import listOfBloodCenters from '../utils/getListOfBloodCenters'
import { allDeficiencies } from "../utils/getAllDeficiencies";

import { User } from "types/User"

import { SelectDeficiencies } from "./SelectDeficiencies";

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
    .replace(/(\d{5})(\d{1,4})/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}

const phoneMaskPhoneLandline = (phone: string) => {
    return phone.replace(/\D/g, '')
    .replace(/^(\d)/, '($1')
    .replace(/^(\(\d{2})(\d)/, '$1) $2')
    .replace(/(\d{4})(\d{1,5})/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}




export const SigninPatientContext = (params: {
    category: string,
    setPatientType: any,
    setCategory: any,
}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        document: "",
        typeDocument: "cpf",
        username: "Perfil",
        fullName: "",
        dateOfBirth: "",
        stateName: "",
        city: "",
        cep: '',
        gender: "",
        race: "",
        category: 'paciente',
        typeOfPhone: "",
        phoneNumber: "",
        ownerName: "",
        typeOfCoagulopathy: "",
        severityOfCoagulopathy: "",
        callCenterLocation: "",
        password: "",
        pcd: false,
        typeOfDisability: "pessoa sem deficiencia",
        email: "",
        roleUser: "2",
        profilePictureURL: ""
    })
    const [hidePassword, setHidePassword] = useState(true)
    const { setIsLoggedIn } = useContext(ThemeContext);
    const [isMobile, setIsMobile] = useState(false)
    const [deficiencies, setDeficiencies] = useState(allDeficiencies)

    useEffect(() => {
        params.setCategory('paciente')
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
    }, [])

    const setValuesOfInputFile = (event: any, typeFile: string) => {
        setUser({ ...user, [typeFile]: 
            typeFile == 'document' ?
                cpfMask(event.target.value)
            : typeFile == 'phoneNumber' ?
            user.typeOfPhone == 'celular' ? phoneMask(event.target.value) : phoneMaskPhoneLandline(event.target.value) : event.target.value })
    }

    const setValuesOfSelectElement = (event: any, typeFile: string) => {
        let value = event.target.options[event.target.selectedIndex].value
        if (typeFile == 'category' && value.replaceAll(' ', '') == 'cuidador/responsável') params.setCategory(value), params.setPatientType(false);
        setUser({ ...user, [typeFile]: typeFile == 'pcd' ? value == 'sim' ? true : false : value })
    }

    const validatePhoneNumber = () => {
        if (user.typeOfPhone == 'celular') {
            if (user.phoneNumber.length != 15) {
                window.scroll(250, 400);
                document.getElementById('phone-value')?.focus()
                throw toast.error('Verifique se o número de telefone tem todos os números')
            }
        } else {
            if (user.phoneNumber.length != 14) {
                window.scroll(250, 400);
                document.getElementById('phone-value')?.focus()
                throw toast.error('Verifique se o número de telefone tem todos os números')
            }
        }
    }

    const validateCpfValue = () => {
        if (user.document.length != 14) {
            window.scroll(250, 400);
            document.getElementById('cpf-value')?.focus()
            throw toast.error('Verifique se o CPF contém todos os números')
        }
    }
    const onSubmit = async (event: any) => {
        event.preventDefault()
        user.typeOfDisability = deficiencies.filter(deficiency => deficiency.checked).map(deficiency => deficiency.text).toString()
        user.username = user.fullName
        validatePhoneNumber()
        validateCpfValue()
        const sendSignin = async () => {
            const signIn = async () => {
                const { data } = await api.post('signup', user)
                if (data.error) {
                    toast.error(data.message)
                    throw data.error
                }
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

    const searchCep = async (event: any) => {
        const { data } = await axios.get(`https://viacep.com.br/ws/${event.target.value}/json/`)
        setUser({...user, cep: event.target.value, city: data?.localidade, stateName: data?.uf })
    }

    const openThermsAndServicesPdf = () => {
        var link = document.createElement('a');
        link.href = acceptUsePdfData;
        link.target = '_blank';
        link.dispatchEvent(new MouseEvent('click'));
    }
    
    return (
        <div className='patient-context'>
            <form onSubmit={onSubmit}>
                <div className="form-context-personal-information">
                    <div className="name_cpf_date-birth_state_city">
                        <div className="select-context category">
                            <label htmlFor="category">Em que categoria você se encaixa?*</label>
                            <div className='select-input'>
                                <select
                                    required
                                    value={user.category}
                                    onChange={event => setValuesOfSelectElement(event, 'category')}
                                    className='category' name="" id="category">
                                    <option value="paciente" selected>PACIENTE</option>
                                    <option value="cuidador / responsável">CUIDADOR / RESPONSÁVEL</option>
                                    <option value="profissional da saúde / acadêmicos">PROFISSIONAL DA SAÚDE / ACADÊMICOS</option>
                                    <option value="outros">OUTROS</option>
                                </select>
                                <RiArrowDownSFill size={25} />
                            </div>
                        </div>
                        <div className="cpf_date-birth_state_city">
                            <div className="cpf_date-birth">
                                {isMobile ? 
                                <div className="input-context date-birth">
                                    <label htmlFor="date-birth-value">Data de nascimento*</label>
                                    <InputMask
                                        autoComplete="off"
                                        required
                                        mask="99/99/9999" 
                                        onChange={(event: any) => setValuesOfInputFile(event, 'dateOfBirth')}
                                        type="text" className="input-text date-birth-value" id="date-birth-value" placeholder="Digite aqui" />
                                </div>
                                :
                                <div className="input-context date-birth">
                                    <label htmlFor="date-birth-value">Data de nascimento*</label>
                                    <input
                                        autoComplete="off"
                                        required
                                        onChange={event => setValuesOfInputFile(event, 'dateOfBirth')}
                                        type="date" className="input-text date-birth-value" id="date-birth-value" placeholder="Digite aqui" />
                                </div>}
                            </div>
                            <div className="state_city">
                                <div className="input-context cep">
                                    <label htmlFor="cpf-value">CEP*</label>
                                    <input
                                        required
                                        autoComplete="off"
                                        onChange={searchCep}
                                        type="text" className="input-text cep-value" id="cep-value" placeholder="Digite aqui" />
                                </div>
                                <div className="select-context state">
                                    <label htmlFor="state-value">Estado</label>
                                    <div className='select-input'>
                                        <select
                                            required
                                            value={user.stateName == '' ? undefined : user.stateName}
                                            onChange={event => setValuesOfSelectElement(event, 'stateName')}
                                            className='state-value' name="" id="state-value">
                                            <option selected style={{display: 'none'}}>--</option>
                                            <option value={user.stateName}>{user.stateName}</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                                <div className="select-context city">
                                    <label htmlFor="city-value">Cidade</label>
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
                    <div className="gender_race_category_email">
                        <div className="gender_race">
                            <div className="select-context gender">
                                <label htmlFor="gender-value">Sexo*</label>
                                <div className='select-input'>
                                    <select
                                        required
                                        onChange={event => setValuesOfSelectElement(event, 'gender')}
                                        className='gender-value' name="" id="gender-value">
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
                                        required
                                        onChange={event => setValuesOfSelectElement(event, 'race')}
                                        className='race-value' name="" id="race-value">
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
                        </div>
                        <div className="category_email">
                            <div className="input-context name">
                                <label htmlFor="name-value">Nome completo*</label>
                                <input
                                    autoComplete="off"
                                    required
                                    onChange={event => setValuesOfInputFile(event, 'fullName')}
                                    type="text" className="input-text name-value" id="name-value" placeholder="Digite aqui" />
                            </div>
                            <div className="input-context email">
                                <label htmlFor="email-value">Email*</label>
                                <input
                                    autoComplete="off"
                                    required
                                    onChange={event => setValuesOfInputFile(event, 'email')}
                                    type="email" className="input-text email-value" id="email-value" placeholder="Digite aqui" />
                            </div>
                            <div className="input-context password">
                                <label htmlFor="password-value">Senha*</label>
                                <div className="password-context flex items-center">
                                    <input
                                        autoComplete="off"
                                        required
                                        onChange={event => setValuesOfInputFile(event, 'password')}
                                        type={hidePassword ? `password` : 'text'} className="input-text password-value" id="password-value" placeholder="Digite aqui" />
                                    {!hidePassword ? 
                                    <FaRegEye onClick={() => setHidePassword(!hidePassword)} size={20} className="eye-icon" />
                                    :
                                    <FaRegEyeSlash  onClick={() => setHidePassword(!hidePassword)} size={20} className="eye-icon" />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="phone-type_phone-value_owner-name">
                        <div className="phone-type_phone-value">
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
                                    required
                                    autoComplete="off"
                                    minLength={11}
                                    value={user.phoneNumber}
                                    onChange={event => setValuesOfInputFile(event, 'phoneNumber')}
                                    type="tel" className="input-text phone-value" id="phone-value" placeholder="Digite aqui" />
                            </div>
                        </div>
                        <div className="input-context cpf">
                            <label htmlFor="cpf-value">Cpf*</label>
                            <input
                                required    
                                autoComplete="off"
                                value={user.document}
                                onChange={event => setValuesOfInputFile(event, 'document')}
                                type="text" className="input-text cpf-value" id="cpf-value" placeholder="Digite aqui" />
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="form-context-patient-information">
                    <div className="title">INFORMAÇÕES SOBRE O PACIENTE</div>
                    <div className="type-coagulopathy_severity-coagulopathy_location-treatment-center">
                        <div className="owner">
                            <div className="input-context owner-name">
                                <label htmlFor="owner-name-value">Nome do responsável</label>
                                <input
                                    
                                    autoComplete="off"
                                    onChange={event => setValuesOfInputFile(event, 'ownerName')}
                                    type="text" className="input-text owner-name-value" id="phone-value" placeholder="Digite aqui" />
                            </div>
                        </div>
                        <div className="select-context type-coagulopathy">
                            <label htmlFor="type-coagulopathy-value">Tipo de coagulopatia</label>
                            <div className='select-input'>
                                <select
                                    required
                                    onChange={event => setValuesOfSelectElement(event, 'typeOfCoagulopathy')}
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
                                    onChange={event => setValuesOfSelectElement(event, 'severityOfCoagulopathy')}
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
                                    onChange={event => setValuesOfSelectElement(event, 'callCenterLocation')}
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
                                        value={user.pcd ? 'sim' : 'não'}
                                        onChange={event => setValuesOfSelectElement(event, 'pcd')}
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
                                <SelectDeficiencies
                                    existentData={undefined}
                                    deficiencies={deficiencies}
                                    setDeficiencies={setDeficiencies}
                                    pcd={user.pcd} />
                            </div>
                        </div>
                    </div>
                    <div className="accept-use-data">
                        <div className="input-context accept-use-my-data">
                            <input type="checkbox" id="accept-use-my-data-value"
                                required    
                                className="accept-use-my-data-value" />
                            <label className="accept-use-my-data-value-label" htmlFor="accept-use-my-data-value" onClick={openThermsAndServicesPdf}>ACEITO O USO DOS MEUS DADOS*</label>
                        </div>
                    </div>
                    <div className="save-changes">
                        <button type="submit" className="save-changes-btn">Cadastrar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}