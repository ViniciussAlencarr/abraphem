import { VscThreeBars } from 'react-icons/vsc'
import { IoIosArrowForward } from 'react-icons/io'
import { Button, Collapse, Form } from 'react-bootstrap'
import { RiArrowDownSFill, RiArrowDownSLine } from 'react-icons/ri'
import { useState } from 'react'
import { MenuOptions } from '../components/MenuOptions'
import TablePagination from '@mui/base/TablePagination';

import './css/MyRequests.css'
import './css/media-layout.css'

export const MyRequests = () => {
    const [teste, setTest] = useState([
        {
            id: '1',
            protocol: {
                number: 123456778,
                period: '00/00/0000 ÁS 16H00'
            },
            title: 'Título da manifestação',
            description: 'DESCRIÇÃO DA MANIFESTAÇÃO Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean orci orci, tristique vitae dapibus non, dapibus in erat. Fusce commodo est nec malesuada hendrerit. Etiam mauris urna, rhoncus et neque ac, venenatis convallis erat. Donec sit amet diam fringilla, tempor quam eu, vulputate mauris. Aliquam et rutrum dui. Integer et nunc sit amet erat fringilla aliquet. Sed condimentum condimentum tempor. Nunc viverra, magna ac iaculis pulvinar, nisi tortor accumsan nisl, non tempus erat ipsum nec est. Ut fringilla bibendum diam quis rutrum. Phasellus non rutrum sem, ut sagittis sapien. Quisque quis aliquam urna, id semper arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
            status: 'Concluido',
            open: false
        },
        {
            id: '2',
            protocol: {
                number: 123456778,
                period: '00/00/0000 ÁS 16H00'
            },
            title: 'Título da manifestação',
            description: 'DESCRIÇÃO DA MANIFESTAÇÃO Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean orci orci, tristique vitae dapibus non, dapibus in erat. Fusce commodo est nec malesuada hendrerit. Etiam mauris urna, rhoncus et neque ac, venenatis convallis erat. Donec sit amet diam fringilla, tempor quam eu, vulputate mauris. Aliquam et rutrum dui. Integer et nunc sit amet erat fringilla aliquet. Sed condimentum condimentum tempor. Nunc viverra, magna ac iaculis pulvinar, nisi tortor accumsan nisl, non tempus erat ipsum nec est. Ut fringilla bibendum diam quis rutrum. Phasellus non rutrum sem, ut sagittis sapien. Quisque quis aliquam urna, id semper arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
            status: 'Em andamento',
            open: false
        },
        {
            id: '3',
            protocol: {
                number: 123456778,
                period: '00/00/0000 ÁS 16H00'
            },
            title: 'Título da manifestação',
            description: 'DESCRIÇÃO DA MANIFESTAÇÃO Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean orci orci, tristique vitae dapibus non, dapibus in erat. Fusce commodo est nec malesuada hendrerit. Etiam mauris urna, rhoncus et neque ac, venenatis convallis erat. Donec sit amet diam fringilla, tempor quam eu, vulputate mauris. Aliquam et rutrum dui. Integer et nunc sit amet erat fringilla aliquet. Sed condimentum condimentum tempor. Nunc viverra, magna ac iaculis pulvinar, nisi tortor accumsan nisl, non tempus erat ipsum nec est. Ut fringilla bibendum diam quis rutrum. Phasellus non rutrum sem, ut sagittis sapien. Quisque quis aliquam urna, id semper arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
            status: 'Aberto',
            open: false
        },
        {
            id: '4',
            protocol: {
                number: 123456778,
                period: '00/00/0000 ÁS 16H00'
            },
            title: 'Título da manifestação',
            description: 'DESCRIÇÃO DA MANIFESTAÇÃO Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean orci orci, tristique vitae dapibus non, dapibus in erat. Fusce commodo est nec malesuada hendrerit. Etiam mauris urna, rhoncus et neque ac, venenatis convallis erat. Donec sit amet diam fringilla, tempor quam eu, vulputate mauris. Aliquam et rutrum dui. Integer et nunc sit amet erat fringilla aliquet. Sed condimentum condimentum tempor. Nunc viverra, magna ac iaculis pulvinar, nisi tortor accumsan nisl, non tempus erat ipsum nec est. Ut fringilla bibendum diam quis rutrum. Phasellus non rutrum sem, ut sagittis sapien. Quisque quis aliquam urna, id semper arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
            status: 'Em andamento',
            open: false
        },
        {
            id: '5',
            protocol: {
                number: 123456778,
                period: '00/00/0000 ÁS 16H00'
            },
            title: 'Título da manifestação',
            description: 'DESCRIÇÃO DA MANIFESTAÇÃO Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean orci orci, tristique vitae dapibus non, dapibus in erat. Fusce commodo est nec malesuada hendrerit. Etiam mauris urna, rhoncus et neque ac, venenatis convallis erat. Donec sit amet diam fringilla, tempor quam eu, vulputate mauris. Aliquam et rutrum dui. Integer et nunc sit amet erat fringilla aliquet. Sed condimentum condimentum tempor. Nunc viverra, magna ac iaculis pulvinar, nisi tortor accumsan nisl, non tempus erat ipsum nec est. Ut fringilla bibendum diam quis rutrum. Phasellus non rutrum sem, ut sagittis sapien. Quisque quis aliquam urna, id semper arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
            status: 'Concluido',
            open: false
        },
        {
            id: '6',
            protocol: {
                number: 123456778,
                period: '00/00/0000 ÁS 16H00'
            },
            title: 'Título da manifestação',
            description: 'DESCRIÇÃO DA MANIFESTAÇÃO Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean orci orci, tristique vitae dapibus non, dapibus in erat. Fusce commodo est nec malesuada hendrerit. Etiam mauris urna, rhoncus et neque ac, venenatis convallis erat. Donec sit amet diam fringilla, tempor quam eu, vulputate mauris. Aliquam et rutrum dui. Integer et nunc sit amet erat fringilla aliquet. Sed condimentum condimentum tempor. Nunc viverra, magna ac iaculis pulvinar, nisi tortor accumsan nisl, non tempus erat ipsum nec est. Ut fringilla bibendum diam quis rutrum. Phasellus non rutrum sem, ut sagittis sapien. Quisque quis aliquam urna, id semper arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
            status: 'Concluido',
            open: false
        },
    ])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [open, setOpen] = useState(false);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        console.log(event)
        setPage(newPage);
        console.log(newPage);
    };
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        console.log(event.target.value)
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - teste.length) : 0;

    const openMoreInfoAboutManifest = (event: any, row: any) => {
        /* let aux: any = document.querySelector('.tr-table-context') */
        /* if (aux.style.display == 'block') {
            aux.style.display = 'none'
        } else {
            aux.style.display = 'block'
        } */
        event.target.classList.toggle('active')
        let aux = teste
        let index = aux.findIndex((value: any) => value.id == row.id)
        aux[index].open = !aux[index].open
        setTest([...aux])
    }
    return (
        <div className='requests-container'>
            <hr />
            <div className='header-info'>
                <button className="options-btn" onClick={() => setOpen(!open)}>
                    <VscThreeBars size={30} />
                </button>
                <span className='header-info-title'>MINHAS MANIFESTAÇÕES</span>
            </div>
            <hr />
            <div className='navigation-context'>
                <div className='navigation-start'>
                    <span>Ínicio</span>
                    <IoIosArrowForward style={{ opacity: '.2'}} />
                </div>
                <div className='current'>
                    <span>Minhas manifestações</span>
                </div>
            </div>
            <div className="manifests-table-content">
                <MenuOptions open={open} />

                <div className="title">
                    Todas as manifestações
                </div>
                <div className='header'>
                    <div className="select protocol">
                        <Form.Group className="mb-3">
                            <Form.Label>Protocolo</Form.Label>
                            <div className='select-input'>
                                <select className='select-content-input' name="" id="">
                                    <option selected style={{display: 'none'}}>Selecione</option>
                                    <option value="">----</option>
                                    <option value="">----</option>
                                </select>
                                <RiArrowDownSFill size={25} />
                            </div>
                        </Form.Group>
                    </div>
                    <div className="select manifest-type">
                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de manifestação</Form.Label>
                            <div className='select-input'>
                                <select className='select-content-input' name="" id="">
                                    <option selected style={{display: 'none'}}>Selecione</option>
                                    <option value="">----</option>
                                    <option value="">----</option>
                                </select>
                                <RiArrowDownSFill size={25} />
                            </div>
                        </Form.Group>
                    </div>
                    <div className="select status">
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <div className='select-input'>
                                <select className='select-content-input' name="" id="">
                                    <option selected style={{display: 'none'}}>Selecione</option>
                                    <option value="">----</option>
                                    <option value="">----</option>
                                </select>
                                <RiArrowDownSFill size={25} />
                            </div>
                        </Form.Group>
                    </div>
                    <div className="filter">
                        <button className='filter-btn'>Filtrar</button>
                    </div>
                </div>
                <div className="subtitle-status">
                    <div className='subtitle-title'>
                        legenda status:
                    </div>
                    <div className="concluded-status status">
                        <div className='status-color'></div>
                        <span className='status-label'>Concluido</span>
                    </div>
                    <div className="in-progress-status status">
                        <div className='status-color'></div>
                        <span className='status-label'>Em andamento</span>
                    </div>
                    <div className="open-status status">
                        <div className='status-color'></div>
                        <span className='status-label'>Aberto</span>
                    </div>
                </div>
                <div className='manifest-table-container'>
                    <table className='manifest-table'>
                        {/* <div className='line'>sa</div> */}
                        <thead>
                            <tr className='table-titles'>
                                <th style={{width: '15%' }}>Protocolo</th>
                                <th style={{ width: '70%' }}>Descrição</th>
                                <th className='status-title' style={{ textAlign: 'center' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (teste.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)).map(row =>
                                    <>
                                        <tr>
                                            <td className='protocol'>
                                                <div className='protocol-container'>
                                                    <div className='number'>{row.protocol.number}</div>
                                                    <div className='date'>{row.protocol.period}</div>
                                                </div>
                                            </td>
                                            <td className='description'>
                                                <div className='description-container'>
                                                    <div className='description-title'>
                                                        {row.title}
                                                    </div>
                                                    <div className='value'>
                                                        {row.description}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='status-context-tr'>
                                                <div className='status-context'>
                                                    <div className={`status-context-color
                                                        ${row.status.toLowerCase() == 'concluido' ?
                                                            'concluded' :
                                                                row.status.toLowerCase() == 'em andamento' ?
                                                                    'in-progress' :
                                                                    'open'}`
                                                    }></div>
                                                    <div className='status-text'>
                                                        {row.status}
                                                    </div>
                                                    <div className='open-more-info'>
                                                        <Button className='open-more-info-btn' onClick={(event) => openMoreInfoAboutManifest(event, row)} aria-controls="theme-paragraph" aria-expanded={row.open}>
                                                            <RiArrowDownSLine size={20}/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className='status-new-bottom-context'>
                                            <td className='title-status'>
                                                Status
                                            </td>
                                            <td colSpan={1} className='new-status-context'>
                                                <div className='status-context'>
                                                    <div className={`status-context-color
                                                        ${row.status.toLowerCase() == 'concluido' ?
                                                            'concluded' :
                                                                row.status.toLowerCase() == 'em andamento' ?
                                                                    'in-progress' :
                                                                    'open'}`
                                                    }></div>
                                                    <div className='status-text'>
                                                        {row.status}
                                                    </div>
                                                    <div className='open-more-info'>
                                                        <Button className='open-more-info-btn' onClick={(event) => openMoreInfoAboutManifest(event, row)} aria-controls="theme-paragraph" aria-expanded={row.open}>
                                                            <RiArrowDownSLine size={20}/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className='tr-table-context'>
                                            <td colSpan={2} className='table-context-td'>
                                                <Collapse in={row.open}>
                                                    <div className="theme-paragraph">
                                                        <table className='analize-table-content'>
                                                            <tbody>
                                                                <tr className='wait-analize-response'>
                                                                    <td className='wait-analize'>
                                                                        <div className='info'>
                                                                            <div className='text'>AGUARDANDO ANÁLISE</div>
                                                                            <div className='period'>00/00/0000 ÁS 16H01</div>
                                                                        </div>
                                                                    </td>
                                                                    <td className='wait-analize-status-advice'>
                                                                        <div className='text'>
                                                                            SOLICITAÇÃO EM ANÁLISE PELO SETOR RESPONSAVEL
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr className='analize-response'>
                                                                    <td className='response'>
                                                                        <div className='info'>
                                                                            <div className='text'>RESPOSTA</div>
                                                                            <div className='period'>05/00/0000 ÁS 13H00</div>
                                                                        </div>
                                                                    </td>
                                                                    <td className='ombudsman-response'>RESPOSTA DA OUVIDORIA Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean orci orci, tristique vitae dapibus non, dapibus in erat. Fusce commodo est nec malesuada hendrerit. Etiam mauris urna, rhoncus et neque ac, venenatis convallis erat. Donec sit amet diam fringilla, tempor quam eu, vulputate mauris. Aliquam et rutrum dui. Integer et nunc sit amet erat fringilla aliquet. Sed condimentum condimentum tempor. Nunc viverra, magna ac iaculis pulvinar, nisi tortor accumsan nisl, non tempus erat ipsum nec est. Ut fringilla bibendum diam quis rutrum. Phasellus non rutrum sem, ut sagittis sapien. Quisque quis aliquam urna, id semper arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <div className='service'>
                                                            <div className='service-title'>Avaliação do atendimento</div>
                                                            <div className='service-context'>
                                                                <div className='service-questions'>
                                                                    <div className='question-context first-question'>
                                                                        <div className='question'>
                                                                            A sua manifestação foi atendida?
                                                                        </div>
                                                                        <div className='response'>
                                                                            <div>
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="SIM"
                                                                                    name="response-1"
                                                                                    type={'radio'}
                                                                                    className='yes'
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="NÃO"
                                                                                    name="response-1"
                                                                                    type={'radio'}
                                                                                    className='no'
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="PARCIALMENTE"
                                                                                    name="response-1"
                                                                                    type={'radio'}
                                                                                    className='partially'
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='question-context second-question'>
                                                                        <div className='question'>
                                                                            A resposta fornecida foi fácil de compreender?
                                                                        </div>
                                                                        <div className="response">
                                                                            <div>
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="MUITO FÁCIL"
                                                                                    name="response-2"
                                                                                    type={'radio'}
                                                                                    className='partially'
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="FÁCIL"
                                                                                    name="response-2"
                                                                                    type={'radio'}
                                                                                    className='partially'
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="REGULAR"
                                                                                    name="response-2"
                                                                                    type={'radio'}
                                                                                    className='partially'
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="DIFÍCIL"
                                                                                    name="response-2"
                                                                                    type={'radio'}
                                                                                    className='partially'
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="MUITO DIFÍCIL"
                                                                                    name="response-2"
                                                                                    type={'radio'}
                                                                                    className='partially'
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='question-context third-question'>
                                                                        <div className="question">
                                                                            Você está satisfeito(a) com o atendimento prestado?
                                                                        </div>
                                                                        <div className="response">
                                                                            <div>
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="MUITO INSATISFEITO"
                                                                                    name="response-3"
                                                                                    type={'radio'}
                                                                                    className='partially'
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="INSATISFEITO"
                                                                                    name="response-3"
                                                                                    type={'radio'}
                                                                                    className='partially'
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="REGULAR"
                                                                                    name="response-3"
                                                                                    type={'radio'}
                                                                                    className='partially'
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="SATISFEITO"
                                                                                    name="response-3"
                                                                                    type={'radio'}
                                                                                    className='partially'
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="PARCIALMENTE"
                                                                                    name="response-3"
                                                                                    type={'radio'}
                                                                                    className='partially'
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='send-assessment'>
                                                                    <button className='send-assessment-btn'>Enviar avaliação</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Collapse>
                                            </td>
                                            <td className='td-status-color'>
                                                <div className='status'>
                                                    <div className={`left-color-status
                                                        ${row.status.toLowerCase() == 'concluido' ?
                                                            'concluded' :
                                                                row.status.toLowerCase() == 'em andamento' ?
                                                                    'in-progress' :
                                                                    'open'}`
                                                    }></div>
                                                    <div className='status-text' style={{opacity: 0}}>
                                                        {row.status}
                                                    </div>
                                                    <div className='right-color-status'>
                                                        <Button className='open-more-info-btn' onClick={(event) => openMoreInfoAboutManifest(event, row)} aria-controls="theme-paragraph" aria-expanded={row.open}></Button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )
                            }
                            {emptyRows > 0 && (
                                <tr style={{ height: 34 * emptyRows }}>
                                <td colSpan={3} />
                                </tr>
                            )}    
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className='pagination-info'>
                                    Exibindo <b>{rowsPerPage}</b> de <b>{teste.length}</b> | Página {page}
                                </td>
                                {/* {page} */}
                                <TablePagination
                                    rowsPerPageOptions={[3, 6, 12, { label: "Todos", value: -1 }]}
                                    colSpan={3}
                                    count={teste.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    slotProps={{
                                        select: {
                                        "aria-label": "rows per page"
                                        },
                                        actions: {
                                        showFirstButton: false,
                                        showLastButton: false
                                        }
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}
