import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

export default function Input({ className, ...props }: InputProps) {
    const baseClasses = 'w-full border border-input rounded-md py-2 px-3 transition duration-300 ease-in-out focus:outline-none'

    return (
        <input
            {...props}
            autoComplete='new-password'
            className={`${baseClasses} ${className}`}
        />
    )
}