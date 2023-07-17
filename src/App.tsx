import './App.css'
import './routes/css/media-layout.css'

import { Link, Outlet } from 'react-router-dom'
import { NavBarHome } from './components'
import { BsInfoCircle } from 'react-icons/bs';

import { Col, Container, Nav, NavDropdown, Navbar, Row, Table } from 'react-bootstrap';
import { MdEmail } from 'react-icons/md';
import { VscThreeBars } from 'react-icons/vsc';

function App() {
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
          <Col className='nav-bar-container'>
            <NavBarHome />
          </Col>
      </Row>
      <Row className="justify-content-md-center">
          <Col className='content'>
          <div className='header-info'>
              <button className="options-btn">
                <VscThreeBars size={30} />
              </button>
              <span className='header-info-title'>PLATAFORMA DE OUVIDORIA DA ASSOCIAÇÃO BRASILEIRA DE PESSOAS COM HEMOFILIA - ABRAPHEM</span>
            </div>
            <Outlet />
              <div className='footer-top'>
                <div className='subscribe-context'>
                  <div className='email-icon'>
                    <MdEmail size={30} />
                  </div>
                  <div className='info'>
                    <p className='subscribe'>Inscreva-se</p>
                    <p className='company-name'>Na Abraphem</p>
                  </div>
                </div>
                <div className='news-info'>
                  <p>RECEBA <b>TODAS AS NOVIDADES E INFORMAÇÕES IMPORTANTES</b> SOBRE OS TRATAMENTOS DA HEMOFILIA</p>
                </div>
                <div className='send-email'>
                  <form>
                    <input className='email' type="email" placeholder='Email' />
                    <div className='submit-button-div'>
                      <button className='submit-button'>Button</button>
                    </div>

                  </form>
                </div>
              </div>
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
          </Col>
      </Row>
    </Container>
  )
}

export default App
