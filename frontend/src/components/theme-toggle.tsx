import { useTheme } from '../providers/theme-provider'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import Button from './primitives/button'


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
            className={`${isOpen ? 'justify-start' : ''} gap-3 border border-transparent hover:border-border`}
        >
            {isThemeDark ? <MoonIcon className={iconClass} /> : <SunIcon className={iconClass} />}
            {isOpen && 'Trocar o tema'}
        </Button>
    )
}