import { VscThreeBars } from 'react-icons/vsc'
import { IoIosArrowForward } from 'react-icons/io'
import { useEffect, useState } from 'react'
import { MenuOptions } from '../../components/MenuOptions'
import TablePagination from '@mui/base/TablePagination';

import api from '../../services/api';

import { ManifestRequest } from '../../types/Manifest'

import { ManifestDetails } from '../../components/ManifestDetails'

import arrowUpIcon from '../../assets/arrow-up.svg'

import '../css/Manifests.css'
import '../css/media-layout.css'

export const Manifests = () => {/* TODO: inserir tipo correto */
    const [request, setRequest] = useState<ManifestRequest[]>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [open, setOpen] = useState(false);
    const [manifestDetailsModalState, setManifestDetailsModalState] = useState(false);
    const [manifest, setManifest] = useState<ManifestRequest>({
        id: '',
        title: '',
        description: '',
        manifestType: '',
        whoIsOpenManifest: '',
        entryChannel: '',
        patientFullName: '',
        cpf: '',
        dateBirth: '',
        state: '',
        city: '',
        gender: '',
        race: '',
        email: '',
        phoneType: '',
        phoneNumber: '',
        ownerName: '',
        typeCoagulopathy: '',
        severityCoagulopathy: '',
        locationTreatment: '',
        disabledPerson: '',
        typeOfDisability: '',
        manifestValue: '',
        manifestStatus: '',
        lastUpdate: '',
        userId: '',
        protocol: {
            value: 0,
            period: ''
        },
        response: {
            title: '',
            period: '',
            state: '',
            value: '',
            answeredAt: '',
            answeredBy: ''
        }
    })

    useEffect(() => {
        getManifests()
    }, [])

    const getManifests = async () => {
        try {
            let userId = localStorage.getItem('user_id')
            const { data } = await api.get(`manifests/${userId}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('bearer_token')
                }
            })
            setRequest(data);
        } catch (err) {
            console.log(err)
        }
    }
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        console.log(event)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - request.length) : 0;
    
    const getStatusColor = (manifest: { manifestStatus: string }) => {
        switch(manifest.manifestStatus.toLowerCase()) {
            case 'concluído':
                return 'concluded'
            case 'em andamento':
                return 'in-progress'
            case 'em aberto':
                return 'open'
        }
    }

    return (
        <div className='requests-container'>
            {
                !manifestDetailsModalState ? <>
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
                        <div className='manifest-table-container'>
                            <table className='manifest-table'>
                                <thead className='table-thead'>
                                    <tr className='table-titles'>
                                        <th className='protocol'>Protocolo</th>
                                        <th className='status'>Status</th>
                                        <th>Tipo de manifestação</th>
                                        <th>Última atualização</th>
                                    </tr>
                                </thead>
                                <tbody className='table-tbody'>
                                    {
                                        request.length != 0 ? 
                                            (request.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)).map((manifest, index) =>{
                                                return <tr key={index} className='table-tr-content'>
                                                    <td style={{ display: 'flex', justifyContent: 'left', gap: '10px'}}>
                                                        <input type="checkbox" name="" id={manifest.id} />
                                                        <label htmlFor={manifest.id}>{manifest.protocol.value}</label>
                                                    </td>
                                                    <td className='status'>
                                                        <div className={`status-color ${getStatusColor(manifest)}`}>
                                                            {manifest.manifestStatus}
                                                        </div>
                                                    </td>
                                                    <td>{manifest.manifestType}</td>
                                                    <td>{manifest.lastUpdate}</td>
                                                    <td>
                                                        <button className='see-more-details-btn' onClick={() => {
                                                            setManifestDetailsModalState(!manifestDetailsModalState);
                                                            setManifest(manifest)
                                                        }}>Ver mais</button>
                                                    </td>
                                                </tr>
                                            }
                                            )
                                        : <tr className='table-content'>
                                        <td colSpan={4}>Nenhuma manifestação encontrada</td>
                                    </tr>
                                    }
                                    {emptyRows > 0 && (
                                        <tr style={{ height: 34 * emptyRows }}>
                                        <td colSpan={3} />
                                        </tr>
                                    )}    
                                </tbody>
                                <tfoot className='table-footer'>
                                    <tr>
                                        <td className='pagination-info'>
                                            Exibindo <b>{rowsPerPage}</b> de <b>{request.length}</b> | Página {page}
                                        </td>
                                        <TablePagination
                                            rowsPerPageOptions={[request.length, { label: "Todos", value: request.length }]}
                                            colSpan={3}
                                            count={request.length}
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
                </>
                : <ManifestDetails
                    manifest={manifest}
                    open={manifestDetailsModalState}
                    setOpen={setManifestDetailsModalState}
                />
            }
            <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='back-to-top'>
                <span>Voltar ao topo</span>
                <img className='logo' src={arrowUpIcon} />
            </div>
        </div>
    )
}
