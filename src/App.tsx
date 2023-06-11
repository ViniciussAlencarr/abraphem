import './App.css'

import { Outlet } from 'react-router-dom'
import { NavBarHome } from './components'
import { BsInfoCircle } from 'react-icons/bs';

import { Col, Container, Row, Table } from 'react-bootstrap';
import { MdEmail } from 'react-icons/md';

function App() {

  return (
    <Container>
      <Row>
          <Col>
            <NavBarHome />
            <hr />
            <div className='header-info'>
              <span className='header-info-title'>PLATAFORMA DE OUVIDORIA DA ASSOCIAÇÃO BRASILEIRA DE PESSOAS COM HEMOFILIA - ABRAPHEM</span>
              <div className='help-info'>
                <span>AJUDA</span>
                <BsInfoCircle size={20}/>
              </div>
            </div>
            <Outlet />
          </Col>
      </Row>
      <Row>
          <Col>
              <div className='footer-top'>
                <div className='subscribe-context'>
                  <MdEmail size={30} />
                  <div className='info'>
                    <span className='subscribe'><b>Inscreva-se</b></span>
                    <span className='company-name'>Na Abraphem</span>
                  </div>
                </div>
                <div className='news-info'>
                  <span>RECEBA <b>TODAS AS NOVIDADES E INFORMAÇÕES IMPORTANTES</b> SOBRE OS TRATAMENTOS DA HEMOFILIA</span>
                </div>
                <div className='send-email'>
                  <form>
                    <input className='email' type="email" placeholder='Email' />
                    <button className='submit-button'>Button</button>
                  </form>
                </div>
              </div>
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

export default App
