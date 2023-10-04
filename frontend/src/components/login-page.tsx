import Card from './primitives/card'
import { Link } from 'react-router-dom'
import LoginForm from './forms/login-form'


export default function LoginPage() {
    return (
        <div className='absolute bg-background w-screen min-h-screen py-10 flex justify-center items-center text-sm select-none'>
            <div className='w-fit flex items-center gap-32'>
                <img src='login.svg' alt='Criar uma conta' className='h-[550px]' />
                <Card className='min-w-[420px] flex flex-col items-center gap-10 px-10 py-12'>
                    <div className='flex flex-col items-center gap-1'>
                        <span className='text-xl font-bold'>Bem-vindo!</span>
                        <span className='text-card-foreground/60'>Faça login para continuar.</span>
                    </div>
                    <LoginForm />
                    <div className='flex flex-col items-center'>
                        <span>Ainda não possui uma conta?</span>
                        <Link to='/signup' className='text-primary font-semibold'>Crie uma agora</Link>
                    </div>
                </Card>
            </div>
        </div>
    )
}