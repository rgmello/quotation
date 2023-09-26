import { NavLink } from 'react-router-dom'

const links = [
    { label: 'Ações', href: '/assets' },
]

export default function Header() {
    return (
        <header className='sticky top-0 w-screen bg-card/40 border z-10'>
            <div className='absolute inset-0 backdrop-blur' />
            <div className='mx-auto h-16 flex max-w-7xl items-center px-6 lg:px-8 gap-4'>
                <Nav />
            </div>
        </header>
    )
}

function Nav() {
    return (
        <nav className='relative h-full flex gap-x-2'>
            {links.map((link, index) => (
                <NavLink
                    to={link.href}
                    className={({ isActive }) => `h-full pt-2 border-b-3 ${isActive ? 'text-foreground border-primary' : 'text-foreground/[.6] border-transparent'} hover:text-foreground transition-all duration-400 ease-out flex items-center px-4 pb-1 text-sm font-normal tracking-wide subpixel-antialiased`}
                    key={index}
                >
                    {link.label}
                </NavLink>
            ))}
        </nav>
    )
}