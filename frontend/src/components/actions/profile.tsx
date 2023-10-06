import { twMerge } from 'tailwind-merge'
import Button from '../primitives/button'
import useAuthStore from '../../store/auth-store'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'


interface ProfileProps {
    isOpen?: boolean
    className?: string
}


interface LogoutButtonProps {
    isOpen?: boolean
    className?: string
}


export default function Profile({ isOpen, className }: ProfileProps) {
    const [user, setUser] = useState(useAuthStore.getState().user())

    useEffect(() => {
        const unsubscribe = useAuthStore.subscribe(
            (newUser) => setUser(newUser.user())
        )
        return () => { unsubscribe() }
    }, [])

    return (
        <div className={twMerge('py-4 mb-1 flex items-center justify-between', className)}>
            {isOpen &&
                <div className='flex flex-col'>
                    <span className='pl-2'>{user.firstName} {user.lastName}</span>
                    <span className='pl-2 text-card-foreground/60'>{user.email}</span>
                </div>
            }
            <LogoutButton isOpen={isOpen} />
        </div>
    )
}


export function LogoutButton({ isOpen, className }: LogoutButtonProps) {
    const iconClass = 'w-5 stroke-2'

    return (
        <Link to='/logout'>
            <Button
                variant='secondary'
                className={twMerge(`${isOpen ? 'justify-start' : ''} w-fit font-normal gap-3 border border-transparent hover:border-border`, className)}
            >
                <ArrowRightOnRectangleIcon className={iconClass} />
            </Button>
        </Link>
    )
}