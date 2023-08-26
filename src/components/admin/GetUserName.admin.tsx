import { useState, useEffect } from "react";

import api from "../../services/api";
import { ColorRing } from "react-loader-spinner";

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
    return <>
    {
        userName == '' ?
        <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#d15d5d', '#d15d5d', '#d15d5d', '#d15d5d', '#d15d5d']}
            />
        : <>{userName}</>
    }
    </>
}