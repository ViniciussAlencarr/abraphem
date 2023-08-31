import { useEffect, useState } from "react"
import { RiArrowDownSFill } from "react-icons/ri"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import api from '../services/api'

import { User } from "types/User"
import axios from "axios";

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
        state: "",
        city: "",
        gender: "",
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
        email: "",
        roleUser: "2",
        profilePictureURL: ""
    })

    useEffect(() => {
    }, [])

    const setValuesOfInputFile = (event: any, typeFile: string) => {
        setUser({ ...user, [typeFile]: event.target.value })
    }

    const setValuesOfSelectElement = (event: any, typeFile: string) => {
        let value = event.target.options[event.target.selectedIndex].text
        if (typeFile == 'category' && value != 'PACIENTE') params.setCategory(value), params.setPatientType(false);
        setUser({ ...user, [typeFile]: typeFile == 'pcd' ? value == 'SIM' ? true : false : value })
    }

    const onSubmit = (event: any) => {
        event.preventDefault()
        const sendSignin = async () => {
            await api.post('signup', user)
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
                        setTimeout(() => navigate('/welcome?login=true'), 500)
                        return 'Usuário criado com sucesso!'
                    }
                },
                error: 'Ocorreu um problema ao criar o usuário'
            }
        )
    }

    const searchCep = async (event: any) => {
        const { data } = await axios.get(`https://viacep.com.br/ws/${event.target.value}/json/`)
        setUser({...user, city: data?.localidade, state: data?.uf })
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
                                
                                <div className="input-context date-birth">
                                    <label htmlFor="date-birth-value">Data de nascimento*</label>
                                    <input
                                        required
                                        onChange={event => setValuesOfInputFile(event, 'dateOfBirth')}
                                        type="date" className="input-text date-birth-value" id="date-birth-value" placeholder="Digite aqui" />
                                </div>
                            </div>
                            <div className="state_city">
                                <div className="input-context cep">
                                    <label htmlFor="cpf-value">CEP*</label>
                                    <input
                                        required
                                        onChange={searchCep}
                                        type="text" className="input-text cep-value" id="cep-value" placeholder="Digite aqui" />
                                </div>
                                <div className="select-context state">
                                    <label htmlFor="state-value">Estado*</label>
                                    <div className='select-input'>
                                        <select
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
                                        onChange={event => setValuesOfSelectElement(event, 'race')}
                                        className='race-value' name="" id="race-value">
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
                            <div className="input-context name">
                                <label htmlFor="name-value">Nome completo</label>
                                <input
                                    required
                                    onChange={event => setValuesOfInputFile(event, 'fullName')}
                                    type="text" className="input-text name-value" id="name-value" placeholder="Digite aqui" />
                            </div>
                            {/* <div className="select-context category">
                                <label htmlFor="category">Em que categoria você se encaixa?*</label>
                                <div className='select-input'>
                                    <select
                                        onChange={event => {params.setPatientType(false); setValuesOfSelectElement(event, 'category')}}
                                        className='category' name="" id="category">
                                        <option value="paciente" selected>PACIENTE</option>
                                        <option value="cuidador / responsável">CUIDADOR / RESPONSÁVEL</option>
                                        <option value="profissional da saúde / acadêmicos">PROFISSIONAL DA SAÚDE / ACADÊMICOS</option>
                                        <option value="outros">OUTROS</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div> */}
                            <div className="input-context email">
                                <label htmlFor="email-value">Email*</label>
                                <input
                                    required
                                    onChange={event => setValuesOfInputFile(event, 'email')}
                                    type="email" className="input-text email-value" id="email-value" placeholder="Digite aqui" />
                            </div>
                            <div className="input-context email">
                                <label htmlFor="password-value">Senha*</label>
                                <input
                                    required
                                    onChange={event => setValuesOfInputFile(event, 'password')}
                                    type="password" className="input-text password-value" id="password-value" placeholder="Digite aqui" />
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
                        <div className="owner">
                            <div className="input-context owner-name">
                                <label htmlFor="owner-name-value">Nome do responsável*</label>
                                <input
                                    onChange={event => setValuesOfInputFile(event, 'ownerName')}
                                    type="text" className="input-text owner-name-value" id="phone-value" placeholder="Digite aqui" />
                            </div>
                        </div>
                        <div className="input-context cpf">
                            <label htmlFor="cpf-value">Cpf*</label>
                            <input
                                required
                                onChange={event => setValuesOfInputFile(event, 'document')}
                                type="text" className="input-text cpf-value" id="cpf-value" placeholder="Digite aqui" />
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
                                    <option value="não diagnosticado">NÃO DIAGNOSTICADO</option>
                                </select>
                                <RiArrowDownSFill size={25} />
                            </div>
                        </div>
                        <div className="input-context location-treatment-center">
                            <label htmlFor="location-treatment-center-value">Localização do Centro de Tratamento</label>
                            <input
                                required
                                onChange={event => setValuesOfInputFile(event, 'callCenterLocation')}
                                type="text" className="input-text location-treatment-center-value" id="location-treatment-center-value" placeholder="Digite aqui" />
                        </div>
                    </div>
                    <div className="pcd_which_accept-use-my-data">
                        <div className="pcd_whick">
                            <div className="select-context pcd">
                                <label htmlFor="pcd-value">PESSOA COM DEFICIENCIA (PCD)?</label>
                                <div className='select-input'>
                                    <select
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
                                <div className='select-input'>
                                    <select
                                        onChange={event => setValuesOfSelectElement(event, 'typeOfDisability')}
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
                        </div>
                    </div>
                    <div className="accept-use-data">
                        <div className="input-context accept-use-my-data">
                            <input type="checkbox" id="accept-use-my-data-value"
                                required
                                className="accept-use-my-data-value" />
                            <label htmlFor="accept-use-my-data-value">ACEITO O USO DOS MEUS DADOS</label>
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