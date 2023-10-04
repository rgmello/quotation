import Card from '../primitives/card'
import { twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'
import { getRecommendation } from '../../utils/analysis'
import { useAssetContext } from '../../providers/asset-provider'
import { InformationCircleIcon } from '@heroicons/react/24/outline'


interface AssetCardProps {
    lastPrice?: number
    className?: string
}


export default function AssetInfoCard({ lastPrice, className }: AssetCardProps) {
    const { asset } = useAssetContext()
    const [recommendation, setRecommendation] = useState<string>('')

    // Obtenção de uma recomendação
    useEffect(() => {
        asset && lastPrice && setRecommendation(getRecommendation(asset, lastPrice))
    }, [asset, lastPrice])

    return (asset &&
        <Card className={twMerge('justify-between divide-y divide-border', className)}>
            <div className='w-full flex gap-4 pt-[6px] justify-between'>
                <div className='flex flex-col'>
                    <h2 className='text-md font-bold'>{asset.code}</h2>
                    <span className='text-base text-card-foreground/80'>{asset.name}</span>
                </div>
                {lastPrice &&
                    <div className='flex items-center min-w-max'>
                        <span className='text-xl font-semibold'>{`R$ ${lastPrice.toString().replace('.', ',')}`}</span>
                    </div>
                }
            </div>
            <div className='w-full pt-[14px] flex items-center gap-2'>
                <InformationCircleIcon className='w-4 mb-[1px] stroke-2 text-primary' />
                <span className='text-sm text-card-foreground'>
                    {recommendation === 'buy' && <>É um momento adequado para comprar esse ativo.</>}
                    {recommendation === 'sell' && <>É um momento adequado para vender esse ativo.</>}
                    {recommendation === '' && <>Não é interessante operar esse ativo agora.</>}
                </span>
            </div>
        </Card>
    )
}