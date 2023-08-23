import { useEffect } from 'react';
import { NavBarScreen } from '../components'
import { Outlet } from 'react-router-dom'
import { Table } from 'react-bootstrap';

import './css/Screens.css'

/* import { validateUserSession } from '../utils/validateSession.utils' */

export const Screens = () => {
    /* const navigate = useNavigate(); */
    useEffect(() => {
        /* validateUserSession(navigate) */
    }, [])
    
    return (
        <div className='screens-container'>
            <NavBarScreen />
            <Outlet />
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
                </div>
                <p className='copyright-info'>© 2023 ABRAPHEM. TODOS OS DIREITOS RESERVADOS| Desenvolvido por XXXXXXXXXXX</p>
            </div>
        </div>
    )
}
