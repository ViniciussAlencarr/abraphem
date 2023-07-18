
import { Outlet } from 'react-router-dom'
import { NavBarHome } from './components'
import { Table } from 'react-bootstrap';
import { MdEmail } from 'react-icons/md';
import { VscThreeBars } from 'react-icons/vsc';

import './App.css'
import './routes/css/media-layout.css'

function App() {
  return (
    <div className='container-app'>
        <div className="nav-bar-home">
          <NavBarHome />
        </div>
        <hr />
        <div className="content">
          <div className='header-info'>
              <span className='header-info-title'>PLATAFORMA DE OUVIDORIA DA ASSOCIAÇÃO BRASILEIRA DE PESSOAS COM HEMOFILIA - ABRAPHEM</span>
          </div>
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
    </div>
    /* <Container fluid>
      <Row className="justify-content-md-center">
          <Col className='nav-bar-container'>
          </Col>
      </Row>
      <Row className="justify-content-md-center">
          <Col className='content'>
          </Col>
      </Row>
    </Container> */
  )
}

export default App
