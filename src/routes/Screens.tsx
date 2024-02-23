import {  useEffect, useState } from 'react';
import { NavBarScreen, NavBarHome } from '../components'
import { Outlet, useLocation } from 'react-router-dom'
import { Table } from 'react-bootstrap';

import partner1 from '../assets/patrocinador1.png'
import partner2 from '../assets/patrocinador02.png'

import { ThemeContext } from '../contexts/teste';

import './css/Screens.css'

/* import { validateUserSession } from '../utils/validateSession.utils' */

export const Screens = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    
    useEffect(() => {
    }, [])

    return (
        <div className='screens-container'>
            {/* @ts-ignore */}
            <ThemeContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                {
                    !location.pathname.includes('login') ?
                    location.pathname != '/' ? <NavBarScreen /> : <NavBarHome />
                    : <></>
                } 
                <Outlet />
            </ThemeContext.Provider>
            <div className='footer-bottom'>
                <div className='tables'>
                    <Table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/REGIMENTO+INTERNO.pdf' target='_blank' download='REGIMENTO INTERNO.pdf'>Regimento interno</a></td>
                            </tr>
                            <tr>
                                <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/TERMO+DE+USO.docx.pdf' target='_blank' download='TERMO DE USO.docx.pdf'>Termo de Uso e Política de Privacidade</a></td>
                            </tr>
                            <tr>
                                <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/PERGUNTAS+E+RESPOSTA+DO+TERMO+LGPD.docx.pdf' target='_blank' download='PERGUNTAS E RESPOSTAS.docx.pdf'>Perguntas e Respostas</a></td>
                            </tr>
                            <tr>
                                <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/DECLARA%C3%87%C3%83O+DE+CONSENTIMENTO.docx.pdf' target='_blank' download='DECLARACAO DE CONSENTIMENTO.docx.pdf'>Termo de consentimento</a></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Patrocinadores</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='flex justify-center'><img className='w-[70%]' src={partner1} alt="" /></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table className="table table-borderless">
                        <thead>
                            <tr className='flex justify-center'>
                                <th scope="col">Patrocinadores</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='flex justify-center'><img className='w-[60%]' src={partner2} alt="" /></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/REGIMENTO+INTERNO.pdf' target='_blank' download='REGIMENTO INTERNO.pdf'>Regimento interno</a></td>
                            </tr>
                            <tr>
                                <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/TERMO+DE+USO.docx.pdf' target='_blank' download='TERMO DE USO.docx.pdf'>Termo de Uso e Política de Privacidade</a></td>
                            </tr>
                            <tr>
                                <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/PERGUNTAS+E+RESPOSTA+DO+TERMO+LGPD.docx.pdf' target='_blank' download='PERGUNTAS E RESPOSTAS.docx.pdf'>Perguntas e Respostas</a></td>
                            </tr>
                            <tr>
                                <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/DECLARA%C3%87%C3%83O+DE+CONSENTIMENTO.docx.pdf' target='_blank' download='DECLARACAO DE CONSENTIMENTO.docx.pdf'>Termo de consentimento</a></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <p className='copyright-info'>© 2023 ABRAPHEM. TODOS OS DIREITOS RESERVADOS | Desenvolvido por XXXXXXXXXXX</p>
            </div>
        </div>
    )
}
