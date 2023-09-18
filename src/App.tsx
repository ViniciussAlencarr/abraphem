/* import { Outlet } from 'react-router-dom'
import { NavBarHome } from './components'
import { Table } from 'react-bootstrap'; */
import { ToastContainer } from 'react-toastify';

import './App.css'
import './routes/css/media-layout.css'
import 'react-toastify/dist/ReactToastify.css';
import { Screens } from './routes';


function App() {
  return (
    <div className='container-app'>
      <Screens />
      {/* <div className="nav-bar-home">
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
      </div> */}
      <ToastContainer />
    </div>
  )
}

export default App
