import { useState } from 'react'
import Button from '../primitives/button'
import { NavLink } from 'react-router-dom'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import ThemeToggle from '../actions/theme-toggle'
import Profile from '../actions/profile'


export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => setIsOpen(!isOpen)

    return (
        <header className={`${isOpen ? 'w-80 px-4' : 'w-fit px-2'} shrink-0 sticky inset-0 h-screen pt-8 pb-0 bg-card text-card-foreground border-r flex flex-col gap-16 justify-between divide-y dark:divide-y-2 divide-border select-none`}>
            <div className='flex flex-col divide-y dark:divide-y-2 divide-border'>
                <Logo isOpen={isOpen} />
                <NavTabs isOpen={isOpen} />
            </div>
            <div className='flex flex-col divide-y dark:divide-y-2 divide-border'>
                <ToggleTabs isOpen={isOpen} onToggle={toggleOpen} />
                <Profile isOpen={isOpen} />
            </div>
        </header>
    )
}


function Logo({ isOpen }: { isOpen: boolean }) {
    return (
        <div className={`w-full pb-8 flex items-center gap-2 ${isOpen ? 'justify-start px-2' : 'justify-center'}`}>
            <img src='/logo.png' alt='Monitor de Cotações' className='w-8' />
            {isOpen && <span className='text-base font-semibold'>Monitor de Cotações</span>}
        </div>
    )
}


function NavTabs({ isOpen }: { isOpen: boolean }) {
    return (
        <nav className='w-full flex flex-col items-center pt-6'>
            <NavLink
                to='/assets'
                className={({ isActive }) => `w-full h-10 py-4 rounded-lg flex items-center ${isOpen ? 'justify-start px-3' : 'justify-center px-2'} gap-3 text-card-foreground border ${isActive ? 'bg-muted border-border' : 'bg-transparent border-transparent'} hover:bg-muted hover:border-border transition-all duration-400 ease-out text-sm tracking-wide subpixel-antialiased`}
                end
            >
                <HomeIcon className='w-5 stroke-[1.5] text-card-foreground mb-[1px]' />
                {isOpen && 'Ações'}
            </NavLink>
        </nav>
    )
}


function ToggleTabs({ isOpen, onToggle }: { isOpen: boolean, onToggle: () => void }) {
    return (
        <div className='w-full flex flex-col items-center gap-2 py-4'>
            <ThemeToggle isOpen={isOpen} />
            <SidebarToggle isOpen={isOpen} onToggle={onToggle} />
        </div>
    )
}


function SidebarToggle({ isOpen, onToggle }: { isOpen: boolean, onToggle: () => void }) {
    return (
        <Button
            variant='secondary'
            onClick={onToggle}
            className={`${isOpen ? 'justify-start' : 'px-3'} font-normal gap-3 border border-transparent hover:border-border`}
        >
            <ChevronRightIcon className={`w-5 text-card-foreground stroke-2 transition ${isOpen && 'rotate-180'}`} />
            {isOpen && 'Recolher'}
        </Button>
    )
}