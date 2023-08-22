import { useState, useEffect } from "react";

import api from "../../services/api";

export const GetUserName = (params: { userId: string }) => {
    const [userName, setUserName] = useState('')

    useEffect(() => {
        getClientName()
    }, [userName])

    const getClientName = () => {
        try {
            const getUserById = async () => {
                const { data } = await api.get(`user/${params.userId}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('adm_bearer_token')
                    }
                })
                setUserName(data.username)
            }
            getUserById()
        } catch (err) {
            console.log(err)
        }
    }
    return <>{userName}</>
}