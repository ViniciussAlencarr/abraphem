
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { NavBarHome } from './components'
import { Table } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

/* import api from './services/api'; */

import './App.css'
import './routes/css/media-layout.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  /* const navigate = useNavigate(); */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* const checkUserToken = async () => {
    try {
      const token = localStorage.getItem('bearer_token');
      await api.post('health', { token })
      if (!token || token === 'undefined') {
          setIsLoggedIn(false);
          return navigate('/login');
      }
      setIsLoggedIn(true);
    } catch (err) {
      localStorage.removeItem('user_id');
      localStorage.removeItem('bearer_token');
      setIsLoggedIn(false);
      return navigate('/login');
    }
  } */
  
  useEffect(() => {
    setIsLoggedIn(false)
    console.log(isLoggedIn)
    /* checkUserToken(); */
  }, [/* isLoggedIn */]);

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
        <ToastContainer />
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
