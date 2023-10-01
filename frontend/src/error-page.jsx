import { useRouteError } from 'react-router-dom'
import Sidebar from './components/navigation/sidebar'

export default function ErrorPage() {
    const error = useRouteError()
    console.error(error)

    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full h-screen flex flex-col gap-1 -mt-6 justify-center items-center'>
                <h1 className='text-2xl font-bold'>Ops!</h1>
                <p>Página não encontrada</p>
            </div>
        </div>
    )
}
