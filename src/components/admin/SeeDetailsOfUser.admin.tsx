import { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'

import { User } from '../../types/User'

import defaultProfile from './../../assets/profile.svg'

import '../css/admin/SeeDetailsOfUser.admin.css'

export const SeeDetailsOfUser = (params: {
    user: User,
    open: boolean,
    setOpen: any
}) => {
    const [userImg, setUserImg] = useState(defaultProfile)

    useEffect(() => {
        setUserImg(params.user.profilePictureURL != '' ? params.user.profilePictureURL : userImg)
    }, [])

    return (
        <div className="see-details">
            <div className="header">
                <div className="back-to-previous-page" onClick={() => params.setOpen(!params.open)}>
                    <MdOutlineKeyboardBackspace size={25} />
                    <button className="back-to-previous-page-btn" onClick={() => params.setOpen(!params.open)}>Voltar</button>
                </div>
                <div className="title">Usuários Cadastrados</div>
            </div>
            <div className="user-info">
                <div className="user-picture_username">
                    <div className="user-picture">
                        <img src={userImg} alt="" className="user-picture-img" />
                    </div>
                    <div className="username">{params.user.username}</div>
                </div>
                <div className="title-user-info">Informações pessoais</div>
                <div className="full-name_cpf_birth-date_state_city">
                    <div className="full-name_cpf">
                        <div className="info-block-content full-name">
                            <label className="label-value" htmlFor="full-name-value">Nome completo</label>
                            <input value={params.user.fullName} readOnly type="text" className="input-value full-name-value" id="full-name-value" />
                        </div>
                        <div className="info-block-content cpf">
                            <label className="label-value" htmlFor="cpf-value">Cpf</label>
                            <input value={params.user.document} readOnly type="text" className="input-value cpf-value" id="cpf-value" />
                        </div>
                    </div>
                    <div className="birth-date_state_city">
                        <div className="info-block-content birth-date">
                            <label className="label-value" htmlFor="birth-date">Data de nascimento</label>
                            <input value={params.user.dateOfBirth} type="text" className="input-value birth-date" readOnly id="birth-date"/>
                        </div>
                        <div className="info-block-content state">
                            <label className="label-value" htmlFor="state-value">Estado</label>
                            <input value={params.user.state} type="text" className="input-value state-value" readOnly id="state-value"/>
                        </div>
                        <div className="info-block-content city">
                            <label className="label-value" htmlFor="city">Cidade</label>
                            <input value={params.user.city} type="text" className="input-value city" readOnly id="city"/>
                        </div>
                    </div>
                </div>
                <div className="gender_race_category_email">
                    <div className="gender_race_category">
                        <div className="info-block-content gender">
                            <label className="label-value" htmlFor="gender">Sexo</label>
                            <input value={params.user.gender} type="text" className="input-value gender" readOnly id="gender"/>
                        </div>
                        <div className="info-block-content race">
                            <label className="label-value" htmlFor="race">Raça</label>
                            <input value={params.user.race} type="text" className="input-value race" readOnly id="race"/>
                        </div>
                        <div className="info-block-content category">
                            <label className="label-value" htmlFor="category">Em que categoria você se encaixa?</label>
                            <input value={params.user.category} type="text" className="input-value category" readOnly id="category"/>
                        </div>
                    </div>
                    <div className="email">
                        <div className="info-block-content email">
                            <label className="label-value" htmlFor="email">Email</label>
                            <input value={params.user.email} type="email" className="input-value email" readOnly id="email"/>
                        </div>
                    </div>
                </div>
                <div className="type-phone_phone-number_owner-name">
                    <div className="type-phone_phone-numbery">
                        <div className="info-block-content race">
                            <label className="label-value" htmlFor="type-phone">Tipo de telefone</label>
                            <input value={params.user.typeOfPhone} type="text" className="input-value type-phone" readOnly id="type-phone"/>
                        </div>
                        <div className="info-block-content phone-number">
                            <label className="label-value" htmlFor="phone-number">Telefone</label>
                            <input value={params.user.phoneNumber} type="text" className="input-value phone-number" readOnly id="phone-number"/>
                        </div>
                    </div>
                    <div className="info-block-content owner-name">
                        <div className="owner-name">
                            <label className="label-value" htmlFor="owner-name">Nome do responsável</label>
                            <input value={params.user.ownerName} type="text" className="input-value owner-name" readOnly id="owner-name"/>
                        </div>
                    </div>
                    <div className="info-block-content username">
                        <div className="owner-name">
                            <label className="label-value" htmlFor="owner-name">Nome de usuário</label>
                            <input value={params.user.username} type="text" className="input-value owner-name" readOnly id="owner-name"/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="title-user-info">Informações sobre o paciente</div>
                <div className="type-of-coagulopathy_severity-of-coagulopathy_treatment-center-location">
                    <div className="info-block-content full-name">
                        <label className="label-value" htmlFor="type-of-coagulopathy">Tipo de coagulopatia</label>
                        <input value={params.user.typeOfCoagulopathy} readOnly type="text" className="input-value type-of-coagulopathy" id="type-of-coagulopathy" />
                    </div>
                    <div className="info-block-content severity-of-coagulopathy">
                        <label className="label-value" htmlFor="severity-of-coagulopathy">Gravidade da coagulopatia</label>
                        <input value={params.user.severityOfCoagulopathy} readOnly type="text" className="input-value severity-of-coagulopathy" id="severity-of-coagulopathy" />
                    </div>
                    <div className="info-block-content treatment-center-location">
                        <label className="label-value" htmlFor="treatment-center-location">Centro de Tratamento</label>
                        <input value={params.user.callCenterLocation} readOnly type="text" className="input-value treatment-center-location" id="treatment-center-location" />
                    </div>
                </div>
                <div className="person-with-disability_which">
                    <div className="info-block-content person-with-disability">
                        <label className="label-value" htmlFor="person-with-disability">Pessoa com deficiencia (PCD)?</label>
                        <input value={params.user.pcd ? 'Sim' : 'Não'}  readOnly type="text" className="input-value person-with-disability" id="person-with-disability" />
                    </div>
                    <div className="info-block-content which">
                        <label className="label-value" htmlFor="which">Se sim, qual?</label>
                        <input value={params.user.typeOfDisability}  readOnly type="text" className="input-value which" id="which" />
                    </div>
                </div>
            </div>
        </div>
    )
}