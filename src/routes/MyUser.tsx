import { useEffect, useState } from "react"
import { IoIosArrowForward } from "react-icons/io"
import { VscThreeBars } from "react-icons/vsc"
import { RiArrowDownSFill } from "react-icons/ri"
import { ProfilePicture } from '../contexts/ProfilePicture'
import { MenuOptions } from "../components/MenuOptions"

import './css/MyUser.css'
import './css/media-layout.css'

import arrowUpIcon from '../assets/arrow-up.svg'
import defaultProfile from './../assets/profile.svg'

export const MyUser = () => {
    const [userName, setUserName] = useState('')
    const [userImg, setUserImg] = useState(defaultProfile)
    const [open, setOpen] = useState(false);


    useEffect(() => {
        setUserName('nome do usuário')
    }, [])

    const uploadImg = (event: any) => {
        let selectedFile = event.target.files[0]
        setUserImg(URL.createObjectURL(selectedFile))
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
                    <div className="preview-user-name">{userName}</div>
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
                                <input type="text" className="input-text name-value" id="name-value" placeholder="Digite aqui" />
                            </div>
                            <div className="cpf_date-birth_state_city">
                                <div className="cpf_date-birth">
                                    <div className="input-context cpf">
                                        <label htmlFor="cpf-value">Cpf*</label>
                                        <input type="text" className="input-text cpf-value" id="cpf-value" placeholder="Digite aqui" />
                                    </div>
                                    <div className="input-context date-birth">
                                        <label htmlFor="date-birth-value">Data de nascimento*</label>
                                        <input type="date" className="input-text date-birth-value" id="date-birth-value" placeholder="Digite aqui" />
                                    </div>
                                </div>
                                <div className="state_city">
                                    <div className="select-context state">
                                        <label htmlFor="state-value">Estado*</label>
                                        <div className='select-input'>
                                            <select className='state-value' name="" id="state-value">
                                                <option selected style={{display: 'none'}}>Selecione</option>
                                                <option value="">----</option>
                                                <option value="">----</option>
                                            </select>
                                            <RiArrowDownSFill size={25} />
                                        </div>
                                    </div>
                                    <div className="select-context city">
                                        <label htmlFor="city-value">Cidade*</label>
                                        <div className='select-input'>
                                            <select className='city-value' name="" id="city-value">
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
                        <div className="gender_race_category_email">
                            <div className="gender_race">
                                <div className="select-context gender">
                                    <label htmlFor="gender-value">Sexo*</label>
                                    <div className='select-input'>
                                        <select className='gender-value' name="" id="gender-value">
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="">----</option>
                                            <option value="">----</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                                <div className="select-context race">
                                    <label htmlFor="race-value">Raça*</label>
                                    <div className='select-input'>
                                        <select className='race-value' name="" id="race-value">
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="">----</option>
                                            <option value="">----</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                            </div>
                            <div className="category_email">
                                <div className="select-context category">
                                    <label htmlFor="category-value">Em que categoria você se encaixa?*</label>
                                    <div className='select-input'>
                                        <select className='category-value' name="" id="category-value">
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="">----</option>
                                            <option value="">----</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                                <div className="input-context email">
                                    <label htmlFor="email-value">Email*</label>
                                    <input type="email" className="input-text email-value" id="email-value" placeholder="Digite aqui" />
                                </div>
                            </div>
                        </div>
                        <div className="phone-type_phone-value_owner-name">
                            <div className="phone-type_phone-value">
                                <div className="select-context phone-type">
                                    <label htmlFor="phone-type-value">Tipo de telefone</label>
                                    <div className='select-input'>
                                        <select className='phone-type-value' name="" id="phone-type-value">
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="">----</option>
                                            <option value="">----</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                                <div className="input-context phone">
                                    <label htmlFor="phone-value">Telefone*</label>
                                    <input type="text" className="input-text phone-value" id="phone-value" placeholder="Digite aqui" />
                                </div>
                            </div>
                            <div className="owner">
                                <div className="input-context owner-name">
                                    <label htmlFor="owner-name-value">Nome do responsável*</label>
                                    <input type="text" className="input-text owner-name-value" id="phone-value" placeholder="Digite aqui" />
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
                                    <select className='type-coagulopathy-value' name="" id="type-coagulopathy-value">
                                        <option selected style={{display: 'none'}}>Selecione</option>
                                        <option value="">----</option>
                                        <option value="">----</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                            <div className="select-context severity-coagulopathy">
                                <label htmlFor="severity-coagulopathy-value">Gravidade da coagulopatia</label>
                                <div className='select-input'>
                                    <select className='severity-coagulopathy-value' name="" id="severity-coagulopathy-value">
                                        <option selected style={{display: 'none'}}>Selecione</option>
                                        <option value="">----</option>
                                        <option value="">----</option>
                                    </select>
                                    <RiArrowDownSFill size={25} />
                                </div>
                            </div>
                            <div className="input-context location-treatment-center">
                                <label htmlFor="location-treatment-center-value">Localização do Centro de Tratamento</label>
                                <input type="text" className="input-text location-treatment-center-value" id="location-treatment-center-value" placeholder="Digite aqui" />
                            </div>
                        </div>
                        <div className="pcd_which_accept-use-my-data">
                            <div className="pcd_whick">
                                <div className="select-context pcd">
                                    <label htmlFor="pcd-value">PESSOA COM DEFICIENCIA (PCD)?</label>
                                    <div className='select-input'>
                                        <select className='pcd-value' name="" id="pcd-value">
                                            <option selected style={{display: 'none'}}>Selecione</option>
                                            <option value="">----</option>
                                            <option value="">----</option>
                                        </select>
                                        <RiArrowDownSFill size={25} />
                                    </div>
                                </div>
                                <div className="select-context which">
                                    <label htmlFor="which-value">SE SIM, QUAL?</label>
                                    <div className='select-input'>
                                        <select className='which-value' name="" id="which-value">
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
                    </div>
                    <div className="save-changes">
                        <button className="save-changes-btn">Salvar alterações</button>
                    </div>
                    <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='back-to-top'>
                        <span>Voltar ao topo</span>
                        <img className='logo' src={arrowUpIcon} />
                    </div>
                </div>
            </div>
        </div>
    )
}