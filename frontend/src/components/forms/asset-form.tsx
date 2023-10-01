import React, { useState } from 'react'
import Input from '../primitives/input'
import { twMerge } from 'tailwind-merge'
import { Asset } from '../../utils/types'
import Button from '../primitives/button'
import LoadingSpinner from '../primitives/loading'


interface AssetFormProps {
    asset?: Asset
    onSubmitAsset: (newAsset: Asset) => Promise<void>
    onCancel: () => void
    className?: string
}


export default function AssetForm({ asset, onSubmitAsset, onCancel, className }: AssetFormProps) {
    const initialAsset = asset || {
        id: 0,
        code: '',
        name: '',
        tunnel_lower_limit: 0,
        tunnel_upper_limit: 0,
        check_interval_minutes: 0,
    }

    const [newAsset, setNewAsset] = useState(initialAsset)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setNewAsset({ ...newAsset, [name]: value })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsLoading(true)
        setErrorMessage(null)
        try {
            await onSubmitAsset(newAsset)
        } catch (error) {
            setErrorMessage('Não foi possível validar o código dessa ação.')
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className={twMerge('w-full flex flex-col gap-6', className)}>
            <div className='flex flex-col gap-4'>
                <Input
                    type='text'
                    name='code'
                    placeholder='Código'
                    value={newAsset.code}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                />
                <Input
                    type='number'
                    name='tunnel_lower_limit'
                    placeholder='Limite inferior'
                    value={newAsset.tunnel_lower_limit}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                />
                <Input
                    type='number'
                    name='tunnel_upper_limit'
                    placeholder='Limite superior'
                    value={newAsset.tunnel_upper_limit}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                />
                <Input
                    type='number'
                    name='check_interval_minutes'
                    placeholder='Intervalo de checagem em minutos'
                    value={newAsset.check_interval_minutes}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                />
            </div>
            {errorMessage &&
                <div className='w-full border rounded px-3 py-2 border-destructive text-destructive'>
                    <p>{errorMessage}</p>
                </div>
            }
            <div className='flex flex-col md:flex-row gap-4'>
                <Button type='button' variant='outline' onClick={onCancel} disabled={isLoading}>Cancelar</Button>
                <Button type='submit' disabled={isLoading}>{isLoading ? <LoadingSpinner /> : 'Salvar'}</Button>
            </div>
        </form>
    )
}