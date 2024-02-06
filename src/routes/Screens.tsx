import {  useEffect, useState } from 'react';
import { NavBarScreen, NavBarHome } from '../components'
import { Outlet, useLocation } from 'react-router-dom'
import { Table } from 'react-bootstrap';

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
                                <th scope="col">Titulo</th>
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
                                <td>Perguntas e Respostas</td>
                            </tr>
                            <tr>
                                <td><a className='link-rodape'  href='https://abraphem-pdfs.s3.amazonaws.com/DECLARA%C3%87%C3%83O+DE+CONSENTIMENTO.docx.pdf' target='_blank' download='DECLARACAO DE CONSENTIMENTO.docx.pdf'>Termo de consentimento</a></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Titulo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>

                        </tbody>
                    </Table>
                    <Table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Titulo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                            <tr>
                                <td>Informação</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Titulo</th>
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
                                <td>Perguntas e Respostas</td>
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
