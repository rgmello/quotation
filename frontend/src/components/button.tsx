import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
    className?: string
}

export default function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
    const baseClasses = 'w-full font-medium rounded-lg px-3 py-2 transition duration-300 ease-in-out focus:outline-none'

    let variantClasses = ''
    switch (variant) {
        case 'outline':
            variantClasses = 'bg-transparent border hover:bg-foreground/10 text-foreground'
            break
        case 'secondary':
            variantClasses = 'bg-secondary/80 hover:bg-secondary text-secondary-foreground'
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