import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Button from '../primitives/button'


interface PaginationBarProps {
    hasPrevious: boolean
    hasNext: boolean
    onPreviousClick: () => void
    onNextClick: () => void
}


interface PaginationButtonProps {
    variant: 'previous' | 'next'
    onClick: () => void
}


export default function PaginationBar({ hasPrevious, hasNext, onPreviousClick, onNextClick}: PaginationBarProps) {
    return (
        <div className={`relative ${(hasPrevious || hasNext) ? 'mb-8' : ''} w-full h-fit flex gap-6`}>
            {hasPrevious && <PaginationButton variant='previous' onClick={onPreviousClick} />}
            {hasNext && <PaginationButton variant='next' onClick={onNextClick} />}
        </div>
    )
}


export function PaginationButton({ variant, onClick }: PaginationButtonProps) {
    const iconClass = 'w-4 h-auto'

    return (
        <Button onClick={onClick} className={`absolute flex justify-center items-center gap-2 ${variant === 'next' ? 'right-0' : 'left-0'} w-28 shadow`}>
            {variant === 'previous' && <><ChevronLeftIcon className={iconClass} /> Anterior</>}
            {variant === 'next' && <>Próximo <ChevronRightIcon className={iconClass} /></>}
        </Button>
    )
}