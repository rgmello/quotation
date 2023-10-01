import axios from 'axios'
import QueryCard from './query-card'
import { useState, useEffect } from 'react'
import AssetInfoCard from './asset-info-card'
import QueryChartCard from './query-chart-card'
import RealTimeChartCard from './real-time-chart-card'
import { redirect, useParams } from 'react-router-dom'
import { AssetProvider } from '../../providers/asset-provider'
import { Asset, PricesListApiPage, QueryData } from '../../utils/types'


export default function AssetDashboard() {
    const { assetId } = useParams<{ assetId: string }>()
    const [asset, setAsset] = useState<Asset>()
    const [pricesPage, setPricesPage] = useState<PricesListApiPage>()
    const [lastPrice, setLastPrice] = useState<number>()
    const [queryData, setQueryData] = useState<QueryData>()

    // Obtenção de metadados sobre a ação
    useEffect(() => {
        async function fetchAssetMetaData() {
            try {
                const response = await axios.get<Asset>(`/api/assets/${assetId}`)
                setAsset(response.data)
            } catch (error) {
                redirect('/not-found')
            }
        }
        fetchAssetMetaData()
    }, [assetId])

    // Obtenção de preços
    useEffect(() => {
        async function fetchAssetPrices() {
            try {
                const response = await axios.get<PricesListApiPage>(`/api/assets/${assetId}/prices`)
                setPricesPage(response.data)
                setLastPrice(response.data.results[0].price)
            } catch (error) {
                console.error(`Erro ao obter histórico de preços da ação: ${error}`)
            }
        }

        fetchAssetPrices()

        if (asset) {
            const intervalId = setInterval(() => fetchAssetPrices(), asset.check_interval_minutes * 60 * 1000)
            return () => clearInterval(intervalId)
        }
    }, [assetId, asset])

    return (
        <>{asset &&
            <AssetProvider initialAsset={asset}>
                <main className='w-full h-screen px-16 py-16 flex flex-col gap-6 text-sm min-w-0 overflow-x-hidden'>
                    <div className='w-full h-fit flex justify-between gap-6'>
                        <AssetInfoCard lastPrice={lastPrice} className='w-1/2' />
                        <QueryCard setQueryData={setQueryData} className='w-1/2' />
                    </div>
                    <div className='w-full h-full min-h-0 flex gap-6'>
                        <RealTimeChartCard prices={pricesPage?.results} className='w-1/2 min-w-0' />
                        <QueryChartCard queryData={queryData} className='w-1/2 min-w-0' />
                    </div>
                </main>
            </AssetProvider>
        }</>
    )
}