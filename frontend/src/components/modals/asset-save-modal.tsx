import Modal from '../primitives/modal'
import { Asset } from '../../utils/types'
import AssetForm from '../forms/asset-form'


interface AssetSaveModalProps {
    type?: 'create' | 'edit'
    onClose: () => void
    onSubmit: (submitedAsset: Asset) => Promise<void>
    asset?: Asset
}


export default function AssetSaveModal({ type='create', onClose, onSubmit, asset }: AssetSaveModalProps) {
    return (
        <Modal onClose={onClose}>
            <span className='text-lg self-center font-semibold mb-4'>{type === 'create' ? 'Cadastrar' : 'Editar'} Ação</span>
            <AssetForm
                asset={asset}
                onSubmitAsset={onSubmit}
                onCancel={onClose}
            />
        </Modal>
    )
}