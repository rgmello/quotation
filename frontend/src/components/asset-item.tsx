import { useState } from 'react'
import { Asset } from '../types'
import AssetForm from './asset-form'
import Modal from './modal'
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ClockIcon, PencilIcon, TrashIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import Button from './button'

interface AssetItemProps {
    asset: Asset
    onUpdateAsset: (updatedAsset: Asset) => Promise<void>
    onDeleteAsset: (assetId: number) => Promise<void>
}

export default function AssetItem({ asset, onUpdateAsset, onDeleteAsset }: AssetItemProps) {
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
                <Modal onClose={handleCancelClick}>
                    <span className='text-lg self-center font-semibold mb-4'>Editar Ação</span>
                    <AssetForm
                        asset={asset}
                        onSubmitAsset={handleSubmitAsset}
                        onCancel={handleCancelClick}
                    />
                </Modal>
            }
            {isDeleting &&
                <Modal onClose={handleCancelClick} className='w-[350px] text-center'>
                    <span className='text-lg self-center font-semibold mb-2'>Excluir Ação</span>
                    <p className='self-center mb-4'>Tem certeza de que deseja excluir a ação <b>{asset.name}</b>?</p>

                    <div className='flex flex-col md:flex-row gap-4'>
                        <Button onClick={() => onDeleteAsset(asset.id)}>Sim</Button>
                        <Button variant='secondary' onClick={handleCancelClick}>Não</Button>
                    </div>
                </Modal>
            }
            <div className='border rounded-lg px-5 py-4 flex items-center justify-between'>
                <div className='flex flex-col'>
                    <span className='font-bold'>{asset.code}</span>
                    <span className='text-foreground/60'>{asset.name}</span>
                    <div className='flex gap-4 mt-2 text-smaller'>
                        <Info
                            text={`${asset.check_interval_minutes} min.`}
                            icon={<ClockIcon className='w-4 text-primary' />}
                        />
                        <Info
                            text={`R$ ${asset.tunnel_lower_limit.toString().replace('.', ',')}`}
                            icon={<ArrowTrendingDownIcon className='w-4 text-red-600' />}
                        />
                        <Info
                            text={`R$ ${asset.tunnel_upper_limit.toString().replace('.', ',')}`}
                            icon={<ArrowTrendingUpIcon className='w-4 text-green-600' />}
                        />
                    </div>
                </div>
                <div className='flex'>
                    <Link to={`${asset.id}`}>
                        <Option
                            variant='follow'
                        />
                    </Link>
                    <Option
                        onClick={handleEditClick}
                        variant='edit'
                    />
                    <Option
                        onClick={handleDeleteClick}
                        variant='delete'
                    />
                </div>
            </div>
        </>
    )
}

function Info({ text, icon }: { text: string, icon: React.ReactElement }) {
    return (
        <div className='flex gap-1 items-center'>
            {icon}
            <span>{text}</span>
        </div>
    )
}

function Option({ onClick, variant }: { onClick?: () => void, variant: 'follow' | 'edit' | 'delete' }) {
    const optionBaseClass = 'w-[15px] h-auto'

    return (
        <button onClick={onClick} className='px-3 py-4 rounded hover:bg-foreground/10 transition-all duration-300 ease-out'>
            {variant === 'follow' && <ChartBarIcon className={optionBaseClass} />}
            {variant === 'edit' && <PencilIcon className={optionBaseClass} />}
            {variant === 'delete' && <TrashIcon className={`${optionBaseClass} text-red-600`} />}
        </button>
    )
}