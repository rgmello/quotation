import Chart from '../primitives/chart'
import Card from '../primitives/card'
import { Price } from '../../utils/types'
import { getRealTimeChartData } from '../../utils/chart'
import { useAssetContext } from '../../providers/asset-provider'


interface RealTimeChartCardProps {
    prices?: Price[]
    className?: string
}


export default function RealTimeChartCard({ prices, className }: RealTimeChartCardProps) {
    const { asset } = useAssetContext()

    return (
        <Card className={className}>
            <h3 className='text-md font-bold'>Valoração Recente</h3>
            <div className='h-full min-h-0 -ml-1'>
                {asset && prices &&
                    <Chart
                        serie={getRealTimeChartData(prices, asset.code)}
                        tunnelLowerLimit={asset.tunnel_lower_limit}
                        tunnelUpperLimit={asset.tunnel_upper_limit}
                    />
                }
            </div>
        </Card>
    )
}