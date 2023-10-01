import axios from 'axios'
import AssetItem from './asset-item'
import Button from './primitives/button'
import { useState, useEffect } from 'react'
import AssetSaveModal from './modals/asset-save-modal'
import { PlusIcon } from '@heroicons/react/24/outline'
import PaginationBar from './navigation/pagination-bar'
import { Asset, AssetsListApiPage } from '../utils/types'


export default function AssetsList() {
    const [assetsPage, setAssetsPage] = useState<AssetsListApiPage>()
    const [assets, setAssets] = useState<Asset[]>()
    const [isAdding, setIsAdding] = useState<boolean>(false)

    async function fetchData(route?: string | null) {
        try {
            const response = await axios.get<AssetsListApiPage>(route || '/api/assets/')
            setAssetsPage(response.data)
            setAssets(response.data.results)
        } catch (error) {
            console.error('Erro ao obter lista de ativos:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const toggleAdding = () => setIsAdding(!isAdding)

    const handleUpdateAsset = async (updatedAsset: Asset) => {
        if (!assets) return
        try {
            const response = await axios.put(`/api/assets/${updatedAsset.id}/`, updatedAsset)
            const updatedAssets = assets.map((asset) =>
                asset.id === updatedAsset.id ? response.data : asset
            )
            setAssets(updatedAssets)
        } catch (error) {
            console.error('Erro ao atualizar ativo:', error)
            throw error
        }
    }

    const handleDeleteAsset = async (assetId: number) => {
        if (!assets) return
        try {
            await axios.delete(`/api/assets/${assetId}/`)
            const updatedAssets = assets.filter((asset) => asset.id !== assetId)
            setAssets(updatedAssets)
        } catch (error) {
            console.error('Erro ao deletar ativo:', error)
        }
    }

    const handleAddAsset = async (newAsset: Asset) => {
        if (!assets) return
        try {
            const response = await axios.post<Asset>('/api/assets/', newAsset)
            setAssets([response.data, ...assets])
            setIsAdding(false)
        } catch (error) {
            console.error('Erro ao adicionar ativo:', error)
            throw error
        }
    }

    return (
        <main className='w-[800px] flex flex-col mx-auto py-[3%] h-full gap-6 text-sm'>
            <Button onClick={toggleAdding} className='shadow'>
                <PlusIcon className='w-5 stroke-2' /> Adicionar
            </Button>

            {isAdding &&
                <AssetSaveModal
                    onClose={toggleAdding}
                    onSubmit={handleAddAsset}
                />
            }

            {assets &&
                <div className='bg-card rounded-lg overflow-clip shadow-xl border flex flex-col gap-1 divide-y'>
                    {assets.map((asset) => (
                        <AssetItem
                            key={asset.id}
                            asset={asset}
                            onUpdateAsset={handleUpdateAsset}
                            onDeleteAsset={handleDeleteAsset}
                        />
                    ))}
                </div>
            }

            {assetsPage &&
                <PaginationBar
                    hasPrevious={assetsPage.previous !== null}
                    hasNext={assetsPage.next !== null}
                    onPreviousClick={() => fetchData(assetsPage.previous)}
                    onNextClick={() => fetchData(assetsPage.next)}
                />
            }
        </main>
    )
}

