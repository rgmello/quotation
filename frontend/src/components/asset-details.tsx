import { useState, useEffect } from 'react'
import { redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import { Asset } from '../types'

export default function AssetDetails() {
    const { assetId } = useParams<{ assetId: string }>()
    const [asset, setAsset] = useState<Asset | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get<Asset>(`/api/assets/${assetId}/`)
                setAsset(response.data)
            } catch (error) {
                redirect('/not-found')
            }
        }
        fetchData()
    }, [assetId])

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>Detalhes do Ativo: {assetId}</h2>
            {asset && (
                <div>
                    <p className='text-lg'>Nome: {asset.name}</p>
                    <p className='text-lg'>Limite Inferior do Túnel: {asset.tunnel_lower_limit}</p>
                    <p className='text-lg'>Limite Superior do Túnel: {asset.tunnel_upper_limit}</p>
                </div>
            )}
        </div>
    )
}