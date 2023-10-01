import { createContext, useContext, ReactNode, useState } from 'react'
import { Asset } from '../utils/types'

interface AssetContextData {
    asset: Asset | null
    setAsset: (asset: Asset) => void
}

interface AssetProviderProps {
    initialAsset?: Asset
    children: ReactNode
}

const AssetContext = createContext<AssetContextData | undefined>(undefined)

export function AssetProvider({ initialAsset, children }: AssetProviderProps) {
    const [asset, setAsset] = useState<Asset | null>(initialAsset || null)

    return (
        <AssetContext.Provider value={{ asset, setAsset }}>
            {children}
        </AssetContext.Provider>
    )
}

export function useAssetContext() {
    const context = useContext(AssetContext)
    if (context === undefined)
        throw new Error('useAssetContext deve ser usado dentro de um AssetProvider')
    return context
}
