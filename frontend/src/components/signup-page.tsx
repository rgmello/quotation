import Card from './primitives/card'
import { Link } from 'react-router-dom'
import LoginForm from './forms/login-form'


export default function SignUpPage() {
    return (
        <div className='absolute bg-background w-screen min-h-screen py-10 flex justify-center items-center text-sm select-none'>
            <div className='w-fit flex items-center gap-32'>
                <Card className='min-w-[420px] flex flex-col items-center gap-10 px-10 py-12'>
                    <div className='flex flex-col items-center gap-1'>
                        <span className='text-xl font-bold'>Bem-vindo!</span>
                        <span className='text-card-foreground/60'>Registre-se para continuar.</span>
                    </div>
                    <LoginForm action='signup' />
                    <div className='flex flex-col items-center'>
                        <span>Já possui uma conta?</span>
                        <Link to='/login' className='text-primary font-semibold'>Faça login</Link>
                    </div>
                </Card>
                <img src='login.svg' alt='Criar uma conta' className='h-[550px]' />
            </div>
        </div>
    )
}