import { ArrowPathIcon } from '@heroicons/react/24/outline'


export default function LoadingSpinner({ type='default' }: { type?: 'default' | 'concise' }) {
    return (
        <div className='w-full h-full flex items-center justify-center gap-2'>
            <ArrowPathIcon className='w-4 stroke-2 animate-spin' />
            {type === 'default' ? 'Processando...' : ' '}
        </div>
    )
}