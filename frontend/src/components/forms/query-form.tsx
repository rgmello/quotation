import React, { useState } from 'react'
import Input from '../primitives/input'
import { twMerge } from 'tailwind-merge'
import Button from '../primitives/button'
import { CycleQuery } from '../../utils/types'
import LoadingSpinner from '../primitives/loading'


interface AssetFormProps {
    onSubmit: (query: CycleQuery) => void
    isLoading?: boolean
    className?: string
}


export default function QueryForm({ onSubmit, isLoading, className }: AssetFormProps) {
    const initialQuery = { day: 0, month: 0, year: 0 }
    const [query, setQuery] = useState(initialQuery)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setQuery({ ...query, [name]: value })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        onSubmit(query)
    }

    return (
        <form onSubmit={handleSubmit} className={twMerge('w-full flex gap-4', className)}>
            <div className='w-2/3 flex gap-4'>
                <Input
                    type='number'
                    name='day'
                    placeholder='Dia'
                    value={query.day}
                    onChange={handleInputChange}
                    min={1}
                    max={31}
                    step={1}
                    disabled={isLoading}
                />
                <Input
                    type='number'
                    name='month'
                    placeholder='Mês'
                    value={query.month}
                    onChange={handleInputChange}
                    min={1}
                    max={12}
                    step={1}
                    disabled={isLoading}
                />
                <Input
                    type='number'
                    name='year'
                    placeholder='Ano'
                    value={query.year}
                    onChange={handleInputChange}
                    min={2023}
                    step={1}
                    required
                    disabled={isLoading}
                />
            </div>
            <div className='w-1/3'>
                <Button type='submit' disabled={isLoading}>{isLoading ? <LoadingSpinner type='concise' /> : 'Consultar'}</Button>
            </div>
        </form>
    )
}