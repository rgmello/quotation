import { useEffect } from 'react'
import { logout } from '../utils/auth'
import { Navigate } from 'react-router-dom'


export default function LogoutPage() {
    useEffect(() => {
        logout()
    }, [])

    return <Navigate to='/' />
}