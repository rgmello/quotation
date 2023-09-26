import { useState, useEffect } from 'react'
import { redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import { Asset, PricesListApiPage } from '../utils/types'
import AssetPriceChart from './chart'
import { getChartDataFromPrices } from '../utils/chart'

export default function AssetDetails() {
    const { assetId } = useParams<{ assetId: string }>()
    const [asset, setAsset] = useState<Asset | null>(null)
    const [pricesPage, setPricesPage] = useState<PricesListApiPage | null>(null)

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

    useEffect(() => {
        async function fetchAssetPrices() {
            try {
                const response = await axios.get<PricesListApiPage>(`/api/assets/${assetId}/prices`)
                setPricesPage(response.data)
            } catch (error) {
                console.error(`Erro ao obter histórico de preços da ação: ${error}`)
            }
        }

        fetchAssetPrices()

        if (asset) {
            const intervalId = setInterval(() => {
                fetchAssetPrices()
            }, asset.check_interval_minutes * 60 * 1000)

            return () => {
                clearInterval(intervalId)
            }
        }
    }, [assetId, asset])

    return (asset &&
        <main className='w-[700px] h-[80vh] flex flex-col mx-auto mt-6 mb-14 gap-6 text-sm'>
            <div className='flex justify-between gap-6'>
                <div className='w-full bg-card p-5 border rounded-lg shadow-xl'>
                    <div className='flex flex-col'>
                        <h2 className='text-lg font-bold'>{asset.code}</h2>
                        <span className='text-base text-card-foreground/80'>{asset.name}</span>
                    </div>
                </div>
                {pricesPage?.results[0]?.price &&
                    <div className='bg-card flex items-center p-5 min-w-max border rounded-lg shadow-xl'>
                        <span className='text-xl font-semibold'>{`R$ ${pricesPage.results[0].price.toString().replace('.', ',')}`}</span>
                    </div>
                }
            </div>
            <div className='bg-card px-5 pt-7 pb-2 border rounded-lg shadow-xl w-full h-[500px]'>
                {pricesPage?.results &&
                    <AssetPriceChart
                        data={getChartDataFromPrices(pricesPage.results.slice(0, 10), asset)}
                        tunnelLowerLimit={asset.tunnel_lower_limit}
                        tunnelUpperLimit={asset.tunnel_upper_limit}
                    />
                }
            </div>
        </main>
    )
}