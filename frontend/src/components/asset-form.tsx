import React, { useState } from 'react'
import { Asset } from '../types'
import Button from './button'
import Input from './input'

interface AssetFormProps {
    asset?: Asset,
    onSubmitAsset: (newAsset: Asset) => void,
    onCancel: () => void,
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setNewAsset({ ...newAsset, [name]: value })
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        onSubmitAsset(newAsset)
        setNewAsset(initialAsset)
    }

    return (
        <form onSubmit={handleSubmit} className={`w-full flex flex-col gap-6 ${className}`}>
            <div className='flex flex-col gap-4'>
                    <Input
                        type='text'
                        name='code'
                        placeholder='Código'
                        value={newAsset.code}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type='text'
                        name='name'
                        placeholder='Nome'
                        value={newAsset.name}
                        onChange={handleInputChange}
                        required
                    />

                    <Input
                        type='number'
                        name='tunnel_lower_limit'
                        placeholder='Limite inferior'
                        value={newAsset.tunnel_lower_limit || undefined}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type='number'
                        name='tunnel_upper_limit'
                        placeholder='Limite superior'
                        value={newAsset.tunnel_upper_limit || undefined}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type='number'
                        name='check_interval_minutes'
                        placeholder='Intervalo de checagem em minutos'
                        value={newAsset.check_interval_minutes || undefined}
                        onChange={handleInputChange}
                        required
                    />
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
                <Button type='submit'>Salvar</Button>
                <Button variant='secondary' onClick={onCancel}>Cancelar</Button>
            </div>
        </form>
    )
}