import { twMerge } from 'tailwind-merge'
import Button from '../primitives/button'
import { useTheme } from '../../providers/theme-provider'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'


interface ThemeToggleProps {
    isOpen?: boolean
    className?: string
}


export default function ThemeToggle({ isOpen, className }: ThemeToggleProps) {
    const { isThemeDark, toggleTheme } = useTheme()
    const iconClass = 'w-5 stroke-2'

    return (
        <Button
            variant='secondary'
            onClick={toggleTheme}
            className={twMerge(`${isOpen ? 'justify-start' : ''} font-normal gap-3 border border-transparent hover:border-border`, className)}
        >
            {isThemeDark ? <MoonIcon className={iconClass} /> : <SunIcon className={iconClass} />}
            {isOpen && 'Trocar o tema'}
        </Button>
    )
}