import { useRouteError } from 'react-router-dom'
import Header from './components/header'

export default function ErrorPage() {
    const error = useRouteError()
    console.error(error)

    return (
        <>
            <Header />
            <div className='absolute -mt-16 w-full top-1/2 flex flex-col gap-2 justify-center items-center'>
                <h1 className='text-2xl font-bold'>Ops!</h1>
                <p>Página não encontrada</p>
            </div>
        </>
    )
}
