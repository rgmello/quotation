import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from '../../store/auth-store'


export default function PrivateRoute({ children }: { children: ReactNode }) {
    const loggedIn = useAuthStore((state) => state.isLoggedIn)()
    return loggedIn ? <>{children}</> : <Navigate to='/login' />
}