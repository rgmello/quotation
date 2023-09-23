import { useState, useEffect } from 'react'
import axios from 'axios'
import AssetItem from './asset-item'
import AssetForm from './asset-form'
import { Asset } from '../types'
import Button from './button'
import Header from './header'
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
            if (response.status === 200) {
                // Atualizar a lista de ativos após a edição
                const updatedAssets = assets.map((asset) =>
                    asset.id === updatedAsset.id ? response.data : asset
                )
                setAssets(updatedAssets)
            }
        } catch (error) {
            console.error('Erro ao atualizar ativo:', error)
        }
    }

    const handleDeleteAsset = async (assetId: number) => {
        try {
            const response = await axios.delete(`/api/assets/${assetId}/`)
            if (response.status === 204) {
                // Remover o ativo da lista após a exclusão
                const updatedAssets = assets.filter((asset) => asset.id !== assetId)
                setAssets(updatedAssets)
            }
        } catch (error) {
            console.error('Erro ao excluir ativo:', error)
        }
    }

    const handleAddAsset = async (newAsset: Asset) => {
        try {
            const response = await axios.post<Asset>('/api/assets/', newAsset)
            if (response.status === 201) {
                // Adicionar o novo ativo à lista após a criação
                setAssets([...assets, response.data])
            }
            setIsAdding(false)
        } catch (error) {
            console.error('Erro ao cadastrar ativo:', error)
        }
    }

    return (
        <>
            <Header />
            <div className='w-[700px] flex flex-col mx-auto my-10 h-full gap-5 text-sm'>
                <Button onClick={toggleAdding} className='fixed flex gap-2 right-60 bottom-10 max-w-fit self-end'>
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
        </>
    )
}