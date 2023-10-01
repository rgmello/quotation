import { ReactNode, useState } from 'react'
import { Asset } from '../utils/types'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ClockIcon, PencilIcon, TrashIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import AssetSaveModal from './modals/asset-save-modal'
import AssetDeleteModal from './modals/asset-delete-modal'


interface AssetItemProps {
    asset: Asset
    onUpdateAsset: (updatedAsset: Asset) => Promise<void>
    onDeleteAsset: (assetId: number) => Promise<void>
    className?: string
}


export default function AssetItem({ asset, onUpdateAsset, onDeleteAsset, className }: AssetItemProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleEditClick = () => setIsEditing(true)

    const handleCancelClick = () => {
        setIsDeleting(false)
        setIsEditing(false)
    }

    const handleDeleteClick = () => setIsDeleting(true)

    const handleSubmitAsset = async (submitedAsset: Asset) => {
        try {
            await onUpdateAsset(submitedAsset)
            setIsEditing(false)
        } catch (error) {
            throw error
        }
    }

    return (
        <>
            {isEditing &&
                <AssetSaveModal
                    type='edit'
                    onClose={handleCancelClick}
                    onSubmit={handleSubmitAsset}
                    asset={asset}
                />
            }
            
            {isDeleting &&
                <AssetDeleteModal
                    asset={asset}
                    onClose={handleCancelClick}
                    onDelete={onDeleteAsset}
                />
            }

            <div className={twMerge('bg-card text-card-foreground p-5 flex items-center justify-between', className)}>
                <div className='flex flex-col'>
                    <span className='font-bold'>{asset.code}</span>
                    <span className='text-card-foreground/60'>{asset.name}</span>
                    <div className='flex gap-5 mt-3 text-smaller'>
                        <Info
                            text={`${asset.check_interval_minutes} min.`}
                            icon={<ClockIcon className='w-4 text-card-foreground stroke-2' />}
                        />
                        <Info
                            text={`R$ ${asset.tunnel_lower_limit.toString().replace('.', ',')}`}
                            icon={<ArrowTrendingDownIcon className='w-4 text-destructive stroke-2' />}
                        />
                        <Info
                            text={`R$ ${asset.tunnel_upper_limit.toString().replace('.', ',')}`}
                            icon={<ArrowTrendingUpIcon className='w-4 text-primary stroke-2' />}
                        />
                    </div>
                </div>
                <div className='flex'>
                    <Link to={`${asset.id}`}><Option variant='follow' /></Link>
                    <Option onClick={handleEditClick} variant='edit' />
                    <Option onClick={handleDeleteClick} variant='delete' />
                </div>
            </div>
        </>
    )
}


function Info({ text, icon }: { text: string, icon: ReactNode }) {
    return (
        <div className='flex gap-1 items-center'>
            {icon}
            <span>{text}</span>
        </div>
    )
}


function Option({ onClick, variant }: { onClick?: () => void, variant: 'follow' | 'edit' | 'delete' }) {
    const optionBaseClass = 'w-[15px] h-auto stroke-2'

    return (
        <button onClick={onClick} className={`px-3 py-4 rounded text-card-foreground/80 ${variant === 'delete' ? 'hover:bg-destructive/[0.15]' : 'hover:bg-accent'} transition-all duration-300 ease-out`}>
            {variant === 'follow' && <ChartBarIcon className={optionBaseClass} />}
            {variant === 'edit' && <PencilIcon className={optionBaseClass} />}
            {variant === 'delete' && <TrashIcon className={`${optionBaseClass} text-destructive`} />}
        </button>
    )
}