import { setUser } from '../../utils/auth'
import { ReactNode, useEffect, useState } from 'react'
import Sidebar from '../navigation/sidebar'


export default function MainWrapper({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handler = async () => {
            setLoading(true)
            await setUser()
            setLoading(false)
        }
        handler()
    }, [])

    return (
        <>{loading ? null
            : <div className='flex'>
                <Sidebar />
                {children}
            </div>
        }</>
    )
}