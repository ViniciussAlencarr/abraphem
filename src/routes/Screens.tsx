import React from 'react'
import { NavBarScreen } from '../components'
import { Outlet } from 'react-router-dom'
import { Col, Container, Row, Table } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';
import './css/Screens.css'

export const Screens = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <NavBarScreen />
                    <Outlet />
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='footer-bottom'>
                        <Table className="table table-borderless">
                            <thead>
                                <tr>
                                <th scope="col">Titulo</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Titulo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Informação</td>
                                <td>Informação</td>
                                <td>Informação</td>
                                <td>Informação</td>
                                </tr>
                                <tr>
                                <td>Informação</td>
                                <td>Informação</td>
                                <td>Informação</td>
                                <td>Informação</td>
                                </tr>
                                <tr>
                                <td>Informação</td>
                                <td>Informação</td>
                                <td>Informação</td>
                                <td>Informação</td>
                                </tr>
                                <tr>
                                <td>Informação</td>
                                <td>Informação</td>
                                <td>Informação</td>
                                <td>Informação</td>
                                </tr>
                                <tr>
                                <td>Informação</td>
                                <td>Informação</td>
                                <td>Informação</td>
                                <td>Informação</td>
                                </tr>
                                <tr>
                                <td>Informação</td>
                                <td>Informação</td>
                                <td>Informação</td>
                                <td>Informação</td>
                                </tr>
                            </tbody>
                        </Table>
                        <p className='copyright-info'>© 2023 ABRAPHEM. TODOS OS DIREITOS RESERVADOS| Desenvolvido por XXXXXXXXXXX</p>
                </div>
                </Col>
            </Row>
        </Container>
    )
}
