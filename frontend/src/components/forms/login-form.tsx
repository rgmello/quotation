import Input from '../primitives/input'
import { twMerge } from 'tailwind-merge'
import { login, register } from '../../utils/auth'
import Button from '../primitives/button'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/auth-store'
import LoadingSpinner from '../primitives/loading'
import React, { useEffect, useState } from 'react'


interface LoginFormProps {
    action?: 'login' | 'signup'
    className?: string
}

export default function LoginForm({ action = 'login', className }: LoginFormProps) {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

    useEffect(() => {
        isLoggedIn() && navigate('/')
    }, [isLoggedIn, navigate])

    function resetForm() {
        setFirstName('')
        setLastName('')
        setUsername('')
        setEmail('')
        setPassword('')
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setIsLoading(true)
        setErrorMessage(null)

        const { error } = (action === 'login')
            ? await login(username, password)
            : await register(firstName, lastName, username, email, password)

        if (error)
            setErrorMessage(error)
        else {
            navigate('/')
            resetForm()
        }

        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className={twMerge('w-full flex flex-col gap-6', className)}>
            <div className='flex flex-col gap-4'>
                {action === 'signup' && <>
                    <Input
                        type='text'
                        name='firstName'
                        placeholder='Nome'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <Input
                        type='text'
                        name='lastName'
                        placeholder='Sobrenome'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <Input
                        type='text'
                        name='email'
                        placeholder='E-mail'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </>}
                <Input
                    type='text'
                    name='username'
                    placeholder='Usuário'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <Input
                    type='password'
                    name='password'
                    placeholder='Senha'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
            </div>
            {errorMessage &&
                <div className='w-full border rounded px-3 py-2 border-destructive text-destructive'>
                    <p>{errorMessage}</p>
                </div>
            }
            <Button type='submit' disabled={isLoading}>{isLoading ? <LoadingSpinner /> : action === 'login' ? 'Entrar' : 'Criar Conta'}</Button>
        </form>
    )
}