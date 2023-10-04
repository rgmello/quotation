import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import axios, { AxiosInstance } from 'axios'
import useAuthStore from '../store/auth-store'

const api: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

export interface LoginData {
    data: {
        access: string
        refresh: string
    } | null
    error: string | null
}

export interface RegisterData {
    data: {
        username: string
        email: string
    } | null
    error: string | null
}

type tokenPayload = {
    token_type: string,
    exp: number,
    iat: number,
    jti: string,
    user_id: number,
    first_name: string,
    last_name: string,
    username: string,
    email: string
}

export async function login(username: string, password: string): Promise<LoginData> {
    try {
        const { data, status } = await api.post('auth/token/', { username, password })
        status === 200 && setAuthUser(data.access, data.refresh)
        return { data, error: null }
    } catch (error) {
        console.log('Erro no login:', error)
        return {
            data: null,
            error: 'Usuário ou senha inválidos.'
        }
    }
}

export async function register(firstName: string, lastName: string, username: string, email:string, password: string): Promise<RegisterData> {
    try {
        const { data } = await api.post('auth/register/', { first_name: firstName, last_name: lastName, username, email, password })
        await login(username, password)
        return { data, error: null }
    } catch (error) {
        console.log('Erro no SignUp:', error)
        return {
            data: null,
            error: 'Esse usuário já existe.'
        }
    }
}

export function logout() {
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    useAuthStore.getState().setUser(null)
}

export async function setUser() {
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')
    if (!accessToken || !refreshToken) return
    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken()
        setAuthUser(response.access, response.refresh)
    } else {
        setAuthUser(accessToken, refreshToken)
    }
}

export function setAuthUser(access_token: string, refresh_token: string) {
    Cookies.set('access_token', access_token, { expires: 1, secure: true })
    Cookies.set('refresh_token', refresh_token, { expires: 7, secure: true })

    const { user_id, first_name, last_name, username, email } = jwt_decode<tokenPayload>(access_token) ?? null
    useAuthStore.getState().setUser({ id: user_id, firstName: first_name, lastName: last_name, username, email})
    useAuthStore.getState().setLoading(false)
}

export async function getRefreshToken(): Promise<{ access: string, refresh: string }> {
    const response = await api.post('auth/token/refresh/', { refresh: Cookies.get('refresh_token') })
    return response.data
}

export function isAccessTokenExpired(accessToken: string): boolean {
    try {
        const decodedToken = jwt_decode<tokenPayload>(accessToken)
        return !decodedToken.exp || decodedToken.exp < Date.now() / 1000
    } catch (error) {
        return true
    }
}