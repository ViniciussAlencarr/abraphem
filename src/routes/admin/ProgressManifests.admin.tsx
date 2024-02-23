import { useEffect, useState } from 'react';
import { ManifestRequest } from '../../types/Manifest';
import TablePagination from '@mui/base/TablePagination';

import api from '../../services/api';

import '../css/admin/ProgressManifests.admin.css'

import { SeeProgressManifestComponent } from '../../components/admin/SeeProgressManifest.admin'
import { GetUserName } from '../../components/admin/GetUserName.admin'

import { ToastContainer } from 'react-toastify';

export const ProgressManifests = () => {
    
    const [request, setRequest] = useState<ManifestRequest[]>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const [open, setOpen] = useState(false);
    const [manifest, setManifest] = useState({
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
        files: '',
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
    });
    
    useEffect(() => {
        getInProgressManifests()
    }, [])

    const getInProgressManifests = async () => {
        try {
            const { data } = await api.get('manifests?status=inProgress', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('adm_bearer_token')
                }
            })
            setRequest(data)
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
    
    return (
        <div className="in-progress-manifests-admin">
            <div className="title">Manifestações em andamento</div>
            {
                !open ? 
                <div style={{ overflow: 'auto' }}>
                    <table className='in-progress-manifests-table'>
                        <thead className='thead-table'>
                            <tr className='table-titles'>
                                <th>Protocolo</th>
                                <th>Nome do usuário</th>
                                <th>Tipo de manifestação</th>
                                <th>Ultima atualização</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                request.length != 0 ?
                                    (request.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)).map((manifest, index) => {
                                        return <tr key={index} className='table-content'>
                                        <td>{manifest.protocol.value}</td>
                                        <td><GetUserName userId={manifest.userId}/></td>
                                        <td>{manifest.manifestType}</td>
                                        <td>{manifest.lastUpdate}</td>
                                        <td><button className='see-more-info-btn' onClick={() => {setOpen(!open); setManifest(manifest)}}>Ver mais</button></td>
                                    </tr>
                                    })
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
                        <tfoot className='footer-table'>
                            <tr>
                                <td className='pagination-info'>
                                    Exibindo <b>{rowsPerPage}</b> de <b>{request.length}</b> | Página {page}
                                </td>
                                <TablePagination
                                    rowsPerPageOptions={[3, 6, 12, { label: "Todos", value: -1 }]}
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
                : <SeeProgressManifestComponent getInProgressManifests={getInProgressManifests} manifest={manifest} open={open} setOpen={setOpen}/>
            }
            <ToastContainer />
        </div>
    )
}