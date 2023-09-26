import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'secondary'
    className?: string
}

export default function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
    const baseClasses = 'w-full font-medium rounded-lg px-3 py-2 transition duration-300 ease-in-out focus:outline-none'

    let variantClasses = ''
    switch (variant) {
        case 'secondary':
            variantClasses = 'border border-primary hover:bg-secondary text-primary'
            break
        default:
            variantClasses = 'bg-primary hover:bg-primary/80 text-primary-foreground'
            break
    }

    return (
        <button
            {...props}
            className={`${baseClasses} ${variantClasses} ${className}`}
        >
            {children}
        </button>
    )
}