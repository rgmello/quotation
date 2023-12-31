import { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    className?: string
    step?: number
}

export default function Input({ className, label, step, ...props }: InputProps) {
    const baseClasses = 'w-full bg-transparent border border-input rounded-md py-2 px-3 focus:outline-none focus:border-primary placeholder:text-card-foreground/50 text-sm'

    return (
        <div className='w-full flex flex-col gap-1'>
            {label && <label className='block text-sm font-medium text-card-foreground/80 ml-[1px]'>{label}</label>}
            <input
                {...props}
                value={props.value !== 0 ? props.value : ''}
                autoComplete='new-password'
                className={twMerge(baseClasses, className)}
                step={step ? step : props.type === 'number' ? 0.01 : undefined}
            />
        </div>
    )
}