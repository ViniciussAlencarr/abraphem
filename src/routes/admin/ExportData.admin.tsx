import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import '../css/admin/ExportData.admin.css'

import { validateAdmSession } from '../../utils/validateSession.utils'

export const ExportData = () => {
    const navigate = useNavigate()

    useEffect(() => {
        validateAdmSession(navigate)
    }, [])
    
    return (
        <div className="export-data">

        </div>
    )
}