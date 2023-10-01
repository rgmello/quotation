import { useState } from 'react'
import Modal from '../primitives/modal'
import { Asset } from '../../utils/types'
import Button from '../primitives/button'
import LoadingSpinner from '../primitives/loading'


interface AssetSaveModalProps {
    asset: Asset
    onClose: () => void
    onDelete: (assetId: number) => Promise<void>
}


export default function AssetDeleteModal({ asset, onClose, onDelete }: AssetSaveModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    
    async function handleDelete() {
        setIsLoading(true)
        await onDelete(asset.id)
        setIsLoading(false)
    }

    return (
        <Modal onClose={onClose} className='w-[400px] text-center'>
            <span className='text-lg self-center font-semibold mb-4'>Excluir Ação</span>
            <p className='self-center mb-4'>Tem certeza de que deseja excluir a ação <b>{asset.name}</b>?</p>
            <div className='flex flex-col md:flex-row gap-4'>
                <Button variant='outline' onClick={onClose} disabled={isLoading}>Não</Button>
                <Button onClick={handleDelete} disabled={isLoading}>{isLoading ? <LoadingSpinner type='concise' /> : 'Sim'}</Button>
            </div>
        </Modal>
    )
}