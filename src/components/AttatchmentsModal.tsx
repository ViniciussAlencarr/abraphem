import { useEffect } from "react"
import { Modal, Table } from "react-bootstrap"
import api from "../services/api";

import { MdOutlineFileDownload } from "react-icons/md";

import { AttachmentFileInterface } from "types/Manifest"

import './css/attachmentModal.css'

interface ParamsInterface {
    files: AttachmentFileInterface[],
    show: boolean,
    handleShow: () => any,
    handleClose: () => any
}

export const AttachmentsModal = (params: ParamsInterface) => {

    useEffect(() => {
    }, [])

    const downloadAttachment = async (key: string) => {
        const { data } = await api.post(`getSignedUrl`, { key }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('bearer_token')
            }
        })
        const a = document.createElement('a')
        a.href = data.url
        a.download = data.url.split('/').pop()
        a.click()
    }

    return (
        <Modal
        size="lg"

            show={params.show}
            onHide={params.handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Anexos do arquivo</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ margin: 20}}>
                <div className="size-files">
                    <div>{params.files.length}</div>
                    <div>Arquivo(s)</div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome do arquivo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {params.files.map(({ ETag, key }) => <tr>
                            <td>{ETag.replaceAll('"', "")}</td>
                            <td>{key}</td>
                            <td>
                                <button className="download-btn" onClick={() => downloadAttachment(key)}>
                                    <MdOutlineFileDownload className="download-icon" size={30} />    
                                </button>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <button  className='close-btn'  onClick={params.handleClose}>
                    Fechar
                </button>
            </Modal.Footer>
        </Modal>
    )
}