import React, { useEffect, useRef } from 'react'

interface ModalProps {
    onClose: () => void
    children: React.ReactNode
    className?: string
}

export default function Modal({ onClose, className, children }: ModalProps) {
    const modalRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])

    return (
        <div className='fixed inset-0 bg-background/5 backdrop-blur-lg flex items-center justify-center z-20'>
            <div className='modal' ref={modalRef}>
                <div className={`w-[500px] bg-background border shadow-lg p-8 rounded-lg flex flex-col gap-2 ${className}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}