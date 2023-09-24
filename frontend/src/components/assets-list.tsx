import { useState, useEffect } from 'react'
import axios from 'axios'
import AssetItem from './asset-item'
import AssetForm from './asset-form'
import { Asset } from '../types'
import Button from './button'
import Modal from './modal'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function AssetsList() {
    const [assets, setAssets] = useState<Asset[]>([])
    const [isAdding, setIsAdding] = useState<boolean>(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get<Asset[]>('/api/assets/')
                setAssets(response.data)
            } catch (error) {
                console.error('Erro ao obter lista de ativos:', error)
            }
        }
        fetchData()
    }, [])

    const toggleAdding = () => setIsAdding(!isAdding)

    const handleUpdateAsset = async (updatedAsset: Asset) => {
        try {
            const response = await axios.put(`/api/assets/${updatedAsset.id}/`, updatedAsset)
            const updatedAssets = assets.map((asset) =>
                asset.id === updatedAsset.id ? response.data : asset
            )
            setAssets(updatedAssets)
        } catch (error) {
            throw error
        }
    }

    const handleDeleteAsset = async (assetId: number) => {
        try {
            await axios.delete(`/api/assets/${assetId}/`)
            const updatedAssets = assets.filter((asset) => asset.id !== assetId)
            setAssets(updatedAssets)
        } catch (error) {
            throw error
        }
    }

    const handleAddAsset = async (newAsset: Asset) => {
        try {
            const response = await axios.post<Asset>('/api/assets/', newAsset)
            setAssets([...assets, response.data])
            setIsAdding(false)
        } catch (error) {
            throw error
        }
    }

    return (
        <div className='w-[700px] flex flex-col mx-auto mt-6 mb-14 h-full gap-6 text-sm'>
            <Button onClick={toggleAdding} className='w-full flex gap-2 justify-center'>
                <PlusIcon className='w-5 stroke-2' />
                Adicionar
            </Button>

            {isAdding &&
                <Modal onClose={toggleAdding}>
                    <span className='text-lg self-center font-semibold mb-4'>Adicionar Ação</span>
                    <AssetForm
                        onSubmitAsset={handleAddAsset}
                        onCancel={toggleAdding}
                    />
                </Modal>
            }

            <div className='flex flex-col gap-4'>
                {assets.map((asset) => (
                    <AssetItem
                        key={asset.id}
                        asset={asset}
                        onUpdateAsset={handleUpdateAsset}
                        onDeleteAsset={handleDeleteAsset}
                    />
                ))}
            </div>
        </div>
    )
}