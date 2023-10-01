import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardProps {
    className?: string
    children: ReactNode
}

export default function Card({ className, children }: CardProps) {
    return (
        <div
            className={twMerge(
                'w-full bg-card text-card-foreground px-5 py-4 border rounded-lg shadow-xl flex flex-col gap-4 justify-stretch',
                className)
            }
        >
            {children}
        </div>
    )
}