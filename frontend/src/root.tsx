import { Outlet } from 'react-router-dom'
import Sidebar from './components/navigation/sidebar'

export default function Root() {
    return (
        <div className='flex'>
            <Sidebar />
            <Outlet />
        </div>
    )
}