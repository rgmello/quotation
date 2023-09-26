import { useState, useEffect } from 'react'
import axios from 'axios'
import AssetItem from './asset-item'
import AssetForm from './asset-form'
import { Asset, AssetsListApiPage } from '../utils/types'
import Button from './button'
import Modal from './modal'
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function AssetsList() {
    const [assetsPage, setAssetsPage] = useState<AssetsListApiPage>()
    const [assets, setAssets] = useState<Asset[]>()
    const [isAdding, setIsAdding] = useState<boolean>(false)

    async function fetchData(route?: string | null) {
        try {
            const response = await axios.get<AssetsListApiPage>(route || '/api/assets/')
            setAssetsPage(response.data)
            console.log(response.data)
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
            throw error
        }
    }

    const handleAddAsset = async (newAsset: Asset) => {
        if (!assets) return
        try {
            const response = await axios.post<Asset>('/api/assets/', newAsset)
            setAssets([...assets, response.data])
            setIsAdding(false)
        } catch (error) {
            throw error
        }
    }

    return (
        <main className='w-[700px] flex flex-col mx-auto mt-6 mb-14 h-full gap-6 text-sm'>
            <Button onClick={toggleAdding} className='w-full flex gap-2 justify-center shadow'>
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

            {assets &&
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
            }

            {assetsPage &&
                <div className='relative w-full bg-red-100 flex gap-6'>
                    {assetsPage.previous && <PaginationButton variant='previous' onClick={() => fetchData(assetsPage.previous)} />}
                    {assetsPage.next && <PaginationButton variant='next' onClick={() => fetchData(assetsPage.next)}  />}
                </div>
            }
        </main>
    )
}

function PaginationButton({ variant, onClick }: { variant: 'previous' | 'next', onClick: () => void }) {
    return (
        <Button onClick={onClick} className={`absolute flex justify-center items-center gap-2 ${variant==='next' ? 'right-0' : 'left-0'} w-28 shadow`}>
            {variant === 'previous' && <><ArrowLeftIcon className='w-4 h-auto' /> Anterior</>}
            {variant === 'next' && <>Próximo <ArrowRightIcon className='w-4 h-auto' /></>}
        </Button>
    )
}