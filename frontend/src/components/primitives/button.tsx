import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'outline' | 'secondary'
    className?: string
}

export default function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
    const baseClasses = 'w-full h-10 font-medium text-sm rounded-lg px-3 py-2 flex gap-2 items-center justify-center focus:outline-none'

    let variantClasses = ''
    switch (variant) {
        case 'outline':
            variantClasses = `border border-primary text-primary ${props.disabled ? '' : 'hover:bg-primary/10'}`
            break
        case 'secondary':
            variantClasses = `text-card-foreground ${props.disabled ? '' : 'hover:bg-muted hover:border-border'}`
            break
        default:
            variantClasses = `bg-primary text-primary-foreground ${props.disabled ? '' : 'hover:bg-primary/80'}`
            break
    }

    return (
        <button
            {...props}
            className={twMerge(baseClasses, variantClasses, className)}
        >
            {children}
        </button>
    )
}