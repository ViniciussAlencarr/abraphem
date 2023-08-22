import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TablePagination from '@mui/base/TablePagination';

import api from '../../services/api'

import { User } from '../../types/User'

import '../css/admin/RegisteredUsers.admin.css'

import { validateAdmSession } from '../../utils/validateSession.utils'

import { SeeDetailsOfUser } from '../../components/admin/SeeDetailsOfUser.admin'

export const RegisteredUsers = () => {
    const navigate = useNavigate()
    const [request, setRequest] = useState<User[]>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<User>({
        id: "",
        document: "",
        typeDocument: "",
        username: "",
        fullName: "",
        dateOfBirth: "",
        state: "",
        city: "",
        gender: "",
        race: "",
        category: "",
        typeOfPhone: "",
        phoneNumber: "",
        ownerName: "",
        typeOfCoagulopathy: "",
        severityOfCoagulopathy: "",
        callCenterLocation: "",
        password: "",
        pcd: false,
        typeOfDisability: "",
        email: "",
        roleUser: "",
        profilePictureURL: ""
    })

    useEffect(() => {
        validateAdmSession(navigate)
        let interval = setInterval(() => {
            getUsers(interval)
        }, 5000)
        getUsers(interval)
    }, [])

    const getUsers = async (interval: any) => {
        try {
            const { data } = await api.get('users?role=2', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('adm_bearer_token')
                }
            })
            setRequest(data)
        } catch (err) {
            if (interval) clearInterval(interval)
            console.log(err)
        }
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - request.length) : 0;

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
    return (
        <div className="registered-users-admin">
            {
                !open ? <>
                    <div className="title">Usuários Cadastrados</div>
                    <table className='registered-users-table'>
                        <thead className='thead-table'>
                            <tr className='table-titles'>
                                <th className='cpf'>Cpf</th>
                                <th>Nome</th>
                                <th>Sexo</th>
                                <th>Estado</th>
                                <th>Cidade</th>
                                <th>Tipo de solicitante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                request.length != 0 ?
                                    (request.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)).map((user, index) => {
                                        /* getClientName(manifest.userId) */
                                        return <tr key={index} className='table-content'>
                                            <td style={{ display: 'flex', justifyContent: 'left', gap: '10px'}}>
                                                <input type="checkbox" name="" id={user.id} />
                                                <label htmlFor={user.id}>{user.document}</label>
                                            </td>
                                            <td>{user.username}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.state}</td>
                                            <td>{user.city}</td>
                                            <td>{user.category}</td>
                                            <td><button className='analize-btn'
                                                onClick={() => {setOpen(!open); setUser(user)}}>
                                                    Ver mais informações
                                                </button>
                                            </td>
                                        </tr>
                                    })
                                : <tr className='table-content empty-value'>
                                    <td colSpan={6}>Nenhum usuário encontrado</td>
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
                                    colSpan={6}
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
                </>
                : <SeeDetailsOfUser user={user} setOpen={setOpen} open={open} />
            }
        </div>
    )
}