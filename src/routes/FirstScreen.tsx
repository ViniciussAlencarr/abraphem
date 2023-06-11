import React from 'react'
import { Table } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';

import './css/FirstScreen.css';

export const FirstScreen = () => {
  return (
    <div>
      <hr />
      <div className='header-info'>
          <span className='header-info-title'>BEM VINDO À PLATAFORMA DE OUVIDORIA DA ABRAPHEM</span>
          <div className='help-info screens'>
              <span>AJUDA</span>
              <BsInfoCircle size={20}/>
          </div>
      </div>
      <hr />
      <div className='first-screen-container'>
          <Table className="table table-borderless">
              <tbody>
                  <tr>
                      <td>
                          <div className='header-img-context new-request'>
                              <div className='new-request-img'>
                                  <img className='img' src="./public/theme-img.png" alt="" />
                              </div>
                              <div className='header-img-name new-request-name'>
                                  <p className='name'>Nova solicitação</p>
                              </div>
                              <div className='header-img-description new-request-description'>
                                  <span className='description'>Registre a sua solicitação, reclamação, denúncia, sugestão, elogio ou pedido de acesso à informação.</span>
                              </div>
                          </div>
                      </td>
                      <td>
                          <div className='header-img-context my-requests'>
                              <div className='my-requests-img'>
                                  <img className='img' src="./public/theme-img.png" alt="" />
                              </div>
                              <div className='header-img-name my-requests-name'>
                                  <p className='name'>Minhas solicitações</p>
                              </div>
                              <div className='header-img-description my-requests-description'>
                                  <p className='description'>Consulte o andamento de suas solicitações.</p>
                              </div>
                          </div>
                      </td>
                      <td>
                          <div className='header-img-context my-user'>
                              <div className='my-user-img'>
                                  <img className='img' src="./public/theme-img.png" alt="" />
                              </div>
                              <div className='header-img-name my-user-name'>
                                  <p className='name'>Meu usuário</p>
                              </div>
                              <div className='header-img-description my-user-description'>
                                  <p className='description'>Visualize e altere seus dados cadastrais no sistema.</p>
                              </div>
                          </div>
                      </td>
                  </tr>
              </tbody>
          </Table>
      </div>
    </div>
  )
}
