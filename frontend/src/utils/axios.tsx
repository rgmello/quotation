import axios from 'axios'
import Cookies from 'js-cookie'
import { getRefreshToken, isAccessTokenExpired, setAuthUser } from './auth'


export default function getAxios() {
    const accessToken = Cookies.get('access_token')

    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    })

    axiosInstance.interceptors.request.use(async (req) => {
        if (accessToken && !isAccessTokenExpired(accessToken)) return req
        const response = await getRefreshToken()
        setAuthUser(response.access, response.refresh)
        req.headers.Authorization = `Bearer ${response.access}`
        return req
    })

    return axiosInstance
}