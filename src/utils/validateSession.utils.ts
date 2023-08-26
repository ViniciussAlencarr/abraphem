
import { NavigateFunction } from 'react-router-dom';
import api from '../services/api';

export const validateUserSession = (navigate: NavigateFunction, setIsLoggedIn: any) => {
    try {
        const validate = async () => {
            try {
                const token = localStorage.getItem('bearer_token');
                if (token) {
                    await api.post('health', { token })
                    setIsLoggedIn(true)
                } else setIsLoggedIn(false)
            } catch (err) {
                setIsLoggedIn(false)
                localStorage.removeItem('user_id');
                localStorage.removeItem('bearer_token');
                navigate('/login?sessionExpired=true')
            }
        }
        /* let intervalContext = setInterval(() => validate(intervalContext), 5000) */
        validate()
    } catch (err) {
        navigate('/login')
        console.log(err)
    }
}


export const validateAdmSession = (navigate: NavigateFunction) => {
    try {
        const validate = async () => {
            try {
                const token = localStorage.getItem('adm_bearer_token');
                if (token) await api.post('health', { token })
            } catch (err) {
                navigate('/administrador/login?sessionExpired=true')
                localStorage.removeItem('adm_user_id');
                localStorage.removeItem('adm_bearer_token');
            }
        }
        /* let intervalContext = setInterval(() => validate(intervalContext), 5000) */
        validate()
    } catch (err) {
        navigate('/administrador/login')
        console.log(err)
    }
}
